# Module 05: Union, Intersection & Literal Types, Type Narrowing

This module covers advanced composition and control flow features in TypeScript. You will master union and intersection types, literal types, `as const` assertions, type narrowing via control flow analysis, custom type guards, discriminated unions, and compile-time exhaustive checking.

---

## 1. What are Literal Types in TypeScript?

### Answer
Literal types allow you to specify that a variable or property must hold an exact, specific value rather than just any general primitive like `string` or `number`. TypeScript supports string literals (e.g., `"GET"` or `"POST"`), numeric literals (e.g., `404` or `200`), and boolean literals (`true` or `false`). By combining literal types with union types, you can create powerful, finite sets of valid values with full editor autocomplete.

### Code Example
```ts
// Combining string literals into a union
type HttpMethod = "GET" | "POST" | "PUT" | "DELETE";

function sendRequest(url: string, method: HttpMethod): void {
  console.log(`Sending ${method} request to ${url}`);
}

sendRequest("https://api.example.com/users", "GET");
// Output: Sending GET request to https://api.example.com/users

// sendRequest("https://api.example.com", "PATCH"); // Error: Argument of type '"PATCH"' is not assignable.
```

### Common Mistake / Tip
> **Tip:** Use literal types instead of loose strings for status codes, action names, and configuration modes to prevent typos.

---

## 2. What is Type Narrowing in TypeScript, and how does Control Flow Analysis work?

### Answer
Type narrowing is the process where TypeScript refines a broad type (such as a union `string | number`) into a more specific, concrete type within a conditional branch of code. TypeScript's compiler employs Control Flow Analysis (CFA) to inspect JavaScript runtime checks—such as `typeof`, `instanceof`, the `in` operator, and equality comparisons—and automatically narrows the type in each branch. This gives you full type safety when accessing type-specific methods.

### Code Example
```ts
function formatInput(val: string | number): string {
  // typeof guard narrows the union
  if (typeof val === "string") {
    return val.trim().toUpperCase(); // Safe: val is known to be string
  }
  return val.toFixed(2); // Safe: val must be number here
}

console.log(formatInput("   hello   "));
// Output: HELLO
console.log(formatInput(42.5678));
// Output: 42.57
```

### Common Mistake / Tip
> **Tip:** Control flow analysis tracks `return` statements; once an `if` block returns, the remaining code automatically excludes that narrowed branch.

---

## 3. What are Union Types (`|`) and how do you work with them?

### Answer
A Union Type is formed using the pipe operator (`|`) to express that a value can be one of several different types (e.g., `string | number | boolean`). When you receive a union type, TypeScript only allows you to access properties that are common to all members of the union until you narrow it. You work with union types by performing runtime checks (such as `typeof` or property checks) to narrow down to a specific member before using member-specific methods.

### Code Example
```ts
type StringOrArray = string | string[];

function getLength(input: StringOrArray): number {
  // .length is shared by both string and Array!
  return input.length;
}

console.log(`String length: ${getLength("TypeScript")}`);
// Output: String length: 10
console.log(`Array length: ${getLength(["a", "b", "c"])}`);
// Output: Array length: 3
```

### Common Mistake / Tip
> **Common Mistake:** Attempting to call `.toUpperCase()` on `string | number` directly will cause a compile error because `.toUpperCase()` does not exist on `number`.

---

## 4. What are Intersection Types (`&`) and how do they combine multiple types?

### Answer
An Intersection Type uses the ampersand operator (`&`) to combine multiple existing types into one comprehensive type that possesses all properties of every constituent type. An object satisfying an intersection must satisfy every single intersected type simultaneously. Intersection types are commonly used for mixins, merging base entity models with metadata, or combining separate API responses.

### Code Example
```ts
interface Timestamps {
  createdAt: Date;
  updatedAt: Date;
}

interface Article {
  title: string;
  wordCount: number;
}

// Combining both interfaces into one
type PublishedArticle = Article & Timestamps;

const post: PublishedArticle = {
  title: "Mastering TypeScript",
  wordCount: 1400,
  createdAt: new Date(),
  updatedAt: new Date()
};

console.log(`"${post.title}" created at: ${post.createdAt.toISOString()}`);
// Output: "Mastering TypeScript" created at: ...
```

### Common Mistake / Tip
> **Tip:** Intersecting conflicting primitive types (e.g., `string & number`) produces the `never` type because no value can be both a string and a number.

---

## 5. What are Discriminated (Tagged) Unions and why are they considered a TypeScript best practice?

