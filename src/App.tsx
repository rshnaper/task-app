import {useState} from 'react';
import {useEffect} from 'react';

import { Task } from './models/Task';

import { TaskService } from './services/TaskService';

import TaskForm from "./components/TaskForm";
import TaskList from "./components/TaskList";


function App() {
  const baseURL = 'http://localhost:4000/';
  const taskService: TaskService = new TaskService(baseURL);

  const [tasks, setTasks] = useState<Task[]>([]);

  //load tasks
  // eslint-disable-next-line
  useEffect(() => {loadTasks()},[]);

  return (
    <div className="container">
      <h2>Task App</h2>
      <div className="row p-2">
        <TaskForm addTaskHandler={addTask}/>
      </div>
      <div className="row p-2">
        <TaskList tasks={tasks} deleteTaskHandler={deleteTask}/>
      </div>
    </div>
  );

  async function addTask(task:Task): Promise<void> {
    const newTask = await taskService.addTask(task);
    if(newTask) {
      const newTasks = tasks.slice();
      newTasks.push(newTask);
      setTasks(newTasks);
    }
    
  }

  async function deleteTask(task:Task): Promise<void> {
    const result:boolean = await taskService.deleteTask(task.id);

    if(result) {
      const newTasks = tasks.filter(t => t.id !== task.id);
      setTasks(newTasks);
    }
  }

  async function loadTasks(): Promise<void> {
    let tasks = await taskService.loadTasks();
    setTasks(tasks);
  }
}

export default App;
