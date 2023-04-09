const mongoose = require('mongoose');
const app = require('./app');
/*
const { data } = require('./data');
const { refreshAll } = require('./createDatabase');
*/

const port = 8000;
const mongoURI = "mongodb+srv://master:master123@cluster0.i9ytxuj.mongodb.net/hackathon2?retryWrites=true&w=majority";

mongoose.connect(mongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    //useFindAndModify: false,
});

mongoose.connection
    .once("open", () => {
        console.log('Connection Established');
    })
    .on("connectionError", (err) => {
        console.log(err)
    });

//refreshAll(data);

app.listen(port, () => console.log('Listening on Port '+ port));