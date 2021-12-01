import {Task} from '../models/Task'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faTimes} from '@fortawesome/free-solid-svg-icons'

interface TaskProps {
    task: Task;
    onDeleteTask: (task: Task) => void;
};

const TaskComponent = ({task, onDeleteTask}: TaskProps) => {
    return (
            <>
                <button className="list-group-item list-group-item-action flex-column align-items-start">
                    <div className="d-flex w-100 justify-content-between">
                        <h5 className="mb-1">{task.text}</h5>
                        <small>{displayTaskCreationDate(task)}</small>
                    </div>
                    <div className="d-flex w-100 justify-content-between">
                        <p className="mb-1">Donec id elit non mi porta gravida at eget metus. Maecenas sed diam eget risus varius blandit.</p>
                        <FontAwesomeIcon icon={faTimes} onClick={() => onDeleteTask(task)}/>
                    </div>
                </button>
            </>
    );
}


function displayTaskCreationDate(task:Task): String {
    let display:String = "";

    if(task.createdDate instanceof Date) {
        const today:Date = new Date();
        const dayDiff = Math.round((today.getTime() - task.createdDate.getTime()) / (3600000 * 24));

        switch(dayDiff) {
            case 0:
                display = "Today";
                break;
            case 1: 
                display = "Yesterday";
                break;
            default:
                display = `${dayDiff} days ago`;
                break;
        }
    }
    return display;
}
export default TaskComponent;