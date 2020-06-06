abstract class Creator {
  public abstract factoryMethod(): Product;
  public someOperation(): string {
    const product = this.factoryMethod();
    return `Creator : The same creator's code has just worked with ${product.operation()}`;
  }
}

class ConcreteCreator1 extends Creator {
  public factoryMethod(): Product {
    return new ConcreteProduct1();
  }
}

class ConcreteCreator2 extends Creator {
  public factoryMethod(): Product {
    return new ConcreteProduct2();
  }
}

interface Product {
  operation(): string;
}

class ConcreteProduct1 implements Product {
  public operation(): string {
    return `{ result of the concrete product 1}`;
  }
}

class ConcreteProduct2 implements Product {
  public operation(): string {
    return `{ result of the concrete product 2}`;
  }
}

function clientCode(creator: Creator) {
  console.log(`Client : I'm not awaore of the creator's class, but it still works.`);
  console.log(creator.someOperation());
}

console.log('App launched with the concrete creator 1');
clientCode(new ConcreteCreator1());

console.log('App launched with the concrete creator 2');
clientCode(new ConcreteCreator2());
