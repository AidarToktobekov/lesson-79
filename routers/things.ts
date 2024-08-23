import express from "express";
import fileDb from "../fileDb";
import {CategoryWithoutId, PlaceWithoutId, ThingWithoutId} from "../types";
const router = express.Router();



router.get('/categories', async (req, res) => {
    const categories = await fileDb.getCategories();
    return res.send(categories);
});

router.get('/categories/:id', async (req, res) => {
    const category = await fileDb.getCategory(req.params.id);
    return res.send(category);
});

router.get('/things', async (req, res) => {
    const things = await fileDb.getThings();
    return res.send(things);
});

router.get('/thing/:id', async (req, res) => {
    const thing = await fileDb.getThing(req.params.id);
    return res.send(thing);
});

router.get('/places', async (req, res) => {
    const places = await fileDb.getPlaces();
    return res.send(places);
});

router.get('/places/:id', async (req, res) => {
    const place = await fileDb.getPlace(req.params.id);
    return res.send(place);
});

router.post('/categories', async (req, res) => {
    if(!req.body.name){
        return res.status(400).send({"error": "Category name must be present in the request"});
    }

    const category:CategoryWithoutId = {
        name: req.body.name,
        description: req.body.description ? req.body.description : null,
    }
    const savedCategory = await fileDb.addCategory(category)

    return res.send(savedCategory)
});

router.post('/places', async (req, res) => {
    if(!req.body.name){
        return res.status(400).send({"error": "Place name must be present in the request"});
    }

    const place:PlaceWithoutId = {
        name: req.body.name,
        description: req.body.description ? req.body.description : null,
    }
    const savedPlace = await fileDb.addPlace(place)

    return res.send(savedPlace)
});

// router.post('/things', imagesUpload.single('image'),  async (req, res) => {
//     if(!req.body.name || !req.body.idCategory || !req.body.idPlace){
//         return res.status(400).send({"error": "Thing name, idCategory, idPlace must be present in the request"});
//     }
//
//     const thing:ThingWithoutId = {
//         name: req.body.name,
//         description: req.body.description,
//         idPlace: req.body.idPlace,
//         idCategory: req.body.idCategory,
//         date: new Date().toISOString(),
//         image: req.file ? req.file.filename : null,
//     }
//     const savedPlace = await fileDb.addPlace(thing)
//
//     return res.send(savedPlace)
// });

export default router;