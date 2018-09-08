import Injector from './Injector';

/**
 * To execute mixin when Vue.use() execute. Entry Point.
 * 
 */
export default {
    install: function (Vue) {
        Vue.mixin({
            beforeCreate: function () {
                this.$form = (new Injector()).form;
            }
        });
    }
};