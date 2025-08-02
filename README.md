# InvestIA - Dashboard de Investimentos

Uma plataforma inteligente para gestão de investimentos com IA, construída com Next.js, TypeScript e MongoDB.

## 🚀 Funcionalidades

- ✅ Sistema de autenticação completo (login/registro)
- ✅ Gestão de portfólio de investimentos
- ✅ Dashboard interativo com gráficos
- ✅ Assistente IA para recomendações
- ✅ Interface moderna e responsiva
- ✅ Proteção de rotas
- ✅ Integração com MongoDB

## 📋 Pré-requisitos

- Node.js 18+ 
- MongoDB (local ou Atlas)
- npm ou pnpm

## 🛠️ Instalação

1. **Clone o repositório**
```bash
git clone <seu-repositorio>
cd investment-ai-dashboard
```

2. **Instale as dependências**
```bash
npm install
```

3. **Configure as variáveis de ambiente**
Crie um arquivo `.env.local` na raiz do projeto com:

```env
# MongoDB Configuration
MONGODB_URI=mongodb://localhost:27017/investment-dashboard

# JWT Secret (change this in production)
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production

# Next.js Configuration
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your-nextauth-secret-key-change-this-in-production
```

4. **Configure o MongoDB**
   - Instale o MongoDB localmente ou use MongoDB Atlas
   - Certifique-se de que o MongoDB está rodando
   - Ajuste a URI no arquivo `.env.local` se necessário

5. **Execute o projeto**
```bash
npm run dev
```

6. **Acesse a aplicação**
Abra [http://localhost:3000](http://localhost:3000) no seu navegador.

## 📁 Estrutura do Projeto

```
investment-ai-dashboard/
├── app/                    # Páginas da aplicação
│   ├── api/               # APIs do backend
│   │   ├── auth/          # APIs de autenticação
│   │   └── portfolio/     # APIs do portfólio
│   ├── login/             # Página de login
│   ├── register/          # Página de registro
│   └── ...
├── components/            # Componentes React
│   ├── ui/               # Componentes de UI
│   └── ...
├── contexts/             # Contextos React
│   └── AuthContext.tsx   # Contexto de autenticação
├── lib/                  # Utilitários e configurações
│   ├── models/           # Modelos do MongoDB
│   ├── mongodb.ts        # Configuração do MongoDB
│   └── auth.ts           # Utilitários de autenticação
└── ...
```

## 🔐 Autenticação

O sistema inclui:

- **Registro de usuários**: Criação de contas com validação
- **Login**: Autenticação com email e senha
- **Proteção de rotas**: Redirecionamento automático
- **JWT Tokens**: Autenticação segura
- **Logout**: Encerramento de sessão

## 💼 Gestão de Portfólio

Funcionalidades do portfólio:

- **Adicionar ativos**: Ações, criptomoedas, títulos, fundos
- **Visualização**: Dashboard com valores e alocações
- **Cálculos automáticos**: Rentabilidade e distribuição
- **Interface intuitiva**: Modal para adicionar novos ativos

## 🎨 Tecnologias Utilizadas

- **Frontend**: Next.js 15, React 18, TypeScript
- **UI**: Tailwind CSS, Radix UI, Lucide Icons
- **Backend**: Next.js API Routes
- **Banco de Dados**: MongoDB com Mongoose
- **Autenticação**: JWT, bcryptjs
- **Gráficos**: Recharts

## 🔧 Configuração do MongoDB

### Local
1. Instale o MongoDB Community Server
2. Inicie o serviço: `mongod`
3. Use a URI: `mongodb://localhost:27017/investment-dashboard`

### MongoDB Atlas
1. Crie uma conta no MongoDB Atlas
2. Crie um cluster
3. Configure o IP whitelist
4. Use a URI fornecida pelo Atlas

## 🚀 Deploy

### Vercel
1. Conecte seu repositório ao Vercel
2. Configure as variáveis de ambiente
3. Deploy automático

### Outros
- Configure as variáveis de ambiente
- Use MongoDB Atlas para produção
- Configure HTTPS
- Use secrets seguros para JWT

## 📝 Próximos Passos

- [ ] Integração com APIs de preços em tempo real
- [ ] Notificações push
- [ ] Relatórios avançados
- [ ] Exportação de dados
- [ ] Múltiplas carteiras
- [ ] Alertas de preço

## 🤝 Contribuição

1. Fork o projeto
2. Crie uma branch para sua feature
3. Commit suas mudanças
4. Push para a branch
5. Abra um Pull Request

## 📄 Licença

Este projeto está sob a licença MIT.

## 🆘 Suporte

Se você encontrar algum problema ou tiver dúvidas, abra uma issue no repositório. 