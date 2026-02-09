import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';

import { ConfigService } from '@nestjs/config';

@Injectable()
export class ApiKeyGuard implements CanActivate {
  constructor(private configService: ConfigService) {}

  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest();

    // In C#, this is like checking Request.Headers
    const apiKey = request.headers['x-api-key'] || request.headers['X-API-KEY'];
    const systemToken = this.configService.get<string>('API_KEY');
    console.warn(systemToken, apiKey, 'test');
    if (!apiKey || apiKey !== systemToken) {
      throw new UnauthorizedException('Invalid or missing API Key');
    }

    return true;
  }
}
