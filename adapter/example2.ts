
const driver = () => {
  interface Warrior {
    ATTACK_BASE: number;
    name: string;
    attack(): number;
  }

  class Saiyan implements Warrior {
    public ATTACK_BASE = 100;
    constructor(public name: string) { }

    public attack(): number {
      return Math.random() * this.ATTACK_BASE + this.ATTACK_BASE;
    }
  }

  class Namekian implements Warrior {
    public ATTACK_BASE = 50;
    constructor(public name: string) { }
    public attack(): number {
      return Math.random() * this.ATTACK_BASE + this.ATTACK_BASE;
    }
  }

  class Android {
    public punch(): number {
      return 10;
    }

    public kick(): number {
      return Math.random() * this.punch() + this.punch();
    }
  }

  class AndroidAdapter implements Warrior {
    constructor(private android: Android, public name: string) { }
    public ATTACK_BASE = 50;
    public attack(): number {
      return this.android.kick() + this.android.punch() + this.ATTACK_BASE;
    }
  }

  const App = () => {
    const goku = new Saiyan('goku');
    const vegeta = new Saiyan('vegeta');
    const piccolo = new Namekian('piccolo');
    const C17 = new AndroidAdapter(new Android(), 'C17');

    [goku, vegeta, piccolo, C17].map(p => console.log(`${p.name} - Attack : ${p.attack()}`));
  }

  App();
}

driver();