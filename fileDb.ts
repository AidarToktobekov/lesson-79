import { promises as fs } from 'fs';
import {
    CategoryWithoutId,
    ICategory, ICategoryPlaceBrief,
    ILists,
    IPlace,
    IThing,
    IThingBrief,
    PlaceWithoutId,
    ThingWithoutId
} from './types';
import { randomUUID } from 'crypto';

const fileName = './db.json';
let lists:ILists;

const fileDb = {
    async init(){
        try{
            const fileContent = await fs.readFile(fileName);
            lists = JSON.parse(fileContent.toString());
        }catch(e){
            lists = {
                categories: [],
                things: [],
                places: [],
            };
        }
    },
    async getThings(){
        const things:IThingBrief[] = [];

        lists.things.map((thing)=>{
            const newThing = {
                id: thing.id,
                name: thing.name,
                idCategory: thing.idCategory,
                idPlace: thing.idPlace,
            }
            things.push(newThing);
        });

        return things;
    },
    async getCategories(){
        const categories:ICategoryPlaceBrief[] = [];

        lists.categories.map((category)=>{
            const newCategory = {
                id: category.id,
                name: category.name
            }
            categories.push(newCategory);
        });

        return categories;
    },
    async getPlaces(){
        const places:ICategoryPlaceBrief[] = [];

        lists.places.map((place)=>{
            const newPlace = {
                id: place.id,
                name: place.name
            }
            places.push(newPlace);
        })

        return places;
    },
    async getThing(id: string){
        const thing = lists.things.find(p => p.id === id);
        if (thing){
            return thing;
        }else{
            return {};
        }
    },
    async getCategory(id: string){
        const category = lists.categories.find(p => p.id === id);
        if (category){
            return category;
        }else{
            return {};
        }
    },
    async getPlace(id: string){
        const place = lists.places.find(p => p.id === id);
        if (place){
            return place;
        }else{
            return {};
        }
    },
    async addThing(item: ThingWithoutId){
        const thing:IThing = {
            ...item,
            id: randomUUID(),
        }

        lists.things.push(thing);
        await this.save();
        return thing;
    },
    async addCategory(item: CategoryWithoutId){
        const category:ICategory = {
            ...item,
            id: randomUUID(),
        }

        lists.categories.push(category);
        await this.save();
        return category;
    },
    async addPlace(item: PlaceWithoutId){
        const place:IPlace = {
            ...item,
            id: randomUUID(),
        }

        lists.places.push(place);
        await this.save();
        return place;
    },
    async deleteThing(id: string){
        let itemIndex:number|null = null;
        lists.things.find((p, index) => {
            if (p.id === id){
                itemIndex = index;
            }
        });
        if (itemIndex !== null){
            lists.things.splice(itemIndex, 1);
            await this.save();
            return lists.things;
        }
    },
    async deleteCategory(id: string){
        let itemIndex:number|null = null;
        let thing: IThing | null | undefined = null;
        thing = lists.things.find((p) => p.idCategory === id);
        if (thing){
            return false;
        }
        lists.categories.find((p, index) => {
            if (p.id === id){
                itemIndex = index;
            }
        });
        if (itemIndex !== null){
            lists.categories.splice(itemIndex, 1);
            await this.save();
            return lists.categories;
        }
    },
    async deletePlace(id: string){
        let itemIndex:number|null = null;
        let thing: IThing | null | undefined = null;
        thing = lists.things.find((p) => p.idPlace === id);
        if (thing){
            return false;
        }
        lists.places.find((p, index) => {
            if (p.id === id){
                itemIndex = index;
            }
        });
        if (itemIndex !== null){
            lists.places.splice(itemIndex, 1);
            await this.save();
            return lists.places;
        }
    },
    async save(){
        await fs.writeFile(fileName, JSON.stringify(lists, null, 2));
    },
}

export default fileDb;