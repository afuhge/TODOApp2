import express from 'express';
import { Response, Request } from 'express';
import { User } from './src/model/user';
import { id, todos, users } from './src/data';

const application = express();
application.use(express.json());
application.use(express.urlencoded({
  extended: true
}));

const port = 3000

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

application.get('/todos', (req: Request, res: Response) => {
  res.contentType('application/json')
  res.send(JSON.stringify(todos));
})


application.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})
