var express =require("express")
var bodyParser=require("body-parser")
var cors = require("cors")
var port = process.env.PORT || 3000

var app = express()
app.use(bodyParser.json())
app.use(cors())
app.use(bodyParser.urlencoded({extended: false}))


var tasks = require("./routes/tasks")
var Users = require("./routes/Users")

app.use("/api", tasks)
app.use("/users", Users)

app.listen(port, function (){
    console.log('Server started on port: ' + port)
})