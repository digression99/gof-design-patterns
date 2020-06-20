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

  public render({ title }) {
    const htmlTemplate = `<div><span>${title} inner html</span></div>`;
    this.element.innerHTML = htmlTemplate;
  }
}

class PostList {
  el: HTMLElement = null;

  public constructor(el) {
    this.el = el;
  }

  public render({ text, postData }) {
    const htmlTemplate = `
    <div>
      <h1>${text}</h1>
      ${postData.map((p) => `<li>${p.title}</li>`).join('')}
    </div>`;
    this.el.innerHTML = htmlTemplate;
  }
}

const state = {
  header: {
    title: 'This is header text',
  },

  postList1: {
    text: 'This is post list 1',
    postData: [
      { id: 1, title: 'post one' },
      { id: 2, title: 'post two' },
      { id: 3, title: 'post three' },
    ],
  },

  postList2: {
    text: 'This is post list 2',
    postData: [
      { id: 1, title: 'post one' },
      { id: 2, title: 'post two' },
      { id: 3, title: 'post three' },
    ],
  },

  postList3: {
    text: 'This is post list 3',
    postData: [
      { id: 1, title: 'post one' },
      { id: 2, title: 'post two' },
      { id: 3, title: 'post three' },
    ],
  },

  globalTab: {
    text: 'This is global tab',
  },
};

class GlobalTab {
  private static instance: GlobalTab = null;
  private el: HTMLElement = null;

  private constructor() {
    this.el = document.querySelector('#global-tab');
  }

  public static getInstance() {
    if (!GlobalTab.instance) {
      GlobalTab.instance = new GlobalTab();
    }
    return GlobalTab.instance;
  }

  public render({ text }) {
    this.el.innerHTML = `<div><h2>${text}</h2></div>`;
  }
}

const App = () => {
  const header = Header.getInstance();
  const globalTab = GlobalTab.getInstance();

  const postList1 = new PostList(document.querySelector('.post-list-1'));
  const postList2 = new PostList(document.querySelector('.post-list-2'));
  const postList3 = new PostList(document.querySelector('.post-list-3'));

  header.render(state.header);

  postList1.render(state.postList1);
  postList2.render(state.postList2);
  postList3.render(state.postList3);

  globalTab.render(state.globalTab);
};

App();
