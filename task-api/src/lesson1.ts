// Explicit Typing 

let userId : number = 101
let username : string = 'rabeeh'
let isBlocked : boolean = false 
let accountBalance : number = 1500.50

userId = 102

// Type inferance 
// These values are automaticaly set into the initial type of the values 
let name = 'rabeeh'
let id = 101
let isAdmin = true

// any vs unknown 

let newname : any = 'bujair' // this is for stopinng the checking of typescript explicit (it will be like js)
let newid : unknown = 'rabeeh'

console.log(newname.toUpperCase()) // but here it allows but get error in run time 
console.log(newid.toUpperCase()) // here we will get error because this checks before the compile time 

// Interface (Creating an object shape)

interface car{
    id : number,
    name : string ,
    model : number,
    price : number
}

let mycar : car = {
    id : 101,
    name : 'toyota hycross',
    model : 2026,
    price : 180000
}

// Type alias 

type User = {
  id: number;
  name: string;
  isBlocked: boolean;
};

// type alias lets to use the union kind of operations like admin | user 
// Use interface for object contracts when it reads naturally.
// Use type when you need unions, primitives, tuples, or more complex type combinations.
//  Both are useful in professional TypeScript projects.

//Union Types 

let role : string | number 
role = 'admin'
role = 100
role = false // this gets error because this only accept the values of string and number 

