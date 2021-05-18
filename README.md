# Bulls On Red Social

![amazona](/template/images/bullsOn.png)

## Demo online del proyecto:

- :rocket: Heroku: https://bullson.herokuapp.com/

## Para correr en local

### 1. Clonar repo o descargar el .zip

```
$ git clone git@github.com:M-ivan/Ecommerce.git
$ cd bullson
```

### 2. MongoDB

- Local MongoDB
  -Instalalo de [aquí](https://www.mongodb.com/try/download/community)
  - Crea un .env en la carpeta raiz
  - Pega esto: MONGODB_URL=mongodb://localhost/bullsOn
- Atlas Cloud MongoDB
  - Crea una DB en [https://cloud.mongodb.com](https://cloud.mongodb.com)
  - Crea un .env en la carpeta raiz
  - Pega: MONGODB_URL=mongodb+srv://tu-conexión-con-la-DB

### 3. Backend

en bullsOn/

```
# en la terminal
$ npm install
$ npm start (sin nodemon)
$ npm run server (nodemon)
```

### 4. Frontend

en bullsOn/frontend/

```
# en la terminal (en root folder)
$ cd frontend
$ npm install
$ npm start
```

### 5. Seed de usuarios y productos

- Usuarios: http://localhost:5000/api/db/users/seed
- Devuelve admin email y pass
- posts: http://localhost:5000/api/products/seed

### 6. Admin Login

- En http://localhost:3000/signin
- Ingresa email: admin@example.com
- pass: 1234
