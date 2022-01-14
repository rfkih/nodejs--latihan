const http = require("http");
const port = 2022;
const fs = require("fs")

const server = http.createServer((req, res)=>{

    const header ={
        "Content-Type":"application/json",
        "Access-Control-Allow-Origin" :"*",
        "Access-Control-Allow-Mthods" :"GET, POST, PUT, DELETE"
    };

    const todosBuffer = fs.readFileSync('./data/todos.json');
    const todos = JSON.parse(todosBuffer)

    switch (req.method) {
        case "GET":
           
            res.writeHead (200, header);
            res.end(JSON.stringify(todos));
            break;

        case "POST":
           
        req.on("data", (chunk) => {
           const newTodo = JSON.parse(chunk); 
           
           todos.push(newTodo)
           
           fs.writeFileSync('./data/todos.json', JSON.stringify(todos))
        });

        res.writeHead(201, header)
        res.end("Todo berhasil ditambahkan")
    
        default:
            break;
    }






});

server.listen(2022, (err)=>{
    if(err) return console.log({error})
    console.log(`server is runnig at port ${port}`)
})