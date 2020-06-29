class Target {
  public request(): string {
    return 'Target : The default target\'s behavior.';
  }
}

class Adaptee {
  public specificRequest(): string {
    return 'Special behavior of the adaptee.'.split('').reverse().join('');
  }
}

class Adapter extends Target {
  private adaptee: Adaptee;

  constructor(adaptee: Adaptee) {
    super();
    this.adaptee = adaptee;
  }

  public request(): string {
    const result = this.adaptee.specificRequest().split('').reverse().join('');
    return `Adapter : (translated) ${result}`;
  }
}

function clientCode(target: Target) {
  console.log(target.request());
}

console.log('client : I can work just find with Target objects : ');
const target = new Target();
clientCode(target);

console.log('');

const adaptee = new Adaptee();
console.log('client : the adaptee class has a weird interface that I don\'t understand it. ');
console.log(`Adaptee : ${adaptee.specificRequest()}`);
console.log('');

console.log('client : But I can work with it via the adapter : ');
const adapter = new Adapter(adaptee);
clientCode(adapter);
