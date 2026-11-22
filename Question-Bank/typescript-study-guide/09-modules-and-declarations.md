# Module 09: Modules, Namespaces & Declaration Files

This module explains modular architecture and ambient typing in TypeScript. You will learn the difference between standard ES Modules and CommonJS, why legacy namespaces were superseded, how declaration files (`.d.ts`) provide types for JavaScript libraries, and why type-only imports (`import type`) optimize compiled bundles.

---

## 1. [ADDED] What is the difference between ES Modules (`import`/`export`) and CommonJS (`require`/`module.exports`) in TypeScript?

### Answer
ES Modules (ESM) use standard `import` and `export` statements and are the official, standardized module format of modern JavaScript, supported natively by modern browsers and Node.js. CommonJS (CJS) is the legacy Node.js module system that relies on dynamic `require()` calls and assigning to `module.exports`. TypeScript allows you to write standard ESM syntax in your source code, and its `"module"` compiler option determines whether `tsc` emits ESM or transpiles down to CommonJS.

### Code Example
```ts
// mathUtils.ts - Modern ES Module export
export const PI = 3.14159;

export function square(n: number): number {
  return n * n;
}

// In another file:
// import { PI, square } from "./mathUtils.js";
console.log(`PI: ${PI}, Square of 4: ${square(4)}`);
// Output: PI: 3.14159, Square of 4: 16
```

### Common Mistake / Tip
> **Tip:** Modern frontend and backend TypeScript projects should standardize on ES Modules for static analysis and tree-shaking benefits.

---

## 2. [ADDED] What are TypeScript Namespaces and why are ES Modules preferred in modern codebases?

### Answer
TypeScript Namespaces (previously known as "internal modules" using the `namespace` keyword) were introduced in the early days of TypeScript before ECMAScript had an official module system, allowing developers to group related code under a global object. Today, standard ES Modules have superseded namespaces because modules provide isolated file scopes, tree-shaking, and native runtime support across browsers and Node.js. Modern TypeScript style guides recommend avoiding `namespace` entirely in application code in favor of standard ES file-based modules.

### Code Example
```ts
// Legacy Namespace syntax (avoid in modern apps):
namespace LegacyMath {
  export const version = "1.0";
  export function cube(x: number): number {
    return x * x * x;
  }
}

// Modern ES Module equivalent: export standalone functions in their own file
console.log(`Version: ${LegacyMath.version}, Cube: ${LegacyMath.cube(3)}`);
// Output: Version: 1.0, Cube: 27
```

### Common Mistake / Tip
> **Tip:** The only common remaining modern use case for `namespace` is in `.d.ts` declaration files to describe legacy global UMD JavaScript libraries.

---

## 3. [ADDED] What are Declaration Files (`.d.ts`) and how do ambient declarations (`declare`) work for untyped JavaScript libraries?

### Answer
Declaration files (ending with `.d.ts`) contain purely type information and zero executable JavaScript implementation code. They describe the shapes, functions, and classes of external JavaScript libraries to the TypeScript compiler, enabling autocompletion and compile-time type checking for plain JavaScript packages. The `declare` keyword creates "ambient declarations," telling TypeScript that a variable, function, or module already exists in the global runtime environment (for example, via a `<script>` tag or an untyped npm package).

### Code Example
```ts
// Inside an ambient declaration file (e.g., globals.d.ts):
// declare const APP_VERSION: string;
// declare function trackAnalytics(event: string): void;

// TypeScript code consuming ambient declarations:
declare const APP_SECRET: string;

function showSecret(): void {
  // TypeScript knows APP_SECRET is a string without error:
  if (typeof APP_SECRET !== "undefined") {
    console.log("App secret is configured.");
  }
}
showSecret();
// Output: App secret is configured.
```

### Common Mistake / Tip
> **Tip:** If an npm package does not ship with TypeScript types, search for community-maintained types on DefinitelyTyped by installing `@types/package-name`.

---

## 4. [ADDED] What is the difference between `import type` and `import` in TypeScript, and why is type-only import useful?

### Answer
A regular `import { MyType, helper } from "./module"` imports both runtime values and compile-time types. An `import type { MyType } from "./module"` guarantees that the imported item is treated strictly as a type and will be 100% stripped from the emitted JavaScript output. This prevents accidental circular runtime dependency cycles and ensures single-file transpilers (like Vite, esbuild, and Babel) do not accidentally emit runtime imports for types that don't exist in JavaScript.

### Code Example
```ts
// Type-only import guarantees zero emitted JavaScript code for this line
// import type { UserProfile } from "./types";

interface LocalUser {
  id: number;
  name: string;
}

// Using type-only syntax directly in a normal import:
// import { calculateAge, type DateString } from "./dateUtils";

const currentUser: LocalUser = { id: 1, name: "Maria" };
console.log(`User loaded: ${currentUser.name}`);
// Output: User loaded: Maria
```

### Common Mistake / Tip
> **Tip:** Enable `"verbatimModuleSyntax": true` in `tsconfig.json` to have TypeScript strictly enforce `import type` for all type imports.
