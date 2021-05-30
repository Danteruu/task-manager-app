export class TaskList {
  id!: number;
  name!: string;
  createDate!: Date;
  deleted!: boolean;

  constructor(name: string){
    this.name = name;
    this.createDate = new Date();
    this.deleted = false;
  }
}
