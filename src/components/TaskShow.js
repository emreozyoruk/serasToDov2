import { useState } from "react";
import TaskCreate from "./TaskCreate";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { faPencil } from '@fortawesome/free-solid-svg-icons';


function TaskShow({ task, onDelete , onUpdate}) {
  const [showEdit , setShowEdit] = useState(false)
  const handleDeleteClick = () => {
    onDelete(task.id);
};

const handleEditClick = () => {
  setShowEdit(!showEdit)
};
const handleSubmit = (id, updatedTitle , updatedTaskText) => {
  setShowEdit(false)
  onUpdate(id , updatedTitle , updatedTaskText) 
};

  console.log(task);
  return (
    <div className="task-show">

{showEdit ? <TaskCreate  task = {task}  taskFormUpdate = {true} onUpdate={handleSubmit} />  : <div><h3 className="task-title">Göreviniz</h3>
      <p>{task.title}</p>
      <h3 className="task-title">Yapılacaklar</h3>
      <p>{task.taskDesc}</p>
      <div>
        <button className="task-delete" onClick={handleDeleteClick}>
          Sil
          <FontAwesomeIcon icon={faTrash} className='plusIkon' />
        </button>
        <button className="task-edit" onClick={handleEditClick} >Güncelle
        <FontAwesomeIcon icon={faPencil} className='plusIkon' /></button>
      </div> </div> }      
      
    </div>
  );
}

export default TaskShow;
