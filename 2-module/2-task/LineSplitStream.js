const stream = require('stream');
const os = require('os');

class LineSplitStream extends stream.Transform {
  constructor(options) {
    super(options);
    this.lines = null;
  }

  _transform(chunk, encoding, callback) {
    const count = String(chunk).indexOf(os.EOL); // проверка на os.EOL
    const line = String(chunk).split(os.EOL);
    if (this.lines) {
      line[0] = this.lines + line[0];
    }
    if (line[line.length - 1]) { // проверка на конечный элемент
      this.lines = line.pop(); // записываем поледний элемент в хранилище
    }
    console.log('lines2 = ', this.lines, 'line = ', line);

    if (count === -1) { // если os.EOL нет в строке
      console.log('lines1 = ', this.lines, 'line = ', line);
      callback(); // данные убраны в хранилище, получаем новые данные
    }
    // console.log('line = ', line, ' count = ', count);

    if (count !== -1) { // если os.EOL есть в строке
      line.forEach( (item, i) => {
        console.log('item = ', item);
        this.push(item); // отправляем все куски между EOL
      });
      callback();
    }
  }

  _flush(callback) { // непонятно как использовать
    console.log('lines = ', this.lines);
    this.push(this.lines); // надо сохранить значения из push?
    callback();
  }
}
module.exports = LineSplitStream;
