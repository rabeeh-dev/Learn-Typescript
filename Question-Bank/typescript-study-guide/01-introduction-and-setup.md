# Module 01: Introduction & Setup

This module introduces the fundamentals of TypeScript: why it was created, how its compilation model works, and how to configure a project. You will learn the difference between compile time and runtime, how to initialize a project, and the key compiler options in `tsconfig.json`.

---

## 1. What is TypeScript, and why does it exist?

### Answer
TypeScript is a strongly typed programming language developed by Microsoft that builds on top of JavaScript. It was created to address JavaScript's lack of compile-time type checking, which often leads to unexpected runtime errors in large applications. TypeScript adds an optional static type system that helps developers catch bugs early in their editor before running any code. Ultimately, all TypeScript code compiles down to plain JavaScript so it can execute in any browser or Node.js runtime.

### Code Example
```ts
// TypeScript checks types during development
function greetUser(name: string): string {
  return `Hello, ${name.toUpperCase()}!`;
}

const greeting = greetUser("Alice");
console.log(greeting);
// Output: Hello, ALICE!

// greetUser(42); // Error: Argument of type 'number' is not assignable to parameter of type 'string'.
```

### Common Mistake / Tip
> **Tip:** TypeScript code never runs directly in browsers or Node.js; it must first be compiled (transpiled) into standard JavaScript.

---

## 2. What is the difference between compile time and runtime in TypeScript?

### Answer
Compile time is the phase where the TypeScript compiler (`tsc`) analyzes your code, checks for type errors, and strips away all type annotations to generate JavaScript. Runtime is the subsequent phase where the generated JavaScript actually executes in an environment like a web browser or Node.js. TypeScript types exist purely at compile time and are completely erased during compilation; they do not exist at runtime and carry zero performance overhead.

### Code Example
```ts
// Compile-time type definition (erased when compiled)
type UserID = number;

function printId(id: UserID): void {
  // Runtime JavaScript execution
  console.log(`Processing user ID: ${id}`);
}

printId(101);
// Output: Processing user ID: 101
```

### Common Mistake / Tip
> **Common Mistake:** Trying to use TypeScript types inside runtime checks (such as `if (val instanceof UserID)`) fails because types do not exist at runtime.

---

## 3. What is the difference between statically typed and dynamically typed languages?

### Answer
In a dynamically typed language like JavaScript, variable types are associated with runtime values, meaning a variable can hold a string at one moment and a number later without error until potentially crashing at runtime. In a statically typed language like TypeScript, types are checked before execution, meaning variable and function types are defined and verified ahead of time. This static verification prevents common bugs such as typos in property names or calling non-existent functions.

### Code Example
```ts
// Static typing prevents accidental type reassignment
let accountBalance: number = 500;
accountBalance = 750; // Valid

// In JavaScript, the following is allowed and can cause bugs.
// In TypeScript, it is caught immediately:
// accountBalance = "seven hundred"; // Error: Type 'string' is not assignable to type 'number'.
console.log(`Current Balance: $${accountBalance}`);
// Output: Current Balance: $750
```

### Common Mistake / Tip
> **Tip:** Static typing documents your intent directly in code, acting as self-updating documentation for your team.

---

## 4. What does the `noEmitOnError` compiler option mean, and why is it important?

### Answer
By default, the TypeScript compiler (`tsc`) will still emit JavaScript output files even if there are type errors in your code, assuming you may want to test partial changes. Enabling `"noEmitOnError": true` in `tsconfig.json` tells the compiler to halt and refuse to emit JavaScript files if any type error is detected. This flag is critical in production pipelines and strict projects to guarantee that broken code is never built or deployed.

### Code Example
```ts
// tsconfig.json setting: { "compilerOptions": { "noEmitOnError": true } }
const score: number = 100;

// If this type error exists:
// const invalidScore: number = "one hundred";

// With noEmitOnError: true, running `tsc` will produce 0 output files
// until all errors are resolved.
console.log(`Final Score: ${score}`);
// Output: Final Score: 100
```

### Common Mistake / Tip
> **Tip:** Always enable `noEmitOnError` in your Continuous Integration (CI) build scripts so broken types never slip into production bundles.

---

## 5. How do you initialize a TypeScript project from scratch?

### Answer
To initialize a TypeScript project, you first set up a standard Node.js project, install the TypeScript compiler as a development dependency, and then generate a configuration file. First, run `npm init -y` in your project terminal to create a `package.json`. Next, run `npm install -D typescript` to install the compiler locally, followed by `npx tsc --init` to create a starter `tsconfig.json` file.

