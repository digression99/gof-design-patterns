interface Button {
  handleClick(e): void;
  submitInput(input: Input): void;
}

interface Input {
  value: string;

  handleChange(e): void;
}

interface AbstractThemeFactory {
  createButton(): Button;
  createInput(v: string): Input;
}

class NotionThemeFactory implements AbstractThemeFactory {
  public createButton(): Button {
    return new NotionButton();
  }

  public createInput(s: string): Input {
    return new NotionInput(s);
  }
}

class NotionButton implements Button {
  public handleClick(e): void {
    console.log('Notion button handle click!');
  }

  public submitInput(input: Input) {
    const formData = input.value;
    console.log('Notion input form submit : ', formData);
  }
}

class NotionInput implements Input {
  value: string;

  constructor(value: string) {
    this.value = value;
  }

  public handleChange(e): void {
    console.log('Notion input handle change!');
  }
}

class InstagramThemeFactory implements AbstractThemeFactory {
  public createButton(): Button {
    return new InstagramButton();
  }

  public createInput(s: string): Input {
    return new InstagramInput(s);
  }
}

class InstagramButton implements Button {
  public handleClick(e): void {
    console.log('Instagram button handle click!');
  }

  public submitInput(input: Input) {
    const formData = input.value;
    console.log('Instagram input form submit : ', formData);
  }
}

class InstagramInput implements Input {
  value: string;

  constructor(value: string) {
    this.value = value;
  }

  public handleChange(e): void {
    console.log('Instagram input handle change!');
  }
}

const App = (factory: AbstractThemeFactory) => {
  const button = factory.createButton();
  const input = factory.createInput('INPUT VALUE');

  button.handleClick('click');
  input.handleChange('change');

  button.submitInput(input);
};

App(new NotionThemeFactory());
App(new InstagramThemeFactory());
