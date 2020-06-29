
const driver = () => {
  interface PureRace {
    genki(): number;
  }

  class Human {
    constructor(public name: string) { }

    public sharedPower(): number {
      return 10;
    }
  }

  class Namekian {
    constructor(public name: string) { }

    public getPower(): number {
      return Math.random() * 20 + 20;
    }
  }

  class Saiyan {
    constructor(public name: string) { }

    myPowerPart1(): number {
      return Math.random() * 100 + 100;
    }

    myPowerPart2(): number {
      return Math.random() * 1000 + 500;
    }
  }

  class HumanAdapter implements PureRace {
    constructor(private human: Human) { }
    public genki(): number {
      return this.human.sharedPower();
    }
  }

  class NamekianAdapter implements PureRace {
    constructor(private namekian: Namekian) { }
    public genki(): number {
      return this.namekian.getPower();
    }
  }

  class SaiyanAdapter implements PureRace {
    constructor(private saiyan: Saiyan) { }
    public genki(): number {
      return this.saiyan.myPowerPart1() + this.saiyan.myPowerPart2();
    }
  }

  const App = () => {
    const res = [
      new SaiyanAdapter(new Saiyan('gohan')),
      new SaiyanAdapter(new Saiyan('vegeta')),
      new NamekianAdapter(new Namekian('piccolo')),
      new HumanAdapter(new Human('krilin')),
    ]
      .reduce((power: number, pureRace: PureRace) => power + pureRace.genki(), 0);

    console.log('everybody attack : ', res);
  }

  App();
}

driver();