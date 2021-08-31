export class TODO {
  public id: number;
  public name: string;
  public deadline: string;
  public assignees: number[] = [];
  public creator: number;
  public isDone: boolean = false;
  public order: number;

  static fromJSON(data: any): TODO {
    const u = new TODO();
    u.id = data.id;
    u.name = data.name;
    u.deadline = data.deadline;
    u.assignees = data.assignees;
    u.creator = data.creator;
    u.isDone = data.isDone;
    u.order = data.order;

    return u;
  }
}
