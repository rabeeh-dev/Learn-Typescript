//! Encapsulation  &  Abstraction 
//* hiding the datas and giving implementation method or using method like getter and setter methods 
//* in here we have getStatus and setStatus methods for doing the implementation but we cant access the #status directly it is hidden 


type TaskStatus = "todo" | "in-progress" | "completed";
class Task {
  #status: "todo" | "in-progress" | "completed" = "todo";

  getStatus() : TaskStatus{ // methods get method for getting 
    return this.#status;
  }

  setStatus(value: "todo" | "in-progress" | "completed"): void { //set METHOD used for setting the value 
    this.#status = value;
  }

  complete():void {
    this.#status = "completed";
  }
}

const newtask = new Task();
newtask.setStatus("in-progress");
console.log(newtask.getStatus());
newtask.complete();
console.log(newtask.getStatus());

//? example code 

class Bank{
    #balance : number
    constructor(initialValue : number) { //* this will initialize when object is created 
        this.#balance = initialValue
    }
    //* Here we accessed the balance using the methods 
    //* checkbalance for checking balance using the method without directly using the balance 
    //* deposit and withdraw methods used for changing the value safely using the method without touching directly 

    checkBalance() : number{ 
        return this.#balance
    }

    deposit(amount : number):void{
        this.#balance += amount
    }

    withdraw(amount : number) : void{
        this.#balance -= amount
    }
}

const rabeeh = new Bank(1000)
console.log(rabeeh.checkBalance()) //* Output : 1000
rabeeh.deposit(1500)
console.log(rabeeh.checkBalance()) //* Output : 2500
rabeeh.withdraw(500)
console.log(rabeeh.checkBalance()) //*  Output : 2000



//* Encapsulation: Controls access to internal state and protects the object's rules.
//* Abstraction: Exposes a simple, meaningful interface while hiding unnecessary implementation details.


//! Abstract class vs interface 

//* the abstarct class containes implemented methods but not in interface 
//* class can hold instance state and constructor also but interface cant 

//? Use an abstract class when you need a shared base class with common state or behavior, as well as methods subclasses must implement.
//? Don't choose an abstract class merely because you want abstraction.
//? In TypeScript, a class can implement multiple interfaces, but it can only extend one class.

//* Super keyword 

// class EmailNotification extends Notification {
//   constructor(recipient, subject) { 
//     super(recipient); //* in here using super we calling the parent class notification 
//     this.subject = subject; //* we cant call this keyword without using the super keyword so that is how this works 
//   }
// }


//!Polimorphism 

//? Method overriding 
//* this is the process where if you have the same named method inside the child class the child class method override the parent class method which 
//* has same name 

class Parent {
  greet(): void {
    console.log("Hello");
  }
}

class Child extends Parent {
  override greet(): void {
    console.log("Hey!");
  }
}

//? Method overloading 
//* One method supports multiple call signatures, typically with different argument types or counts.

function format(value: string): string;
function format(value: number): string;

function format(value: string | number): string {
  return String(value);
}


//! Static properties and methods

//* Instance members: belong to individual objects created from a class.
//* Static members: belong to the class itself, not to individual instances.


class SubTask {
  static totalCreated = 0;

  constructor(public title: string) {
    SubTask.totalCreated++;
  }
}

const task1 = new SubTask("Build API");
const task2 = new SubTask("Write tests");

console.log(SubTask.totalCreated); // 2  //? this is static member 
console.log(task1.title);       // "Build API" //? this is instance member 

//! Static methods

//* Static methods are useful for behavior that belongs to the class rather than to a particular object.

//! getter setter methods 

class MiniTask {
  private _priority = 1;

  get priority(): number {
    return this._priority;
  }

  set priority(value: number) {
    if (!Number.isInteger(value) || value < 1 || value > 3) {
      throw new Error("Priority must be an integer from 1 to 3");
    }

    this._priority = value;
  }
}

const task = new MiniTask();

task.priority = 3; // Calls the setter
console.log(task.priority); // Calls the getter: 3

task.priority = 5; // Throws an error


//! Abstract methods vs. concrete methods

//* Abstract method: Declares what a subclass must implement. Used when different subclasses need different implementations.
//* Concrete method: Has an actual implementation. Used when behavior can be shared or executed as-is.

abstract class TaskRepository {
  abstract findAll(): Promise<Task[]>;

  log(): void {
    console.log("Task repository");
  }
}
//? Here, findAll() is abstract; log() is concrete.


//! Singleton pattern

