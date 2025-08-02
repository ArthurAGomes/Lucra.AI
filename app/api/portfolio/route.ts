import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Portfolio from '@/lib/models/Portfolio';
import { getCurrentUser } from '@/lib/auth';

// GET - Buscar portfólio do usuário
export async function GET(request: NextRequest) {
  try {
    const user = await getCurrentUser(request);
    if (!user) {
      return NextResponse.json(
        { error: 'Não autorizado' },
        { status: 401 }
      );
    }

    await connectDB();
    const portfolio = await Portfolio.find({ userId: user._id });

    // Calcular totais
    const totalValue = portfolio.reduce((sum, item) => sum + item.totalValue, 0);
    
    // Calcular alocação para cada item
    const portfolioWithAllocation = portfolio.map(item => ({
      ...item.toObject(),
      allocation: totalValue > 0 ? (item.totalValue / totalValue) * 100 : 0,
    }));

    return NextResponse.json({
      portfolio: portfolioWithAllocation,
      totalValue,
      totalItems: portfolio.length,
    });

  } catch (error: any) {
    console.error('Erro ao buscar portfólio:', error);
    return NextResponse.json(
      { error: 'Erro interno do servidor' },
      { status: 500 }
    );
  }
}

// POST - Adicionar item ao portfólio
export async function POST(request: NextRequest) {
  try {
    const user = await getCurrentUser(request);
    if (!user) {
      return NextResponse.json(
        { error: 'Não autorizado' },
        { status: 401 }
      );
    }

    const { name, symbol, quantity, averagePrice, currentPrice, type } = await request.json();

    // Validações
    if (!name || !symbol || !quantity || !averagePrice || !currentPrice) {
      return NextResponse.json(
        { error: 'Todos os campos são obrigatórios' },
        { status: 400 }
      );
    }

    if (quantity <= 0 || averagePrice <= 0 || currentPrice <= 0) {
      return NextResponse.json(
        { error: 'Valores devem ser maiores que zero' },
        { status: 400 }
      );
    }

    await connectDB();

    // Verificar se já existe o ativo para este usuário
    const existingItem = await Portfolio.findOne({ userId: user._id, symbol });
    if (existingItem) {
      return NextResponse.json(
        { error: 'Ativo já existe no portfólio' },
        { status: 400 }
      );
    }

    const totalValue = quantity * currentPrice;
    const change = ((currentPrice - averagePrice) / averagePrice) * 100;

    const portfolioItem = new Portfolio({
      userId: user._id,
      name,
      symbol,
      quantity,
      averagePrice,
      currentPrice,
      totalValue,
      change,
      type: type || 'stock',
    });

    await portfolioItem.save();

    return NextResponse.json({
      message: 'Item adicionado ao portfólio',
      item: portfolioItem,
    });

  } catch (error: any) {
    console.error('Erro ao adicionar item:', error);
    return NextResponse.json(
      { error: 'Erro interno do servidor' },
      { status: 500 }
    );
  }
} 