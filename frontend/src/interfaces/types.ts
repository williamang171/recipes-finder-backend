export interface Prediction {
    name: string,
    value: number
}

export interface Image {
    img: string,
    imgForSubmit: string,
    title?: string,
    author: string,
    featured?: boolean,
    authorLink?: any
}

export interface Recipe {
    id?: number;
    name: string;
    url: string;
    image_url: string;
    mealdb_id?: string;
}