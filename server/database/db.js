const mongoose = require('mongoose');

//Conexión hacia BD 
const dbCONN = async() => {
    try {
        await mongoose.connect(process.env.db_CONN, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        })
        console.log('Se ha conectado exitosamente hacia la base de datos')
    } catch (error) {
        console.log(error);
        process.exit(1); //Parar el proceso
    }
}

module.exports = {
    dbCONN
}