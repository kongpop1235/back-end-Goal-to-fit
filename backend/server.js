const mongoose = require('mongoose');
const app = require('./routes/index.js');
const config = require('./config.js');
const boot = async () => {
    await mongoose.connect(config.mongoUri, config.mongoOptions);
    app.listen(config.port, () => console.log("server is up and runing"));
}

boot();