require('dotenv').config({ path: '.env' });
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

// Conectar ao MongoDB
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/investment-dashboard';

async function seedDatabase() {
  try {
    console.log('Tentando conectar ao MongoDB...');
    console.log('URI:', MONGODB_URI);
    
    await mongoose.connect(MONGODB_URI);
    console.log('Conectado ao MongoDB');

    // Limpar coleções existentes
    await mongoose.connection.db.dropDatabase();
    console.log('Banco de dados limpo');

    // Criar modelo de usuário
    const userSchema = new mongoose.Schema({
      name: String,
      email: { type: String, unique: true },
      password: String,
      avatar: String,
    }, { timestamps: true });

    userSchema.pre('save', async function(next) {
      if (this.isModified('password')) {
        this.password = await bcrypt.hash(this.password, 10);
      }
      next();
    });

    const User = mongoose.model('User', userSchema);

    // Criar modelo de portfólio
    const portfolioSchema = new mongoose.Schema({
      userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
      name: String,
      symbol: String,
      quantity: Number,
      averagePrice: Number,
      currentPrice: Number,
      totalValue: Number,
      change: Number,
      allocation: Number,
      type: { type: String, enum: ['stock', 'crypto', 'bond', 'fund'], default: 'stock' },
    }, { timestamps: true });

    const Portfolio = mongoose.model('Portfolio', portfolioSchema);

    // Criar usuário de exemplo
    const user = new User({
      name: 'João Silva',
      email: 'joao@exemplo.com',
      password: '123456',
    });

    await user.save();
    console.log('Usuário criado:', user.email);

    // Criar dados de portfólio de exemplo
    const portfolioItems = [
      {
        userId: user._id,
        name: 'Petrobras',
        symbol: 'PETR4',
        quantity: 100,
        averagePrice: 25.50,
        currentPrice: 26.80,
        totalValue: 2680.00,
        change: 5.10,
        allocation: 30.0,
        type: 'stock',
      },
      {
        userId: user._id,
        name: 'Vale',
        symbol: 'VALE3',
        quantity: 80,
        averagePrice: 65.20,
        currentPrice: 64.50,
        totalValue: 5160.00,
        change: -1.07,
        allocation: 25.0,
        type: 'stock',
      },
      {
        userId: user._id,
        name: 'Itaú Unibanco',
        symbol: 'ITUB4',
        quantity: 120,
        averagePrice: 32.10,
        currentPrice: 32.80,
        totalValue: 3936.00,
        change: 2.18,
        allocation: 20.0,
        type: 'stock',
      },
      {
        userId: user._id,
        name: 'Bradesco',
        symbol: 'BBDC4',
        quantity: 150,
        averagePrice: 18.50,
        currentPrice: 18.80,
        totalValue: 2820.00,
        change: 1.62,
        allocation: 15.0,
        type: 'stock',
      },
      {
        userId: user._id,
        name: 'Ambev',
        symbol: 'ABEV3',
        quantity: 200,
        averagePrice: 12.30,
        currentPrice: 12.20,
        totalValue: 2440.00,
        change: -0.81,
        allocation: 10.0,
        type: 'stock',
      },
    ];

    await Portfolio.insertMany(portfolioItems);
    console.log('Dados de portfólio criados');

    console.log('\n✅ Banco de dados populado com sucesso!');
    console.log('\nCredenciais de teste:');
    console.log('Email: joao@exemplo.com');
    console.log('Senha: 123456');

  } catch (error) {
    console.error('Erro ao popular banco de dados:', error);
  } finally {
    await mongoose.disconnect();
    console.log('Desconectado do MongoDB');
  }
}

seedDatabase(); 