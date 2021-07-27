export class TODO {
  public name: string;
  public deadline: string;
  public assignees: number[] = [];
  public creator: number;
  public isDone: boolean = false;
}
