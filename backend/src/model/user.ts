import { Todo } from './todo';

export class User {
  public id : number = 0;
  public firstName: string = '';
  public lastName: string = '';
  public userName: string = '';
  public eMail: string = '';
  public color: string = '';
  public password: string = '';

  public todos: number[] = [];

}
