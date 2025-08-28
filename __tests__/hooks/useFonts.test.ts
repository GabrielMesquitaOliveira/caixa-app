import { renderHook } from '@testing-library/react-hooks';
import { useFonts } from 'expo-font';
import { useCustomFonts } from '../../hooks/useFonts';

// Mock expo-font
jest.mock('expo-font');

describe('useCustomFonts', () => {
  const mockUseFonts = useFonts as jest.MockedFunction<typeof useFonts>;
  let consoleErrorSpy: jest.SpyInstance;

  beforeEach(() => {
    consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation();
    mockUseFonts.mockClear();
  });

  afterEach(() => {
    consoleErrorSpy.mockRestore();
  });

  it('should return fontsLoaded state from useFonts', () => {
    mockUseFonts.mockReturnValue([true, null]);

    const { result } = renderHook(() => useCustomFonts());

    expect(result.current).toBe(true);
    expect(mockUseFonts).toHaveBeenCalledWith({
      'CAIXASTD_Bold': require('../../assets/fonts/CAIXAStd-Bold.ttf'),
      'CAIXASTD_Regular': require('../../assets/fonts/CAIXAStd-Regular.ttf'),
      'CAIXASTD_Light': require('../../assets/fonts/CAIXAStd-Light.ttf'),
      'CAIXASTD_SemiBold': require('../../assets/fonts/CAIXAStd-SemiBold.ttf'),
      'CAIXASTD_ExtraBold': require('../../assets/fonts/CAIXAStd-ExtraBold.ttf'),
    });
  });

  it('should log error when font loading fails', () => {
    const fontError = new Error('Font loading failed');
    mockUseFonts.mockReturnValue([false, fontError]);

    renderHook(() => useCustomFonts());

    expect(consoleErrorSpy).toHaveBeenCalledWith('Erro ao carregar fontes:', fontError);
  });

  it('should not log error when fonts load successfully', () => {
    mockUseFonts.mockReturnValue([true, null]);

    renderHook(() => useCustomFonts());

    expect(consoleErrorSpy).not.toHaveBeenCalled();
  });

  it('should handle font loading in progress', () => {
    mockUseFonts.mockReturnValue([false, null]);

    const { result } = renderHook(() => useCustomFonts());

    expect(result.current).toBe(false);
    expect(consoleErrorSpy).not.toHaveBeenCalled();
  });
});
