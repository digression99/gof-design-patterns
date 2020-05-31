export class PersonBuilder {
  private firstName: string;
  private lastName: string;
  private middleName: string;
  private suffix: string;

  constructor() {
    this.firstName = '';
    this.lastName = '';
    this.middleName = '';
    this.suffix = '';
  }

  public withFirstName(firstName: string) {
    this.firstName = firstName;
    return this;
  }

  public withLastName(lastName: string) {
    this.lastName = lastName;
    return this;
  }

  public withMiddleName(middleName: string) {
    this.middleName = middleName;
    return this;
  }

  public withSuffix(suffix: string) {
    this.suffix = suffix;
    return this;
  }

  public createPerson(): Person {
    return new Person(this.firstName, this.middleName, this.lastName, this.suffix);
  }
}

export class Person {
  private firstName: string;
  private lastName: string;
  private middleName: string;
  private suffix: string;

  constructor(firstName: string, middleName: string, lastName: string, suffix: string) {
    this.firstName = firstName;
    this.lastName = lastName;
    this.middleName = middleName;
    this.suffix = suffix;
  }

  printMyName() {
    console.log(`my name is : ${this.firstName} ${this.middleName} ${this.lastName} ${this.suffix}`)
  }
}

export const Client = () => {
  const personBuilder = new PersonBuilder();

  personBuilder
    .withFirstName('Ilsik')
    .withMiddleName('Genius')
    .withLastName('Kim')
    .withSuffix('Jr.')
    .createPerson()
    .printMyName();
}
