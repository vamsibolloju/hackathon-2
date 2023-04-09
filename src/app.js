const express = require('express');
const bodyParser = require('body-parser');
/*ToDo 1: Import Post from posts.js file in the models folder */

const Restaurant = require('./models/restaurant');

const app = express();

app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


app.get('/posts/leastLikes', (req, res) => {
    /*ToDo 2: Find post with minimum likes from the database and return the result*/
});

app.get('/api/restaurant', async (req, res) => {
    try{
        const restaurants = await Restaurant.find({});
        return res.status(200).json({
            restaurants,
            message: 'Restaurants fetched successfully.'
        });
    } catch (err) {
        return res.status(500).end(`Some error occured while fetching the Restaurants.`);
    }
});


app.get('/api/restaurant/categories', async (req, res) => {
    try{
        const categories = await Restaurant.find({ }).select({ category: 1, _id: 0 });
        return res.status(200).json(categories.map(c => c.category));    
    } catch(err){
        console.log(err);
        return res.status(500).end(`Some error occurred while fetching Categories.`);   
    }
})


app.get('/api/restaurant/:id', async (req, res) => {
    try{
        const id = req.params.id;
        const restaurant = await Restaurant.find({ _id: id });
        if(restaurant){
            return res.status(200).json(restaurant);
        }
        return res.status(404).end('No Restaurant found with the given ID');
    } catch (err) {
        console.log(err);
        return res.status(500).end(`Some error occured while fetching the Restaurant.`);
    }
});

app.get('/api/restaurant/rating/:ratingValue', async (req, res) => {
    try{
        const rating = req.params.ratingValue;
        const restaurants = await Restaurant.find({ rating });
        return res.status(200).json(restaurants);
    } catch (err) {
        return res.status(500).end(`Some error occured while fetching the Restaurant.`);
    }
});


app.post('/api/restaurant/add', async (req, res) => {
    try {
        const restarant = req.body;
        if(!restarant || !Object.keys(restarant).length ){
            return res.status(400).end('Content cannot be empty')
        }

        const result = await Restaurant.create(req.body);
        return res.status(200).json(result);
    } catch (err){
        return res.status(500).end(`Some error occurred while creating the Restaurant`);
    }
});


app.put('/api/restaurant/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const restarant = req.body;
        if(!restarant || !Object.keys(restarant).length ){
            return res.status(400).end('Restaurant Data is required.')
        }
        const response = await Restaurant.findOneAndUpdate({ _id: id }, restarant)
        return res.status(200).json({
            message: response ? "Restaurant updated successfully." : "No Restaurant found with the given ID."
        })
    } catch (err){
        return res.status(500).end(`Some error occured while fetching the Restaurant.`);
    }

})


app.delete('/api/restaurant/:id', async (req, res) => {
    try {
        const restaurantId = req.params.id;
        const response = await Restaurant.findOneAndDelete({
            _id: restaurantId
        });
        return res.status(200).json({
            restaurant: response,
            message: "Restaurant deleted successfully."
        });
    } catch {
        return res.status(500).end(`Some error occured while deleting the Restaurant.`);
    }
});

app.delete('/api/restaurant', async (req, res) => {
    try {
        const response = await Restaurant.deleteMany({});
        return res.status(200).json({
            restaurants: response,
            message: "Restaurant deleted successfully."
        });
    } catch {
        return res.status(500).end(`Some error occured while deleting the Restaurant.`);
    }
});

/*ToDo 3: Export the app*/
module.exports = app;
