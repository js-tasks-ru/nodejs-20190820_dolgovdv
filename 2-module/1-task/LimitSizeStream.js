const stream = require('stream');
const LimitExceededError = require('./LimitExceededError');

class LimitSizeStream extends stream.Transform {
  constructor(options) {
    super(options);
    this.limit = options.limit; // значение ограничения
    this.sendedBytes = 0; // количество переданных данных
  }

  _transform(chunk, encoding, callback) {
    this.sendedBytes += chunk.length; // суммируем количество переданных данных
    if (this.sendedBytes > this.limit) { // если превышает
      callback(new LimitExceededError(), null); // вызываем об ошибке
    }

    this.push(chunk); // передача дальше данных
    callback();
    // callback(null, chunk); // альтернативная запись передачи дальше данных
  }
}

module.exports = LimitSizeStream;
