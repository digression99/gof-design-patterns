export interface ModalBuilder {
  setWidth(w: number): ModalBuilder;
  setHeight(h: number): ModalBuilder;
  getModal(): Modal;
}

export class InstagramModalBuilder implements ModalBuilder {
  private instagramModal: InstagramModal;

  constructor() {
    this.reset();
  }

  public reset() {
    this.instagramModal = new InstagramModal();
  }

  setWidth(w: number): ModalBuilder {
    this.instagramModal.setWidth(w);
    return this;
  }

  setHeight(h: number): ModalBuilder {
    this.instagramModal.setHeight(h);
    return this;
  }

  getModal(): Modal {
    return this.instagramModal;
  }
}

class NotionModal implements Modal {
  width: number;
  height: number;

  setWidth(w: number): void {
    this.width = w;
  }

  setHeight(h: number): void {
    this.height = h;
  }

  open(): void {
    console.log(`Notion modal opened with width : ${this.width}, height : ${this.height}`);
  }
}

export class NotionModalBuilder implements ModalBuilder {
  private notionModal: NotionModal;

  constructor() {
    this.reset();
  }

  public reset(): void {
    this.notionModal = new NotionModal();
  }

  setWidth(w: number): ModalBuilder {
    this.notionModal.setWidth(w);
    return this;
  }

  setHeight(h: number): ModalBuilder {
    this.notionModal.setHeight(h);
    return this;
  }

  getModal(): Modal {
    return this.notionModal;
  }
}

interface Modal {
  open();
}

export class InstagramModal implements Modal {
  width: number;
  height: number;
  readonly name: string;

  setWidth(w) {
    this.width = w;
  }

  setHeight(h) {
    this.height = h;
  }

  open() {
    console.log(`Instagram modal opened with width : ${this.width}, height : ${this.height}`);
  }
}

class ModalDirector {
  private modalBuilder: ModalBuilder;

  public setBuilder(builder: ModalBuilder) {
    this.modalBuilder = builder;
  }

  public buildDefaultModal() {
    return this.modalBuilder.setWidth(100).setHeight(100).getModal();
  }
}

export const Client = () => {
  const modalDirector = new ModalDirector();

  modalDirector.setBuilder(new InstagramModalBuilder());
  modalDirector.buildDefaultModal().open();
};