### Code Example
```ts
// 1. Terminal commands to initialize:
// npm init -y
// npm install -D typescript
// npx tsc --init

// 2. src/index.ts
const appName: string = "TypeScript Study Guide";
console.log(`Initialized: ${appName}`);
// Output: Initialized: TypeScript Study Guide

// 3. Compile by running: npx tsc
```

### Common Mistake / Tip
> **Common Mistake:** Installing TypeScript globally (`npm install -g typescript`) can lead to version mismatches across different projects; always install it locally per project.

---

## 6. What is the TypeScript Compiler (`tsc`) and how does it work?

### Answer
The TypeScript Compiler, invoked via the command-line tool `tsc`, is the program responsible for parsing, type-checking, and transpiling your TypeScript code into JavaScript. When you run `tsc`, it reads your project's `tsconfig.json`, checks every file for type safety, reports any diagnostic errors in your terminal, and produces corresponding `.js` (and optional `.d.ts` declaration) files. If no errors occur, the resulting JavaScript is ready for execution by Node.js or browsers.

### Code Example
```ts
// Running 'npx tsc src/app.ts' transforms this TypeScript file:
const multiply = (x: number, y: number): number => x * y;

const result = multiply(6, 7);
console.log(`Product: ${result}`);
// Output: Product: 42
// The compiled JavaScript removes the ': number' annotations completely.
```

### Common Mistake / Tip
> **Tip:** You can run `npx tsc --watch` during development to automatically recompile your project whenever you save a file.

---

## 7. How does TypeScript compare to JavaScript, and why is TypeScript called a superset of JavaScript?

### Answer
TypeScript is described as a "syntactic superset" of JavaScript because all valid JavaScript code is automatically valid TypeScript code. You can rename any existing `.js` file to `.ts` and it will parse without syntax errors. TypeScript takes standard JavaScript and layers on a type system, interfaces, and compile-time checks, but at runtime, the code runs as standard JavaScript.

### Code Example
```ts
// Standard JavaScript syntax is 100% valid TypeScript:
const numbers = [1, 2, 3, 4, 5];
const doubled = numbers.map(n => n * 2);

// TypeScript adds type safety on top:
const sum: number = doubled.reduce((total, current) => total + current, 0);
console.log(`Sum of doubled: ${sum}`);
// Output: Sum of doubled: 30
```

### Common Mistake / Tip
> **Tip:** Think of TypeScript as a development-time safety harness around JavaScript; all JS is TS, but not all TS can run directly as JS without compilation.

---

## 8. What do the `target` and `lib` options in `tsconfig.json` configure?

### Answer
The `"target"` setting specifies which ECMAScript version the TypeScript compiler will down-compile your code to (for example, `"ES6"`, `"ES2020"`, or `"ESNext"`). The `"lib"` setting tells TypeScript which built-in ambient API type definitions to include during compilation (such as `["DOM", "ES2022"]`). `target` controls the JavaScript syntax emitted, while `lib` controls which browser or runtime APIs TypeScript recognizes without reporting unknown identifier errors.

### Code Example
```ts
// In tsconfig.json:
// { "compilerOptions": { "target": "ES2020", "lib": ["ES2020", "DOM"] } }

// String.prototype.replaceAll requires ES2021+ in lib:
const rawText = "apple-orange-apple";
const sanitized = rawText.replace(/-/g, " ");

console.log(sanitized);
// Output: apple orange apple
```

### Common Mistake / Tip
> **Common Mistake:** If your target is modern (e.g. `"ES2022"`), TypeScript automatically includes the matching modern standard libraries, so you rarely need to override `lib` unless you specifically need DOM types or custom runtime APIs.

---

## 9. What does the `module` compiler option in `tsconfig.json` control?

### Answer
The `"module"` compiler option controls the module code generation format that `tsc` uses when emitting JavaScript files. Common settings include `"CommonJS"` (which emits `require` and `module.exports` for legacy Node.js), `"ES6"` / `"ESNext"` (which emits standard `import` and `export` statements), and `"NodeNext"` (which adheres to modern Node.js ECMAScript module resolution). Choosing the right module setting ensures your compiled code integrates seamlessly with your runtime loader or bundler (such as Vite, Webpack, or native Node.js).

### Code Example
```ts
// In tsconfig.json: { "compilerOptions": { "module": "NodeNext" } }

// src/math.ts
export function add(a: number, b: number): number {
  return a + b;
}

// In CommonJS output this becomes: exports.add = add;
// In ESNext output this remains: export function add(...)
console.log(add(10, 20));
// Output: 30
```

### Common Mistake / Tip
> **Tip:** Modern full-stack and Node.js projects should favor `"NodeNext"` or `"ESNext"` to leverage native ES module treeshaking and official import syntax.

---

