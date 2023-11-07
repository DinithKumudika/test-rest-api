const express = require('express');

const PORT = process.env.PORT | 3000;

const app = new express();

app.get('/', (req, res)=>{
    res.json({
        "message": "welcome to test API v1"
    });
});

app.listen(PORT, ()=>{
    console.log(`app is listening on port ${PORT}`);
});
