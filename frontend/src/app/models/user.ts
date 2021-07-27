export class User {
  public id: number;
  public firstName: string;
  public lastName: string;
  public userName: string;
  public eMail: string;
  public color: string;
  public password: string;
  public isAdmin: boolean = false;

  public todos: number[] = [];
}
