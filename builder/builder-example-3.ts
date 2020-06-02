// functional builder

const Product = (state = { parts: [] }) => ({
  map: (f) => Product(f(state)),
  addPart: (part) => (state) => ({ ...state, parts: state.parts.concat(part) }),
  listParts: () => `product parts : ${state.parts.join(', ')}\n`,
});

const Builder = (product) => ({
  map: (f) => Builder(f(product)),
  getProduct: () => product.listParts(),
  buildPart: (part) => Builder(product).map((p) => p.map(p.addPart(part))),
});

const Director = (builder) => ({
  buildDefaultProduct: () =>
    builder.buildPart('part1').buildPart('part2').buildPart('part3').getProduct(),
});

const Client = () => {
  const product = Product();
  const builder = Builder(product);
  const director = Director(builder);
  console.log(director.buildDefaultProduct());
};

Client();
