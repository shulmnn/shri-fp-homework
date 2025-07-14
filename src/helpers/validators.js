/**
 * @file Домашка по FP ч. 1
 *
 * Основная задача — написать самому, или найти в FP библиотеках функции anyPass/allPass
 * Эти функции/их аналоги есть и в ramda и в lodash
 *
 * allPass — принимает массив функций-предикатов, и возвращает функцию-предикат, которая
 * вернет true для заданного списка аргументов, если каждый из предоставленных предикатов
 * удовлетворяет этим аргументам (возвращает true)
 *
 * anyPass — то же самое, только удовлетворять значению может единственная функция-предикат из массива.
 *
 * Если какие либо функции написаны руками (без использования библиотек) это не является ошибкой
 */

import {
  pipe,
  values,
  filter,
  equals,
  length,
  allPass,
  anyPass,
  prop,
  and,
  not,
  or,
  gt,
  gte,
} from 'ramda';

// 1. Красная звезда, зеленый квадрат, все остальные белые.
export const validateFieldN1 = ({ star, square, triangle, circle }) => {
  if (triangle !== 'white' || circle !== 'white') {
    return false;
  }

  return star === 'red' && square === 'green';
};

// 2. Как минимум две фигуры зеленые.
export const validateFieldN2 = pipe(
  values,
  filter(equals('green')),
  length,
  (count) => count >= 2
);

// 3. Количество красных фигур равно кол-ву синих.
export const validateFieldN3 = (shapes) => {
  const colors = values(shapes);
  const redCount = filter(equals('red'), colors).length;
  const blueCount = filter(equals('blue'), colors).length;
  return equals(redCount, blueCount);
};

// 4. Синий круг, красная звезда, оранжевый квадрат треугольник любого цвета
export const validateFieldN4 = allPass([
  pipe(prop('circle'), equals('blue')),
  pipe(prop('star'), equals('red')),
  pipe(prop('square'), equals('orange')),
]);

// 5. Три фигуры одного любого цвета кроме белого (четыре фигуры одного цвета – это тоже true).
export const validateFieldN5 = (shapes) => {
  const colors = values(shapes);
  const nonWhiteColors = ['red', 'blue', 'orange', 'green'];

  return nonWhiteColors.some((color) => {
    const colorCount = filter(equals(color), colors).length;
    return colorCount >= 3;
  });
};

// 6. Ровно две зеленые фигуры (одна из зелёных – это треугольник), плюс одна красная. Четвёртая оставшаяся любого доступного цвета, но не нарушающая первые два условия
export const validateFieldN6 = (shapes) => {
  const colors = values(shapes);
  const greenCount = filter(equals('green'), colors).length;
  const redCount = filter(equals('red'), colors).length;

  return greenCount === 2 && redCount === 1 && shapes.triangle === 'green';
};

// 7. Все фигуры оранжевые.
export const validateFieldN7 = pipe(
  values,
  filter(equals('orange')),
  length,
  equals(4)
);

// 8. Не красная и не белая звезда, остальные – любого цвета.
export const validateFieldN8 = pipe(
  prop('star'),
  anyPass([equals('blue'), equals('green'), equals('orange')])
);

// 9. Все фигуры зеленые.
export const validateFieldN9 = pipe(
  values,
  filter(equals('green')),
  length,
  equals(4)
);

// 10. Треугольник и квадрат одного цвета (не белого), остальные – любого цвета
export const validateFieldN10 = (shapes) => {
  const triangleColor = shapes.triangle;
  const squareColor = shapes.square;

  return triangleColor === squareColor && triangleColor !== 'white';
};
