import express from 'express';
import handlebars from 'express-handlebars';
import {Server} from 'socket.io';

import __dirname from './utils.js'
import productsRoute from './routes/products.route.js';

const APP = express();
const PORT = 8080;

//json middleware config
APP.use(express.urlencoded({ extended: true }));
APP.use(express.json());

//handlebars config
APP.engine('handlebars', handlebars.engine());
APP.set('views', __dirname + '/views');
APP.set('view engine', 'handlebars');

//public config
APP.use(express.static(__dirname + '/public'));

//router config
APP.use('/', productsRoute);

const HTTPSERVER = APP.listen(PORT, () => {
    console.log(`Server running on port: ${PORT}`);
});

const SOCKETSERVER = new Server(HTTPSERVER);

SOCKETSERVER.on('connection', () =>{
    console.log('Nuevo cliente conectado!');

    // socket.on("message2", (data) => {
    //     logs.push({socketid:socket.id,message:data})
    //     socketServer.emit('log',{logs});
    // });

});