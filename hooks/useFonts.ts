import { useFonts } from 'expo-font';
import { useEffect } from 'react';

export const useCustomFonts = () => {
  const [fontsLoaded, fontError] = useFonts({
    'CAIXASTD_Bold': require('../assets/fonts/CAIXAStd-Bold.ttf'),
    'CAIXASTD_Regular': require('../assets/fonts/CAIXAStd-Regular.ttf'),
    'CAIXASTD_Light': require('../assets/fonts/CAIXAStd-Light.ttf'),
    'CAIXASTD_SemiBold': require('../assets/fonts/CAIXAStd-SemiBold.ttf'),
    'CAIXASTD_ExtraBold': require('../assets/fonts/CAIXAStd-ExtraBold.ttf'),
  });

  useEffect(() => {
    if (fontError) {
      console.error('Erro ao carregar fontes:', fontError);
    }
  }, [fontError]);

  return fontsLoaded;
};
