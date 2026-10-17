const mongoose = require('mongoose');

const BiographySchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'O nome da personalidade é obrigatório.'],
    trim: true
  },
  title: {
    type: String,
    required: [true, 'O título da conquista/profissão é obrigatório (ex: Engenheiro de Software).'],
    trim: true
  },
  summary: {
    type: String,
    required: [true, 'A resenha/resumo biográfico é obrigatória.'],
    maxlength: [8000, 'O resumo não pode passar de 8000 caracteres para manter boa legibilidade.']
  },
  achievements: [{
    type: String, 
    trim: true
  }],
  imageUrl: {
    type: String,
    required: [true, 'A URL da imagem de perfil é obrigatória.']
  },
  region: {
    type: String,
    default: 'Maputo',
    trim: true
  },
  tags: [{
    type: String,
    lowercase: true
  }],
  createdAt: {
    type: Date,
    default: Date.now
  }
});

BiographySchema.index({ name: 'text', title: 'text', tags: 'text' });

module.exports = mongoose.model('Biography', BiographySchema);
