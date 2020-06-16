class Prototype {
  public primitive: any;
  public component: object;
  public circularReference: ComponentWithBackReference;

  public clone(): this {
    const clone = Object.create(this);
    clone.component = Object.create(this.component);
    clone.circularReference = {
      ...this.circularReference,
      prototype: { ...this },
    };

    return clone;
  }
}

class ComponentWithBackReference {
  public prototype;
  constructor(prototype: Prototype) {
    this.prototype = prototype;
  }
}

function clientCode() {
  const p1 = new Prototype();
  p1.primitive = 246;
  p1.component = new Date();
  p1.circularReference = new ComponentWithBackReference(p1);

  const p2 = p1.clone();

  if (p1.primitive === p2.primitive) {
    console.log('primitive copied.');
  } else {
    console.log('primitive not copied.');
  }

  if (p1.component === p2.component) {
    console.log('component not copied.');
  } else {
    console.log('component copied.');
  }

  if (p1.circularReference === p2.circularReference) {
    console.log('circularReference not copied.');
  } else {
    console.log('circularReference copied.');
  }

  if (p1.circularReference.prototype === p2.circularReference.prototype) {
    console.log('back ref is linked to original.');
  } else {
    console.log('back ref is linked to clone.');
  }
}

clientCode();
