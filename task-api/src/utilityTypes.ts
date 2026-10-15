
//! Utility Types

//* Utility types are built-in TypeScript tools that help you transform existing types instead of rewriting them from scratch.

//* Partial<T> makes all properties of a type optional.
//* suppose we have a type user which has three keys id name and email all are required
//* normalyy all the fields are required 
//* but imagine user need to change only name in that case you doesnt need to send the id and email again and again 
//? in that case the Partials helps 

interface newProduct{
  id: number;
  name: string;
  price: number;
}

type updateProduct = Partial<newProduct>

const changes : updateProduct = {
  price : 1999
}

//! Pick<T, K>
//! Pick lets you select only the properties you need from an existing type.

//* imagine you have interface containing id,name,email,password and etc but you only need a certain things 
//* for example the name and id 
//* so normaly we need to create a another interface but ts gives a shortcut 
//* and that is Pick 

type ProductPreview = Pick<newProduct , "name" | "price">

const preview : ProductPreview = {
  name : "Keyboard",
  price : 1000
}

//* in here we only accessed the name and price of the newproduct this is how the pick works 

//! Omit<T, K>
//* You already know that Pick selects properties. 
//* Omit does the opposite: it removes selected properties from a type.

//? Suppose you want a product type without description.

interface NewClient {
  id: number;
  name: string;
  email: string;
  password: string;
}

type PublicUser = Omit<NewClient , "password">

const publicUser : PublicUser = {
  id : 1,
  name : 'rabeeh',
  email : 'rbh@example.com'
}

//! Required<T>
//* Required<T> makes all properties of a type required, even if they were originally optional.

interface OldProduct {
  id: number;
  name: string;
  description?: string;
  price?: number;
}

type CompleteProduct = Required<OldProduct>

const complete : CompleteProduct = {
  id : 101,
  name : 'old monk',
  description : 'good one',
  price : 1000
}

//! Readonly<T>.

//* Readonly<T> makes all properties of a type read-only, 
//* meaning TypeScript prevents you from reassigning those properties after the object is created.

interface Course {
  id: number;
  title: string;
  duration: number;
}

type ReadonlyCourse = Readonly<Course>

const course : ReadonlyCourse = {
  id : 101,
  title : 'trading',
  duration : 1
}

//? course.title = 'full stack development' 
//* here we will get error we cant change the values 


//! Record<K, T>
//* Record creates an object type with a specified set of keys and a consistent value type.
//! Record<Keys, ValueType>

type NewUserRole = Record<"admin" | "user" | "guest", string>;

const roleDescription : NewUserRole = {
  admin : 'Full Access',
  user : 'standard access',
  guest : 'minimal acces'
}


//! ReturnType<T>
//* It extracts the return type of a function.

function getUser() {
  return {
    id: 1,
    username: "rabeeh",
    isAdmin: false
  };
}

type GettingUser = ReturnType<typeof getUser>

const gettingTheUser : GettingUser = {
  id : 1,
  username : 'bujair',
  isAdmin : true
}

//* so in this you extracted a return types of a function and you duplicated it with type gettingUser
//* And you created one variable using that extracted values 

//! Parameters<T> 
//* Parameters<T> extracts a function's parameter types as a tuple.

function updateNewProduct(id: number, name: string, price: number) {
  return { id, name, price };
}
type UpdateProductParams = Parameters<typeof updateNewProduct>
const productArgs : UpdateProductParams = [101,'rabeeh',1000]

//! Return Type vs Parameter 

//? 1. ReturnType<T> — what comes out 📤

// type User = {
//   id: number;
//   name: string;
// };

//* It describes the returned object, including its properties and their types.

//* But consider this:

// function getAge() {
//   return 19;
// }

// type Age = ReturnType<typeof getAge>; // number


//? Here, the return type is just number, not an object!
//? 2. Parameters<T> — what goes in 📥

// type UserParams = [id: number, name: string];
//* It extracts the function's parameters as a tuple, preserving their order and types.

//! Exclude<T, U>

//* removes types from a union that are assignable to U.

type Status = "pending" | "approved" | "rejected";

type FinalStatus = Exclude<Status, "pending">; //? this becomes ==>  result : type FinalStatus = "approved" | "rejected";

//! Extract<T, U>

//* Extract<T, U> keeps matching union members and removes the rest.

type ABUserRole = "admin" | "user" | "guest";

type PrivilegedRole = Extract<ABUserRole, "admin" | "user">; //? this becomes --> type PrivilegedRole = "admin" | "user";

//? another example

type ABStatus = "pending" | "approved" | "rejected" | "cancelled";
type CompletedStatus = Extract<ABStatus , "approved" | "rejected">

const ABCstatus : CompletedStatus = "approved"



//! Exclude vs Extract : 

//? Exclude<T, U> removes matching union members.
//? Extract<T, U> keeps matching union members and removes the rest.


//! NonNullable<T>

//* This utility removes null and undefined from a type.

type UserName = string | null | undefined;
type ValidUserName = NonNullable<UserName>; //* and now this becomes type ValidUserName = string;

//? another example

type ProductId = number | null | undefined;
type ValidProductId = NonNullable<ProductId>

//! Awaited<T>

//* Awaited<T> extracts the value type that a Promise resolves to. It also handles nested promises.

async function getNewUser() {
  return {
    id: 1,
    username: "rabeeh"
  };
}

type VarUser = Awaited<ReturnType<typeof getNewUser>>;

//* ReturnType<typeof getUser> extracts the return type: Promise<{ id: number; username: string }> .
//* Awaited<...> unwraps the promise.
//* User becomes { id: number; username: string }.

async function getProduct() {
  return {
    id: 101,
    name: "Keyboard",
    price: 1999
  };
}

type ProductFind = Awaited<ReturnType<typeof getProduct>>
const productFind : ProductFind = {
  id : 101,
  name : 'rabeeh',
  price : 12999
}


