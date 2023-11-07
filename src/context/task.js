import {createContext} from "react";
import { useState , useEffect } from 'react';
import axios from 'axios';

const TaskContext = createContext();

function Provider({children}){

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



const sharedTasksAndMethods = {
    tasks,
    createTask,
    fetchDeneme,
    deleteTaskById,
    editTaskById,
}
    return (
        <TaskContext.Provider value={sharedTasksAndMethods} >
            {children}
        </TaskContext.Provider>
    )
}
export {Provider};
export default TaskContext;

