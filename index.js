let express = require('express')
let app = express()
let db = require('./models')

app.set('view engine', 'ejs')
app.use(express.urlencoded({ extended: false }))
app.use(express.static(__dirname + '/public'));

app.get('/', (req, res) => {
    res.render('home')
})

app.get('/favorites', (req, res) => {
    db.animal.findAll() 
    .then(function(animals) {
    
        res.render('favorites', {animals:animals})
    })
})

app.post('/favorites', (req, res) => {
    db.animal.create({
        species_name: req.body.species_name,
        scientific_name: req.body.scientific_name,	
        image_url: req.body.image_url,
        description: req.body.description,
        extinct:req.body.extinct
    }).then(function(animal) {
        console.log(animal)
        res.redirect('/favorites')
    }).catch(function(err) {
        console.log(err)

    })
})

app.get('/favorites/new', (req, res) => {
res.render('new')
})

app.listen(process.env.PORT || 3000)