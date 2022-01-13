const http = require("http");
const port = 2022;
const fs = require("fs")

const server = http.createServer((req, res)=>{

    const header ={
        "Content-Type":"application/json",
        "Access-Control-Allow-Origin" :"*",
        "Access-Control-Allow-Mthods" :"GET, POST, PUT, DELETE"
    };

const todosFile = fs.readFileSync('./data/todos.json');
const todos = JSON.parse(todosFile)
console.log(todos);

 res.writeHead (200, header);
 res.end(JSON.stringify(todos));

});

server.listen(2022, (err)=>{
    if(err) return console.log({error})
    console.log(`server is runnig at port ${port}`)
})