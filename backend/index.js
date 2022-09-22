
// const express = require('express')
import express from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import cors from 'cors';

const myEnv = dotenv.config()
if (myEnv.error) {
    throw myEnv.error
}

const app = express()
const port = process.env.PORT || 4040

mongoose.connect('mongodb://localhost/carousel', { useNewUrlParser: true })
    .then(() => console.log('Connected to DB ... '))
    .catch((err) => console.log('Something went wrong', err));

let carouselSchema = new mongoose.Schema({
    name: String,
    image: String,
    title: String,
    sub_title: String
});
let Carousel = mongoose.model('carousel', carouselSchema);

let carousel = new Carousel({
    name: 'Grizzly Lion',
    image: 'https://ichef.bbci.co.uk/news/976/cpsprodpb/BE5A/production/_123303784_gettyimages-524191066.jpg',
    title: 'Lion',
    sub_title: 'png'
});
// await carousel.save();

async function deleteMany(id) {
    let result = await Carousel.deleteMany({ id: "632c67278a930e4dd7f38c26" });
}
// await deleteMany();

app.use(cors());
app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    next();
});

app.get('/api/carousel', async (req, res) => {
    const noSlides = req.query.slides;

    let carousels = await Carousel.find().limit(noSlides);

    res.send(carousels);
})

app.listen(port, () => {
    console.log(`Carousel app listening on port > ${port} `)
})