# 🚀 Guia Rápido de Configuração

## 1. Configuração Inicial

### Instalar dependências
```bash
npm install
```

### Configurar variáveis de ambiente
Crie um arquivo `.env.local` na raiz do projeto:

```env
MONGODB_URI=mongodb://localhost:27017/investment-dashboard
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your-nextauth-secret-key-change-this-in-production
```

## 2. Configurar MongoDB

### Opção A: MongoDB Local
1. Instale o MongoDB Community Server
2. Inicie o serviço: `mongod`
3. O banco será criado automaticamente

### Opção B: MongoDB Atlas
1. Crie conta no [MongoDB Atlas](https://atlas.mongodb.com)
2. Crie um cluster gratuito
3. Configure IP whitelist (0.0.0.0/0 para desenvolvimento)
4. Copie a URI de conexão
5. Substitua no `.env.local`

## 3. Popular Banco de Dados

Execute o script de seed para criar dados de exemplo:

```bash
npm run seed
```

Isso criará:
- Usuário de teste: `joao@exemplo.com` / `123456`
- 5 ativos de exemplo no portfólio

## 4. Executar o Projeto

```bash
npm run dev
```

Acesse: http://localhost:3000

## 5. Testar o Sistema

1. **Login**: Use as credenciais de teste
2. **Adicionar ativos**: Clique em "Adicionar Ativo"
3. **Visualizar portfólio**: Veja os dados reais do MongoDB
4. **Logout**: Teste o sistema de logout

## 🔧 Solução de Problemas

### Erro de conexão com MongoDB
- Verifique se o MongoDB está rodando
- Confirme a URI no `.env.local`
- Teste a conexão: `mongodb://localhost:27017`

### Erro de autenticação
- Verifique se o JWT_SECRET está configurado
- Limpe o localStorage do navegador
- Execute `npm run seed` novamente

### Erro de build
- Verifique se todas as dependências estão instaladas
- Execute `npm install` novamente
- Limpe cache: `npm run build -- --clean`

## 📝 Próximos Passos

Após a configuração inicial:

1. **Personalizar dados**: Adicione seus próprios ativos
2. **Configurar APIs**: Integre com APIs de preços reais
3. **Deploy**: Configure para produção
4. **Segurança**: Use secrets seguros em produção

## 🆘 Suporte

Se encontrar problemas:
1. Verifique o console do navegador
2. Verifique os logs do servidor
3. Confirme a configuração do MongoDB
4. Teste com dados de exemplo 