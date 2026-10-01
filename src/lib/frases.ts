// Frases cortas de Lexi, con humor laboral y aptas para todas las edades.
import { elegir } from './azar';

const FRASES = {
  acierto: [
    '¡Eso sí es cumplir la jornada!',
    '¡Contrato firmado y sin letra chica!',
    '¡Pura probidad!',
    '¡Más firme que un contrato en dos ejemplares!',
    '¡Ni la Inspección del Trabajo te encuentra un error!',
  ],
  combo: ['¡Vas con todo! Eso merece un bono.', '¡Racha de aciertos! Esto parece horas extra bien pagadas.', '¡Imparable, como el principio de continuidad!'],
  error: [
    'Ups, ese plazo se te venció.',
    'Tranqui, hasta el mejor contrato tiene un anexo.',
    'Respira: los errores también enseñan.',
    'Casi. Esa la repasamos al final.',
  ],
  fin: ['¡Lección completada! Te ganaste el descanso.', '¡Turno terminado! Buen trabajo.', '¡Eso sí es cumplir la jornada!'],
  perfecta: ['¡Lección perfecta! Ni una cláusula fuera de lugar.', '¡Cero errores! Eres pura supremacía de la realidad.'],
  sinVidas: ['Se acabaron las vidas por hoy. Vuelven solas con el tiempo.', 'Pausa obligatoria: hasta los mejores tienen colación.'],
  bienvenida: ['¡Hola! Soy Lexi. Hoy firmamos tu primer contrato… de estudio.'],
  rachaEnPeligro: ['¡Tu racha está por vencer! Una lección y la renovamos.'],
  rachaPerdida: ['Tu racha se cortó, pero hoy podemos firmar una nueva.'],
  camino: ['¿Seguimos? Te espera la próxima lección.', 'Cada lección es un ladrillo más. ¡Vamos!', '¿Lista o listo para otro turno?'],
};

export type Momento = keyof typeof FRASES;

export function frase(momento: Momento): string {
  return elegir(FRASES[momento]);
}
