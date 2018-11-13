const express = require('express'),
    session = require('express-session'),
    flash = require('express-flash'),
    parser = require('body-parser')
    path = require('path'),

    port = process.env.PORT || 9000,
    // invoke express and store the result in the variable app
    app = express();

app.use(express.static(path.join(__dirname, '/public/dist/public')));

app.use(parser.urlencoded({ extended: true }));
app.use(parser.json());
app.use( function(request, response, next){
    console.log(`requesting url: ${request.url}`);
    next();
})
app.use(session({
    secret:'superSekretKitteh',
    resave: false,
    saveUninitialized: false,
    cookie: {
        secure: false, 
        maxAge: 600000
    }
}));

//connect to DB
require('./server/config/database');
app.use(require('./server/config/routes')); 

// port
app.listen(port, () => console.log(`Express server listening on port ${port} for Angular Author and Books API`));    // ES6 way