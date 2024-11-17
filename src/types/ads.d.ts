export type Ad = {
    [key: string]: string | number | Date;
    id: string;
    title: string;
    description: string;
    price: number;
    picture: string;
    categoryId: string;
    location: string;
    author: string;
    date: Date;
};

export type AdWithoutId<T extends object> = T & {
    [key: string]: string | number | Date;
    title?: string;
    description?: string;
    picture?: string;
    location?: string;
    price?: number;
    author?: string;
    date?: Date;
};

export type AdCreate<T extends object> = T & {
    title: string;
    description: string;
    picture: string;
    location: string;
    price: number;
    categoryId: string;
    author: string;
    date: Date;
};

export type PartialAdWithoutId = AdWithoutId<Partial<Omit<Ad, "id">>>;










