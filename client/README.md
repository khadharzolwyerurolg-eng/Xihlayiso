## Configuração para desenvolvimento e deploy

O frontend usa `https://xihlayiso.onrender.com/api` por padrão. Para apontá-lo a outra API,
defina `REACT_APP_API_URL` no ambiente de build, incluindo `/api` no final.

```env
REACT_APP_API_URL=https://xihlayiso.onrender.com/api
```

O backend permite `https://xihlayisos.onrender.com` e `http://localhost:3000` por padrão.
No Render, configure `CLIENT_URL` com a origem do frontend. Para permitir mais de uma
origem, use `CLIENT_URLS` com URLs separadas por vírgula.

```env
CLIENT_URL=https://xihlayisos.onrender.com
```

Gere os arquivos estáticos com `npm run build` dentro de `client/`.