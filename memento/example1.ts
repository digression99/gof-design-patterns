class Originator {
  private state: string;

  constructor(state: string) {
    this.state = state;
    console.log(`Originator : my initial state is : ${state}`);
  }

  public doSomething(): void {
    console.log('Originator : Im doing something important.');
    this.state = this.generateRandomString(30);
    console.log(`Originator : my state has changed to : ${this.state}`);
  }

  private generateRandomString(length: number = 10): string {
    const charSet = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';

    return Array
      .apply(null, { length  })
      .map(() => charSet.charAt(Math.floor(Math.random() * charSet.length)))
      .join('');
  }

  public save(): Memento {
    return new ConcreteMemento(this.state);
  }

  public restore(memento: Memento): void {
    this.state = memento.getState();
    console.log(`Originator : my state has changed to : ${this.state}`);
  }
}

interface Memento {
  getState(): string;
  getName(): string;
  getDate(): string;
}

class ConcreteMemento implements Memento {
  private state : string;
  private date: string;

  constructor(state: string) {
    this.state = state;
    this.date = new Date().toISOString().slice(0, 19).replace('T', ' ');
  }

  public getState(): string {
    return this.state;
  }

  public getName(): string {
    return `${this.date} / (${this.state.substr(0, 9)}...)`;
  }

  public getDate(): string {
    return this.date;
  }
}

class Caretaker {
  private mementos : Memento[] = [];
  private originator: Originator;

  constructor(originator: Originator) {
    this.originator = originator;
  }

  public backup(): void {
    console.log(`Caretaker: saving originators state ...`);
    this.mementos.push(this.originator.save());
  }

  public undo(): void {
    if (!this.mementos.length) {
      return;
    }

    const memento = this.mementos.pop();
    console.log(`Caretaker : Restoring state to : ${memento.getName()}`);
    this.originator.restore(memento);
  }

  public showHistory(): void {
    console.log(`Caretaker : Heres the list of mementos`);
    for (const memento of this.mementos) {
      console.log(memento.getName());
    }
  }
}

const driver = () => {
  const originator = new Originator('Super-duper-super-puper-super.');
  const caretaker = new Caretaker(originator);

  caretaker.backup();
  originator.doSomething();

  caretaker.backup();
  originator.doSomething();

  caretaker.backup();
  originator.doSomething();

  caretaker.backup();
  originator.doSomething();

  console.log('');
  caretaker.showHistory();

  console.log('Now roll back!');
  caretaker.undo()

  console.log('Once more!');
  caretaker.undo()
}

driver();
