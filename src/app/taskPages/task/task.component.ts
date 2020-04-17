import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { TaskService } from '../../services/task.service';
import { TaskInfo} from '../../models/task-info';
import { Task} from '../../models/task.model';
import { SharedTask} from '../../models/shared-task.model';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user.model';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.css']
})
export class TaskComponent implements OnInit {
  num:number;
  user: Observable<User>;
  sharedUser: Observable<User>;
  tasksList: Observable<TaskInfo[]>;
  newTask: Task;
  editedTask:Observable<Task>;
  isCreated:boolean=false;
  isEdited:boolean=false;
  newSharedTask: SharedTask;
  sharedEmail:string;

  constructor(private taskService: TaskService, private router
    : Router) {
    }

  ngOnInit() {
    this.reloadData();
  }

  reloadData() {
   this.tasksList=this.taskService.getTaskList();
   this.tasksList.subscribe(result=>{this.num=result.length;})
  }

  createTask() {
    this.newTask=new Task();
    this.isCreated=true;
  }

  deleteTask(id: string) {
    this.taskService.deleteTask(id) //this.user.id
      .subscribe(
        data => {
          console.log(data);
        },
        error => console.log(error));
  }

  editTask(id: string) {
    //this.router.navigate(['/update']);
    this.isEdited=true;
    this.editedTask=this.taskService.getTask(id);
  }
}
