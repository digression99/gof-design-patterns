function Movie(title) {
  this.title = title;
}

const harryPotter = new Movie('Harry Potter');
const rushHour2 = new Movie('Rush Hour 2');
const fastAndFurious = new Movie('Fast And Furious');

console.log(harryPotter.constructor.name);
console.log(rushHour2.constructor.name);
console.log(fastAndFurious.constructor.name);

const Warrior = function (name) {
  this.name = name;
  this.hp = 100;

  // this.bash = function (target) {
  //   target.hp -= 15;
  // };

  // this.omniSlash = function (target) {
  //   if (target.hp < 50) return;
  //   target.hp -= 50;
  // };
};

// Warrior.prototype.bash = function (target) {
//   target.hp -= 15;
// };

// Warrior.prototype.omniSlash = function (target) {
//   if (target.hp < 50) return;
//   target.hp -= 50;
// };

Warrior.prototype = {
  bash(target) {
    target.hp -= 15;
  },
  omniSlash(target) {
    if (target.hp < 50) return;
    target.hp -= 50;
  },
};

const sam = new Warrior('Sam');
const lenardo = new Warrior('Lenardo');

sam.bash(lenardo);

console.log(sam.bash.displayName);
console.log(sam.bash.name);
console.log(sam.bash.length);
console.log(sam.bash.toString());
console.log(sam.bash === lenardo.bash);

const Obj = {
  method() {
    console.log('method called');
  },
};

const obj = Object.assign({}, Obj);
const obj2 = { ...Obj };

console.log('Obj : ', Obj);
console.log('obj : ', obj);
console.log('obj : ', obj2);
console.log(Obj.method === obj.method);
console.log(Obj.method === obj2.method);
