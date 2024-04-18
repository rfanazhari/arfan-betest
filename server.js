const mongoose = require("mongoose");
const serverConfig = require('./src/config/server');
const app = require("./src/router/app");

mongoose.connect(serverConfig.mongoUrl);
const database = mongoose.connection;
database.on('error', (error) => {
    console.log(error)
})

database.once('connected', () => {
    console.log('Database Connected');
});


app.listen(serverConfig.port, () => {
    console.log(`Server running on port: ${serverConfig.port}`)
})