## 10. What is the `NodeNext` (or `Node16`) module resolution option in TypeScript?

### Answer
`NodeNext` is a modern compiler setting (`"module": "NodeNext"`, `"moduleResolution": "NodeNext"`) that mirrors how Node.js v12+ natively handles ES modules and CommonJS interoperability. Under `NodeNext`, TypeScript respects `package.json`'s `"type": "module"` field and enforces explicit relative file extensions (such as requiring `./utils.js` instead of `./utils` in import paths, even when importing a `.ts` file). This prevents subtle module loading mismatches between TypeScript compilation and actual Node.js runtime execution.

### Code Example
```ts
// When "moduleResolution": "NodeNext" is enabled:
// In TypeScript source file src/index.ts:
// Even though the source file is './helpers.ts', NodeNext requires importing './helpers.js':
// import { formatDate } from "./helpers.js";

function getTimestamp(now: Date): string {
  return now.toISOString();
}

console.log(getTimestamp(new Date("2026-01-01T00:00:00Z")));
// Output: 2026-01-01T00:00:00.000Z
```

### Common Mistake / Tip
> **Common Mistake:** Forgetting the `.js` extension in relative imports under `NodeNext` will cause compilation errors, even though the file on disk is currently `.ts`.

---

## 11. What are `rootDir` and `outDir` in `tsconfig.json` and how do they manage project files?

### Answer
`"rootDir"` defines the root directory where your input TypeScript source files live (commonly `"./src"`), while `"outDir"` specifies the destination directory where compiled JavaScript files and declaration maps will be emitted (commonly `"./dist"` or `"./build"`). By configuring these two options, TypeScript replicates your source directory structure cleanly inside the output directory without mixing `.ts` and `.js` files together in the same folders.

### Code Example
```ts
// tsconfig.json excerpt:
// {
//   "compilerOptions": {
//     "rootDir": "./src",
//     "outDir": "./dist"
//   }
// }

// File at: src/services/auth.ts
export const authVersion = "2.1.0";

// When compiled with `tsc`, emitted output is located at:
// dist/services/auth.js
console.log(`Auth Service v${authVersion}`);
// Output: Auth Service v2.1.0
```

### Common Mistake / Tip
> **Tip:** Always add your `"outDir"` (e.g., `dist/`) to your `.gitignore` file so compiled assets are never committed to version control.

---

## 12. What does setting `"strict": true` mean in `tsconfig.json`?

### Answer
Setting `"strict": true` turns on TypeScript's comprehensive suite of strict type-checking behaviors as a single master toggle. It enables essential safety flags including `"noImplicitAny"` (flags variables that implicitly fall back to `any`), `"strictNullChecks"` (prevents `null` or `undefined` from being assigned to other types without explicit unions), and `"strictFunctionTypes"`. Enabling strict mode is strongly recommended for all new projects as it maximizes TypeScript's ability to prevent bugs.

### Code Example
```ts
// With "strict": true
function calculateTax(amount: number, taxRate?: number): number {
  // If strictNullChecks is true, taxRate might be undefined:
  const rate = taxRate ?? 0.05; // Must handle potential undefined
  return amount * rate;
}

const tax = calculateTax(100);
console.log(`Tax: $${tax}`);
// Output: Tax: $5
```

### Common Mistake / Tip
> **Tip:** Starting a new project with `"strict": false` creates technical debt; always start with `"strict": true` from day one.

---

## 13. How does path mapping (`paths` and `baseUrl`) work in `tsconfig.json`?

### Answer
Path mapping allows you to replace long, messy relative import paths (like `../../components/Button`) with clean, absolute aliases (like `@components/Button` or `@/utils`). In `tsconfig.json`, you set `"baseUrl": "./"` to define the base directory for resolving non-relative module names, and then declare custom prefix patterns inside the `"paths"` object. Note that TypeScript path aliases only resolve types at compile time; you must also configure your bundler or runtime loader (such as Vite, Next.js, or `tsconfig-paths`) to resolve them at runtime.

### Code Example
```ts
// tsconfig.json:
// {
//   "compilerOptions": {
//     "baseUrl": "./",
//     "paths": {
//       "@utils/*": ["src/utils/*"]
//     }
//   }
// }

// Instead of: import { log } from "../../../utils/logger";
// You can write:
// import { log } from "@utils/logger";

const appPath = "@utils/logger";
console.log(`Alias configured for: ${appPath}`);
// Output: Alias configured for: @utils/logger
```

### Common Mistake / Tip
> **Common Mistake:** Expecting `tsc` to rewrite `@/*` alias imports to relative paths in the emitted `.js` files; `tsc` leaves import paths unchanged, so a bundler or path-resolver is required at runtime.
