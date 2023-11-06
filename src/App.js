import './App.css';
import TaskCreate from './components/TaskCreate';
import TaskList from './components/TaskList';
import { useState , useEffect } from 'react';
import axios from 'axios';


function App() {
  const [tasks, setTasks] = useState([]);

  const createTask = async (title, taskDesc) => {
    const response = await axios.post("http://localhost:3004/tasks", {title:title , taskDesc : taskDesc})
    const createdTasks = [
      ...tasks,
      response.data
    ];
    console.log(response)
    setTasks(createdTasks);
  };

  const fetchDeneme = async () => {

    const response = await axios.get("http://localhost:3004/tasks");
    setTasks(response.data);
  }
  
  useEffect (() => {
    fetchDeneme()
  },[])

  

  const deleteTaskById = async (id) => {
    await axios.delete(`http://localhost:3004/tasks/${id}`);

    const afterDeletingTasks = tasks.filter((task) => {
      return task.id !== id;
    });
    setTasks(afterDeletingTasks);
  };

  const editTaskById = async (id , updatedTitle , updatedTaskDesc) => {
    await axios.put(`http://localhost:3004/tasks/${id}`,{
      title:updatedTitle ,taskDesc : updatedTaskDesc
    });

    const updateTasks = tasks.map((task) => {
      if(task.id === id){
        return {id , title : updatedTitle , taskDesc : updatedTaskDesc}
      }
      return task; 
    })
      setTasks(updateTasks)
  }
  return (
    <div className="App">
      <TaskCreate onCreate={createTask} />
      <h1>Görevler</h1>
      <TaskList tasks={tasks} onDelete={deleteTaskById}  onUpdate={editTaskById} />
    </div>
  );
}

export default App;
