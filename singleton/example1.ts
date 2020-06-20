class Singleton {
  private static instance: Singleton = null;

  private constructor() {}

  public static getInstance() {
    if (Singleton.instance === null) {
      Singleton.instance = new Singleton();
    }
    return Singleton.instance;
  }

  public someMethod() {
    return 'some method';
  }
}

const App = () => {
  const singleton = Singleton.getInstance();
  const singleton2 = Singleton.getInstance();

  if (singleton === singleton2) {
    console.log('singleton is same');
  } else {
    console.log('singleton is diff.');
  }

  if (singleton.someMethod === singleton2.someMethod) {
    console.log('someMethod is same');
  } else {
    console.log('someMethod is diff.');
  }
};

App();