### Answer
A Discriminated Union (also called a Tagged Union) is a pattern where several object types in a union share a single, common property—known as the discriminant or tag—whose value is a unique literal type. By checking this shared tag property in an `if` or `switch` statement, TypeScript instantly and flawlessly narrows the entire object to its corresponding specific variant. This pattern is widely considered a best practice for modeling state machines, Redux actions, and API responses.

### Code Example
```ts
interface SuccessState {
  status: "success"; // Discriminant tag
  data: string[];
}

interface ErrorState {
  status: "error";   // Discriminant tag
  errorMessage: string;
}

type NetworkState = SuccessState | ErrorState;

function handleResponse(state: NetworkState): void {
  if (state.status === "success") {
    console.log(`Loaded ${state.data.length} items`);
  } else {
    console.log(`Failed: ${state.errorMessage}`);
  }
}

handleResponse({ status: "success", data: ["User1", "User2"] });
// Output: Loaded 2 items
```

### Common Mistake / Tip
> **Tip:** Always use a consistent tag name (such as `kind`, `type`, or `status`) across all variants in the union.

---

## 6. What is Exhaustive Type Checking and how do you enforce it using the `never` type?

### Answer
Exhaustive type checking is a defensive programming technique where you ensure at compile time that every possible variant of a union is handled in a `switch` or `if/else` ladder. You enforce it by assigning the unhandled variable in the `default` case to a variable typed as `never`. If a new variant is later added to the union and you forget to add a case for it, TypeScript will raise a compile-time error because a real value cannot be assigned to `never`.

### Code Example
```ts
type Shape = 
  | { kind: "circle"; radius: number }
  | { kind: "square"; side: number };

function calculateArea(shape: Shape): number {
  switch (shape.kind) {
    case "circle":
      return Math.PI * shape.radius ** 2;
    case "square":
      return shape.side * shape.side;
    default: {
      // If a new shape is added to Shape and not handled, this line errors at compile time!
      const _exhaustiveCheck: never = shape;
      return _exhaustiveCheck;
    }
  }
}

console.log(`Area: ${calculateArea({ kind: "square", side: 4 })}`);
// Output: Area: 16
```

### Common Mistake / Tip
> **Tip:** Implementing the `never` exhaustive check guarantees that future refactorings will never silently drop an unhandled enum or union variant.

---

## 7. [ADDED] What is a `const` assertion (`as const`) and how does it prevent type widening?

### Answer
By default, TypeScript widens literal values declared with `let` or inside objects to their general primitive types (e.g., `"light"` is widened to `string`, and `[1, 2]` is widened to `number[]`). Appending `as const` (a const assertion) signals to TypeScript that all properties should be inferred as exact readonly literals rather than widened types. It makes all object properties `readonly`, transforms array literals into `readonly` tuples, and locks in exact string and numeric literal types.

### Code Example
```ts
// Without 'as const': roles is inferred as string[]
const mutableConfig = { roles: ["admin", "viewer"] };

// With 'as const': roles is inferred as readonly ["admin", "viewer"]
const fixedConfig = {
  theme: "dark",
  roles: ["admin", "viewer"]
} as const;

// fixedConfig.theme = "light"; // Error: Cannot assign to 'theme' because it is a read-only property.
console.log(`Theme locked to: ${fixedConfig.theme}`);
// Output: Theme locked to: dark
```

### Common Mistake / Tip
> **Tip:** Use `as const` when defining dictionaries of constants, configuration objects, or tuple return values from helper functions.

---

## 8. [ADDED] How do Custom User-Defined Type Guards with Type Predicates (`value is Type`) work?

### Answer
A custom type guard is a regular function that returns a boolean, but its return type is annotated with a special type predicate of the form `parameterName is TargetType`. When this function returns `true`, TypeScript's compiler automatically narrows the checked parameter to `TargetType` inside the surrounding conditional block. This allows you to encapsulate complex runtime validation logic (such as checking multiple object properties) into reusable, type-safe helper functions.

### Code Example
```ts
interface Admin {
  name: string;
  role: "admin";
  permissions: string[];
}

// Type guard returning a type predicate
function isAdmin(user: { name: string; role: string }): user is Admin {
  return user.role === "admin" && "permissions" in user;
}

const currentUser = { name: "Alex", role: "admin", permissions: ["manage_users"] };

if (isAdmin(currentUser)) {
  console.log(`Admin permissions: ${currentUser.permissions.join(", ")}`);
  // Output: Admin permissions: manage_users
}
```

### Common Mistake / Tip
> **Common Mistake:** If your type guard logic has a bug and returns `true` for invalid data, TypeScript will trust the type predicate unconditionally, creating potential runtime crashes.
