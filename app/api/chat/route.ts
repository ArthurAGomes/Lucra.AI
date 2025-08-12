import { NextRequest, NextResponse } from 'next/server';

// Para usar Groq (API gratuita), adicione no .env.local:
// GROQ_API_KEY=sua_chave_groq_aqui

export async function POST(request: NextRequest) {
  try {
    const { messages } = await request.json();

    // Validações básicas
    if (!messages || !Array.isArray(messages)) {
      return NextResponse.json(
        { error: 'Messages são obrigatórias' },
        { status: 400 }
      );
    }

    // Verificar se tem API key do Groq
    if (!process.env.GROQ_API_KEY) {
      console.error('GROQ_API_KEY não configurada');
      return NextResponse.json(
        { error: 'API Key do Groq não configurada. Visite: https://console.groq.com/keys' },
        { status: 500 }
      );
    }

    // Chamada para Groq (gratuita e rápida)
    const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${process.env.GROQ_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'llama3-8b-8192', // Modelo gratuito do Groq
        messages: [
          {
            role: 'system',
            content: `Você é um assistente especializado em investimentos e finanças brasileiras. Suas características:

1. Expertise em mercado financeiro brasileiro (B3, Ibovespa)
2. Conhecimento em análise técnica e fundamentalista
3. Experiência com ações, FIIs, renda fixa e criptomoedas
4. Foco em educação financeira e gestão de riscos

Diretrizes IMPORTANTES:
- SEMPRE mencione que suas sugestões NÃO constituem recomendação de investimento
- Incentive o usuário a fazer sua própria análise e consultar um assessor
- Seja didático e explique conceitos quando necessário
- Use exemplos práticos do mercado brasileiro
- Mantenha um tom profissional mas acessível
- Responda SEMPRE em português brasileiro
- Cite empresas brasileiras como PETR4, VALE3, ITUB4, WEGE3, etc.

Lembre-se: Investimentos envolvem riscos. Rentabilidade passada não garante resultados futuros.`
          },
          ...messages
        ],
        stream: true,
        temperature: 0.7,
        max_tokens: 2000
      })
    });

    if (!response.ok) {
      const errorData = await response.text();
      console.error('Erro do Groq:', errorData);
      return NextResponse.json(
        { error: `Erro do Groq: ${response.status}`, details: errorData },
        { status: response.status }
      );
    }

    // Retornar o stream diretamente
    return new NextResponse(response.body, {
      headers: {
        'Content-Type': 'text/plain; charset=utf-8',
        'Cache-Control': 'no-cache',
        'Connection': 'keep-alive',
      },
    });

  } catch (error: any) {
    console.error('Erro na API do chat:', error);
    return NextResponse.json(
      { error: 'Erro interno do servidor', details: error.message },
      { status: 500 }
    );
  }
}