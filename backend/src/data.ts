import { User } from './model/user';
import { Todo } from './model/todo';

let idGen = 10;
export const id = () => ++idGen;

const user1: User = {
  id: 1,
  firstName: 'Annika',
  lastName: 'Fuh',
  userName: 'annie',
  password: '12345',
  color: '#dddddd',
  eMail: 'a.fuh@blah.de',
  isAdmin: true,
  todos: [5,6,7,8,9,10],
};
const user2: User = {
  id: 2,
  firstName: 'Anni',
  lastName: 'Fu',
  userName: 'Annifu',
  password: '12345',
  color: '#d11001',
  eMail: 'a.fuh@blah.de',
  isAdmin: false,
  todos: [5,10],
};

const user3: User = {
  id: 3,
  firstName: 'Peter',
  lastName: 'Parker',
  userName: 'peterparker',
  password: '12345',
  color: '#06b6d4',
  eMail: 'a.fuh@blah.de',
  isAdmin: false,
  todos: [5,6,9],
};

const user4: User = {
  id: 4,
  firstName: 'Alex',
  lastName: 'Ba',
  userName: 'Alex',
  password: '12345',
  color: '#404040',
  eMail: 'a.fuh@blah.de',
  isAdmin: false,
  todos: [5,10],
};

const todo2: Todo = {
  id: 6,
  name: 'Clean dishes',
  deadline: '2021-08-27T22:00:00.000Z',
  creator: 3,
  assignees: [
    1,
    3,
  ],
  isDone: false,
};

const todo1: Todo = {
  id: 5,
  name: 'Clean dishes',
  deadline: '2021-08-24T22:00:00.000Z',
  creator: 1,
  assignees: [
    1,
    2,
    3,
    4,
  ],
  isDone: false,
};

const todo3: Todo = {
  id: 7,
  name: 'Cook dinner',
  deadline: '2021-08-25T22:00:00.000Z',
  creator: 1,
  assignees: [
    1,
  ],
  isDone: false,
};
const todo4: Todo = {
  id: 8,
  name: 'Wash clothes',
  deadline: '2021-08-26T22:00:00.000Z',
  creator: 1,
  assignees: [
    1,
  ],
  isDone: false,
};

const todo5: Todo = {
  id: 9,
  name: 'Clean dishes',
  deadline: '2021-08-29T22:00:00.000Z',
  creator: 1,
  assignees: [
    1,
    2,
    3,
    4,
  ],
  isDone: false,
};

const todo6: Todo = {
  id: 10,
  name: 'Clean dishes',
  deadline: '2021-08-28T22:00:00.000Z',
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
  todo2,
  todo3,
  todo4,
  todo5,
  todo6,
];

export const users: User[] = [
  user1,
  user2,
  user3,
  user4,
];
