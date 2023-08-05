const app = require("./app")

const dotenv = require("dotenv");
dotenv.config({path:"./config/config.env"})
const connectDatabase = require("./config/database")

//Handling uncaught exception
process.on("uncaughtException", (err)=>{
    console.log(`Error: ${err.message}`);
    console.log(`shutting down the server due to uncaught Exception`);
     process.exit(1)
})

connectDatabase()

app.listen(process.env.PORT, ()=>{
    console.log(`server running on port ${process.env.PORT}`)
})

//unhandled promise rejection


process.on("unhandledRejection", err=>{
    console.log(`Error: ${err.message}`);
    console.log(`shutting down the server due to unhandled promise rejection`);
    
       server.close(()=>{
        process.exit(1);
    })

})