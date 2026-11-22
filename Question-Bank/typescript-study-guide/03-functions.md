# Module 03: Functions

This module covers typing functions in TypeScript. You will learn how to type parameters, return values, optional and default arguments, rest parameters, function signatures, explicit `this` typing, and function overloads.

---

## 1. How do default parameters work in TypeScript functions?

### Answer
Default parameters allow you to specify fallback values for function arguments if the caller passes `undefined` or omits the argument entirely. In TypeScript, providing a default value automatically allows TypeScript to infer the parameter's type, making an explicit type annotation optional. Default parameters are placed after required parameters or can be explicitly passed `undefined` to trigger the fallback.

### Code Example
```ts
// taxRate defaults to 0.08 (8%) if not provided
function calculateTotal(price: number, taxRate: number = 0.08): number {
  return price + price * taxRate;
}

const withDefault = calculateTotal(100);
const withCustom = calculateTotal(100, 0.15);

console.log(`Standard: $${withDefault}, Custom: $${withCustom}`);
// Output: Standard: $108, Custom: $115
```

### Common Mistake / Tip
> **Tip:** If a parameter has a default value, you don't need to mark it with `?` as optional; TypeScript already considers it optional.

---

## 2. How do optional parameters work in TypeScript functions?

### Answer
Optional parameters are defined by appending a question mark (`?`) after the parameter name, indicating that the argument may be omitted when invoking the function. Inside the function body, the parameter's type automatically becomes a union of its declared type and `undefined` (e.g., `string | undefined`). In TypeScript, all optional parameters must be positioned after any required parameters in the parameter list.

### Code Example
```ts
function formatName(firstName: string, lastName?: string): string {
  if (lastName !== undefined) {
    return `${firstName} ${lastName}`;
  }
  return firstName;
}

console.log(formatName("Ada", "Lovelace"));
// Output: Ada Lovelace
console.log(formatName("Grace"));
// Output: Grace
```

### Common Mistake / Tip
> **Common Mistake:** Placing an optional parameter before a required parameter (e.g., `(prefix?: string, name: string)`) causes a compile error; required parameters must always come first.

---

## 3. What are rest parameters and how are they typed in TypeScript?

### Answer
Rest parameters allow a function to accept an indefinite number of arguments as an array, using the JavaScript spread/rest operator (`...`). In TypeScript, you type a rest parameter as an array type (such as `number[]` or `string[]`) or as a tuple type if you need exact length and positional requirements. A function can only have one rest parameter, and it must always be the final parameter in the function declaration.

### Code Example
```ts
// Rest parameter typed as an array of numbers
function sumAll(multiplier: number, ...numbers: number[]): number {
  const sum = numbers.reduce((acc, curr) => acc + curr, 0);
  return sum * multiplier;
}

const total = sumAll(2, 10, 20, 30);
console.log(`Scaled Total: ${total}`);
// Output: Scaled Total: 120
```

### Common Mistake / Tip
> **Tip:** Always annotate rest parameters as array types (e.g., `...items: string[]`), not scalar types like `...items: string`.

---

## 4. What are function overloads and how do you implement them in TypeScript?

### Answer
Function overloads allow a single function to be called with different parameter counts or different argument types, returning different results depending on how it was invoked. You implement overloads by writing one or more overload signatures (without a function body) followed by a single implementation signature that handles all possible cases. Callers only see and interact with the overload signatures; the implementation signature is hidden from the external API contract.

### Code Example
```ts
// Overload signatures
function combine(a: string, b: string): string;
function combine(a: number, b: number): number;

// Single implementation signature
function combine(a: any, b: any): any {
  return a + b;
}

const textResult = combine("Hello, ", "World!"); // returns string
const numResult = combine(15, 25);               // returns number

console.log(`Text: ${textResult}, Num: ${numResult}`);
// Output: Text: Hello, World!, Num: 40
```

### Common Mistake / Tip
> **Common Mistake:** The implementation signature cannot be called directly unless it matches one of the overload signatures.

---

## 5. How do you explicitly type the `this` parameter in TypeScript functions?

### Answer
In standard JavaScript, the `this` keyword inside a regular function is determined dynamically by how the function is called, which frequently leads to runtime bugs where `this` is `undefined`. TypeScript allows you to declare an explicit `this` parameter as the very first parameter of a function to enforce the type of object the function can be called on. This fake `this` parameter is purely a compile-time check and is stripped away during compilation, so it does not affect normal argument positions.

### Code Example
```ts
interface UIElement {
  id: string;
}

// First parameter 'this' specifies what 'this' must be
function handleClick(this: UIElement, eventType: string): void {
  console.log(`Element ${this.id} received event: ${eventType}`);
}

const button: UIElement = { id: "submit-btn" };
// Call using Function.prototype.call or bind
handleClick.call(button, "click");
// Output: Element submit-btn received event: click
```

### Common Mistake / Tip
> **Tip:** Arrow functions do not bind their own `this`; they capture `this` lexically from their enclosing scope, so explicit `this` annotations are only used for traditional `function` declarations.

---

## 6. How do you define and type callback functions and function signatures in TypeScript?

### Answer
You can define the type shape of a callback or any function using either a type alias with arrow syntax (e.g., `type Callback = (data: string) => void;`) or an interface with a call signature. Typing your callbacks ensures that the caller passes a function with the expected parameter types and return type. If a callback is not expected to return any meaningful value, typing its return as `void` allows consumers to pass functions that return anything, which will safely be ignored.

### Code Example
```ts
// Function type alias defining the callback contract
type FilterPredicate = (item: number) => boolean;

function filterNumbers(list: number[], predicate: FilterPredicate): number[] {
  return list.filter(predicate);
}

const numbers = [1, 2, 3, 4, 5, 6];
const isEven: FilterPredicate = (n) => n % 2 === 0;

const evens = filterNumbers(numbers, isEven);
console.log(`Even numbers: ${evens.join(", ")}`);
// Output: Even numbers: 2, 4, 6
```

### Common Mistake / Tip
> **Tip:** Use `type MathFn = (x: number) => number;` to create reusable function contracts across your codebase.
