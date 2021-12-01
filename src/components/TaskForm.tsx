import {FormEvent, useState} from 'react'
import { Task } from '../models/Task';

interface TaskFormProps {
    addTaskHandler: (task: Task) => void;
}

const TaskForm = ({addTaskHandler}: TaskFormProps) => {
    const [taskText, setTaskText] = useState("");

    return (
        <form onSubmit={addTask}>
            <div className="form-group p-2">
                <label htmlFor="task">Task</label>
                <input name="task" type="text" className="form-control" placeholder="Enter task name" value={taskText} onChange={e => setTaskText(e.target.value)}/>
            </div>
            <div className="form-group p-2">
                <button name="submit" type="submit" className="btn btn-primary">Add Task</button>
            </div>
        </form>
    )

    function addTask(event: FormEvent): void {
        event.preventDefault();
        addTaskHandler({"text": taskText});
        setTaskText("");
    }
}
export default TaskForm;