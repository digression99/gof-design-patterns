class Header {
  private static instance: Header = null;
  private element: HTMLElement = null;

  private constructor() {
    this.element = document.querySelector('#header');
  }

  public static getInstance() {
    if (Header.instance === null) {
      Header.instance = new Header();
    }

    return Header.instance;
  }

  public render() {
    this.element.innerText = 'header rendered';
  }
}

class PostList {
  el: HTMLElement = null;

  public constructor(el) {
    this.el = el;
  }

  public render({ text }) {
    this.el.innerText = text;
  }
}

const App = () => {
  const header = Header.getInstance();

  const postList1 = new PostList(document.querySelector('.post-list-1'));
  const postList2 = new PostList(document.querySelector('.post-list-2'));
  const postList3 = new PostList(document.querySelector('.post-list-3'));

  header.render();

  postList1.render({ text: 'This is post list 1' });
  postList2.render({ text: 'This is post list 2' });
  postList3.render({ text: 'This is post list 3' });
};

App();
