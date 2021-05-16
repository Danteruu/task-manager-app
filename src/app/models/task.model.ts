export class Task {
    id!: number;
    taskListId!: number;
    text!: string;
    createDate = new Date(2021, 5, 15);
    completed = false;
    deleted = false;
  }
