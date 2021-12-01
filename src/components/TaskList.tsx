import TaskComponent from './TaskComponent'

import {Task} from '../models/Task'

interface TaskListProps {
    tasks: Task[];
    deleteTaskHandler: (task: Task) => void;
};

const TaskList = ({tasks, deleteTaskHandler}: TaskListProps) => {
    return (
        <div className="list-group">
            {tasks.map((task: Task, index: number) => {return (
                <TaskComponent key={index} task={task} onDeleteTask={deleteTaskHandler}/>
            )})}
        </div>
    );
}

export default TaskList;