abstract class Component {
  protected parent: Component;

  public setParent(parent: Component): void {
    this.parent = parent;
  }

  public getParent(): Component {
    return this.parent;
  }

  public add(component: Component): void { }
  public remove(component: Component): void { }

  public isComposite(): boolean { return false; }
  public abstract operation(): string;
}

class Leaf extends Component {
  public operation(): string {
    return 'Leaf';
  }
}

class Composite extends Component {
  protected children: Component[] = [];

  public add(component: Component): void {
    this.children.push(component);
    component.setParent(this);
  }

  public remove(component: Component): void {
    const componentIndex = this.children.indexOf(component);
    this.children.splice(componentIndex, 1);
    component.setParent(null);
  }

  public isComposite(): boolean { return true; }

  public operation(): string {
    const results = [];

    for (const child of this.children) {
      results.push(child.operation());
    }

    return `Branch ( ${results.join(' + ')} )`;
  }
}

function clientCode(component: Component) {
  console.log(`result : ${component.operation()}`);
}

function clientCode2(component1: Component, component2: Component) {
  if (component1.isComposite()) {
    component1.add(component2);
  }

  console.log(`[clientCode2] result : ${component1.operation()}`);
}

const driver = () => {
  const simple = new Leaf();
  console.log(`client : I've got a simple component : `);
  clientCode(simple);
  console.log('');

  const tree = new Composite();
  const branch1 = new Composite();
  branch1.add(new Leaf());
  branch1.add(new Leaf());

  const branch2 = new Composite();
  branch2.add(new Leaf());
  tree.add(branch1);
  tree.add(branch2);
  console.log(`client : I've got a composite tree : `);

  clientCode(tree);
  console.log('');

  console.log(`I don't need to check the components classes.`);
  clientCode2(tree, simple)
}

driver();


