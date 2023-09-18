const express = require('express');
const fs = require('fs');
const app = express();
const port = 3000;

app.use( '/', express.static('public'));

/*const budget = {
    
    myBudget: [

        {
            title: 'Eat out',
            budget: 25
        },
        {
            title: 'Rent',
            budget: 275
        },
        {
            title: 'Grocery',
            budget: 300
        },
    ]
};*/




const myBudget= JSON.parse(fs.readFileSync('Budget_Server.json'));
const data= JSON.parse(fs.readFileSync('my-data.json'));
                
app.get('/home',(req,res) => {
    res.send('Hello World');
});

app.get('/budget' , (req,res) => {
    res.json(myBudget);
});
app.get('/earning' , (req,res) => {
    res.json(data);
});

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});