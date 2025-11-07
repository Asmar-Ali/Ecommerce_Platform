import app from './expressApp';

export const StartServer = async () =>{
    const port = process.env.PORT || 3000;

    app.listen(port, () => {
        console.log(`Server is running on port ${port}`);
    });
    process.on("uncaughtException", (error) => {
        console.log("Uncaught Exception: ", error);
        process.exit(1);  // kill the process
    });
    process.on("unhandledRejection", (error) => {
        console.log("Unhandled Rejection: ", error);
        process.exit(1);
    });
}

StartServer().then(()=>{
    console.log("Server is up.");
});