import localFont from 'next/font/local';

/** Nexa — body & UI (ExtraLight + Heavy) */
export const nexa = localFont({
  src: [
    {
      path: '../../public/fonts/Nexa-ExtraLight.ttf',
      weight: '200',
      style: 'normal',
    },
    {
      path: '../../public/fonts/Nexa-Heavy.ttf',
      weight: '800',
      style: 'normal',
    },
  ],
  variable: '--font-nexa',
  display: 'swap',
  fallback: ['system-ui', 'Segoe UI', 'sans-serif'],
});

/** Road Rage — display titles & accent labels */
export const roadRage = localFont({
  src: '../../public/fonts/Road_Rage.otf',
  variable: '--font-road-rage',
  weight: '400',
  style: 'normal',
  display: 'swap',
  fallback: ['var(--font-nexa)', 'system-ui', 'sans-serif'],
});

export const fontVariables = `${nexa.variable} ${roadRage.variable}`;
