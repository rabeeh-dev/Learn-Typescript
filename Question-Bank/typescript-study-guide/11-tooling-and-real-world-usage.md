# Module 11: Tooling & Real-World Usage

This module covers engineering practices, tooling, and real-world application patterns with TypeScript. You will explore software design principles (KISS, DRY, YAGNI), linting with ESLint, pre-commit automation with Husky, test harnesses, safe error handling in `try...catch` blocks, and typing React components.

---

## 1. What do the KISS, DRY, and YAGNI software design principles mean in TypeScript development?

### Answer
KISS ("Keep It Simple, Stupid"), DRY ("Don't Repeat Yourself"), and YAGNI ("You Aren't Gonna Need It") are foundational software design guidelines. In TypeScript, KISS encourages writing straightforward, readable types instead of overly complex, unreadable type gymnastic puzzles. DRY recommends extracting repeated type definitions or functions into reusable interfaces or utility types. YAGNI reminds developers not to over-engineer speculative abstractions, premature generic layers, or speculative configurations until there is an immediate, concrete requirement.

### Code Example
```ts
// KISS & DRY: Simple, reusable User contract without premature complexity
interface User {
  id: string;
  name: string;
  email: string;
}

// Simple function following KISS rather than complex multi-layered generics:
function sendWelcomeEmail(user: User): string {
  return `Sending welcome message to ${user.name} at ${user.email}`;
}

const newUser: User = { id: "u1", name: "Sam", email: "sam@example.com" };
console.log(sendWelcomeEmail(newUser));
// Output: Sending welcome message to Sam at sam@example.com
```

### Common Mistake / Tip
> **Tip:** Do not build heavily nested conditional/mapped types unless simpler interfaces or function signatures fail to express your requirements.

---

## 2. What is ESLint and how is `@typescript-eslint` configured for TypeScript code quality?

### Answer
ESLint is a static code analysis tool that scans your codebase to identify code quality issues, bug-prone patterns, and stylistic inconsistencies. Because standard ESLint only understands plain JavaScript, the `@typescript-eslint` parser and plugin enable ESLint to parse TypeScript ASTs (Abstract Syntax Trees) and leverage TypeScript's type checker for advanced lint rules. These rules enforce best practices such as prohibiting explicit `any`, enforcing consistent type imports, and flagging unhandled promises.

### Code Example
```ts
// Example flat config (eslint.config.mjs):
// import tseslint from 'typescript-eslint';
// export default tseslint.config(...tseslint.configs.recommended);

// Rule: @typescript-eslint/no-explicit-any flags this:
// const data: any = JSON.parse('{"status": 200}');

// Safe alternative recommended by linter:
const rawJson = '{"status": 200}';
const data: unknown = JSON.parse(rawJson);

if (typeof data === "object" && data !== null && "status" in data) {
  console.log(`Parsed status: ${(data as { status: number }).status}`);
  // Output: Parsed status: 200
}
```

### Common Mistake / Tip
> **Tip:** Always use `@typescript-eslint` with type-aware linting (`projectService: true`) to catch unawaited promises and unsafe type assertions automatically.

---

## 3. What does Husky do and how is it used to automate Git hooks in TypeScript projects?

### Answer
Husky is a popular developer tool that simplifies setting up Git hooks (such as `pre-commit` and `pre-push`) in modern JavaScript and TypeScript repositories. When a developer attempts to create a Git commit, Husky automatically runs custom scripts (such as running `tsc --noEmit` and linting staged files via `lint-staged`). This automated check ensures that broken code, syntax errors, or type regressions are caught locally and prevented from ever being committed to version control.

### Code Example
```ts
// 1. Install husky:
// npx husky init

// 2. In .husky/pre-commit file:
// #!/usr/bin/env sh
// npx tsc --noEmit && npx lint-staged

// 3. In package.json:
// {
//   "scripts": {
//     "typecheck": "tsc --noEmit"
//   }
// }

const preCommitCheck = "Husky runs 'tsc --noEmit' before every commit";
console.log(preCommitCheck);
// Output: Husky runs 'tsc --noEmit' before every commit
```

