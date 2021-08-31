export class User {
  public id: number;
  public firstName: string;
  public lastName: string;
  public userName: string;
  public eMail: string;
  public color: string;
  public password: string;
  public isAdmin = false;

  public todos: number[] = [];

  static fromJSON(data: any): User {
    const u = new User();
    u.id = data.id;
    u.eMail = data.eMail;
    u.userName = data.userName;
    u.color = data.color;
    u.todos = data.todos;
    u.firstName = data.firstName;
    u.lastName = data.lastName;
    u.isAdmin = data.isAdmin;
    u.password = data.password;

    return u;
  }
}
