import express from 'express';
import { Response, Request } from 'express';
import { User } from './src/model/user';
import { id, todos, users } from './src/data';
import {Todo} from './src/model/todo';

var cors = require('cors');
const application = express();
application.use(cors());
application.use(express.json());
application.use(express.urlencoded({
  extended: true
}));

const port = 3000

// users
application.get('/users', (req: Request, res: Response) => {
  res.contentType('application/json')
  res.send(JSON.stringify(users))
})

application.get('/users/:userId', (req: Request, res: Response) => {
  const userId = +req.params.userId;
  const user = users.find((user:User) => user.id === userId);
  if(!user) {
    res.status(404);
    res.send();
  }else{
    res.contentType('application/json');
    res.send(JSON.stringify(user));
  }
})

application.post('/users', (req: Request,res: Response) => {
  const user = req.body;
  user.id = id();
  users.push(user);
  res.status(201);
  res.contentType('application/json');
  res.send(JSON.stringify(user));
})

application.put('/users/:userId', (req: Request, res: Response) => {
  const userId = +req.params.userId;
  const index = users.findIndex((user: User) => user.id === userId);
  if (!index) {
    res.status(404);
    res.send();
  } else {
    const newUser = req.body;
    users.splice(index, 1, newUser);
    res.contentType('application/json');
    res.send(JSON.stringify(newUser));
  }
});

application.delete('/users/:userId', (req: Request, res: Response) => {
  const userId = +req.params.userId;
  const index = users.findIndex((user: User) => user.id === userId);
  if (!index) {
    res.status(404);
    res.send();
  } else {
    users.splice(index, 1);
    res.status(200);
    res.send();
  }
});


// todos

application.get('/todos', (req: Request, res: Response) => {
  res.contentType('application/json')
  res.send(JSON.stringify(todos));
})

application.post('/todos', (req: Request, res: Response) => {
  const todo = req.body;
  todo.id = id();
  todos.push(todo);
  res.status(201);
  res.contentType('application/json');
  res.send(JSON.stringify(todo));
});

application.put('/todos/:todoId', (req: Request, res: Response) => {
  const todoId = +req.params.todoId;
  const index = todos.findIndex((todo: Todo) => todo.id === todoId);
  if (!index) {
    res.status(404);
    res.send();
  } else {
    const newTodo = req.body;
    todos.splice(index, 1, newTodo);
    res.contentType('application/json');
    res.send(JSON.stringify(newTodo));
  }
});


application.delete('/todos/:todoId', (req: Request, res: Response) => {
  const todoId = +req.params.todoId;
  const index = todos.findIndex((todo: Todo) => todo.id === todoId);
  if (!index) {
    res.status(404);
    res.send();
  } else {
    todos.splice(index, 1);
    res.status(200);
    res.send();
  }
});

application.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})
