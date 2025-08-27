# Caixa App

## Descrição

Caixa App é um aplicativo móvel de gestão financeira desenvolvido para o Hackathon Caixa. Permite que os usuários gerenciem seus empréstimos, visualizem resumos financeiros e acompanhem o status de pagamentos em uma interface amigável.

## Funcionalidades

- Interface intuitiva com saudação personalizada
- Visão geral das estatísticas financeiras incluindo total pago, valores pendentes e saldo devedor
- Visualização detalhada de empréstimos com acompanhamento de parcelas
- Representação visual dos dados financeiros através de gráficos
- Design responsivo para Android e iOS

## Instalação

Para começar com o Caixa App, clone o repositório e instale as dependências:

```bash
git clone https://github.com/GabrielMesquitaOliveira/caixa-app
cd caixa-app
npm install
```

## Uso

Primeiro, inicie o servidor JSON para a API:

```bash
npm run json-server
```

Em seguida, em outro terminal, inicie a aplicação usando o Expo:

```bash
npx expo start
```

Você pode abrir o app em um build de desenvolvimento, emulador Android, simulador iOS ou Expo Go.

## Tecnologias Utilizadas

- React Native
- Expo
- TypeScript
- Gluestack UI
- Tailwind CSS
- Jest para testes

## Contribuição

Contribuições são bem-vindas! Por favor, abra uma issue ou envie um pull request para melhorias ou correções de bugs.

## Licença

Este projeto está licenciado sob a licença MIT.
