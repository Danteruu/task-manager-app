export class Task {
    id!: number;
    taskListId!: number;
    text!: string;
    createDate!: Date;
    deleted!: boolean;
    completed!: boolean;

    constructor(text: string, taskListId: number) {
      this.taskListId = taskListId;
      this.text = text;
      this.createDate = new Date();
      this.completed = false;
      this.deleted = false;
    }
  }
