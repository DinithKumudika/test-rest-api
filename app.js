const express = require('express');

const PORT = process.env.PORT | 3000;

const app = new express();

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
    res.json({
        "message": "welcome to test API v1"
    });
});

// get all courses
app.get('/api/courses', (req, res)=>{
    res.json({
        "courses": courses
    });
});


// get course by id
app.get('/api/courses/:id', (req, res)=>{
    const course_id = req.params.id;

    const course = courses.find((c)=> c.id === parseInt(course_id));

    console.log(course);

    if(!course) {
        res.status(404).json({"error": "course with the given ID is not found"});
    }

    res.json({
        "id": course.id,
        "name": course.name
    });
});

// add new course
app.post('/api/courses', (req, res)=>{

    console.log(req);

    const course = {
        "id": courses.length + 1,
        "name": req.body.name
    }

    courses.push(course);

    res.json({
        "message": `new course added with id ${course.id}`,
        "course": course
    });
});

app.get('/api/posts/:year/:month', (req, res)=>{
    const year = req.params.year;
    const month = req.params.month;
    const query = req.query;

    res.json({
        "year": year,
        "month": month,
        "query-params": query
    });
});

app.listen(PORT, ()=>{
    console.log(`app is listening on port ${PORT}`);
});
