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
export enum FunkoType {
  POP = "Pop!",
  POP_RIDES = "Pop! Rides",
  VINYL_SODA = "Vinyl Soda",
  VINYL_GOLD = "Vinyl Gold",
}

/**
 * FunkoGenre - Enum that describes valid genres for Funko Pop Figures
 * @enum
 */
export enum FunkoGenre {
  ANIMATION = "Animation",
  FILMS_AND_TV = "Films and TV",
  VIDEOGAMES = "Videogames",
  SPORTS = "Sports",
  MUSIC = "Music",
  ANIME = "Anime",
}

/**
 * Funko - Class that represents a Funko Pop Figure
 * @class
 * @implements - @interface IFunkoData
 */
export class Funko implements IFunkoData {
  constructor(
    public id: string,
    public name: string,
    public desc: string,
    public type: FunkoType,
    public genre: FunkoGenre,
    public franchise: string,
    public franchiseNumber: number,
    public isExclusive: boolean,
    public specialFeatures: string,
    public marketValue: number
  ) {
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
  public parse(data: IFunkoData): Funko {
    return new Funko(
      data.id,
      data.name,
      data.desc,
      data.type,
      data.genre,
      data.franchise,
      data.franchiseNumber,
      data.isExclusive,
      data.specialFeatures,
      data.marketValue
    );
  }

  /**
   * Method that converts Funko Class data into JSON model data
   * @returns Funko Data into JSON model
   */
  public toJSON(): IFunkoData {
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
