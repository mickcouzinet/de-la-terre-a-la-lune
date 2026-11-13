import { describe, expect, test } from 'vitest';
import { couperLigne, dateFr, duree, nombre } from './format.js';
import { messageErreur } from '../services/api.js';

describe('nombre', () => {
  test('sépare les milliers à la française', () => {
    expect(nombre(27580)).toBe('27 580');
  });

  test('garde le bon nombre de décimales', () => {
    expect(nombre(1.4321, 1)).toBe('1,4');
  });
});

describe('duree', () => {
  test('convertit des heures en heures et minutes', () => {
    expect(duree(13.94)).toBe('13 h 56 min');
  });

  test('ajoute un zéro devant les minutes', () => {
    expect(duree(2.1)).toBe('2 h 06 min');
  });
});

describe('dateFr', () => {
  test('écrit la date en toutes lettres', () => {
    expect(dateFr('2026-11-12')).toBe('12 novembre 2026');
  });
});

describe('couperLigne', () => {
  test('coupe l\'orbite quand elle traverse la ligne de changement de date', () => {
    const points = [[10, 170], [12, 178], [14, -175], [16, -168]];
    expect(couperLigne(points)).toEqual([[[10, 170], [12, 178]], [[14, -175], [16, -168]]]);
  });

  test('garde un seul morceau sinon', () => {
    const points = [[0, 10], [5, 30], [10, 50]];
    expect(couperLigne(points)).toEqual([points]);
  });
});

describe('messageErreur', () => {
  test('explique le quota de la NASA', () => {
    const err = new Error('erreur 429');
    err.status = 429;
    expect(messageErreur(err)).toContain('quota');
  });

  test('renvoie le message sinon', () => {
    expect(messageErreur(new Error('erreur 500'))).toBe('erreur 500');
  });
});
