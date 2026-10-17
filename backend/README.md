xihlayiso-backend/
├── src/
│   ├── config/              # Configurações de serviços externos e variáveis globais
│   │   └── db.js            # Conexão com o MongoDB Atlas via Mongoose
│   ├── controllers/         # Intercepta as requisições HTTP (req, res) e envia as respostas
│   │   ├── authController.js
│   │   ├── biographyController.js
│   │   └── dictionaryController.js
│   ├── middlewares/         # Filtros e travas de segurança antes de chegar nas rotas
│   │   ├── authMiddleware.js # Validador de token JWT (Proteção do Painel Admin)
│   │   └── errorMiddleware.js# Manipulador global de erros da API (Clean Code)
│   ├── models/              # Os Schemas do MongoDB (Onde entra o código que definimos)
│   │   ├── Biography.js
│   │   ├── Dictionary.js
│   │   └── User.js          # Schema para as credenciais do seu login de administrador
│   ├── routes/              # Endpoints/URLs expostas para o seu React consumir
│   │   ├── authRoutes.js    # Rotas de login
│   │   ├── biographyRoutes.js# Rotas de CRUD das biografias
│   │   └── dictionaryRoutes.js# Rotas de CRUD do dicionário Ronga
│   ├── services/            # (Opcional) Isola regras de negócio complexas fora do controller
│   ├── utils/               # Funções utilitárias (ex: gerador de tokens JWT)
│   ├── app.js               # Instância e configurações do Express (Middlewares globais)
│   └── server.js            # Ponto de entrada (Inicializa o servidor na porta correspondente)
├── .env                     # Credenciais secretas (PORT, MONGO_URI, JWT_SECRET)
├── .gitignore               # Protege arquivos confidenciais para não irem para o GitHub
├── package.json             # Scripts de execução e dependências (Express, Mongoose, Cors)
└── README.md                # Documentação técnica focada na API
