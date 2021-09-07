import express, {Request, Response} from 'express';
import {User} from './src/model/user';
import {id, todos, users} from './src/data';
import {Todo} from './src/model/todo';
var cors = require('cors');
const application = express();
import * as jwt from 'jsonwebtoken';
const bodyParser = require('body-parser');
const accessTokenSecret = 'todoapp123';

application.use(bodyParser.json());


application.use(cors());
application.use(express.json());
application.use(express.urlencoded({
  extended: true
}));

const port = 3000;

interface UserRequest extends Request {
  user?: User
}

const authenticateJWT = async (req: UserRequest, res: Response, next: any) => {
  const authHeader = req.headers.authorization;
  console.log(authHeader);
  if (authHeader) {
    const token = authHeader.split(' ')[1];

    jwt.verify(token, accessTokenSecret, (err: any) => {
      if (err) {
        return res.sendStatus(403);
      }

      const decodedToken = jwt.decode(token) as any;
      const userId: number = decodedToken.id;

      console.log(userId);

      const userInDB = users.find(u => u.id === userId);

      console.log(userInDB);

      if (!userInDB) {
        res.sendStatus(401);
      } else {
        req.user = userInDB;
        next();
      }
    });
  } else {
    res.sendStatus(401);
  }
};


// users
application.get('/users', authenticateJWT, (req: Request, res: Response) => {
  res.contentType('application/json');
  res.send(JSON.stringify(users));
});

application.get('/users/current', authenticateJWT, (req: UserRequest, res: Response) => {
  res.contentType('application/json');
  res.send(JSON.stringify(req.user));
});

application.get('/users/:userId', (req: Request, res: Response) => {
  const userId = +req.params.userId;
  const user = users.find((user: User) => user.id === userId);
  if (!user) {
    res.status(404);
    res.send();
  } else {
    res.contentType('application/json');
    res.send(JSON.stringify(user));
  }
});

application.get('/users/:userId/todos', authenticateJWT, (req: Request, res: Response) => {
  const userId = +req.params.userId;
  const user = users.find((user: User) => user.id === userId);
  if (!user) {
    res.status(404);
    res.send();
  } else {
    const userTodos: Todo[] = [];
    user.todos?.forEach((todoId) => {
      const todo = todos.find((todo: Todo) => todo.id === todoId);
      if (!todo) {
        res.status(404);
        res.send();
      } else {
        userTodos.push(todo);
      }
    });
    res.contentType('application/json');
    res.send(JSON.stringify(userTodos));
  }
});

application.post('/users', authenticateJWT, (req: Request, res: Response) => {
  const user = req.body;
  user.id = id();
  users.push(user);
  res.status(201);
  res.contentType('application/json');
  res.send(JSON.stringify(user));
});

application.put('/users/:userId', authenticateJWT,(req: Request, res: Response) => {
  const userId = +req.params.userId;
  const index = users.findIndex((user: User) => user.id === userId);
  if (index === -1) {
    res.status(404);
    res.send();
  } else {
    const newUser = req.body;
    users.splice(index, 1, newUser);
    res.contentType('application/json');
    res.send(JSON.stringify(newUser));
  }
});

application.delete('/users/:userId', authenticateJWT,(req: Request, res: Response) => {
  console.log('delete');
  const userId = +req.params.userId;
  console.log('userId', userId);
  const index = users.findIndex((user: User) => user.id === userId);
  if (index === -1) {
    res.status(404);
    res.send();
  } else {
    users.splice(index, 1);
    res.status(200);
    res.send();
  }
});


// todos

application.get('/todos', authenticateJWT,(req: Request, res: Response) => {
  res.contentType('application/json');
  res.send(JSON.stringify(todos));
});

application.post('/todos', authenticateJWT, (req: Request, res: Response) => {
  const todo = req.body;
  todo.id = id();
  todos.push(todo);
  res.status(201);
  res.contentType('application/json');
  res.send(JSON.stringify(todo));
});

application.put('/todos/:todoId', authenticateJWT, (req: Request, res: Response) => {
  const todoId = +req.params.todoId;
  const index = todos.findIndex((todo: Todo) => todo.id === todoId);
  if (index === -1) {
    res.status(404);
    res.send();
  } else {
    const newTodo = req.body;
    todos.splice(index, 1, newTodo);
    res.contentType('application/json');
    res.send(JSON.stringify(newTodo));
  }
});


application.delete('/todos/:todoId', authenticateJWT,(req: Request, res: Response) => {
  const todoId = +req.params.todoId;
  const index = todos.findIndex((todo: Todo) => todo.id === todoId);
  if (index === -1) {
    res.status(404);
    res.send();
  } else {
    todos.splice(index, 1);
    res.status(200);
    res.send();
  }
});


application.post('/login',(req, res) => {
  // Read username and password from request body
  const { username, password } = req.body;
  console.log(username, password);
  // Filter user from the users array by username and password
  const user = users.find(u => { return u.userName === username && u.password === password });
  console.log(user);
  if (user) {
    // Generate an access token
    const accessToken = jwt.sign({ id: user.id, username: user.userName,  role: user.isAdmin }, accessTokenSecret);

    res.json({
      accessToken
    });
  } else {
    res.send('Username or password incorrect');
  }
});




application.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
