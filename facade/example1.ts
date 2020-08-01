class Facade {
  protected subsystem1: Subsystem1;
  protected subsystem2: Subsystem2;

  constructor(subsystem1: Subsystem1 = null, subsystem2: Subsystem2 = null) {
    this.subsystem1 = subsystem1 || new Subsystem1();
    this.subsystem2 = subsystem2 || new Subsystem2();
  }

  public operation(): string {
    const result = "Face initializes subsystems : \n";

    return result
      .concat(this.subsystem1.operation1())
      .concat(this.subsystem2.operation1())
      .concat("Facade orders subsystems to perform the action:\n")
      .concat(this.subsystem1.operationN())
      .concat(this.subsystem2.operationZ());
  }
}

class Subsystem1 {
  public operation1(): string {
    return `Subsystem1: READY! \n`;
  }
  public operationN(): string {
    return `Subsystem1: GO! \n`;
  }
}

class Subsystem2 {
  public operation1(): string {
    return `Subsystem2: GET READY! \n`;
  }
  public operationZ(): string {
    return `Subsystem2: FIRE! \n`;
  }
}

function clientCode(facade: Facade) {
  console.log(facade.operation());
}

const sub1 = new Subsystem1();
const sub2 = new Subsystem2();
const facade = new Facade(sub1, sub2);

clientCode(facade);
