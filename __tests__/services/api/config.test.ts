import axios from 'axios';
import { getApiInstance } from '../../../services/api/config';

// Mock axios
jest.mock('axios');
jest.mock('@/config', () => ({
  API_URL: 'http://test-api.com',
}));

describe('API Config', () => {
  const mockedAxios = axios as jest.Mocked<typeof axios>;
  let consoleLogSpy: jest.SpyInstance;
  let consoleErrorSpy: jest.SpyInstance;

  beforeEach(() => {
    consoleLogSpy = jest.spyOn(console, 'log').mockImplementation();
    consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation();
    mockedAxios.create.mockClear();
    // Clear the singleton instance between tests
    (getApiInstance as any).apiInstance = null;
  });

  afterEach(() => {
    consoleLogSpy.mockRestore();
    consoleErrorSpy.mockRestore();
  });

  it('should create axios instance with correct configuration', () => {
    const mockInstance = {
      interceptors: {
        request: { use: jest.fn() },
        response: { use: jest.fn() },
      },
    };
    mockedAxios.create.mockReturnValue(mockInstance as any);

    const instance = getApiInstance();

    expect(mockedAxios.create).toHaveBeenCalledWith({
      baseURL: 'http://test-api.com',
      timeout: 10000,
      headers: { 'Content-Type': 'application/json' },
    });
    expect(consoleLogSpy).toHaveBeenCalledWith('🌐 Conectando à API em: http://test-api.com');
  });

  it('should return the same instance on subsequent calls (singleton)', () => {
    const mockInstance = {
      interceptors: {
        request: { use: jest.fn() },
        response: { use: jest.fn() },
      },
    };
    mockedAxios.create.mockReturnValue(mockInstance as any);

    const instance1 = getApiInstance();
    const instance2 = getApiInstance();

    expect(instance1).toBe(instance2);
  });
});
