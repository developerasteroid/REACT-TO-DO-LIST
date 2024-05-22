import { useState, useEffect } from 'react'
import './toDoList.css'
export default function ToDoList(){
    const [inputTask, setInputTask] = useState('');

    const [tasks, setTasks] = useState(() => {
        const savedTasks = localStorage.getItem('tasks');
        return savedTasks ? JSON.parse(savedTasks) : [];
    });

    const [completedTasks, setCompletedTasks] = useState(() => {
        const savedCompletedTasks = localStorage.getItem('completedTasks');
        return savedCompletedTasks ? JSON.parse(savedCompletedTasks) : [];
    });


    useEffect(() => {
        // Store tasks in localStorage whenever the tasks array changes
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }, [tasks]);

    useEffect(() => {
        // Store completed tasks in localStorage whenever the completed tasks array changes
        localStorage.setItem('completedTasks', JSON.stringify(completedTasks));
    }, [completedTasks]);


    
    const handleInput = (e) => {
        setInputTask(e.target.value);
    }
    
    const addTask = () => {
        if(inputTask.trim() != ""){
            setTasks( t => [...t, inputTask]);
            setInputTask('');
        }
    }

    const deleteTask = (index) => {
        const updatedTasks = tasks.filter((_, i) => i != index);
        setTasks(updatedTasks);
    }

    const moveUpTask = (index) => {
        if(index > 0){
            const UpdateTasks = [...tasks];
            [UpdateTasks[index], UpdateTasks[index - 1]] = [UpdateTasks[index - 1], UpdateTasks[index]];
            setTasks(UpdateTasks);
        }
    }
    const moveDownTask = (index) => {
        if(index < (tasks.length - 1)){
            const UpdateTasks = [...tasks];
            [UpdateTasks[index], UpdateTasks[index + 1]] = [UpdateTasks[index + 1], UpdateTasks[index]];
            setTasks(UpdateTasks);
        }
    }

    const addToCompletedTask = (index) => {
        setCompletedTasks( t => [tasks[index], ...t]);
        deleteTask(index);
    }

    const deleteCompletedTask = (index) => {
        const updatedCompletedTasks = completedTasks.filter((_, i) => i != index);
        setCompletedTasks(updatedCompletedTasks);
    }



    return (
        <div className='main-to-do-container'>
            <h1>TO DO LIST</h1>
            <div>
                <div className="topContainerToDo">
                    <input 
                        type='text'
                        className='addTaskInput'
                        placeholder='Enter the Task...'
                        value={inputTask}
                        onChange={handleInput}
                        />
                    <button className='task-add-btn' onClick={addTask}>ADD</button>
                </div>
                <div className="taskListContainer">
                    {tasks.length > 0 && <h2>Pending Tasks</h2>}
                    {tasks.map((task, index) => (
                        <div className="taskListItem" key={index}>
                            <h3>{task}</h3>
                            <div className='actionBtnContainer'>
                                <button 
                                onClick={() => deleteTask(index)}
                                className='deleteBtn buttonicon'
                                ><img src="public/bin.png"/></button>
                                <button 
                                onClick={() => moveUpTask(index)}
                                className='moveBtn moveUpBtn'
                                >&nbsp;</button>
                                <button 
                                onClick={() => moveDownTask(index)}
                                className='moveBtn moveDownBtn'
                                >&nbsp;</button>
                                <button 
                                onClick={() => addToCompletedTask(index)}
                                className='cmpltdTask buttonicon'
                                ><img src="public/check.png"/></button>
                            </div>
                        </div>
                    ))}
                </div>
                <div className="completedTaskListContainer">
                    {completedTasks.length > 0 && <h2>Completed Tasks</h2>}
                    {completedTasks.map((task, index) => (
                        <div className="taskListItem" key={index}>
                            <h3>{task}</h3>
                            <div>
                            <button 
                            onClick={() => deleteCompletedTask(index)}
                            className='deleteBtn buttonicon'
                            ><img src="src/assets/bin.png"/></button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}