# Module 08: Utility Types & Mapped/Conditional Types

This module dives into TypeScript's type transformation toolkit: type query operators (`typeof`, `keyof`, indexed access), built-in utility types, mapped types, template literal types, conditional types, and the `infer` keyword for type extraction.

---

## 1. How do the `keyof`, `typeof`, and Indexed Access (`T[K]`) type operators work?

### Answer
The `keyof` operator queries an object type and produces a union of its string and numeric property names. The `typeof` type operator allows you to capture the TypeScript type of an existing runtime JavaScript variable or object directly in type space. Indexed Access Types (written as `Type[Key]`) look up and extract the exact type of a specific property from another type, mirroring how bracket property lookups work in runtime JavaScript.

### Code Example
```ts
const appConfig = {
  port: 8080,
  host: "localhost",
  secure: true
};

// 1. typeof captures type from runtime value
type AppConfig = typeof appConfig;

// 2. keyof produces union of keys: "port" | "host" | "secure"
type ConfigKey = keyof AppConfig;

// 3. Indexed access extracts the type of 'port' (number)
type PortType = AppConfig["port"];

const primaryPort: PortType = 3000;
console.log(`Port: ${primaryPort}`);
// Output: Port: 3000
```

### Common Mistake / Tip
> **Tip:** In type annotations, `typeof` refers to TypeScript's type query operator, while inside an `if` expression at runtime, it evaluates to JavaScript's string check (`"string"`, `"number"`, etc.).

---

## 2. What are common built-in Utility Types (`Partial`, `Required`, `Readonly`, `Pick`, `Omit`, `Record`) and how are they used?

### Answer
TypeScript provides built-in generic utility types to transform existing types without manual rewriting. `Partial<T>` makes all properties of `T` optional; `Required<T>` makes all optional properties required; and `Readonly<T>` marks all properties as immutable. `Pick<T, K>` creates a new type containing only the selected keys `K`, `Omit<T, K>` creates a type containing all properties of `T` except keys `K`, and `Record<K, T>` creates an object type whose keys are `K` and values are `T`.

### Code Example
```ts
interface Product {
  id: number;
  name: string;
  price: number;
  description?: string;
}

// 1. Partial: useful for patch/update payloads
type UpdateProductDTO = Partial<Product>;

// 2. Omit: omit 'id' when creating a new product
type CreateProductDTO = Omit<Product, "id">;

// 3. Record: key-value dictionary mapping string IDs to Products
type ProductCatalog = Record<string, Product>;

const newProduct: CreateProductDTO = { name: "Mechanical Keyboard", price: 120 };
console.log(`Created product: ${newProduct.name} ($${newProduct.price})`);
// Output: Created product: Mechanical Keyboard ($120)
```

### Common Mistake / Tip
> **Tip:** Avoid duplicating model fields; use `Pick` and `Omit` to derive DTO (Data Transfer Object) shapes directly from your core database or domain models.

---

## 3. What are Mapped Types and Template Literal Types?

### Answer
Mapped types allow you to build new object types by iterating over keys (typically using `keyof`) and transforming their property definitions, similar to how `.map()` transforms arrays. Template literal types build on JavaScript template string syntax to create new string literal types by concatenating and interpolating string literals, unions, or numbers. Combining mapped types with template literals lets you automatically generate event names, getter/setter signatures, or CSS utility classes.

### Code Example
```ts
type EventType = "click" | "hover";

// Template Literal Type: produces "onClick" | "onHover"
type EventHandlerName = `on${Capitalize<EventType>}`;

// Mapped Type: transforms each event into a handler function
type EventListeners = {
  [K in EventHandlerName]: (event: unknown) => void;
};

const listeners: EventListeners = {
  onClick: (e) => console.log("Clicked!"),
  onHover: (e) => console.log("Hovered!")
};

listeners.onClick({});
// Output: Clicked!
```

### Common Mistake / Tip
> **Tip:** You can add or remove modifiers in mapped types using `+readonly`, `-readonly`, `+?`, or `-?` (e.g., `-?` makes all properties required).

---

## 4. What are Conditional Types and how does the `infer` keyword work?

### Answer
Conditional types express type relationships using ternary syntax (`T extends U ? X : Y`), allowing TypeScript to select one of two possible types based on a condition tested at compile time. The `infer` keyword is used exclusively within the `extends` clause of a conditional type to introduce a new type variable and extract (deduce) an inner type from a complex structure. For example, `infer` is used by the built-in `ReturnType<T>` utility to extract the return type of a function signature.

### Code Example
```ts
// Custom utility extracting the unwrapped item type of an array
type Flatten<T> = T extends Array<infer ItemType> ? ItemType : T;

type NumberArray = Flatten<number[]>; // Inferred as number
type SingleString = Flatten<string>;   // Inferred as string

// Built-in ReturnType uses conditional types and infer:
function getUser() {
  return { id: 10, name: "Alice" };
}
type UserResponse = ReturnType<typeof getUser>; // { id: number; name: string }

const user: UserResponse = { id: 10, name: "Alice" };
console.log(`User ID: ${user.id}, Name: ${user.name}`);
// Output: User ID: 10, Name: Alice
```

### Common Mistake / Tip
> **Tip:** When a conditional type acts on a naked type parameter `T`, it automatically distributes over union types (distributive conditional types).
