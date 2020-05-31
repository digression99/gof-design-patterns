export interface ModalBuilder {
  setWidth(w: Number): ModalBuilder;
  setHeight(h: Number): ModalBuilder;
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

  setWidth(w: Number): ModalBuilder {
    this.instagramModal.setWidth(w);
    return this;
  }

  setHeight(h: Number): ModalBuilder {
    this.instagramModal.setHeight(h);
    return this;
  }

  getModal() {
    return this.instagramModal;
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
    return this.modalBuilder
      .setWidth(100)
      .setHeight(100)
      .getModal();
  }
}

export const Client = () => {
  const modalDirector = new ModalDirector();

  modalDirector.setBuilder(new InstagramModalBuilder());
  modalDirector
    .buildDefaultModal()
    .open();
}
