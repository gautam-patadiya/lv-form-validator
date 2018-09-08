import Form from './Form';

/**
 * To Inject all current fields with Form Class
 * 
 */
export default class {

    /**
     * To Create Instance
     * 
     * @constructor
     */
    constructor() {
        //
    }

    /**
     * To make Form Class object
     * 
     * @param {string} uri
     * @param {string|object} options
     * @return {object} FormClass Object
     */
    form(fields) {
        return (new Form(fields));
    }
}