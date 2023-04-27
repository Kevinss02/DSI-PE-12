/**
 * FunkoType - Enum that describes valid types for Funko Pop Figures
 * @enum
 */
export var FunkoType;
(function (FunkoType) {
    FunkoType["POP"] = "Pop!";
    FunkoType["POP_RIDES"] = "Pop! Rides";
    FunkoType["VINYL_SODA"] = "Vinyl Soda";
    FunkoType["VINYL_GOLD"] = "Vinyl Gold";
})(FunkoType = FunkoType || (FunkoType = {}));
/**
 * FunkoGenre - Enum that describes valid genres for Funko Pop Figures
 * @enum
 */
export var FunkoGenre;
(function (FunkoGenre) {
    FunkoGenre["ANIMATION"] = "Animation";
    FunkoGenre["FILMS_AND_TV"] = "Films and TV";
    FunkoGenre["VIDEOGAMES"] = "Videogames";
    FunkoGenre["SPORTS"] = "Sports";
    FunkoGenre["MUSIC"] = "Music";
    FunkoGenre["ANIME"] = "Anime";
})(FunkoGenre = FunkoGenre || (FunkoGenre = {}));
/**
 * Funko - Class that represents a Funko Pop Figure
 * @class
 * @implements - @interface IFunkoData
 */
export class Funko {
    id;
    name;
    desc;
    type;
    genre;
    franchise;
    franchiseNumber;
    isExclusive;
    specialFeatures;
    marketValue;
    constructor(id, name, desc, type, genre, franchise, franchiseNumber, isExclusive, specialFeatures, marketValue) {
        this.id = id;
        this.name = name;
        this.desc = desc;
        this.type = type;
        this.genre = genre;
        this.franchise = franchise;
        this.franchiseNumber = franchiseNumber;
        this.isExclusive = isExclusive;
        this.specialFeatures = specialFeatures;
        this.marketValue = marketValue;
        if (franchiseNumber < 0 || !Number.isInteger(franchiseNumber)) {
            throw new Error(`Invalid Franchise Number: ${franchiseNumber}`);
        }
        if (marketValue < 0 || !isFinite(marketValue)) {
            throw new Error(`Invalid Market Value: ${marketValue}`);
        }
    }
    /**
     * Method to parse a new Funko from data provided
     * @param data - JSON data
     * @returns A new funko from data provided
     */
    parse(data) {
        return new Funko(data.id, data.name, data.desc, data.type, data.genre, data.franchise, data.franchiseNumber, data.isExclusive, data.specialFeatures, data.marketValue);
    }
    /**
     * Method that converts Funko Class data into JSON model data
     * @returns Funko Data into JSON model
     */
    toJSON() {
        return {
            id: this.id,
            name: this.name,
            desc: this.desc,
            type: this.type,
            genre: this.genre,
            franchise: this.franchise,
            franchiseNumber: this.franchiseNumber,
            isExclusive: this.isExclusive,
            specialFeatures: this.specialFeatures,
            marketValue: this.marketValue,
        };
    }
}
