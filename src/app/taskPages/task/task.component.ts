import { Component, OnInit, NgZone } from '@angular/core';
import { Observable } from 'rxjs';
import { SseService } from '../../services/sse.service';
import { TaskService } from '../../services/task.service';
import { TaskInfo} from '../../models/task-info';
import { Task} from '../../models/task.model';
import { SharedTask} from '../../models/shared-task.model';
import { User } from 'src/app/models/user.model';
import { TokenStorageService } from 'src/app/services/token-storage.service';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.css']
})
export class TaskComponent implements OnInit {
  num:number;
  user: User;
  sse:string="";
  tasksList: Observable<TaskInfo[]>;
  newTask: Task;
  editedTask:Task;
  isCreated:boolean=false;
  isEdited:boolean=false;
  isShared:boolean=false;
  taskToShare:Task;
  newSharedTask: SharedTask;
  sharedEmail:string;
  createMessage:string;
  source:EventSource;

  constructor(private taskService: TaskService, private sseService:SseService,
    private tokenStorageService: TokenStorageService, private zone:NgZone) {
    }

  ngOnInit() {
   // this.sseService
   //   .getServerSentEvent("http://localhost:8080/events/sse")
   // .subscribe(data => { this.sse=data;},
   //   error => this.createMessage=error);
    this.taskService.getUserByName(this.tokenStorageService.getUsername()).subscribe(user=>{this.user=user;
      this.reloadData();}
      );
    this.source = new EventSource('http://localhost:8080/events/sse');
    this.source.onmessage= event => {
      this.zone.run(() => {
      //  this.sse=event.data;
        if(event.data==this.user.id) this.reloadData();
        console.log(event);
      });
    };
    this.source.onerror = error => {
      this.zone.run(() => {
      //  this.createMessage=error.type;
        console.log(error);
      });
    };
      
  }

  reloadData() {
   this.tasksList=this.taskService.getTaskList(this.user.id);
  this.tasksList.subscribe(result=>{this.num=result.length;}) //}
  }

  createTask() {
    this.newTask=new Task();
    this.isCreated=true;
  }

  addTask() {
    this.newTask.user=this.user;
    this.taskService.createTask(this.newTask).subscribe(
      data=>{this.createMessage="Task added"; this.isCreated=false;
  this.reloadData();
    },
       error=>this.createMessage=error
    )
    
  }

  deleteTask(id: string) {
    this.taskService.deleteTask(id)
      .subscribe(
        data => {this.createMessage="Task deleted";
         this.reloadData();
          console.log(data);
        },
        error => this.createMessage=error)
  }

  editTask(id: string) {
    this.isEdited=true;
    this.taskService.getTask(id).subscribe(task=>{this.editedTask=task;});
  }

  updateTask() {
     this.taskService.updateTask(this.editedTask).subscribe(
     data=>{this.createMessage="Task updated";
     this.isEdited=false; this.reloadData();},error=>this.createMessage=error
     )
  }

  share(id:string) {
    this.isShared=true;
    this.taskService.getTask(id).subscribe(task=>{this.taskToShare=task;}) 
  }

  shareTask() {
    var receivingUser:User;
    this.taskService.getUserByEmail(this.sharedEmail).subscribe(user=>{receivingUser=user;
      this.newSharedTask=new SharedTask(this.user.id,receivingUser.id,this.taskToShare);
      this.taskService.createSharedTask(this.newSharedTask).subscribe(
        data=>{this.createMessage="Task was shared"}, 
        error=>this.createMessage="Error in sharig task"
      ); this.isShared=false;
    },
      error=>this.createMessage="Enter correct email");
  }
}
