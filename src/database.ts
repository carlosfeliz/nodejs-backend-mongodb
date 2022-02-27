import mongoose from "mongoose";
(async () => {
    try {
        const databaseName = 'develop'
        const uri = `mongodb+srv://develop:develop@cluster0.q0i9x.mongodb.net/${databaseName}?retryWrites=true&w=majority`;
        mongoose.connect(uri).then(() => {
            console.log("Conectado a la base de datos");
        }).catch(err => {
            console.log(err);
        });
    } catch (error) {
        console.error(error);
    }
})()