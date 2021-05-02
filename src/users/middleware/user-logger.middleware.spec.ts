import { UserLoggerMiddleware } from './user-logger.middleware';

describe('UserLoggerMiddleware', () => {
  it('should be defined', () => {
    expect(new UserLoggerMiddleware()).toBeDefined();
  });
});
