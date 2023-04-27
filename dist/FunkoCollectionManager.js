import { Funko, FunkoType, FunkoGenre } from "./Funko.js";
import chalk from "chalk";
import { MongoClient } from 'mongodb';
const dbURL = 'mongodb://127.0.0.1:27017';
const dbName = 'funko-app';
/**
 * FunkoCollectionManager - Class that includes all valid Management Operations
 * upon System Funko Collection
 * @class
 */
export class FunkoCollectionManager {
    filename;
    _funkoCollection = [];
    _user;
    /**
     * Constructor of FuncoCollectionMangaer class
     * @param user - Logged User
     * @param filename - Dir where data will be stored
     * @param funkoCollection - (Optional) A collection of Funko Figures
     */
    constructor(user, filename = "funkos", funkoCollection) {
        this.filename = filename;
        this._user = user;
        if (funkoCollection) {
            this._funkoCollection = funkoCollection;
        }
        else {
            this.readDatabase(filename, user)
                .then((funkoCollection) => {
                this._funkoCollection = funkoCollection;
                console.log("THEN");
                console.log(this._funkoCollection);
            })
                .catch((error) => {
                console.log(error);
                this._funkoCollection = [];
            });
        }
    }
    /**
     * Method to get User Directory Path
     * @param filename - Dir where data will be stored
     * @param user - User logged
     * @returns Path of user directory
     */
    getUserDirectory(filename, user) {
        return `${filename}/${user}`;
    }
    /**
     * Method to get User Funko Path
     * @param filename - Dir where data will be stored
     * @param user - User logged
     * @param funkoId - Funko unique identificator
     * @returns User Funko Path
     */
    getUserFunkoPath(filename, user, funkoId) {
        const userDirectory = this.getUserDirectory(filename, user);
        const userFunkoFilename = funkoId + ".json";
        return `${userDirectory}/${userFunkoFilename}`;
    }
    /**
     * Method to read a JSON file and charge data
     * @param filename - Dir where data will be stored
     * @param user - User logged
     * @returns Undefined if file does not exist
     */
    readDatabase(filename, user) {
        const userDirectory = this.getUserDirectory(filename, user);
        console.log(chalk.blue(userDirectory));
        let funkoCollection = [];
        return MongoClient.connect(dbURL)
            .then((client) => {
            const db = client.db(dbName);
            return db.collection(userDirectory).find().toArray();
        })
            .then((result) => {
            for (const funkoData of result) {
                funkoCollection.push(new Funko("", "", "", FunkoType.POP, FunkoGenre.ANIMATION, "", 0, false, "", 0).parse(funkoData));
            }
            console.log(funkoCollection);
            return funkoCollection;
        })
            .catch((error) => {
            console.log(error);
            return funkoCollection;
        });
    }
    /**
     * Method to write a list of Funkos into User's Directory
     * @param filename - Dir where data will be stored
     * @param user - User logged
     * @param funkos - List of Funkos to be written
     */
    insertDatabase(filename, user, funkos) {
        const userDirectory = this.getUserDirectory(filename, user);
        for (let funko of funkos) {
            const funkoData = funko.toJSON();
            const userFunkoPath = this.getUserFunkoPath(filename, user, funko.id);
            let data = JSON.stringify(funkoData, null, 2);
            MongoClient.connect(dbURL).then((client) => {
                const db = client.db(dbName);
                return db.collection(userDirectory).insertOne(funkoData);
            }).then((result) => {
                console.log(result);
            }).catch((error) => {
                console.log(error);
            });
        }
    }
    /**
     * Operation to add a funko to the system
     * @param funko - Funko to be added
     * @param callback - A function to be called when the operation is complete
     */
    addFunko(funko, callback) {
        if (this._funkoCollection.find((f) => f.id === funko.id)) {
            const err = `A Funko with ID ${funko.id} already exists in the collection.`;
            const error = {
                type: 'add',
                success: false,
                output: undefined,
                error: err
            };
            callback(error, null);
        }
        else {
            this._funkoCollection.push(funko);
            this.insertDatabase(this.filename, this._user, [funko]);
            const output = `Funko with ID ${funko.id} has been added to the collection.`;
            const outputMessage = {
                type: 'add',
                success: true,
                output: output
            };
            callback(null, outputMessage);
        }
    }
    /**
     * Operation to modify an existing funko
     * @param funkoId - Funko unique identificator
     * @param modifiedFunko - New funko to be stored instead
     * @param callback - A function to be called when the operation is complete
     */
    modifyFunko(funkoId, modifiedFunko, callback) {
        const index = this._funkoCollection.findIndex((f) => f.id === funkoId);
        let response;
        let error;
        if (index !== -1) {
            const indx = this._funkoCollection.findIndex((f) => f.id === modifiedFunko.id);
            if (indx !== -1) {
                this._funkoCollection.splice(index, 1);
            }
            else {
                this._funkoCollection[index] = modifiedFunko;
            }
            const path = this.getUserFunkoPath(this.filename, this._user, funkoId);
            try {
                MongoClient.connect(dbURL).then((client) => {
                    const db = client.db(dbName);
                    return db.collection(this.getUserDirectory(this.filename, this._user)).deleteOne({
                        id: funkoId
                    });
                }).then((result) => {
                    console.log(result.deletedCount);
                }).catch((error) => {
                    console.log(error);
                    throw error(error);
                });
            }
            catch (e) {
                let err = `Error modifying file ${path}: ${e}`;
                error = {
                    type: 'update',
                    success: false,
                    output: undefined,
                    error: err
                };
                callback(error, null);
            }
            this.insertDatabase(this.filename, this._user, [modifiedFunko]);
            let output = `Funko with ID ${funkoId} has been modified in the collection.`;
            response = {
                type: 'update',
                success: true,
                output: output
            };
            callback(null, response);
        }
        else {
            let err = `A Funko with ID ${funkoId} does not exist in the collection.`;
            error = {
                type: 'update',
                success: false,
                output: undefined,
                error: err
            };
            callback(error, null);
        }
    }
    /**
       * Operation to remove a funko from the system
       * @param funkoId - Funko unique identificator
       * @param callback - Callback function to be executed after removeFunko is done
       */
    removeFunko(funkoId, callback) {
        console.log("REMOVE");
        const index = this._funkoCollection.findIndex((f) => f.id === funkoId);
        if (index !== -1) {
            this._funkoCollection.splice(index, 1);
            const path = this.getUserFunkoPath(this.filename, this._user, funkoId);
            try {
                MongoClient.connect(dbURL).then((client) => {
                    const db = client.db(dbName);
                    return db.collection(this.getUserDirectory(this.filename, this._user)).deleteOne({
                        id: funkoId
                    });
                }).then((result) => {
                    console.log(result.deletedCount);
                }).catch((error) => {
                    console.log(error);
                    throw error(error);
                });
            }
            catch (e) {
                let err = `Error deleting from database ${path}: ${e}`;
                const error = {
                    type: 'remove',
                    success: false,
                    output: undefined,
                    error: err
                };
                callback(error, null);
                return;
            }
            let result = `Funko with ID ${funkoId} has been removed from the collection.`;
            const response = {
                type: 'remove',
                success: true,
                output: result
            };
            callback(null, response);
        }
        else {
            let err = `A Funko with ID ${funkoId} does not exist in the collection.`;
            const error = {
                type: 'remove',
                success: false,
                output: undefined,
                error: err
            };
            callback(error, null);
        }
    }
    /**
     * Opearion to list all existing funkos in user's system
     * @param callback - A function to be called when the operation is complete
     */
    listFunkos(callback) {
        const funkos = this._funkoCollection;
        console.log("AA");
        console.log(funkos);
        let funkosJSON = [];
        let response;
        try {
            funkos.forEach((funko) => {
                funkosJSON.push(funko.toJSON());
            });
            response = {
                type: 'list',
                success: true,
                output: funkosJSON
            };
            callback(null, response);
        }
        catch (e) {
            const err = "An error occurred while converting the funkos to JSON:" + e;
            let error = {
                type: 'list',
                success: false,
                output: undefined,
                error: err
            };
            callback(error, null);
        }
    }
    /**
     * Operation to show information about an unique existing funko in user's system
     * @param funkoId - Funko's id to be shown
     * @param callback - A function to be called when the operation is complete
     */
    showFunko(funkoId, callback) {
        const funkos = this._funkoCollection;
        const funko = funkos.find((funko) => funko.id === funkoId);
        if (funko) {
            let result = {
                type: 'read',
                success: true,
                output: [funko.toJSON()]
            };
            callback(null, result);
        }
        else {
            const err = `Funko with ${funkoId} does not exist in system`;
            let error = {
                type: 'read',
                success: false,
                output: undefined,
                error: err
            };
            callback(error, null);
        }
    }
}
