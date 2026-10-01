import { describe, expect, it } from 'vitest';
import { GLOSARIO } from '../content';
import type { TerminoGlosario } from '../content/types';
import { marcarTerminos } from './glosario';
import { REGLAS } from './sesion';

const termino = (t: string, alias?: string[]): TerminoGlosario => ({ termino: t, alias, definicion: `def ${t}`, unidad: 1, revisar: false });
const PRUEBA = [
  termino('Código del Trabajo', ['CT']),
  termino('Contrato a plazo fijo', ['plazo fijo']),
  termino('Finiquito'),
  termino('Feriado anual', ['feriado', 'vacaciones']),
];
const marcados = (texto: string, glosario = PRUEBA) =>
  marcarTerminos(texto, glosario)
    .filter((t) => t.termino)
    .map((t) => `${t.texto}→${t.termino!.termino}`);

describe('glosario', () => {
  it('marca solo la primera aparición de cada término y conserva el texto completo', () => {
    const texto = 'El finiquito se firma al final. Sin finiquito no hay cierre.';
    const trozos = marcarTerminos(texto, PRUEBA);
    expect(trozos.map((t) => t.texto).join('')).toBe(texto);
    expect(marcados(texto)).toEqual(['finiquito→Finiquito']);
  });

  it('prefiere la forma más larga y reconoce alias', () => {
    expect(marcados('Firmó un contrato a plazo fijo.')).toEqual(['contrato a plazo fijo→Contrato a plazo fijo']);
    expect(marcados('Pidió sus vacaciones.')).toEqual(['vacaciones→Feriado anual']);
  });

  it('no marca pedazos de otras palabras', () => {
    expect(marcados('Los feriados del mes')).toEqual([]);
  });

  it('las siglas solo cuentan en mayúsculas', () => {
    expect(marcados('Según el art. 9 del CT.')).toEqual(['CT→Código del Trabajo']);
    expect(marcados('lo dice el ct')).toEqual([]);
  });

  it('funciona con el glosario real del banco', () => {
    expect(GLOSARIO.length).toBeGreaterThan(15);
    expect(marcados('Tu liquidación muestra el sueldo mínimo, las horas extra y la cotización de la AFP.', GLOSARIO)).toEqual([
      'liquidación→Liquidación de sueldo',
      'sueldo mínimo→Sueldo mínimo',
      'horas extra→Horas extra',
      'cotización→Cotización',
      'AFP→AFP',
    ]);
  });

  it('se apaga en las pruebas (examen, checkpoint y legendario) para no dar la respuesta', () => {
    expect(REGLAS.leccion.ayudas).toBe(true);
    expect(REGLAS.practica.ayudas).toBe(true);
    expect(REGLAS.examen.ayudas).toBe(false);
    expect(REGLAS.checkpoint.ayudas).toBe(false);
    expect(REGLAS.legendario.ayudas).toBe(false);
  });
});
