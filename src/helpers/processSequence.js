/**
 * @file Домашка по FP ч. 2
 *
 * Подсказки:
 * Метод get у инстанса Api – каррированый
 * GET / https://animals.tech/{id}
 *
 * GET / https://api.tech/numbers/base
 * params:
 * – number [Int] – число
 * – from [Int] – из какой системы счисления
 * – to [Int] – в какую систему счисления
 *
 * Иногда промисы от API будут приходить в состояние rejected, (прямо как и API в реальной жизни)
 * Ответ будет приходить в поле {result}
 */
import Api from '../tools/api';

const api = new Api();

const processSequence = ({ value, writeLog, handleSuccess, handleError }) => {
  writeLog(value);

  const validateInput = (inputValue) => {
    if (inputValue.length < 3 || inputValue.length > 9) {
      return Promise.reject('ValidationError');
    }

    const numberRegex = /^[0-9]+\.?[0-9]*$/;
    if (!numberRegex.test(inputValue)) {
      return Promise.reject('ValidationError');
    }

    const number = parseFloat(inputValue);
    if (number <= 0) {
      return Promise.reject('ValidationError');
    }

    return Promise.resolve(inputValue);
  };

  validateInput(value)
    .then((inputValue) => {
      const number = parseFloat(inputValue);
      const rounded = Math.round(number);
      writeLog(rounded);
      return rounded;
    })
    .then((number) => {
      return api.get('https://api.tech/numbers/base', {
        number: number.toString(),
        from: 10,
        to: 2,
      });
    })
    .then(({ result }) => {
      writeLog(result);
      return result;
    })
    .then((binaryString) => {
      const length = binaryString.length;
      writeLog(length);
      return length;
    })
    .then((length) => {
      const squared = length * length;
      writeLog(squared);
      return squared;
    })
    .then((squared) => {
      const remainder = squared % 3;
      writeLog(remainder);
      return remainder;
    })
    .then((remainder) => {
      return api.get(`https://animals.tech/${remainder}`, {});
    })
    .then(({ result }) => {
      handleSuccess(result);
    })
    .catch((error) => {
      handleError(error);
    });
};

export default processSequence;
