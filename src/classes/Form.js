import Error from './Error';
import Axios from 'axios';

/**
 * To create FormData object and Make Request on Specified URL or URI
 *
 */
export default class {

    /**
     * To Create Instance
     *
     * @constructor
     * @param {object} fields - Number of form fields
     */
    constructor(fields) {
        this.$fields = fields;
        this.$http = Axios.create({
            contentType: false,
            processData: false,
        });
        this.$errors = new Error({});
        this.$busy = false;
    }

    /**
     * To make POST Request
     *
     * @param {string} uri
     * @param {string|object} options
     * @return {mixed}
     */
    post(uri, options) {
        return this.method('post', uri, options);
    }

    /**
     * To make GET Request
     *
     * @param {string} uri
     * @param {string|object} options
     * @return {mixed}
     */
    get(uri, options) {
        return this.method('get', uri, options);
    }

    /**
     * To make PATCH Request
     *
     * @param {string} uri
     * @param {string|object} options
     * @return {mixed}
     */
    patch(uri, options) {
        return this.method('patch', uri, options);
    }

    /**
     * To make PUT Request
     *
     * @param {string} uri
     * @param {string|object} options
     * @return {mixed}
     */
    put(uri, options) {
        return this.method('put', uri, options);
    }

    /**
     * To make DELETE Request
     *
     * @param {string} uri
     * @param {string|object} options
     * @return {mixed}
     */
    delete(uri, options) {
        return this.method('delete', uri, options);
    }

    /**
     * To set Current State busy when Request Execute
     * @param {boolean} status
     * @return {void}
     */
    setBusy(status) {
        this.$busy = status;
    }

    /**
     * To set error object with Error Class
     *
     * @param {object} errors
     * @return {void}
     */
    setError(errors) {
        this.$errors = new Error(errors);
    }

    /**
     * To set error and Execute Request with Specified params
     *
     * @param {string} method
     * @param {string} uri
     * @param {string|object} options
     * @return {mixed}
     */
    method(method, uri, options) {
        this.setError({});
        return this.createFormData(method, uri, options);
    }

    /**
     * To create FormData Class Object
     *
     * @param {string} method
     * @param {string} uri
     * @param {string|object} options
     * @return {mixed}
     */
    createFormData(method, uri, options){
        var vm = this;
        const data = new FormData();

        Object.keys(vm.$fields).map((index) => {
            if(vm.$fields[index] != null && (vm.$fields[index].toString().startsWith('#') || vm.$fields[index].toString().startsWith('.'))) { // Input File
                var inp = document.querySelector(vm.$fields[index]);

                if(inp == null || inp.length <= 0 || inp.length > 1)
                    reject("Invalid DOM Element ["+index+"]. Make sure only single element exist with selector.");

                if(inp.multiple) {
                    for (var i = 0; i < inp.files.length; ++i) {
                        data.append(index+'['+i+']', inp.files[i]);
                    }
                } else if(inp.files.length > 0) {
                    data.append(index, inp.files[0]);
                } else {
                    data.append(index, '');
                }
            } else { // Normal Inputs
              if(typeof(vm.$fields[index]) === "object")
                data.append(index, JSON.stringify(vm.$fields[index]));
              else
                data.append(index, vm.$fields[index]);
            }
        });

        data.append('_method', method);
        var action = ((method != 'get') ? 'post' : 'get');
        return this.makeRequest(action, uri, options, data);
    }

    /**
     * To send request with Specified URI
     *
     * @param {string} action
     * @param {string} uri
     * @param {object} data
     * @param {string|object} options
     * @return {void}
     */
    makeRequest(action, uri, options, data){
        var vm = this;
        return new Promise(function (resolve, reject) {
            vm.setBusy(true);

            vm.$http[action](uri, data, options)
            .then((response) => {
                resolve(response);
            })
            .catch((error) => {
                let response = error.response;

                if(response !== undefined) {
                    if (response !== undefined && typeof response.data.errors === "object")
                        vm.setError(response.data.errors);
                    else
                        vm.setError(response.data);

                    reject(response);
                } else {
                    reject(error);
                }
            })
            .finally(() => {
                vm.setBusy(false);
            });
        });
    }
}
