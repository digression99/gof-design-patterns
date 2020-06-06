abstract class Dialog {
  public abstract createButton(): Button;
  public abstract createInput(): Input;
  public render(): string {
    const button = this.createButton();
    const input = this.createInput();

    return `
    <div>
      ${button.render()}
      ${input.render()}
    </div>`;
  }

  public handleButtonClick(): void {
    const button = this.createButton();
    button.onClick();
  }

  public handleInputChange(): void {
    const input = this.createInput();
    input.onChange();
  }
}

interface Input {
  onChange(): void;
  render(): string;
}

class NotionInput implements Input {
  public onChange(): void {
    console.log('Notion button on change.');
  }

  public render(): string {
    return `<input class="notion-button">`;
  }
}

class InstagramInput implements Input {
  public onChange(): void {
    console.log('Instagram button on change.');
  }

  public render(): string {
    return `<input class="instagram-button">`;
  }
}

interface Button {
  onClick(): void;
  render(): string;
}

class NotionButton implements Button {
  public render(): string {
    return `<button>Notion Button</button>`;
  }

  public onClick(): void {
    console.log('Notion button clicked.');
  }
}

class InstagramButton implements Button {
  public render(): string {
    return `<button>Instagram Button</button>`;
  }

  public onClick(): void {
    console.log('Instagram button clicked.');
  }
}

class NotionDialog extends Dialog {
  public createButton(): Button {
    return new NotionButton();
  }

  public createInput(): Input {
    return new NotionInput();
  }
}

class InstagramDialog extends Dialog {
  public createButton(): Button {
    return new InstagramButton();
  }

  public createInput(): Input {
    return new InstagramInput();
  }
}

const App = (dialog: Dialog) => {
  console.log('rendered : ', dialog.render());
  dialog.handleButtonClick();
  dialog.handleInputChange();
};

App(new NotionDialog());
App(new InstagramDialog());
