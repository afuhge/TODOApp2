export class TODO {
  public id: number;
  public name: string;
  public deadline: string;
  public assignees: number[] = [];
  public creator: number;
  public isDone: boolean = false;
}
