const express = require('express');
const fs = require('fs');
const bodyParser = require("body-parser");
const app= express();

app.use(bodyParser.urlencoded({extended : false}));

app.get("/", (req, res) => {
    fs.readFile('msg.txt',(err,data)=>{
        if (err){
            console.log(err);
        }

    
        res.send( 
            `${data}<form action="/"  method= "POST" onSubmit="document.getElementById('username').value=localStorage.getItem('username')">
                    <input type="text" name="message" id="message" placeholder="message">
                    <input type = "hidden" name = "username" id="username">
                    <br />
                    <button type ="submit">Send</button>
                </form>`
                
        );
    
        
    });


})  
app.post("/", (req, res) => {
    const { username, message } = req.body;
    const data = `${username}: ${message}`;
    
    fs.appendFile("msg.txt", data, (err) => {
      if (err) {
        console.log(err);
      } else {
        res.redirect("/");
      }
    });
  });

  
  
  
  
  
  
  

app.get('/login', (req, res) => {
    res.send(`
        <form action="/" method="POST" onsubmit="localStorage.setItem('username', document.getElementById('username').value)">

	    <input id="username" type="text" name="username" placeholder="username">
        <br />
	    <button type="submit">Login</button>

        </form>`
        
        );
    
});




app.listen(3000)









