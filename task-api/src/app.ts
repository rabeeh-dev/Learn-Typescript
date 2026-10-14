import express, { Request, Response } from "express";

const app = express();
const PORT = 3000;

app.use(express.json());

interface User {
  readonly id: number;
  name: string;
  email ?: string;
  isBlocked: boolean;
}

let users: User[] = [
  { id: 100, name: "Rabeeh", isBlocked: false },
  { id: 101, name: "Ashkar Ali", isBlocked: false },
];

let nextId = 102;

//Fetch Users

app.get("/api/users", (req: Request, res: Response) => {
  res.json(users);
});

//Fetch One user

app.get("/api/users/:id", (req: Request, res: Response) => {
  const id = Number(req.params.id);
  const user = users.find((eachUser) => eachUser.id === id);

  if (!user) {
    // res.json('No user found')
    res.status(404).json({ message: "Task not found" });
    return;
  }

  res.json(user);
});

//Create User

app.post("/api/users", (req: Request, res: Response) => {
  const { name } = req.body as { name?: string };

  if (typeof name !== "string") {
    res.status(400).json({ message: "Give Valid Name For The User !" });
    return;
  }

  const newUser = {
    id: nextId++,
    name: name,
    isBlocked: false,
  };

  users.push(newUser);
  res.status(201).json({ message: "User created ", User: newUser });
});

//Block and Unblock User

app.patch("/api/users/:id", (req: Request, res: Response) => {
  const id = Number(req.params.id);
  const user = users.find((eachUser) => eachUser.id === id);

  if (!user) {
    res.status(404).json({ message: "no user found" });
    return;
  }

  const { name, isBlocked } = req.body as {
    name?: string;
    isBlocked?: boolean;
  };

  if (isBlocked !== undefined && typeof isBlocked !== "boolean") {
    res.status(404).json("invalid request");
  }

  if (isBlocked !== undefined) {
    user.isBlocked = isBlocked;
  }
  res.json(user);
});

//Remove User

app.delete("/api/users/:id", (req: Request, res: Response) => {
  const id = Number(req.params.id);
  const index = users.findIndex((eachUser) => eachUser.id === id);

  if (index === -1) {
    res.status(404).json({ message: "user not found" });
    return
  }

  users.splice(index, 1);
  res.status(200).json({ message: "user deleted" }).send();
});

app.get("/", (req: Request, res: Response) => {
  res.json({
    message: "Task API is running!",
  });
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
