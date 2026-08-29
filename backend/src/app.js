import express from "express";
const app= express(); // create an express app

//routes import
import userRouter from "./routes/user.route.js";

app.use(express.json());

//routes declaration
app.use("/api/users", userRouter);

//example route: http://localhost:4000/api/users/register
export default app;

// incoming req comes  then goes to 
//app.js (receives the request )
// routes(checks the address and method)
//controller(does the task asked in the request)
//it sends the response back to the client


//HTTP METHODS
//GET: to get data from the server
//POST: to send data to the server
//PUT: to update data(WHOLE) on the server
//PATCH: to update data(PARTIAL)++++++++++++++++++++++++++++++ on the server
//DELETE: to delete data from the server

//http status code
//200: OK /request was successful
//201: Created
//400: Bad Request
//404: Not Found
//500: Internal Server Error
//204: No Content
//401: Unauthorized / need to login first88
