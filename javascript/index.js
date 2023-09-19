let tasks = [];
let form = document.querySelector('form');
let button = document.querySelector('#addButton');
let inputTask = document.querySelector('form > label > input');
const listTasks = document.querySelector('#tasks');

// Validar datos: 

const validate = (task) => {
    if (task !== ''){
        return true
    } else {
        alert('campos vacios');
        return false;
    }
}

// Renderizar lista en la pantalla:

const renderTask = (arrTasks) => {
    listTasks.innerHTML = ''; 
    // iterar el array
    arrTasks.map( (task) => {
        listTasks.innerHTML += `
                        <li class="task"> ${task.task}
                            <div class='task_controls'>    
                                <input type="checkbox" id="status-${task.id}" name="">        
                                <span id='edit-${task.id}'>✍</span>
                                <span id='delete-${task.id}'>❌</span>
                                </div>
                            </li>                            
        `
        if (task.state === true)document.querySelector
        (`#status-${task.id}`).checked = true
    })
};

// completar tarea:

const completeTask = () => {
    document.addEventListener('click', (evento) => {
        if (evento.target.tagName === 'INPUT') {
            let id = evento.target.id  
            id = id.slice(7)
            tasks = tasks.map(task => {
                if(task.id == id){
                    return {...task, state: !task.state}
                }
                return task
            })
            console.log(tasks);
            renderTask(tasks)
        }
    })
};

// eliminar tarea:

const deleteTask = () => {
    document.addEventListener('click', (evento) => {
    let spanId = evento.target.id 
    if (spanId.includes('delete')){
        let id = spanId.slice(7)
        tasks = tasks.filter( task => task.id != id)
        console.log(tasks);
        renderTask(tasks)
    }    
})
}

// editar tarea:

const editTask = () => {
    // crear evento click para editar
    document.addEventListener('click', (evento) => {
    // crear variable para guardar informacion del evento    
        let spanId = evento.target.id 
    // validar si el evento contiene la palabra edit    
        if (spanId.includes('edit')){
            let id = spanId.slice(5)
            id = Number(id)
            let task = tasks.find ( task => task.id === id)
            let edit = prompt('editar tarea', task.task)
            
            tasks = tasks.map(task => {
                if (task.id == id){
                    return {...task, task: edit}
                }
                return task
            })
            renderTask(tasks);
        }    
    })
    } 

// Funcion principal:    

const addTask = () => {
    //crear evento:
    form.addEventListener('submit', (evento) => {
        evento.preventDefault();
    // validar y agregar al array la nueva tarea    
        if (validate(inputTask.value)){
            let newTask = {
                id: Math.floor(Math.random() * 100) + 1,
                task: inputTask.value,
                state: false,
            }
            tasks.push(newTask);
    // renderizar la pantalla        
            renderTask(tasks)
            console.log(tasks);
        };
    // reiniciar el input    
        form.reset();
    })
};

// Agregar funciones:

document.addEventListener('DOMContentLoaded', () => {
    addTask()
    completeTask()
    deleteTask()
    editTask()
})


