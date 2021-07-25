import { User } from './user';

export class Todo {
  public id: number = 0;
  public name: string = '';
  public deadline: string = '';
  public assignees: number[] = [];
  public creator: number = 0;
  public isDone: boolean = false;
}
