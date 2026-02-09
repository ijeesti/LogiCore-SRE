import { Test, TestingModule } from '@nestjs/testing';
import { ConfigService } from '@nestjs/config';
import { ExecutionContext, UnauthorizedException } from '@nestjs/common';
import { ApiKeyGuard } from './api-key.guard';

describe('ApiKeyGuard', () => {
  let guard: ApiKeyGuard;
  let configService: ConfigService;

  // Mocking the ConfigService (Like Mocking IConfiguration in .NET)
  const mockConfigService = {
    get: jest.fn().mockReturnValue('secret-123'),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ApiKeyGuard,
        {
          provide: ConfigService,
          useValue: mockConfigService,
        },
      ],
    }).compile();

    guard = module.get<ApiKeyGuard>(ApiKeyGuard);
    configService = module.get<ConfigService>(ConfigService);
  });

  it('should be defined', () => {
    expect(guard).toBeDefined();
  });

  it('should allow access when API key is valid', () => {
    const mockContext = createMockContext('secret-123');
    expect(guard.canActivate(mockContext)).toBe(true);
  });

  it('should throw UnauthorizedException when API key is missing', () => {
    const mockContext = createMockContext(undefined);
    expect(() => guard.canActivate(mockContext)).toThrow(UnauthorizedException);
  });

  it('should throw UnauthorizedException when API key is invalid', () => {
    const mockContext = createMockContext('wrong-key');
    expect(() => guard.canActivate(mockContext)).toThrow(UnauthorizedException);
  });
});

/**
 * Helper to mock the ExecutionContext (The "C# HttpContext" equivalent)
 */
function createMockContext(apiKey: string | undefined): ExecutionContext {
  return {
    switchToHttp: () => ({
      getRequest: () => ({
        headers: {
          'x-api-key': apiKey,
        },
      }),
    }),
  } as unknown as ExecutionContext;
}