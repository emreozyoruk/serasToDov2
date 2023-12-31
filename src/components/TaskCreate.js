import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { faCheck } from '@fortawesome/free-solid-svg-icons';
import {useContext} from 'react';
import TaskContext from '../context/task';



function TaskCreate({  task, taskFormUpdate , onUpdate }) {
  const {createTask , editTaskById } = useContext(TaskContext)

  const [title, setTitle] = useState(task ? task.title : " ");
  const [taskDesc, setTaskDesc] = useState(task ? task.taskDesc : " ");

  const handleChange = (event) => {
    setTitle(event.target.value);
  };
  const handleTaskChange = (event) => {
    setTaskDesc(event.target.value);
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    if(taskFormUpdate){
      onUpdate(task.id , title , taskDesc)
    }else {
      createTask(title, taskDesc);
    }

    setTitle('');
    setTaskDesc('');
  };

  return (
        
        <div> {taskFormUpdate ? <div className="task-update">
        <h3>Lütfen Task Ekleyiniz!</h3>
        <form className="task-form">
          <label className="task-label">Düzenlenecek Başlık</label>
          <input value={title} onChange={handleChange} className="task-input" />
          <label className="task-label">Düzenlenecek Task</label>
          <textarea
            value={taskDesc}
            onChange={handleTaskChange}
            className="task-input"
            rows={5}
          />
          <button className="update-button" onClick={handleSubmit}>
            Düzenle
            <FontAwesomeIcon icon={faCheck} className='plusIkon' />
          </button>
        </form>
      </div> 
      : <div className="task-create">
      <h3>Lütfen Task Ekleyiniz!</h3>
      <form className="task-form">
        <label className="task-label">Başlık</label>
        <input value={title} onChange={handleChange} className="task-input" />
        <label className="task-label">Açıklama</label>
        <textarea
          value={taskDesc}
          onChange={handleTaskChange}
          className="task-input"
          rows={5}
        />
        <button className="task-button" onClick={handleSubmit} > 
          Oluştur
          <FontAwesomeIcon icon={faPlus} className='plusIkon' />
        </button>
      </form>
       </div> }
       
        </div> 
    
  );
}

export default TaskCreate;
