const Joi = require('joi');
const express = require('express');
const utils = require('./utils');

const PORT = process.env.PORT | 3000;

const app = new express();

app.use(express.json());

const courses =  [
    {
        "id": 1,
        "name": "Introduction to GitHub"
    },
    {
        "id": 2,
        "name": "Getting started with Docker"
    },
    {
        "id": 3,
        "name": "Node js 101: A guide for beginners"
    }
];

app.get('/', (req, res)=>{
    res.send("welcome to test API v1");
});

// get all courses
app.get('/api/courses', (req, res)=>{
    res.send(courses);
});


// get course by id
app.get('/api/courses/:id', (req, res)=>{
    const course_id = parseInt(req.params.id);

    const course = courses.find((c)=> c.id === course_id);

    console.log(course);

    if(!course) {
        return res.status(404).send(`course with a id ${course_id} is not found`);
    }

    res.send({
        "id": course.id,
        "name": course.name
    });
});


// update details of a course
app.put('/api/courses/:id', (req, res)=>{
    const course_id = parseInt(req.params.id); 
    const course = courses.find((c)=> c.id === course_id);

    if(!course) {
        return res.status(404).send(`course with a id ${course_id} is not found`);
    }

    const {error, value} = utils.validateCourse(req.body.name);

    if(error) {
        return res.status(400).send(
            error.details[0].message
        );
    }

    course.name = req.body.name;

    res.send(course);
});

// add new course
app.post('/api/courses', (req, res)=>{

    const {error, value} = utils.validateCourse(req.body.name);

    if(error) {
        return res.status(400).send(
            error.details[0].message
        );
    }

    const course = {
        "id": courses.length + 1,
        "name": req.body.name
    }

    courses.push(course);

    res.send(course);
});

// delete a course by id
app.delete('/api/courses/:id', (req, res)=>{
    const course_id = parseInt(req.params.id); 
    const course = courses.find((c)=> c.id === course_id);

    if(!course) {
        return res.status(404).send(`course with a id ${course_id} is not found`);
    }

    const index = courses.indexOf(course);
    courses.splice(index, 1);

    res.send(course);
});

app.listen(PORT, ()=>{
    console.log(`app is listening on port ${PORT}`);
});
