'use strict';

/* 

bs4-forms: Bootstrap 4 forms elements created in js.
Dependencies: lodash, fontawesome, jquery-ui and jquery.


*/

/**
 * @class Form
 */
function Form() {
    var _Form = this;
    var defaults = {
        inline: false,
    };
    _Form.options = _.assign(_Form.options, defaults);
    _Form.render = function() {
        _Form.html = $("<form>");
    };
    _Form.addInputText = function() {};
    _Form.addInputEmail = function() {};
    _Form.addInputPassword = function() {};
    _Form.addInputTextarea = function() {};
    _Form.addCheckbox = function() {};
    _Form.addRadio = function() {};
    _Form.addSubmitButton = function() {};
    _Form.render();
    return _Form;
}
/**
 * @class FormInput
 */
function FormInput() {
    var id = _.uniqueId('input_');
    var _FormInput = this;


    return _FormInput;
}

// Button.prototype = _.create(widgetBase.prototype, { 'constructor': Button });