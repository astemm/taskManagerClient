import {User} from './user.model';
export class Task {
    taskId: number;
    title: string;
    description: string;
    endDate: string;
    user: User;
    //constructor(id: number, role:string) {
    //    this.id = id;
    //    this.role = role 
    // }
}
