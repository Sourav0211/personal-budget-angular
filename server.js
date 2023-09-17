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
const myBudget= JSON.parse(fs.readFileSync('Budget_Server.json', 'utf8'));


/*fetch('http://localhost:3000/Budget_Server.json')
        .then(res => {
            return res.json()})
        
        .then(data =>{
            const title = data.map(item => item.title);
            const budget = data.map(item => item.budget);
            const ctx = document.getElementById('myPieChart').getContext('2d');
            
            new Chart(ctx, {
                    type: 'pie',
                    data: {
                        labels: title,
                        datasets: [{
                            data: budget, }]
                          },     
                           }
                   )}
        ).catch(error => {
            console.error('error loading jason data:',error)
        });*/
                












app.get('/home',(req,res) => {
    res.send('Hello World');
});

app.get('/budget' , (req,res) => {
    res.json(myBudget);
});

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});