# Module 04: Objects, Interfaces & Type Aliases

This module explores how TypeScript models object structures and contracts. You will understand the distinction between interfaces and type aliases, optional and readonly modifiers, index signatures, excess property checks, and TypeScript's foundational structural typing system.

---

## 1. What is the difference between Interfaces and Type Aliases, and when should you choose one over the other?

### Answer
Both `interface` and `type` can declare the shape of an object, but they have subtle distinctions. Interfaces support declaration merging (multiple interface declarations with the same name automatically merge into one) and can be extended using the `extends` keyword, making them ideal for public libraries and object-oriented contracts. Type aliases are more versatile: they can represent primitives, union types, intersection types, and tuples, but they cannot be reopened or merged once declared.

### Code Example
```ts
// Interface: extendable and supports declaration merging
interface User {
  id: number;
  name: string;
}

interface User {
  role: string; // Merges into the original User interface
}

// Type alias: versatile, can define unions, primitives, and intersections
type Status = "pending" | "approved" | "rejected";
type AdminUser = User & { permissions: string[] };

const admin: AdminUser = {
  id: 1,
  name: "Jordan",
  role: "admin",
  permissions: ["read", "write"]
};
console.log(`${admin.name} has role: ${admin.role}`);
// Output: Jordan has role: admin
```

### Common Mistake / Tip
> **Tip:** Use `interface` for public APIs and object models that might be extended, and use `type` when defining unions, intersections, primitives, or tuples.

---

## 2. What are Object Types in TypeScript and how do you define their shapes?

### Answer
Object types in TypeScript define the names and types of properties that an object must contain. You can define object types inline using object literal syntax, or name them reusably using type aliases or interfaces. When a value is assigned to an object type, TypeScript verifies at compile time that all required properties exist and that each property holds a value matching its declared type.

### Code Example
```ts
// Defining an object type using a type alias
type Book = {
  title: string;
  author: string;
  pages: number;
  isAvailable: boolean;
};

const myBook: Book = {
  title: "The TypeScript Handbook",
  author: "Community",
  pages: 250,
  isAvailable: true
};

console.log(`"${myBook.title}" has ${myBook.pages} pages.`);
// Output: "The TypeScript Handbook" has 250 pages.
```

### Common Mistake / Tip
> **Tip:** Avoid typing values simply as `object` or `{}` because they allow any non-primitive value without checking property keys; define specific property shapes instead.

---

## 3. How do optional (`?`) and `readonly` properties work on object types?

### Answer
The question mark (`?`) marks an object property as optional, meaning the property does not need to be provided when creating the object, and its value defaults to `undefined` if omitted. The `readonly` modifier marks a property as immutable after initialization, preventing reassignments to that property reference. Note that `readonly` is shallow: if the property holds a nested array or object, the internal contents can still be mutated unless nested properties are also marked `readonly`.

### Code Example
```ts
interface Car {
  readonly vin: string; // Cannot be changed after creation
  model: string;
  sunroof?: boolean;    // Optional property
}

const myCar: Car = {
  vin: "1HGCR2F83HA",
  model: "Sedan"
  // sunroof omitted: perfectly valid
};

// myCar.vin = "NEWVIN123"; // Error: Cannot assign to 'vin' because it is a read-only property.
myCar.model = "Coupe";      // Valid: mutable property
console.log(`Model: ${myCar.model}, Sunroof: ${myCar.sunroof ?? "None"}`);
// Output: Model: Coupe, Sunroof: None
```

### Common Mistake / Tip
> **Tip:** Use `readonly` on identifiers, database primary keys, and constants to prevent accidental mutations in business logic.

---

## 4. What are Index Signatures, and how does Excess Property Checking work during object assignment?

### Answer
An Index Signature allows an object to hold arbitrary keys when you don't know all property names in advance (e.g., `[key: string]: number`). Excess Property Checking is a special TypeScript safety check applied specifically to fresh object literals passed directly to a typed target: if the literal contains properties not defined in the type, TypeScript raises an error to catch typos. However, assigning an existing object variable bypasses excess property checks under TypeScript's structural typing rules.

### Code Example
```ts
interface Inventory {
  [itemName: string]: number; // Index signature: any string key maps to a number
}

const stock: Inventory = { apples: 50, oranges: 30 };
stock.bananas = 15;

interface Point {
  x: number;
  y: number;
}

// Excess property check catches typos in direct literals:
// const p: Point = { x: 1, y: 2, extra: 3 }; // Error: Object literal may only specify known properties.

const rawData = { x: 1, y: 2, extra: 3 };
const safePoint: Point = rawData; // Allowed: structural assignment of existing reference
console.log(`Point at (${safePoint.x}, ${safePoint.y})`);
// Output: Point at (1, 2)
```

### Common Mistake / Tip
> **Common Mistake:** Excess property checking only triggers on *fresh object literals*; passing an intermediate variable bypasses the check.

---

## 5. What is Structural Typing ("duck typing") in TypeScript?

### Answer
Structural typing means TypeScript determines type compatibility based entirely on the shape (the members and properties) of a type, rather than its explicit declared name or inheritance hierarchy (which is nominal typing, as in Java or C#). If two distinct types have the same properties with compatible types, TypeScript treats them as identical and interchangeable. This concept is often called "duck typing": if it walks like a duck and quacks like a duck, TypeScript considers it a duck.

### Code Example
```ts
interface Point2D {
  x: number;
  y: number;
}

class Vector2D {
  constructor(public x: number, public y: number) {}
}

function renderPoint(point: Point2D): void {
  console.log(`Rendering point at x=${point.x}, y=${point.y}`);
}

// Vector2D has the same structure (x, y) as Point2D, so it is 100% compatible!
const vector = new Vector2D(10, 20);
renderPoint(vector);
// Output: Rendering point at x=10, y=20
```

### Common Mistake / Tip
> **Tip:** You do not need to explicitly implement an interface with `implements` for an object or class to satisfy an interface; having the matching shape is sufficient.

---

## 6. What is Type Compatibility and how does TypeScript determine if one type can be assigned to another?

### Answer
Type compatibility in TypeScript is governed by assignability rules based on structure: a source type `S` is compatible with and assignable to a target type `T` if `S` has at least all the required properties of `T` with compatible types. In other words, the source can have *more* properties than the target requires, but never fewer. Function parameter compatibility works somewhat in reverse (contravariance): a function expecting fewer arguments can be assigned where a callback expecting more arguments is required.

### Code Example
```ts
interface Person {
  name: string;
}

interface Employee {
  name: string;
  department: string;
  salary: number;
}

const emp: Employee = { name: "David", department: "Engineering", salary: 95000 };

// Compatible: Employee has 'name', which satisfies Person
const person: Person = emp;
console.log(`Person name: ${person.name}`);
// Output: Person name: David

// Cannot assign person back to Employee because Person is missing 'department' and 'salary'
// const invalidEmp: Employee = person; // Error
```

### Common Mistake / Tip
> **Tip:** Remember that a subtype can always have *more* details than its supertype; you can always provide more information than requested, but never less.
