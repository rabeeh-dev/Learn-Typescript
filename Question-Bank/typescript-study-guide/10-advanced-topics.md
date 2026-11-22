# Module 10: Advanced Topics

This module tackles TypeScript's advanced language features: type assertions (`as`), the `satisfies` operator, branded (nominal) types, modern ECMAScript decorators, and the non-null assertion operator (`!`).

---

## 1. What are Type Assertions (`as` syntax), and when should you use or avoid them?

### Answer
A type assertion tells the TypeScript compiler: "I know the type of this value better than you do; treat it as this specific type." In TypeScript, you perform assertions using the `as` keyword (e.g., `value as string`) or the older angle-bracket syntax (`<string>value`). Type assertions do not perform any runtime type conversion or verification—they are purely compile-time instructions. You should use assertions sparingly, such as when interacting with DOM elements or external untyped libraries, and avoid them as a quick fix for type errors.

### Code Example
```ts
// Suppose we know the exact HTML element type in the DOM:
interface MockHTMLElement {
  id: string;
}
interface MockHTMLInputElement extends MockHTMLElement {
  value: string;
}

const mockElement: MockHTMLElement = { id: "username-input" };

// Type assertion narrows to the specific input element
const input = mockElement as MockHTMLInputElement;
input.value = "JohnDoe";

console.log(`Input ID: ${input.id}, Value: ${input.value}`);
// Output: Input ID: username-input, Value: JohnDoe
```

### Common Mistake / Tip
> **Common Mistake:** Type assertions can hide bugs; asserting an incompatible type (like `const num = "text" as unknown as number;`) bypasses compiler safety and will crash at runtime if treated as a number.

---

## 2. What is the `satisfies` operator in TypeScript, and how does it differ from a type annotation or assertion?

### Answer
The `satisfies` operator (introduced in TypeScript 4.9) validates that an expression matches a given type shape without changing or widening the expression's inferred type. When you use a traditional type annotation (`const palette: Palette = { ... }`), TypeScript widens the properties to match the type definition, losing specific literal values. Using `satisfies` ensures that the object strictly conforms to `Palette` while preserving the exact literal types, property keys, and autocomplete of the original object.

### Code Example
```ts
type RGB = [red: number, green: number, blue: number];
type Color = string | RGB;
type Palette = Record<string, Color>;

// Using satisfies validates against Palette but preserves exact types:
const palette = {
  primary: "#1E40AF",
  secondary: [255, 100, 50]
} satisfies Palette;

// We can safely call string methods on 'primary' without a type guard:
console.log(palette.primary.toLowerCase());
// Output: #1e40af
console.log(`Red component: ${palette.secondary[0]}`);
// Output: Red component: 255
```

### Common Mistake / Tip
> **Tip:** Use `satisfies` whenever you want to check that a configuration object conforms to a schema while keeping the exact literal property types for downstream code.

---

## 3. What are Branded (Nominal) Types in TypeScript and what problem do they solve?

### Answer
Because TypeScript uses structural typing, two types with identical structures (such as `UserId = string` and `OrderId = string`) are treated as completely interchangeable, allowing developers to accidentally pass a user ID where an order ID was expected. Branded Types (also called Nominal or Tagged Types) solve this by attaching a unique compile-time property tag (a "brand") to a primitive type. This creates distinct, non-interchangeable nominal types out of ordinary strings or numbers without incurring any runtime overhead.

### Code Example
```ts
// Attach unique compile-time brands
type UserId = string & { readonly __brand: unique symbol };
type OrderId = string & { readonly __brand: unique symbol };

// Factory functions to create branded values safely
function createUserId(id: string): UserId {
  return id as UserId;
}
function createOrderId(id: string): OrderId {
  return id as OrderId;
}

function fetchUserOrders(userId: UserId): void {
  console.log(`Fetching orders for user: ${userId}`);
}

const user = createUserId("usr_889");
const order = createOrderId("ord_001");

fetchUserOrders(user); // Valid!
// fetchUserOrders(order); // Error: Argument of type 'OrderId' is not assignable to 'UserId'.
// Output: Fetching orders for user: usr_889
```

### Common Mistake / Tip
> **Tip:** Use branded types for IDs, validated email addresses, and sanitized inputs to prevent mixing up logically distinct primitives.

---

## 4. What are Decorators in TypeScript and how do modern ECMAScript decorators work?

### Answer
Decorators provide a declarative syntax to annotate and modify classes, methods, accessors, and fields. TypeScript originally supported experimental legacy decorators (requiring `"experimentalDecorators": true`), but TypeScript 5.0+ introduces full native support for modern Stage 3 ECMAScript Decorators without needing any special compiler flags. A modern method decorator is a function that takes the target method and a context object, allowing you to wrap, inspect, or replace the method's behavior (such as adding logging or performance timing).

### Code Example
```ts
// Modern ECMAScript / TypeScript 5.0+ method decorator
function LogCall<This, Args extends any[], Return>(
  target: (this: This, ...args: Args) => Return,
  context: ClassMethodDecoratorContext<This, (this: This, ...args: Args) => Return>
) {
  return function (this: This, ...args: Args): Return {
    console.log(`[EXEC] Calling ${String(context.name)} with args:`, args);
    return target.call(this, ...args);
  };
}

class Calculator {
  @LogCall
  add(a: number, b: number): number {
    return a + b;
  }
}

const calc = new Calculator();
const sum = calc.add(5, 7);
console.log(`Sum: ${sum}`);
// Output: [EXEC] Calling add with args: [ 5, 7 ]
// Output: Sum: 12
```

### Common Mistake / Tip
> **Tip:** If working in an older codebase (such as Angular or NestJS), ensure you know whether it uses experimental decorators or modern Stage 3 decorators, as the parameter signatures differ.

---

## 5. [ADDED] What is the Non-Null Assertion Operator (`!`) and when is it safe to use?

### Answer
The non-null assertion operator is a postfix exclamation point (`!`) placed after an expression (e.g., `element!`) that instructs TypeScript to remove `null` and `undefined` from that expression's type. Like type assertions, it emits zero JavaScript code at runtime; it is purely an assertion that you are certain the value cannot be nullish at that point in execution. You should use it only when you have guaranteed knowledge that a value is populated (for example, right after checking DOM elements or test setups) and cannot easily express that guarantee through normal control flow.

### Code Example
```ts
interface ServerConfig {
  databaseUrl?: string;
}

const config: ServerConfig = { databaseUrl: "postgres://localhost:5432/app" };

// Function that validates presence
function validateConfig(c: ServerConfig): void {
  if (!c.databaseUrl) {
    throw new Error("Missing databaseUrl!");
  }
}

validateConfig(config);

// Using '!' asserts to TypeScript that databaseUrl is not undefined:
const activeDbUrl: string = config.databaseUrl!;
console.log(`Connected to: ${activeDbUrl}`);
// Output: Connected to: postgres://localhost:5432/app
```

### Common Mistake / Tip
> **Common Mistake:** Overusing `!` to silence compiler errors instead of properly handling `null` or `undefined` with fallback values or conditionals leads directly to runtime `TypeError` crashes.
