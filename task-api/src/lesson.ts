// Explicit Typing

let userId: number = 101;
let username: string = "rabeeh";
let isBlocked: boolean = false;
let accountBalance: number = 1500.5;

userId = 102;

//! Type inferance

//* These values are automaticaly set into the initial type of the values
let name = "rabeeh";
let id = 101;
let isAdmin = true;

//!any vs unknown
let newname: any = "bujair"; //* this is for stopinng the checking of typescript explicit (it will be like js)
let newid: unknown = "rabeeh";

console.log(newname.toUpperCase()); //* but here it allows but get error in run time
// console.log(newid.toUpperCase()) //* here we will get error because this checks before the compile time

//! Interface (Creating an object shape)
interface car {
  id: number;
  name: string;
  model: number;
  price: number;
}

let mycar: car = {
  id: 101,
  name: "toyota hycross",
  model: 2026,
  price: 180000,
};

//! Type alias

type User = {
  id: number;
  name: string;
  isBlocked: boolean;
};

//* type alias lets to use the union kind of operations like admin | user
//* Use interface for object contracts when it reads naturally.
//* Use type when you need unions, primitives, tuples, or more complex type combinations.
//*  Both are useful in professional TypeScript projects.

//! Union Types
let role: string | number;
role = "admin";
role = 100;
// role = false //* this gets error because this only accept the values of string and number

//!Literal Types

type UserRole = "admin" | "user" | "counciller";
let newrole: UserRole;

newrole = "admin";
// newrole = 'super-admin' //* this get error because this is not defined in the literal types we can assign the needed things there
//* This helps prevent invalid roles or statuses from accidentally spreading through your application.

type AccountStatus = "active" | "blocked" | "pending"; //* this is union types
let acc: AccountStatus = "active";
// let newacc : AccountStatus = 'deleted' //* this get error becuase of literal types

// union types vs enums

//enum define constants values
enum AccountStatuses {
  // this is enums type
  Active = "active",
  Deactivated = "deactivated",
  Closed = "closed",
}

let status: AccountStatus = AccountStatuses.Active; //* this is how you call the enum type things

//! Functions
//?parameter types

function greet(name: string) {
  return `Hello ${name}`;
}

greet("rabeeh"); //* this is valid because of the conditin whether the argument passing need to be a string
// greet(123) //* so this gets error

//! Return type
//* we can also setup the return type also like the output needs to be this type

function newgreet(name: string): string {
  return name; //* in this case we can only return the string here
}

function getUsername(name?: string): string {
  return name ?? "temp"; //* here we used ?? for a fallback for the null or undefined in this situation
}

//! Callback functions

function processUser(name: string, callback: (username: string) => void): void {
  callback(name);
}

processUser("Rabeeh", (username) => {
  console.log(`Hello, ${username}!`);
});

//! Type narrowing
//* it is the method of if there is more than one type it checks using if else ot find the type and do the selected task
//* like if the type string do this
//* and if the type is number do this

function formatValue(value: string | number): string {
  if (typeof value === "string") {
    return value.toUpperCase();
  } else {
    return value.toFixed(2);
  }
}

console.log(formatValue("rabeeh"));
console.log(formatValue(12.5));

//! Type Guards
//* Imagine you're building your User API. A user's ID might arrive as either a number or a string.

function getLength(value: string | string[]): number {
  if (Array.isArray(value)) {
    return value.length;
  }
  return value.length;
}
console.log(getLength("rabeeh")); //* in this output will be rabeeh.length
console.log(getLength(["rabeeh", "bujair"])); //* and this case the output will be array.length that is 2

//?another example

function describeValue(value: string | string[]): string {
  if (Array.isArray(value)) {
    return `Array contains ${value.length} items`;
  }

  return `String : ${value}`;
}

console.log(describeValue(["rabeeh", "bujair", "mom"]));
console.log(describeValue("rabeeh"));

//! custom guards

interface Customer {
  id: number;
  name: string;
}

function describeUser(value: Customer | string): string {
  if (typeof value === "string") {
    return `Guest : ${value}`;
  }
  return `User : ${value.name}`;
}

console.log(describeUser("Rabeeh"));
console.log(describeUser({ id: 1, name: "Bujair" }));

//! The in operator as a type guard

interface Client {
  id: number;
  name: string;
}

interface NewProduct {
  id: number;
  price: number;
}

