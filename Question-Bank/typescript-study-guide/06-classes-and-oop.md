# Module 06: Classes & OOP

This module covers Object-Oriented Programming (OOP) in TypeScript. You will master classes, access modifiers, parameter properties, inheritance, abstract classes, interface contracts, TypeScript `private` versus ECMAScript `#private`, SOLID principles, and architectural patterns like Singleton and Dependency Injection.

---

## 1. How do classes work in TypeScript, and how do you define fields, constructors, and methods?

### Answer
Classes in TypeScript provide an object-oriented blueprint for creating objects, adding static type checking to fields, constructor parameters, and method signatures. Fields must either be given an initial default value, marked as optional, or explicitly assigned inside the constructor body (enforced by the `strictPropertyInitialization` compiler setting). Methods in a class can specify parameter types and return types just like standalone functions.

### Code Example
```ts
class BankAccount {
  accountNumber: string;
  balance: number;

  constructor(accountNumber: string, initialBalance: number = 0) {
    this.accountNumber = accountNumber;
    this.balance = initialBalance;
  }

  deposit(amount: number): number {
    this.balance += amount;
    return this.balance;
  }
}

const account = new BankAccount("AC-12345", 100);
console.log(`New Balance: $${account.deposit(50)}`);
// Output: New Balance: $150
```

### Common Mistake / Tip
> **Tip:** If a field is initialized by a framework or dependency injection after construction, you can use the definite assignment assertion operator (e.g., `accountNumber!: string;`) to satisfy TypeScript.

---

## 2. What are access modifiers (`public`, `private`, `protected`) in TypeScript classes?

### Answer
Access modifiers control the visibility and accessibility of class members (properties and methods) from outside the class. `public` (the default) allows access from anywhere; `protected` allows access from within the containing class and any derived subclasses; and `private` restricts access exclusively to within the declaring class itself. These modifiers are enforced strictly at compile time by the TypeScript compiler and carry zero runtime performance cost.

### Code Example
```ts
class Vehicle {
  public make: string;
  protected speed: number = 0;
  private vin: string = "SECRET-VIN-99";

  constructor(make: string) {
    this.make = make;
  }
}

class SportsCar extends Vehicle {
  accelerate(): void {
    this.speed += 20; // Allowed: protected member accessible in subclass
    // console.log(this.vin); // Error: Property 'vin' is private to Vehicle
  }
}

const car = new SportsCar("Porsche");
console.log(`Make: ${car.make}`);
// Output: Make: Porsche
```

### Common Mistake / Tip
> **Common Mistake:** TypeScript `private` is purely compile-time; at runtime, the property is still accessible on the plain JavaScript object (e.g., via `(car as any).vin`).

---

## 3. What is an Abstract Class, and how do abstract methods differ from concrete methods?

### Answer
An abstract class (declared with the `abstract` keyword) is a base class that cannot be instantiated directly with `new`; it exists solely to be extended by derived subclasses. Inside an abstract class, an abstract method defines only a method signature without an implementation, forcing all non-abstract subclasses to implement it. A concrete method inside an abstract class provides a full implementation that derived subclasses inherit directly or optionally override.

### Code Example
```ts
abstract class PaymentProcessor {
  // Concrete method shared by all subclasses
  logTransaction(amount: number): void {
    console.log(`Auditing transaction of $${amount}`);
  }

  // Abstract method: must be implemented by subclasses
  abstract processPayment(amount: number): boolean;
}

class StripeProcessor extends PaymentProcessor {
  processPayment(amount: number): boolean {
    this.logTransaction(amount);
    return true; // Stripe processing logic
  }
}

const stripe = new StripeProcessor();
stripe.processPayment(75);
// Output: Auditing transaction of $75
```

### Common Mistake / Tip
> **Tip:** Use abstract classes when multiple classes share common boilerplate methods but require different implementations for specific core logic.

---

## 4. How do the `implements` keyword, `static` members, and parameter properties work in TypeScript classes?

### Answer
The `implements` keyword forces a class to conform to an interface's structure, ensuring the class implements every required property and method. `static` members belong to the class constructor itself rather than to individual object instances, accessed directly via `ClassName.member`. Parameter properties are a powerful TypeScript syntactic shortcut: prefixing a constructor parameter with an access modifier (such as `public`, `private`, or `readonly`) automatically declares and initializes that property on the class in a single line.

### Code Example
```ts
interface Identifiable {
  id: string;
}

class UserSession implements Identifiable {
  static activeSessionsCount: number = 0;

  // Parameter property: automatically declares and assigns this.id and this.username
  constructor(public readonly id: string, public username: string) {
    UserSession.activeSessionsCount++;
  }
}

const session = new UserSession("sess-1", "alice");
console.log(`User: ${session.username}, Active: ${UserSession.activeSessionsCount}`);
// Output: User: alice, Active: 1
```

### Common Mistake / Tip
> **Tip:** Parameter properties (e.g., `constructor(public name: string)`) eliminate repetitive boilerplate like `this.name = name`.

---

## 5. What is the difference between TypeScript's `private` modifier and ECMAScript private fields (`#field`)?

### Answer
TypeScript's `private` keyword is a compile-time-only soft privacy check: it stops callers from accessing the member in TypeScript code, but once compiled to JavaScript, the property becomes a regular property that can be inspected or accessed. ECMAScript private fields (syntax `#propertyName`) are a native JavaScript feature providing hard runtime privacy backed by the JavaScript engine. Properties declared with `#` cannot be accessed, inspected, or overwritten outside the class body, even through type assertions or `Object.keys()`.

