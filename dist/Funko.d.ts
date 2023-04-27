/**
 * IFunkoData - Represents Data needed to describe a Funko Pop Figure
 * @interface
 */
export interface IFunkoData {
    id: string;
    name: string;
    desc: string;
    type: FunkoType;
    genre: FunkoGenre;
    franchise: string;
    franchiseNumber: number;
    isExclusive: boolean;
    specialFeatures: string;
    marketValue: number;
}
/**
 * FunkoType - Enum that describes valid types for Funko Pop Figures
 * @enum
 */
export declare enum FunkoType {
    POP = "Pop!",
    POP_RIDES = "Pop! Rides",
    VINYL_SODA = "Vinyl Soda",
    VINYL_GOLD = "Vinyl Gold"
}
/**
 * FunkoGenre - Enum that describes valid genres for Funko Pop Figures
 * @enum
 */
export declare enum FunkoGenre {
    ANIMATION = "Animation",
    FILMS_AND_TV = "Films and TV",
    VIDEOGAMES = "Videogames",
    SPORTS = "Sports",
    MUSIC = "Music",
    ANIME = "Anime"
}
/**
 * Funko - Class that represents a Funko Pop Figure
 * @class
 * @implements - @interface IFunkoData
 */
export declare class Funko implements IFunkoData {
    id: string;
    name: string;
    desc: string;
    type: FunkoType;
    genre: FunkoGenre;
    franchise: string;
    franchiseNumber: number;
    isExclusive: boolean;
    specialFeatures: string;
    marketValue: number;
    constructor(id: string, name: string, desc: string, type: FunkoType, genre: FunkoGenre, franchise: string, franchiseNumber: number, isExclusive: boolean, specialFeatures: string, marketValue: number);
    /**
     * Method to parse a new Funko from data provided
     * @param data - JSON data
     * @returns A new funko from data provided
     */
    parse(data: IFunkoData): Funko;
    /**
     * Method that converts Funko Class data into JSON model data
     * @returns Funko Data into JSON model
     */
    toJSON(): IFunkoData;
}