### Common Mistake / Tip
> **Tip:** Pair Husky with `lint-staged` so that formatters and linters only check files you have changed, keeping commit times blazing fast.

---

## 4. What is Test Harness Engineering and how do you design automated testing harnesses in TypeScript?

### Answer
A Test Harness is a structured collection of software, test runners, mock data, and utilities designed to execute automated tests against application units under controlled conditions. In TypeScript projects, modern test runners (such as Vitest or Jest with `ts-jest`) act as the test harness, compiling TypeScript on the fly and executing test assertions. Designing a good test harness involves creating typed mock factories, database seeders, and setup/teardown hooks that mimic real-world execution environments.

### Code Example
```ts
// Simple test assertion helper inside a test harness
function assertEqual<T>(actual: T, expected: T, testName: string): void {
  if (actual === expected) {
    console.log(`[PASS] ${testName}`);
  } else {
    console.error(`[FAIL] ${testName} - Expected: ${expected}, Got: ${actual}`);
  }
}

// Unit under test
function calculateDiscount(price: number, percent: number): number {
  return price - (price * (percent / 100));
}

// Running automated test harness:
assertEqual(calculateDiscount(100, 20), 80, "20% off $100 should be $80");
// Output: [PASS] 20% off $100 should be $80
```

### Common Mistake / Tip
> **Tip:** Prefer Vitest for modern TypeScript projects because it provides native TypeScript support, fast execution via Vite, and Jest-compatible assertion syntax out of the box.

---

## 5. [ADDED] How do you properly handle errors in TypeScript `try...catch` blocks (`catch (error: unknown)`)?

### Answer
In modern TypeScript (with `useUnknownInCatchVariables` enabled in strict mode), the variable in a `catch (error)` block is automatically typed as `unknown` rather than `any`. Because JavaScript allows any expression to be thrown (strings, objects, numbers, or `Error` instances), you cannot directly access `error.message` without narrowing first. The safe, standard pattern is to use an `instanceof Error` type guard to verify that the caught value is an instance of the standard `Error` class before accessing `.message`.

### Code Example
```ts
function parseJsonSafe(jsonString: string): unknown {
  try {
    return JSON.parse(jsonString);
  } catch (error: unknown) {
    // Narrow 'unknown' error using instanceof Error
    if (error instanceof Error) {
      console.error(`Parsing error: ${error.message}`);
    } else {
      console.error("An unknown error occurred:", error);
    }
    return null;
  }
}

const result = parseJsonSafe("{ invalid-json }");
console.log(`Result: ${result}`);
// Output: Parsing error: Unexpected token 'i', "{ invalid-json }" is not valid JSON
// Output: Result: null
```

### Common Mistake / Tip
> **Common Mistake:** Writing `catch (error: any)` silences compiler warnings but creates risks if non-standard errors (like thrown strings or nulls) occur at runtime; always type catch variables as `unknown`.

---

## 6. [ADDED] How do you type component props and state in React with TypeScript?

### Answer
In React applications, TypeScript provides compile-time safety for component interfaces by explicitly typing props and state. You define the shape of component props using an `interface` or `type` and annotate the component function parameters. For state managed via `useState`, TypeScript automatically infers primitive state types, or you can pass a generic type argument (e.g., `useState<User | null>(null)`) when the state starts empty or can hold union types.

### Code Example
```ts
// Simulating React component typing
interface ButtonProps {
  label: string;
  onClick: () => void;
  disabled?: boolean;
}

// Typed Functional Component representation
function AppButton({ label, onClick, disabled = false }: ButtonProps): string {
  return `<button disabled="${disabled}">${label}</button>`;
}

const html = AppButton({
  label: "Submit Order",
  onClick: () => console.log("Clicked!"),
  disabled: false
});

console.log(`Rendered HTML: ${html}`);
// Output: Rendered HTML: <button disabled="false">Submit Order</button>
```

### Common Mistake / Tip
> **Tip:** Avoid typing components with `React.FC` in modern React code; simply annotating props directly on function arguments (`({ label }: ButtonProps)`) is cleaner and supports generic components cleanly.
