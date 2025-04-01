COMENTARIS MÍNIM 1

- A mongoDB tenim la nova col·lecció de comments
- hi ha dues relacions, amb user i activity
- Aquesta col·lecció té 3 tipus de dades diferents: objectId, String i boolean
- Tenim un nou endpoint al backend
- He creat el nou model de COMMENTS, amb el servei, controlador i rutes
- Tenim les operacions CRUD funcionant perfectament
- Amb el llistat de paginació configurat correctament.
- També tenim el buscador però no he aconseguit que em funcionés, ja que no interpreta bé els paràmetres que li passo.



# API Projecte EA

## Requisits previs
Abans d'executar el projecte, assegura't de tenir instal·lat:
- [Node.js](https://nodejs.org/)
- [MongoDB](https://www.mongodb.com/)

## Organització carpetes del projecte
- Config: arxius de configuració tant de MonogDB, Swagger, CORS, etc.
- Controllers: es defineixen les respostes del servidor
- Middleware: anirà definit elements com JWT i OAuth 2.0
- Models: definició dels models amb interfaces i schema.
- Routes: es gestiona les peticions a la base de dades
- Services: peticions a la base de dades

## Instal·lació
Clona el repositori i executa la següent comanda per instal·lar les dependències:

```sh
npm install
```

## Execució
Per compilar i executar l'API:

```sh
npm run build
npm run start
```

Si es vol compilar amb nodemon:

```sh
npm run dev
```

## Documentació
Una vegada que el servidor està executat, es pot accedir a Swagger a través del següent enllaç:
```
http://localhost:3143/api-docs
```