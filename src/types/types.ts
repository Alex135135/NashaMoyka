export interface ICard {
    index?: number,
    title: string,
    description: string,
}

export interface ICards {
    title: string,
    texts: ICard[],
}

export interface IServicePattern {
    title: string;
    description: string;
    features: string[];
    details: string[];
    video: string
}