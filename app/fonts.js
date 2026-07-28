import { Cinzel, Poppins, Montserrat, Playfair_Display } from 'next/font/google'

export const cinzel = Cinzel({
  subsets: ['latin']
})

export const poppins = Poppins({
  subsets: ['latin'],
  weight: ['400', '700']
})

export const montserrat = Montserrat({
  subsets: ['latin'],
  weight: ['400', '700']
})

export const playfair = Playfair_Display({
  subsets: ['latin'],
  weight: ['400', '700']
})