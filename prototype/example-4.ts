const myCar = {
  name: 'Ford escort',

  drive: function () {
    console.log(`I'm driving!`);
  },

  panic: function () {
    console.log(`I'm panicked.`);
  },
};

const yourCar = Object.create(myCar);
console.log(yourCar);
console.log(yourCar.name);
yourCar.drive();
console.log(yourCar.prototype === myCar.prototype);
console.log(Object.getPrototypeOf(yourCar) === myCar);
console.log(yourCar.prototype === myCar);
console.log(Object.getPrototypeOf(myCar));

const f = function () {
  this.a = 1;
  this.b = 2;
};

const o = new f();
console.log('o : ', o);

f.prototype.b = 3;
f.prototype.c = 4;

console.log('------------------');
console.log(o.b);
console.log(o.c);
