import { User } from './model/user';
import { Todo } from './model/todo';

let idGen = 5;
export const id = () => ++idGen;

const user1: User = {
  id: 1,
  firstName: 'Annika',
  lastName: 'Fuh',
  userName: 'annie',
  password: '12345',
  color: '#dddddd',
  eMail: 'a.fuh@blah.de',
  todos: [2],
};
const user2: User = {
  id: 3,
  firstName: 'Anni',
  lastName: 'Fu',
  userName: 'annie',
  password: '12345',
  color: '#d11001',
  eMail: 'a.fuh@blah.de',
  todos: [1],
};

const user3: User = {
  id: 4,
  firstName: 'Peter',
  lastName: 'Parker',
  userName: 'annie',
  password: '12345',
  color: '#06b6d4',
  eMail: 'a.fuh@blah.de',
  todos: [1],
};

const user4: User = {
  id: 5,
  firstName: 'Alex',
  lastName: 'Ba',
  userName: 'Alex',
  password: '12345',
  color: '#404040',
  eMail: 'a.fuh@blah.de',
  todos: [1],
};

const todo1: Todo = {
  id: 2,
  name: 'Clean dishes',
  deadline: '11-02-2012',
  creator: 1,
  assignees: [
    1,
    2,
    3,
    4,
  ],
  isDone: false,
};

export const todos: Todo[] = [
  todo1,
];

export const users: User[] = [
  user1,
  user2,
  user3,
  user4,
];
