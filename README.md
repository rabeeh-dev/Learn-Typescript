# TypeScript Comprehensive Study Guide

Welcome to the **TypeScript Comprehensive Study Guide**, a structured, beginner-to-advanced learning manual compiled and edited from real-world study notes. Every question has been carefully rewritten with clear technical explanations, runnable TypeScript code examples, and practical tips.

---

## Table of Contents

| Module | Title | Topics Covered | Questions |
| :---: | :--- | :--- | :---: |
| [**Module 01**](./01-introduction-and-setup.md) | **Introduction & Setup** | TypeScript definition, compile vs runtime, static vs dynamic, `tsc`, `tsconfig.json` options (`target`, `lib`, `module`, `rootDir`, `outDir`, `strict`, `paths`, `NodeNext`, `noEmitOnError`). | **13** |
| [**Module 02**](./02-basic-types.md) | **Basic Types** | Primitives, `any` vs `unknown`, `void` vs `never`, `void` vs `undefined`, arrays vs tuples, `readonly` tuples, enums vs string unions, numeric/string enums, type inference [ADDED], and `strictNullChecks` [ADDED]. | **10** |
| [**Module 03**](./03-functions.md) | **Functions** | Default parameters, optional parameters, rest parameters, function overloads, explicit `this` typing, and callback signatures. | **6** |
| [**Module 04**](./04-objects-interfaces-and-type-aliases.md) | **Objects, Interfaces & Type Aliases** | Interfaces vs Type Aliases, object shapes, `readonly` and optional properties, index signatures, excess property checking, structural typing, and assignability. | **6** |
| [**Module 05**](./05-unions-intersections-and-narrowing.md) | **Union, Intersection & Literal Types, Type Narrowing** | Literal types, type narrowing & Control Flow Analysis, union types (`\|`), intersection types (`&`), discriminated unions, exhaustive checking (`never`), `as const` [ADDED], and custom type guards [ADDED]. | **8** |
| [**Module 06**](./06-classes-and-oop.md) | **Classes & OOP** | Class structures, access modifiers (`public`, `private`, `protected`), abstract classes & concrete methods, `implements` & parameter properties, TS `private` vs JS `#private`, inheritance (`extends`/`super`), SOLID principles, Singleton pattern, and Dependency Injection. | **9** |
| [**Module 07**](./07-generics.md) | **Generics** | Generic functions, generic interfaces and classes, generic constraints (`extends`) and defaults, and `keyof` lookup constraints (`<T, K extends keyof T>`) [ADDED]. | **4** |
| [**Module 08**](./08-utility-and-advanced-types.md) | **Utility Types & Mapped/Conditional Types** | `keyof`, `typeof`, indexed access types (`T[K]`), standard utility types (`Partial`, `Required`, `Readonly`, `Pick`, `Omit`, `Record`), mapped types, template literal types, conditional types, and the `infer` keyword. | **4** |
| [**Module 09**](./09-modules-and-declarations.md) | **Modules, Namespaces & Declaration Files** | ES Modules vs CommonJS [ADDED], namespaces vs modern modules [ADDED], declaration files (`.d.ts`) & ambient declarations (`declare`) [ADDED], and `import type` [ADDED]. | **4** |
| [**Module 10**](./10-advanced-topics.md) | **Advanced Topics** | Type assertions (`as`), the `satisfies` operator, branded (nominal) types, ECMAScript stage 3 decorators, and the non-null assertion operator (`!`) [ADDED]. | **5** |
| [**Module 11**](./11-tooling-and-real-world-usage.md) | **Tooling & Real-World Usage** | Software engineering principles (KISS, DRY, YAGNI), ESLint & `@typescript-eslint`, Git hooks with Husky, test harness engineering, error handling in `catch(error: unknown)` [ADDED], and React component typing [ADDED]. | **6** |
| **Total** | | | **59** |

---

## Study Guide Conventions

Every question in this guide adheres to a strict, beginner-friendly format:
- **Question**: Clearly worded with standard industry terminology.
- **Answer**: 2–5 plain-English sentences defining jargon upon introduction.
- **Code Example**: A concise, runnable `5–15 line` TypeScript snippet illustrating the concept, verified with `tsc --noEmit`.
- **Common Mistake / Tip**: Practical, one-line guidance to help you avoid production pitfalls.
- **[ADDED] Tag**: Marks essential topics introduced to fill gaps from the original study notes.

---

