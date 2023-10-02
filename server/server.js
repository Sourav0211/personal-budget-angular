const express = require('express');
const fs = require('fs');
const cors=require('cors');
const app = express();
const port = 3000;


app.use(cors());
//  app.use( '/', express.static('public'));

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
const data1= JSON.parse(fs.readFileSync('my-data.json'));
const data2= JSON.parse(fs.readFileSync('data.json'));
                
/*app.get('/home',(req,res) => {
    res.send('Hello World');
});*/

app.get('/budget' , (req,res) => {
    res.json(myBudget);
});
app.get('/earning' , (req,res) => {
    res.json(data1);
});
app.get('/search' , (req,res) => {
    res.json(data2);
});
app.listen(port, () => {
    console.log(`API app listening at http://localhost:${port}`);
});