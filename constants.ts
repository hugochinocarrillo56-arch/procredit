import { FaqItem, PawnCategory } from './types';

export const INTEREST_RATE = 0.03; // 3% mensual (Interés del préstamo)
export const INSURANCE_RATE = 0.035; // 3.5% mensual (Seguro del préstamo)
export const STORAGE_RATE = 0.035; // 3.5% mensual (Depósito/Almacenaje)
export const WHATSAPP_PHONE = "59162327873"; // Número centralizado principal
export const WHATSAPP_PHONE_SECONDARY = "59177274528"; // Número centralizado secundario
export const EMAIL_CONTACT = "hugochinocarrillo56@gmail.com"; // Correo de contacto

export const FAQ_ITEMS: FaqItem[] = [
  {
    id: '1',
    category: 'Proceso',
    question: '¿Cómo funciona el proceso de empeño?',
    answer: 'Nuestro proceso es simple: 1. Traes tu prenda a cualquier sucursal. 2. Uno de nuestros expertos realiza un avalúo profesional. 3. Te ofrecemos un préstamo inmediato basado en el valor. 4. Si aceptas, firmamos el contrato y recibes tu dinero en minutos.'
  },
  {
    id: '2',
    category: 'Requisitos',
    question: '¿Qué documentos necesito?',
    answer: 'Tu Cédula de Identidad (C.I.) vigente. La prenda u objeto que vas a dejar en garantía. Con solo esas dos cosas ya se puede realizar la valoración y firmar el contrato de empeño.'
  },
  {
    id: '3',
    category: 'Pagos',
    question: '¿Qué es un refrendo?',
    answer: 'El refrendo te permite extender el plazo de tu préstamo pagando únicamente los intereses generados hasta la fecha. Esto te da más tiempo para recuperar tu prenda sin perderla.'
  },
  {
    id: '4',
    category: 'Seguridad',
    question: '¿Mis artículos están seguros?',
    answer: 'Absolutamente. Tus prendas se guardan en bóvedas de alta seguridad monitoreadas 24/7. Además, todos los artículos están protegidos por un seguro contra daños y robo.'
  }
];

export const CATEGORIES = [
  { name: PawnCategory.JOYERIA, icon: 'gem', description: 'Oro, plata y diamantes con las tasas más altas.' },
  { name: PawnCategory.VEHICULOS, icon: 'car', description: 'Autos, motos y maquinaria sin dejar de usarlos.' },
  { name: PawnCategory.ELECTRONICOS, icon: 'laptop', description: 'Laptops, celulares, consolas y cámaras.' },
];