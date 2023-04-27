import { Funko } from "./Funko.js";
import { ResponseType } from "./types.js";
/**
 * FunkoCollectionManager - Class that includes all valid Management Operations
 * upon System Funko Collection
 * @class
 */
export declare class FunkoCollectionManager {
    filename: string;
    private _funkoCollection;
    private _user;
    /**
     * Constructor of FuncoCollectionMangaer class
     * @param user - Logged User
     * @param filename - Dir where data will be stored
     * @param funkoCollection - (Optional) A collection of Funko Figures
     */
    constructor(user: string, filename?: string, funkoCollection?: Funko[]);
    /**
     * Method to get User Directory Path
     * @param filename - Dir where data will be stored
     * @param user - User logged
     * @returns Path of user directory
     */
    private getUserDirectory;
    /**
     * Method to get User Funko Path
     * @param filename - Dir where data will be stored
     * @param user - User logged
     * @param funkoId - Funko unique identificator
     * @returns User Funko Path
     */
    private getUserFunkoPath;
    /**
     * Method to read a JSON file and charge data
     * @param filename - Dir where data will be stored
     * @param user - User logged
     * @returns Undefined if file does not exist
     */
    private readUserJSON;
    /**
     * Method to write a list of Funkos into User's Directory
     * @param filename - Dir where data will be stored
     * @param user - User logged
     * @param funkos - List of Funkos to be written
     */
    private writeUserJSON;
    /**
     * Operation to add a funko to the system
     * @param funko - Funko to be added
     * @param callback - A function to be called when the operation is complete
     */
    addFunko(funko: Funko, callback: (err: ResponseType<string> | null, result: ResponseType<string> | null) => void): void;
    /**
     * Operation to modify an existing funko
     * @param funkoId - Funko unique identificator
     * @param modifiedFunko - New funko to be stored instead
     * @param callback - A function to be called when the operation is complete
     */
    modifyFunko(funkoId: string, modifiedFunko: Funko, callback: (err: ResponseType<string> | null, result: ResponseType<string> | null) => void): void;
    /**
       * Operation to remove a funko from the system
       * @param funkoId - Funko unique identificator
       * @param callback - Callback function to be executed after removeFunko is done
       */
    removeFunko(funkoId: string, callback: (error: ResponseType<string> | null, response: ResponseType<string> | null) => void): void;
    /**
     * Opearion to list all existing funkos in user's system
     * @param callback - A function to be called when the operation is complete
     */
    listFunkos(callback: (error: ResponseType<string> | null, response: ResponseType<string> | null) => void): void;
    /**
     * Operation to show information about an unique existing funko in user's system
     * @param funkoId - Funko's id to be shown
     * @param callback - A function to be called when the operation is complete
     */
    showFunko(funkoId: string, callback: (error: ResponseType<string> | null, outputMessage: ResponseType<string> | null) => void): void;
}
