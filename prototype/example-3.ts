function CustomerPrototype(proto) {
  this.proto = proto;

  this.clone = function () {
    const customer = new Customer();
    customer.first = proto.first;
    customer.last = proto.last;
    customer.status = proto.status;
    return customer;
  };
}

function Customer(first, last, status) {
  this.first = first;
  this.last = last;
  this.status = status;

  this.say = function () {
    console.log('name : ', this.first, ' ', this.last, ', status : ', this.status);
  };
}

function run() {
  const proto = new Customer('abc', 'def', 'pending');
  const prototype = new CustomerPrototype(proto);

  const customer = prototype.clone();
  customer.say();
}

run();
