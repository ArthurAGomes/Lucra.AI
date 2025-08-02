import mongoose from 'mongoose';

export interface IPortfolio extends mongoose.Document {
  userId: mongoose.Types.ObjectId;
  name: string;
  symbol: string;
  quantity: number;
  averagePrice: number;
  currentPrice: number;
  totalValue: number;
  change: number;
  allocation: number;
  type: 'stock' | 'crypto' | 'bond' | 'fund';
  createdAt: Date;
  updatedAt: Date;
}

const portfolioSchema = new mongoose.Schema<IPortfolio>({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  name: {
    type: String,
    required: [true, 'Nome do ativo é obrigatório'],
    trim: true,
  },
  symbol: {
    type: String,
    required: [true, 'Símbolo é obrigatório'],
    uppercase: true,
    trim: true,
  },
  quantity: {
    type: Number,
    required: [true, 'Quantidade é obrigatória'],
    min: [0, 'Quantidade deve ser maior que zero'],
  },
  averagePrice: {
    type: Number,
    required: [true, 'Preço médio é obrigatório'],
    min: [0, 'Preço deve ser maior que zero'],
  },
  currentPrice: {
    type: Number,
    required: [true, 'Preço atual é obrigatório'],
    min: [0, 'Preço deve ser maior que zero'],
  },
  totalValue: {
    type: Number,
    required: true,
  },
  change: {
    type: Number,
    default: 0,
  },
  allocation: {
    type: Number,
    default: 0,
  },
  type: {
    type: String,
    enum: ['stock', 'crypto', 'bond', 'fund'],
    default: 'stock',
  },
}, {
  timestamps: true,
});

// Índice composto para buscar portfólio por usuário
portfolioSchema.index({ userId: 1, symbol: 1 }, { unique: true });

export default mongoose.models.Portfolio || mongoose.model<IPortfolio>('Portfolio', portfolioSchema); 