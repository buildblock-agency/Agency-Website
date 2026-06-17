import { MetadataRoute } from 'next'

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'BuildBlock Dev Studio',
    short_name: 'BuildBlock',
    description: 'We build websites that make people stop. Cinematic web experiences for brands that refuse to blend in.',
    start_url: '/',
    display: 'standalone',
    background_color: '#080805',
    theme_color: '#A67C52',
    icons: [
      {
        src: '/icon-light-32x32.png',
        sizes: '32x32',
        type: 'image/png',
      },
      {
        src: '/icon-dark-32x32.png',
        sizes: '32x32',
        type: 'image/png',
      },
      {
        src: '/apple-icon.png',
        sizes: '180x180',
        type: 'image/png',
      },
    ],
  }
}
