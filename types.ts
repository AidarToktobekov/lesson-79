export interface IThing{
    id: string;
    idCategory: string;
    idPlace: string;
    name: string;
    description: string | null;
    image: string | null;
    date: string;
}

export interface IPlace{
    id: string;
    name: string;
    description: string | null;
}

export interface ICategory{
    id: string;
    name: string;
    description: string | null;
}

export interface ILists{
    categories: ICategory[];
    things: IThing[];
    places: IPlace[];
}
export type ThingWithoutId = Omit<IThing, 'id'>

export type CategoryWithoutId = Omit<ICategory, 'id'>

export type PlaceWithoutId = Omit<IPlace, 'id'>

