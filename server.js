const express = require('express');
const fs = require('fs');
const hbs = require('hbs'); 
const app = express(); 
app.use((req,res,next) => {
    res.render('maintenance.hbs'); 
 });
app.use(express.static(__dirname + '/public')); 
app.use((req,res,next) => {
    var log = new Date().toString() + ' - URL: ' + req.url + ' -- Method -- ' + req.method;
    fs.appendFileSync('logger.txt',log + '\n'); 
    next();
});

hbs.registerPartials(__dirname + '/views/partials'); 
hbs.registerHelper('getCurrentYear',() => {
    return new Date().getUTCFullYear(); 
});
hbs.registerHelper('screamIt',(text) =>{
    return text.toUpperCase(); 
})
app.set('view engine','hbs'); 

app.get('/',(req,res) => {
    res.render('home.hbs',{
        pageTitle : 'Home Page',       
        welcomeMessage : 'Wecome to home page'
    });
}); 
app.get('/about',(req,res) => {
    res.render('about.hbs',{
        pageTitle: 'About Page',       
    });
}); 

app.get('/bad',(req,res) => {
    res.send({
        errorMessage : 'Bad Request'
    });
});
app.listen(3000); 