function getDetails(item: Client | NewProduct): string {
  if ("name" in item) {
    return `Client : ${item.name}`;
  }

  return `Price : ${item.price}`;
}

//* this operator is used when we have two interface we cant use the above because the both are objects
//* so in this case we check whether the key is in the object if yes do this
//* if not included do this like wise

//?Another example

function processUser1(value: string | string[] | Client): string {
  if (typeof value === "string") {
    return `Text: ${value}`;
  } else if (Array.isArray(value)) {
    return `Items Length: ${value.length}`;
  } else {
    return `Client name: ${value.name}`;
  }
}

//! Optional properties and null safety

function getDisplayName(name?: string | undefined): string {
  //? or you can write name ?: string this is also meant that
  if (name) {
    return `Name : ${name.toUpperCase()}`;
  } else {
    return `Guest`;
  }
}

console.log(getDisplayName("Rabeeh"));
console.log(getDisplayName(undefined));

//* this is a schenario where user will have some times profile picture sometimes not
//* so for getting proper fallback we use this type of method to solve it
//* if user has name show the name
//* if user doesnt not have name show guest

//! IMPORTANT TOPIC
//! Generics in TypeScript

//* Imagine you want a function that returns whatever value you give it.
//* you will need to create one for string one for numbers that is repetative
//* What if we could write one function that works with different types while preserving the type of the input?

function returnValue<T>(value: T): T {
  return value;
}

//* <T> declares a type parameter. T is a placeholder for a type.
//* value: T says the input has that type.
//* : T says the return value has that same type.

const newname1 = returnValue("Rabeeh"); // inferred as string
const age = returnValue(19); // inferred as number
const active = returnValue(true); // inferred as boolean

//? another example

function getFirst<T>(value: T[]): T {
  return value[0];
}

console.log(getFirst([10, 20, 30]));

//! Generics with API responses

interface Product {
  id: number;
  name: string;
  price: number;
}

interface ApiResponce<T> {
  success: boolean;
  message: string;
  data: T;
}

const ProductFetch: ApiResponce<Product> = {
  success: true,
  message: "Product fetched successfully",
  data: { id: 1, name: "Keyboard", price: 2500 },
};

//! One generic, multiple data types

interface NewUser {
  id: number;
  name: string;
  email: string;
}

const UserResponce: ApiResponce<NewUser> = {
  success: true,
  message: "User fetched successfully",
  data : {id : 1 , name : 'rabeeh' , email : 'rabeeh@gmail.com'}
}

//! Generic constraints

function getId<T extends { id: number }>(value: T): number {
  return value.id;
}

//* T extends { id: number } means that T must be a type containing an id property whose value is a number.

//! keyof and typeof

//* typeof — derive a type from a value
//* keyof — get the keys of a type

const employee = {
  id: 10,
  name: "Rabeeh",
  department: "Engineering"
};

type Employee = typeof employee // derives its type 
type EmployeeKey = keyof Employee //derives its keys 

let selectedKey: EmployeeKey = "department";
selectedKey = 'name'

//! Type assertions

//* A type assertion tells TypeScript to treat a value as a particular type.
//* Here, value is initially typed as unknown. The expression value as string tells TypeScript to treat it as a string for type checking.

const a = "123" as unknown as number; // Assertion; runtime value is still a string //* in this only just telling ts to assume its that type 
const b = Number("123");             // Actual conversion; runtime value is a number //* here is the actual convertion is happening 

//! Custom type guards and type predicates
//! A. Type guards
//* A type guard is a check that narrows a value to a more specific type.

//? eg : 

function printValue(value: string | number) {
  if (typeof value === "string") {
    console.log(value.toUpperCase());
  } else {
    console.log(value.toFixed(2));
  }
}

//! B. Type predicates
//* A type predicate lets you create your own reusable type-checking function using the value is Type syntax.

function isString(value: unknown): value is string {
  return typeof value === "string";
}

//todo Concept	Purpose :
//? Type assertion	Tell TypeScript what type to assume
//? Type guard	Check a value to narrow its type
//? Type predicate	Define a reusable function that communicates a type check


//! Modules — import and export
//* Modules let you split your code across files instead of putting everything in one giant file

//? export.ts 

// export interface User {
//   id: number;
//   name: string;
// }

// export function getUserName(user: User): string {
//   return user.name;
// }

//? import.ts

// import { User, getUserName } from "./user.js";

// const user: User = {
//   id: 1,
//   name: "Rabeeh"
// };

// console.log(getUserName(user));


