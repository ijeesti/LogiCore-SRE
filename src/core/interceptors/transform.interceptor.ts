// import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from '@nestjs/common';
// import { map, Observable } from 'rxjs';

// @Injectable()
// export class TransformInterceptor<T> implements NestInterceptor<T, any> {
//   intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
//     return next.handle().pipe(map(data => ({
//       success: true,
//       timestamp: new Date().toISOString(),
//       data,
//     })));
//   }
// }

import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { map, Observable } from 'rxjs';

@Injectable()
export class TransformInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
      map((data) => {
        // 1. Safely handle Mongoose documents to prevent circular reference errors
        const sanitizedData = this.serializeMongoose(data);

        // 2. Wrap in the Standardized Response Envelope
        return {
          success: true,
          timestamp: new Date().toISOString(),
          data: sanitizedData,
        };
      }),
    );
  }

  private serializeMongoose(data: any) {
    if (!data) {
      return data;
    }

    const options = {
      virtuals: true, // This ensures 'id' (a string alias of _id) is created
      versionKey: false, // Removes __v
      transform: (doc, ret) => {
        // 1. Create a clean 'id' property if it doesn't exist
        if (ret._id) {
          ret.id = ret._id.toString();
        }
        // 2. Remove the internal database keys
        delete ret._id;
        delete ret.__v;
        return ret;
      },
    };

    if (Array.isArray(data)) {
      return data.map((item) =>
        item.toObject ? item.toObject(options) : item,
      );
    }

    return data.toObject ? data.toObject(options) : data;
  }
}
