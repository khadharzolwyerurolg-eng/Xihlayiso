const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI);
    
    console.log(`[MongoDB] Conectado com sucesso: ${conn.connection.host}`);
  } catch (error) {
    console.error(`[Erro no MongoDB] Falha na conexão: ${error.message}`);
  }
};

module.exports = connectDB;
