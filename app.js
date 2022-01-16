const http = require("http");
const port = 2022;
const fs = require("fs");
const url = require("url");

const server = http.createServer((req, res)=>{

    const header ={
        "Content-Type":"application/json",
        "Access-Control-Allow-Origin" :"*",
        "Access-Control-Allow-Mthods" :"GET, POST, PUT, DELETE"
    };

    const todosBuffer = fs.readFileSync('./data/todos.json');
    const todos = JSON.parse(todosBuffer)
    const query = url.parse(req.url, true).query;

    switch (req.method) {
        case "GET":
           
            res.writeHead (200, header);
            res.end(JSON.stringify(todos));
            break;

        case "POST":
           
        req.on("data", (chunk) => {
           const newTodo = JSON.parse(chunk); 
           
           todos.push(newTodo)

            const newTodosString = JSON.stringify(todos);
           fs.writeFileSync('./data/todos.json', newTodosString)
        }).on("end", ()=>{

        res.writeHead(201, header)
        res.end("Todo berhasil ditambahkan")

        });

        case "PUT" :
            
            
            req.on("data", (body) =>{
                const bodyParsed = JSON.parse(body);
          
          const selectedIndex = todos.findIndex(
            (todo) => todo.id === parseInt(query.id)
          );
          
          todos[selectedIndex].isDone = bodyParsed.isDone;

          const todosString = JSON.stringify(todos);
          fs.writeFileSync("./data/todos.json", todosString);


            }).on("end", () => {
                res.writeHead(200, header);
                res.end("todo berhasil diubah")
            });

           
        case "DELETE" :

            const id = parseInt(query.id);
            const filteredTodos = todos.filter((todo) => todo.id !==id)
            fs.writeFileSync('./data/todos.json', JSON.stringify(filteredTodos));
    
            res.writeHead(200, header);
            res.end("todo berhasil dihapus")

    }






});

server.listen(2022, (err)=>{
    if(err) return console.log({error})
    console.log(`server is runnig at port ${port}`)
})