# Module 02: Basic Types

This module covers TypeScript's fundamental type system: primitives, arrays, tuples, enums, top types (`any`, `unknown`), and bottom types (`never`). You will learn how TypeScript models data, enforces immutability, and how strict null checking prevents common runtime errors.

---

## 1. What are the primitive and basic data types in TypeScript?

### Answer
TypeScript includes all primitive JavaScript data types and adds static type checking to each. The core primitives are `string` (text), `number` (both integers and floating-point values), `boolean` (`true` or `false`), `bigint` (arbitrary-precision integers), and `symbol` (unique identifiers). TypeScript also includes `null` and `undefined` as distinct types, as well as specialized types like `object`, `any`, and `never`.

### Code Example
```ts
// Primitive type annotations
const username: string = "Sarah";
const age: number = 28;
const isActive: boolean = true;
const userToken: symbol = Symbol("auth_token");
const largeNumber: bigint = 9007199254740991n;

console.log(`${username} is ${age} years old and active: ${isActive}`);
// Output: Sarah is 28 years old and active: true
```

### Common Mistake / Tip
> **Common Mistake:** Use lowercase `string`, `number`, and `boolean` for types; uppercase `String`, `Number`, and `Boolean` refer to JavaScript wrapper objects and should almost never be used as types.

---

## 2. What is the difference between the `any` and `unknown` types?

### Answer
Both `any` and `unknown` are top types that can hold any arbitrary value, but they offer completely opposite levels of type safety. When a variable is typed as `any`, TypeScript disables all compile-time type checking, allowing you to access arbitrary properties or call it as a function even if it will crash at runtime. In contrast, `unknown` is type-safe: TypeScript forces you to inspect, narrow, or validate the type (using `typeof`, `instanceof`, etc.) before performing any operations on it.

### Code Example
```ts
let insecureData: any = "Hello World";
insecureData.nonExistentMethod(); // Compiles without error, but crashes at runtime!

let secureData: unknown = "TypeScript";
// secureData.toUpperCase(); // Error: 'secureData' is of type 'unknown'.

if (typeof secureData === "string") {
  console.log(secureData.toUpperCase()); // Safe! Type narrowed to string.
  // Output: TYPESCRIPT
}
```

### Common Mistake / Tip
> **Tip:** Whenever you receive data of an uncertain shape (such as API payloads or parsed JSON), use `unknown` instead of `any` to keep your code type-safe.

---

## 3. What is the difference between `void` and `never` in TypeScript?

### Answer
`void` represents the absence of any returned value, commonly used for functions that perform a side effect (like logging or updating a database) and return normally without a `return` statement. On the other hand, `never` represents a state that can never occur or a function that never successfully completes. A function returns `never` if it throws an unhandled exception or enters an infinite loop, meaning it never yields control back to its caller.

### Code Example
```ts
// void: returns normally, but produces no useful value
function logMessage(msg: string): void {
  console.log(`Log: ${msg}`);
}
logMessage("Server started");
// Output: Log: Server started

// never: this function never finishes execution
function throwError(reason: string): never {
  throw new Error(`Fatal Error: ${reason}`);
}
// throwError("Crash"); // Execution terminates here
```

### Common Mistake / Tip
> **Tip:** If a function finishes and returns nothing, its return type is `void`; if it never finishes at all, its return type is `never`.

---

## 4. What is the difference between returning `void` and returning `undefined` from a function?

### Answer
When a function's return type is annotated as `undefined`, the function is explicitly required to have a `return` or `return undefined;` statement in its body. When a function is annotated with `void`, it signifies that the caller should ignore the return value, allowing the function to omit the return statement completely. Additionally, TypeScript allows callback functions typed as `() => void` to return values that the consumer will simply discard, providing flexibility for event listeners.

### Code Example
```ts
// Must explicitly return undefined
function returnsExplicitUndefined(): undefined {
  return undefined;
}

// Does not require an explicit return statement
function returnsVoid(): void {
  console.log("Action performed");
}

returnsVoid();
// Output: Action performed
console.log(returnsExplicitUndefined());
// Output: undefined
```

### Common Mistake / Tip
> **Common Mistake:** Writing `: undefined` on a function without an explicit `return` statement will trigger a compiler error; use `: void` for functions that simply do not return a value.

---

## 5. What is the difference between an Array and a Tuple in TypeScript?

### Answer
An Array in TypeScript is a collection of elements of a specific type (e.g., `number[]` or `string[]`) with an arbitrary, dynamic length. A Tuple is a specialized array with a fixed number of elements where each specific index position has a predetermined, explicit type. Tuples are ideal for structured pairs or triplets, such as geographic coordinates `[latitude, longitude]` or React hook return values `[value, setValue]`.

### Code Example
```ts
// Regular Array: flexible length, uniform type
const scores: number[] = [85, 92, 78];
scores.push(99); // Perfectly valid

// Tuple: fixed length (2) and exact positional types [number, string]
const statusPair: [number, string] = [200, "OK"];
console.log(`Code: ${statusPair[0]}, Message: ${statusPair[1]}`);
// Output: Code: 200, Message: OK

// statusPair[0] = "error"; // Error: Type 'string' is not assignable to type 'number'.
```

### Common Mistake / Tip
> **Tip:** Use tuples when the position of an item holds specific meaning, such as key-value pairs or coordinates.

---

## 6. Why can `.push()` break TypeScript tuples, and how do `readonly` tuples and immutable arrays prevent this?

### Answer
Under the hood, TypeScript tuples compile down to plain JavaScript arrays, and historical TypeScript compiler rules allow standard array mutator methods like `.push()` and `.pop()` to be called on mutable tuples without a compile error. This flaw allows a tuple to accidentally contain more elements than its type definition declares. You can completely prevent this mutation by declaring the tuple or array as `readonly`, which removes all mutating methods like `.push()`, `.pop()`, and `.splice()`.

