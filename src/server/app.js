import path from 'path';
import React from 'react';
import { renderToString } from 'react-dom/server';
import express from 'express';
import { StaticRouter as Router } from 'react-router';
import { matchPath } from 'react-router-dom';
import { Provider } from 'react-redux';
import { ServerStyleSheet } from 'styled-components';
import mongoose from 'mongoose';
import autoIncrement from 'mongoose-auto-increment';
import bodyParser from 'body-parser';
import cookieSession from 'cookie-session';
import App, { loadData } from '../client/app';
import createStore from '../client/store/createStore';
import rootReducer from '../client/reducers';

// Variable d'environnement
const isDevelopment = process.env.NODE_ENV === 'development';

// Creation de l'app
const app = express();


app.use(bodyParser.json({ limit: '20mb' }));
app.use(bodyParser.urlencoded({ limit: '20mb', extended: true }));



const swaggerUi = require('swagger-ui-express');
const swaggerJSDoc = require('swagger-jsdoc');

// ...
const options = { // line 27
    swaggerDefinition: {
        info: {
            title: 'StuDB API', // Title (required)
            version: '1.0.0', // Version (required)
        },
    },

    apis: [__dirname+'/routes/*.js', __dirname+'/routes/parameters.yaml'], // Path to the API docs
};

const swaggerSpec = swaggerJSDoc(options);


// ...

// ...
app.get('/api-docs.json', function(req, res) { // line 41
    res.setHeader('Content-Type', 'application/json');
    res.send(swaggerSpec);
});
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec)); // line 45


// set port
const port = process.env.PORT || 8888;

// set static
const staticPath = path.join(__dirname, '../../', 'static');
app.use(express.static(staticPath));

//to download file
if(isDevelopment){
  app.use('/files', express.static(path.join(__dirname, '../../files')));

}
else{
  app.use('/files', express.static(path.join(__dirname, '../../../files')));

}

// set view engine
app.set('view engine', 'pug');

// set views directory
if (isDevelopment)
    app.set('views', path.join(__dirname, 'templates'));
else
    app.set('views', path.join(__dirname, '../../', 'static/templates'));


app.set('trust proxy', 1);

app.use(cookieSession({
    cookie: {
        name: 'STUDBCookie',
        secret: 'STUDB : Caring is Sharing', // TODO Change the secret into something a bit more protected
        path: '/',
        httpOnly: false,
        maxAge: 24 * 60 * 60 * 1000 * 365, // Il s'agit d'une annee scolaire
    },
    secret: '1234567890QWERT',
}));



const routesUser = require('./routes/user');
const routesDivision = require('./routes/division');
const routesDocument = require('./routes/document');
const routesTag = require('./routes/tag');


// Set up the routes
routesUser.setup(app,'/api/user');
routesDocument.setup(app,'/api/document');
routesTag.setup(app,'/api/tag');
routesDivision.setup(app,'/api/division');



// Expose app
exports = module.exports = app;


// set native promises as mongoose promise
mongoose.Promise = global.Promise;

// set mongoDB connection

// Mongo Prod

mongoose.connect('mongodb://root:root@cluster0-shard-00-00-jqald.mongodb.net:27017,cluster0-shard-00-01-jqald.mongodb.net:27017,cluster0-shard-00-02-jqald.mongodb.net:27017/test?ssl=true&replicaSet=Cluster0-shard-0&authSource=admin', { useMongoClient: true }, (error) => {
    if (error) {
        console.error('Please make sure Mongodb is installed and running!');
        throw error;
    }
    // mongoose.connection.db.dropDatabase();
});

//Mongo Essim
// /*
/*mongoose.connect('mongodb://essim:studb@essim-shard-00-00-vpuni.mongodb.net:27017,essim-shard-00-01-vpuni.mongodb.net:27017,essim-shard-00-02-vpuni.mongodb.net:27017/test?ssl=true&replicaSet=Essim-shard-0&authSource=admin', { useMongoClient: true }, (error) => {
    if (error) {
        console.error('Please make sure Mongodb is installed and running!');
        throw error;
    }
    mongoose.connection.db.dropDatabase();
});*/
//Mongo Christopher
/*mongoose.connect('mongodb://christopher:studb@christopher-shard-00-00-fbutv.mongodb.net:27017,christopher-shard-00-01-fbutv.mongodb.net:27017,christopher-shard-00-02-fbutv.mongodb.net:27017/test?ssl=true&replicaSet=Christopher-shard-0&authSource=admin', { useMongoClient: true }, (error) => {
        if (error) {
            console.error('Please make sure Mongodb is installed and running!');
            throw error;
        }
        mongoose.connection.db.dropDatabase();
});*/
// Mongo Clément
// mongoose.connect('mongodb://clement:studb@clement-shard-00-00-hx7yb.mongodb.net:27017,clement-shard-00-01-hx7yb.mongodb.net:27017,clement-shard-00-02-hx7yb.mongodb.net:27017/test?ssl=true&replicaSet=Clement-shard-0&authSource=admin', { useMongoClient: true }, (error) => {
//     if (error) {
//         console.error('Please make sure Mongodb is installed and running!');
//         throw error;
//     }
//     // mongoose.connection.db.dropDatabase();
// });

// get the default connection
const db = mongoose.connection;


// bind connection to error event (to get notification of connection errors)
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

// inject test date to mongo
// require('./injectMongo');

// Root html template
let indexTemplate = 'index.dev.pug';
if (!isDevelopment) {
    indexTemplate = 'index';
}

const context = {};

function render(req, res) {
    // Default store
    const store = createStore(rootReducer, { });
    const promises = [];
    loadData.some((route) => {
        // matchPath permet de faire comme <Route> mais en loadant les data avant de le render
        const match = matchPath(req.path, route);
        if (match) {
            if (route.loadData) {
                promises.push(route.loadData(store, match, req.url));
            }
        }
        return match;
    });
    Promise.all(promises).then(() => {
        const sheet = new ServerStyleSheet();
        let html = renderToString(sheet.collectStyles(
            <Provider store={store}>
                <Router location={req.url} context={context}>
                    <App />
                </Router>
            </Provider>
        ));

        html += `
            <script>
                var __PRELOADED_STATE__ = ${JSON.stringify(store.getState())}
            </script>
        `;

        const styleTags = sheet.getStyleTags();
        res.render(indexTemplate, {
            content: html,
            styles: styleTags,
        });
    });
}

// add routes
app.get('/throw', (req, res, next) => {
    next(new Error('we messed up'));
});

app.get('*', (req, res) => {
    render(req, res);
});

if (isDevelopment) {
    app.use((err, req, res) => {
        res.status(err.status || 500);
        res.redirect('/500');
    });
}

// Error Processing MiddleWare

function errorHandler(err, req, res, next) {
    new Promise(() => {
        const error = JSON.parse(err.message);
        return res.status(error.status).json({ error: error.message })
    }).catch((error) => {
        console.log(error);
        return res.status(500).json({ error : "Erreur Inhabituelle"});
    });
}

app.use(errorHandler); //ATTENTION pas de app.use après ceci

// start app
app.listen(port, () => {
    console.info(`🌎  Listening on port ${port} in ${process.env.NODE_ENV} mode on Node ${process.version}.`);
    if (isDevelopment) {
        console.info('Open http://localhost:8888');
    }
});
