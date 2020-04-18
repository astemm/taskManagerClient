import {Task} from './task.model';
export class SharedTask {
     sendingUserId: string;
     receivingUserId: string;
     task: Task;
     constructor(sendingUserId:string, receivingUserId:string,task:Task) {
          this.sendingUserId=sendingUserId;
          this.receivingUserId=receivingUserId;
          this.task=task;
     }
}
