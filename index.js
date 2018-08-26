const express = require('express');
const bodyParser = require('body-parser');
const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const tasks = [];

app.post('/tasks', (request, response ) => {

    const task = getTask(request);

    tasks.push(task);
    response.status(201);
    response.send(task);
});

app.get('/tasks/:taskId', (request, response) => {

    const task = tasks.filter( t => t.id === request.params.taskId);
    if (task) {
        response.send(task);
    } else {
        response.status(404);
        response.send();
    }

});

app.get('/tasks', (request, response) => {
    response.send(tasks);
});

app.put('/tasks/:taskId', (request, response) => {

    const task = tasks.filter( t => t.id === request.params.taskId);

    if (task) {
        const taskUpdated = getTask(request, request.params.taskId);        
        const indexToUpdate = tasks.findIndex( t => t.id === request.params.taskId);

        tasks.splice(indexToUpdate, 1, taskUpdated);
        response.status(200);
        response.send(taskUpdated);
        return;
    }

    response.status(404);
    response.send();
});

app.delete('/tasks/:taskId', (request, response) => {

    let indexToDelete = tasks.findIndex( t => t.id == request.params.taskId);

    if (indexToDelete != -1) {
        tasks.splice(indexToDelete, 1);

        response.status(200);
        response.send()
        return;
    }

    response.status(404);
    response.send();
});

getTask = (request, taskId) => {
    const { body } = request;
    const task = {
        id: taskId ? taskId : Math.random().toString().replace('0.', ''),
        title: body.title,
        resume: body.resume,
        isDone: body.isDone,
        isPriority: body.isPriority
    }

    return task;
}

app.listen(3000, () => {
    console.log('Server running on port 3000');
});