### Code Example
```ts
class SecurityVault {
  private softKey: string = "ts-private-key";
  #hardKey: string = "native-js-secret";

  getSecret(): string {
    return this.#hardKey;
  }
}

const vault = new SecurityVault();
// At runtime, (vault as any).softKey is accessible:
console.log("Soft key exists:", (vault as any).softKey !== undefined);
// Output: Soft key exists: true

// vault.#hardKey // SyntaxError: Private field '#hardKey' must be declared in an enclosing class
```

### Common Mistake / Tip
> **Tip:** Use native `#field` syntax when you need true runtime encapsulation, such as for sensitive tokens or library internals that consumers must not touch.

---

## 6. How does class inheritance work in TypeScript using `extends` and `super()`?

### Answer
Class inheritance allows a derived class (child) to inherit properties and methods from a base class (parent) using the `extends` keyword. If the child class defines its own constructor, it must call `super()` before accessing `this`, passing any required arguments up to the parent constructor. Child classes can also override parent methods and invoke the parent's original version using `super.methodName()`.

### Code Example
```ts
class Animal {
  constructor(public name: string) {}

  makeSound(): void {
    console.log(`${this.name} makes a generic sound.`);
  }
}

class Dog extends Animal {
  constructor(name: string, public breed: string) {
    super(name); // Call base class constructor
  }

  override makeSound(): void {
    console.log(`${this.name} (${this.breed}) barks!`);
  }
}

const dog = new Dog("Buddy", "Golden Retriever");
dog.makeSound();
// Output: Buddy (Golden Retriever) barks!
```

### Common Mistake / Tip
> **Tip:** Use the `override` keyword when overriding a parent method; with the `"noImplicitOverride": true` compiler flag, TypeScript ensures the method actually exists on the parent class.

---

## 7. What are the SOLID principles and how are they applied in TypeScript OOP?

### Answer
SOLID represents five design principles for maintainable, scalable object-oriented software: **S**ingle Responsibility (a class should have one reason to change), **O**pen/Closed (open for extension, closed for modification), **L**iskov Substitution (subtypes must be substitutable for base types), **I**nterface Segregation (prefer multiple small, focused interfaces over one large interface), and **D**ependency Inversion (depend on abstractions/interfaces, not concrete implementations). In TypeScript, interfaces and abstract classes make it easy to decouple code according to these principles.

### Code Example
```ts
// Interface Segregation & Dependency Inversion in TypeScript:
interface MessageService {
  send(recipient: string, message: string): void;
}

class EmailService implements MessageService {
  send(recipient: string, message: string): void {
    console.log(`Email to ${recipient}: ${message}`);
  }
}

// High-level module depends on abstraction (MessageService), not concrete EmailService
class NotificationManager {
  constructor(private service: MessageService) {}

  notify(user: string, note: string): void {
    this.service.send(user, note);
  }
}

const notifier = new NotificationManager(new EmailService());
notifier.notify("user@test.com", "Welcome!");
// Output: Email to user@test.com: Welcome!
```

### Common Mistake / Tip
> **Tip:** Applying the Interface Segregation Principle keeps interfaces small and easy to mock during unit testing.

---

## 8. How do you implement the Singleton Design Pattern in TypeScript?

### Answer
The Singleton pattern ensures that a class has only one single instance throughout the application lifecycle and provides a global access point to it. You implement it in TypeScript by making the class constructor `private` (preventing callers from running `new ClassName()`) and storing the single instance in a `private static` field. Callers retrieve the instance through a `public static getInstance()` method that lazily creates the instance on first access.

### Code Example
```ts
class DatabaseConnection {
  private static instance: DatabaseConnection | null = null;

  // Private constructor prevents direct instantiation with 'new'
  private constructor(public connectionString: string) {}

  public static getInstance(): DatabaseConnection {
    if (!DatabaseConnection.instance) {
      DatabaseConnection.instance = new DatabaseConnection("postgres://localhost:5432/app");
    }
    return DatabaseConnection.instance;
  }
}

const db1 = DatabaseConnection.getInstance();
const db2 = DatabaseConnection.getInstance();
console.log(`Same instance: ${db1 === db2}`);
// Output: Same instance: true
```

### Common Mistake / Tip
> **Tip:** In modern TypeScript/JavaScript, a simple exported object or module-level constant often serves as a cleaner, native alternative to class-based Singletons.

---

## 9. What is Dependency Injection (DI) and how is it implemented in TypeScript?

### Answer
Dependency Injection is a design pattern where a class receives its dependencies (such as services, database clients, or loggers) from an external provider rather than creating them directly inside its constructor using `new`. You implement DI in TypeScript by defining dependencies as interfaces and accepting them as constructor parameter properties. This decouples the class from specific implementations, making code modular, testable, and easy to mock.

### Code Example
```ts
interface Logger {
  log(message: string): void;
}

class ConsoleLogger implements Logger {
  log(message: string): void {
    console.log(`[LOG]: ${message}`);
  }
}

class OrderProcessor {
  // Logger dependency is injected via constructor
  constructor(private logger: Logger) {}

  processOrder(orderId: number): void {
    this.logger.log(`Processing order #${orderId}`);
  }
}

const processor = new OrderProcessor(new ConsoleLogger());
processor.processOrder(1042);
// Output: [LOG]: Processing order #1042
```

### Common Mistake / Tip
> **Tip:** In unit tests, you can inject a mock logger (`{ log: () => {} }`) without having to spin up any real logging infrastructure.