### Code Example
```ts
// Mutable tuple allows push (unsafe loophole)
const mutablePair: [string, number] = ["ID", 42];
mutablePair.push(100); // Compiles, but length is now 3!

// Readonly tuple prevents mutation completely
const safePair: readonly [string, number] = ["ID", 42];
// safePair.push(100); // Error: Property 'push' does not exist on type 'readonly [string, number]'.

const safeArray: ReadonlyArray<number> = [1, 2, 3];
// safeArray.push(4); // Error: Property 'push' does not exist on type 'readonly number[]'.
console.log(`Safe pair length: ${safePair.length}`);
// Output: Safe pair length: 2
```

### Common Mistake / Tip
> **Tip:** Always prefix tuples with `readonly` (e.g., `readonly [string, number]`) to ensure their length and contents cannot be accidentally altered.

---

## 7. How do String Literal Union Types compare to Enums, and which should you prefer?

### Answer
Enums are a custom TypeScript feature that generates real JavaScript objects at runtime, which adds extra code to your final bundle. String Literal Union Types (e.g., `"light" | "dark" | "system"`) are pure compile-time types that generate zero JavaScript code, making them lighter, faster, and more idiomatic in modern TypeScript. In most modern applications, string literal unions are preferred because they provide autocomplete and strict type safety without the runtime baggage or quirks of enums.

### Code Example
```ts
// Modern preferred pattern: String Literal Union
type Theme = "light" | "dark" | "system";

function applyTheme(theme: Theme): void {
  console.log(`Setting application theme to: ${theme}`);
}

applyTheme("dark");
// Output: Setting application theme to: dark

// applyTheme("blue"); // Error: Argument of type '"blue"' is not assignable to parameter of type 'Theme'.
```

### Common Mistake / Tip
> **Tip:** Prefer string literal unions over enums for simple sets of options; they are lighter and integrate seamlessly with external JSON payloads.

---

## 8. What are Numeric Enums, String Enums, and `const enum`, and what runtime code do they produce?

### Answer
Enums define a set of named constants. Numeric Enums assign auto-incrementing numbers starting at 0 and generate a bidirectional reverse-mapping object in JavaScript (allowing you to look up names by numeric value). String Enums map names to string values and do not generate reverse mappings, making them safer for debugging. A `const enum` is completely inlined by the compiler at every usage site with no runtime object generated at all, though it can cause issues with isolated module transpilers like Babel.

### Code Example
```ts
// Numeric Enum with auto-incrementing values
enum Direction {
  Up,    // 0
  Down,  // 1
  Left,  // 2
  Right  // 3
}

// String Enum
enum LogLevel {
  Info = "INFO",
  Warn = "WARN",
  Error = "ERROR"
}

console.log(`Direction.Up = ${Direction.Up}`);
// Output: Direction.Up = 0
console.log(`LogLevel.Error = ${LogLevel.Error}`);
// Output: LogLevel.Error = ERROR
```

### Common Mistake / Tip
> **Common Mistake:** Avoid `const enum` if your project is compiled with Babel or Vite (`isolatedModules`), as these transpilers process single files at a time and cannot inline `const enum` values.

---

## 9. [ADDED] What is Type Inference in TypeScript and when should you rely on it vs explicitly annotating types?

### Answer
Type inference is TypeScript's ability to automatically deduce the type of a variable, function return, or expression without requiring an explicit type annotation. When you assign an initial value upon declaration (such as `let count = 10;`), TypeScript automatically infers the variable as `number`. You should let TypeScript infer types for simple local variables and function returns to avoid redundant boilerplate, and reserve explicit annotations for function parameters, public API boundaries, or uninitialized variables.

### Code Example
```ts
// Inferred as number automatically:
let counter = 0; 
// counter = "ten"; // Error: Type 'string' is not assignable to type 'number'.

// Explicit parameter types are required, but return type is inferred:
function addPoints(current: number, bonus: number) {
  return current + bonus; // Return type inferred as number
}

const total = addPoints(counter, 15);
console.log(`Total points: ${total}`);
// Output: Total points: 15
```

### Common Mistake / Tip
> **Tip:** Do not write redundant annotations like `const name: string = "Alice";`. Writing `const name = "Alice";` is cleaner and TypeScript infers the exact type automatically.

---

## 10. [ADDED] What is `strictNullChecks` and how should you handle `null` and `undefined` safely?

### Answer
Without `strictNullChecks`, `null` and `undefined` can be assigned to any type (such as `string` or `number`), which is a frequent source of runtime crashes like `"Cannot read properties of undefined"`. When `strictNullChecks` is enabled (which is included in `"strict": true`), `null` and `undefined` are treated as distinct types and cannot be assigned to variables unless explicitly specified using a union. You handle them safely using optional chaining (`?.`), the nullish coalescing operator (`??`), or type guard checks.

### Code Example
```ts
interface UserProfile {
  name: string;
  bio?: string; // string | undefined
}

function displayBio(profile: UserProfile): string {
  // Use nullish coalescing (??) to supply a fallback
  const userBio = profile.bio ?? "No biography provided.";
  return `${profile.name}: ${userBio}`;
}

const user: UserProfile = { name: "Alex" };
console.log(displayBio(user));
// Output: Alex: No biography provided.
```

### Common Mistake / Tip
> **Common Mistake:** Using the logical OR operator (`||`) instead of nullish coalescing (`??`) treats empty strings (`""`) and zero (`0`) as falsy; `??` only falls back on `null` or `undefined`.
