import express from 'express';
import { FunkoCollectionManager } from './FunkoCollectionManager.js';
import { Funko, FunkoGenre, FunkoType } from './Funko.js';
import bodyParser from 'body-parser';
import Ajv from 'ajv';
const ajv = new Ajv();
/**
 * Schema to validate json files
 */
const schema = {
    type: 'object',
    properties: {
        id: { type: 'string' },
        name: { type: 'string' },
        desc: { type: 'string' },
        type: { type: 'string' },
        genre: { type: 'string' },
        franchise: { type: 'string' },
        franchiseNumber: { type: 'number' },
        isExclusive: { type: 'boolean' },
        specialFeatures: { type: 'string' },
        marketValue: { type: 'number' },
    },
    required: ['id', 'name', 'desc', 'type', 'genre', 'franchise', 'franchiseNumber', 'isExclusive', 'specialFeatures', 'marketValue'],
};
const validate = ajv.compile(schema);
export const app = express();
/**
 * This allows to analize json format bodies
 */
app.use(bodyParser.json());
/**
 * Obtains information about a specific user's Funko Pop or to list all of their Funko Pops.
 */
app.get('/funkos', (req, res) => {
    if (!req.query.user) {
        const outputError = {
            type: 'list' && 'read',
            success: false,
            output: undefined,
            error: 'A username has to be provided'
        };
        res.status(400).send({
            error: outputError
        });
    }
    else {
        const user = req.query.user.toString();
        const manager = new FunkoCollectionManager(user);
        const id = req.query.id?.toString();
        if (id) {
            manager.showFunko(id, (error, outputMessage) => {
                if (error) {
                    res.status(500).send({ error: error });
                }
                else {
                    res.send({ response: outputMessage });
                }
            });
        }
        else {
            manager.listFunkos((error, outputMessage) => {
                if (error) {
                    res.status(500).send({ error: error });
                }
                else {
                    res.send({ response: outputMessage });
                }
            });
        }
    }
});
/**
 * Adds a new Funko to user's list
 */
app.post('/funkos', (req, res) => {
    if (!req.query.user || !req.body) {
        const error = {
            type: 'add',
            success: false,
            output: undefined,
            error: 'A username and body has to be provided'
        };
        res.status(400).send({
            error: error
        });
    }
    else {
        const user = req.query.user.toString();
        const manager = new FunkoCollectionManager(user);
        const funkoData = req.body;
        const isValid = validate(req.body);
        if (isValid) {
            const newFunko = new Funko("", "", "", FunkoType.POP, FunkoGenre.ANIMATION, "", 0, false, "", 0).parse(funkoData);
            manager.addFunko(newFunko, (err, result) => {
                if (err) {
                    res.status(500).json({ error: err });
                }
                else {
                    res.send({ response: result });
                }
            });
        }
        else {
            const error = {
                type: 'add',
                success: false,
                output: undefined,
                error: validate.errors
            };
            res.status(400).json({ error: error });
        }
    }
});
/**
 * Removes a funko from user's list
 */
app.delete('/funkos', (req, res) => {
    if (!req.query.user || !req.query.id) {
        const error = {
            type: 'remove',
            success: false,
            output: undefined,
            error: 'A username and funko ID has to be provided'
        };
        res.status(400).send({
            error: error
        });
    }
    else {
        const user = req.query.user.toString();
        const funkoID = req.query.id.toString();
        const manager = new FunkoCollectionManager(user);
        manager.removeFunko(funkoID, (error, response) => {
            if (error) {
                res.send({
                    error: error
                });
            }
            else {
                res.send({
                    response: response
                });
            }
        });
    }
});
/**
 * Modifies an existing funko from user's list
 */
app.patch('/funkos', (req, res) => {
    if (!req.query.user || !req.query.id || !req.body) {
        const error = {
            type: 'update',
            success: false,
            output: undefined,
            error: 'A username, id and body has to be provided'
        };
        res.status(400).send({
            error: error
        });
    }
    else {
        const user = req.query.user.toString();
        const id = req.query.id.toString();
        const manager = new FunkoCollectionManager(user);
        const funkoData = req.body;
        const isValid = validate(req.body);
        if (isValid) {
            const newFunko = new Funko("", "", "", FunkoType.POP, FunkoGenre.ANIMATION, "", 0, false, "", 0).parse(funkoData);
            manager.modifyFunko(id, newFunko, (err, result) => {
                if (err) {
                    res.status(500).json({ error: err });
                }
                else {
                    res.send({ response: result });
                }
            });
        }
        else {
            const error = {
                type: 'update',
                success: false,
                output: undefined,
                error: validate.errors
            };
            res.status(400).json({ error: error });
        }
    }
});
/**
 * Default route that returns 404 Not Found
 */
app.get('*', (req, res) => {
    res.status(404).json({ error: 'Route not found' });
});
/**
 * Server listening port 3000
 */
app.listen(3000, () => {
    console.log('Server is up on port 3000');
});
