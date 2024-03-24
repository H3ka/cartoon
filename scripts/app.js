const express = require('express');
const path = require('path');
const Handlebars = require('handlebars');
const fs = require('fs');

const app = express();

// Establecer el motor de vistas Handlebars
app.engine('hbs', function (filePath, options, callback) {
    fs.readFile(filePath, function (err, content) {
        if (err) return callback(new Error(err));
        const template = Handlebars.compile(content.toString());
        return callback(null, template(options));
    });
});
app.set('views', path.join(__dirname, '..', 'templates'));
app.set('view engine', 'hbs');

// Servir archivos estáticos
app.use('/css', express.static(path.join(__dirname, 'public', 'css')));

// Rutas
app.get('/', (req, res) => {
    res.render('index', { title: 'Home' });
});

app.get('/about', (req, res) => {
    res.render('about', { title: 'About' });
});

// Iniciar el servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Servidor iniciado en el puerto ${PORT}`);
});