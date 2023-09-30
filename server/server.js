const express=require('express');
const cors=require('cors');
const app=express();
const fs=require("fs");
const port=4000;


app.use(cors());

app.get('/budget',(req,res) => {

    fs.readFile("data.json", "utf-8", (err,jsonData) => {

        if (err) {
            console.log("Error reading file:", err);
            return;
        }

        try {
            const budgetData = JSON.parse(jsonData);
            res.json(budgetData);

        } catch (err) {
            console.log("Error parsing JSON string:", err);
        }
    });
});

app.listen(port, () =>{

    console.log(`API listening to http://localhost:${port}`);

});
