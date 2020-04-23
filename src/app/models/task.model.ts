import {User} from './user.model';
export class Task {
    taskId: number;
    title: string;
    description: string;
    endDate: Date;
    user: User;
}
