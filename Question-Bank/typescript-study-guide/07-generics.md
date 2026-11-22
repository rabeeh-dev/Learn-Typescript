# Module 07: Generics

This module explores Generics—TypeScript's tool for creating reusable, type-safe components that work over a variety of types rather than a single one. You will learn how to write generic functions, interfaces, classes, type constraints with `extends`, default generic parameters, and `keyof` lookup constraints.

---

## 1. What are Generics and how do Generic Functions work?

### Answer
Generics allow you to write reusable code that can operate on different data types while preserving full type safety and eliminating code duplication. Instead of locking a function into a specific type like `number` or resorting to `any` (which loses all safety), you define a type parameter placeholder (traditionally `<T>`). When the function is called, TypeScript captures the exact argument type passed and uses it as the return type.

### Code Example
```ts
// Generic identity function capturing type T
function identity<T>(arg: T): T {
  return arg;
}

// Inferred automatically:
const strVal = identity("TypeScript"); // type is string
const numVal = identity(100);          // type is number

console.log(`String: ${strVal}, Number: ${numVal}`);
// Output: String: TypeScript, Number: 100
```

### Common Mistake / Tip
> **Tip:** You rarely need to specify the type manually like `identity<string>("hello")`; TypeScript's type argument inference determines `T` automatically from the arguments you provide.

---

## 2. How do Generic Interfaces and Generic Classes work?

### Answer
Just like functions, interfaces and classes can declare one or more generic type parameters to model reusable data containers. A generic interface describes the shape of a generic object (such as an API response wrapper `{ data: T; status: number }`), while a generic class defines fields and methods that operate over the parameter `T`. When instantiating the class or typing the object, you supply the concrete type.

### Code Example
```ts
// Generic Interface for standardized API envelopes
interface ApiResponse<T> {
  status: number;
  data: T;
}

// Generic Class: a type-safe stack
class Stack<T> {
  private items: T[] = [];

  push(item: T): void {
    this.items.push(item);
  }

  pop(): T | undefined {
    return this.items.pop();
  }
}

const numberStack = new Stack<number>();
numberStack.push(10);
numberStack.push(20);
console.log(`Popped: ${numberStack.pop()}`);
// Output: Popped: 20
```

### Common Mistake / Tip
> **Common Mistake:** Static members of a generic class cannot reference the class's type parameter `T` because static members belong to the constructor, not instances.

---

## 3. What are Generic Constraints (`extends`) and Generic Defaults?

### Answer
By default, a generic type parameter `T` can be absolutely anything. A Generic Constraint uses the `extends` keyword (such as `<T extends { length: number }>`) to restrict `T` so it must have specific required properties, allowing you to access those properties safely inside the generic code. Generic Defaults allow you to provide a fallback type (e.g., `<T = string>`) that TypeScript uses if no type argument is provided or inferred.

### Code Example
```ts
interface HasLength {
  length: number;
}

// Constrain T: must possess a numeric .length property
function logLength<T extends HasLength>(item: T): number {
  console.log(`Length: ${item.length}`);
  return item.length;
}

logLength("Hello World");   // Valid: string has .length
logLength([1, 2, 3, 4]);     // Valid: array has .length
// logLength(12345);         // Error: Argument of type 'number' does not satisfy constraint 'HasLength'.
```

### Common Mistake / Tip
> **Tip:** When using `<T extends SomeType>`, `T` can be an exact match or any subtype that has additional properties.

---

## 4. [ADDED] How do Generic Utility Functions use the `keyof` constraint (`<T, K extends keyof T>`)?

### Answer
A powerful TypeScript design pattern combines generics with the `keyof` operator using the pattern `<T, K extends keyof T>`. This constraint ensures that parameter `K` can only be a valid property key that actually exists on object type `T`. It allows you to write functions that retrieve or update object properties with complete compile-time verification, ensuring callers cannot request misspelled or non-existent keys.

### Code Example
```ts
// K is strictly constrained to the keys of T
function getProperty<T, K extends keyof T>(obj: T, key: K): T[K] {
  return obj[key];
}

const user = { id: 101, username: "Grace", email: "grace@navy.mil" };

const username = getProperty(user, "username"); // Safe: returns string
const id = getProperty(user, "id");             // Safe: returns number

console.log(`Retrieved: ${username} (ID: ${id})`);
// Output: Retrieved: Grace (ID: 101)

// getProperty(user, "password"); // Error: Argument of type '"password"' is not assignable to keyof user.
```

### Common Mistake / Tip
> **Tip:** This pattern powers many standard library and framework functions, guaranteeing type safety when reading dynamic object properties.
