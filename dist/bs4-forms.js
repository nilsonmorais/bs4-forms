'use strict';

/* 

bs4-forms: Bootstrap 4 forms elements created in js.
Dependencies: lodash, fontawesome, jquery-ui, bs4-js and jquery.


*/

/**
 * @class Form
 */
function Form(options) {
    var _Form = this;
    var defaults = {
        inline: false,
    };
    _Form.options = _.assign(_Form.options, defaults);
    _Form.options = _.assign(_Form.options, options);

    _Form.render = function () {
        _Form.html = $("<form>");
        _.each(_Form.options.items, function (_i) {
            if (_.has(_i, "type")) {
                if (_.toLower(_i.type) == "inputtext") {
                    _Form.addInputText(_i);
                }
            }
        })
    };
    _Form.addInputText = function (_item) {
        var _input = new FormInput(_item);
        _Form.html.append(_input);
    };
    _Form.addInputEmail = function () { };
    _Form.addInputPassword = function () { };
    _Form.addInputTextarea = function () { };
    _Form.addCheckbox = function () { };
    _Form.addRadio = function () { };
    _Form.addSubmitButton = function () { };

    _Form.render();
    return _Form.html;
}
/**
 * @class FormInput
 */
function FormInput(options) {
    var _FormInput = this;

    _FormInput.options = _.assign({
        id: _.uniqueId("input_"),
        placeholder: "",
        value: ""
    }, options);

    _FormInput.render = function () {
        var _html = $("<div>").addClass("form-group");
        var _id = _FormInput.options.id;

        if (_.has(_FormInput.options, "label")) {
            _html.prepend($("<label>")
                .attr("for", _id)
                .html(_FormInput.options.label));
        }
        _html.append($("<input>")
            .attr({
                type: "text",
                id: _id,
                placeholder: _FormInput.options.placeholder
            })
            .addClass("form-control")
            .val(_FormInput.options.value));
        if (_.has(_FormInput.options.help, "help")) {
            _html.append($("<small>")
                .addClass("form-text text-muted")
                .val(_FormInput.options.help));
        }
        _FormInput.html = _html;
    };

    _FormInput.render();
    return _FormInput.html;
}

function FormSelect(options) {
    var _FormSelect = this;

    _FormSelect.options = _.assign({
        id: _.uniqueId("select_"),
        title: undefined,
        items: [],
    }, options);

    _FormSelect.render = function () {
        var _c = new Card();
        _c.html.removeAttr("style");
        if (_.has(_FormSelect.options, "title")) {
            this.header = $("<div>").addClass("card-header").text(_FormSelect.options.title);
            _c.html.prepend(this.header);
        }

        // toolbar
        var removeButton = new Button({
            className: "btn-danger btn-sm",
            icon: "fa-trash"
        });
        var newButton = new Button({
            className: "btn-primary btn-sm",
            icon: "fa-plus-circle"
        });
        var saveButton = new Button({
            className: "btn-success btn-sm",
            icon: "fa-save"
        });
        var _toolbar = $("<div>")
            .addClass("card-header bg-white")
            .append(newButton.html, saveButton.html, removeButton.html);
        _toolbar.insertAfter(_c.html.find(".card-header"));

        // Form
        var _select = $("<select>")
            .addClass("form-control")
            .attr("id", _FormSelect.options.id);
        var _form1 = $("<div>")
            .addClass("form-group")
            .append(_select);
        var _form2 = $("<div>").addClass("form-group");
        var _container = $("<div>").addClass("row")
            .append(
            $("<div>").addClass("col").append(_form1),
            $("<div>").addClass("col").append(_form2)
            );

        _.each(_FormSelect.options.items, function (_o) {
            var _option = $("<option>").text(_o[_FormSelect.options.label]);
            _.each(Object.keys(_o), function (_key) {
                var _dk = 'data-' + _key;
                _option.attr(_dk, _o[_key]);
            });
            _select.append(_option);
        });
        _select.on("change", function (_event) {
            var _target = _event.target;
            var _selected = _target.options[_target.selectedIndex];
            var _attr = _selected.attributes;
            _.each(_attr, function (_a) {
                var _attr_name = _a.name;
                var _attr_value = _a.value;
                // Criar forms 
            });
        });
        _c.body.append(_container);
        _FormSelect.html = _c.html;
    };

    _FormSelect.render();
    return _FormSelect.html;
}

// Button.prototype = _.create(widgetBase.prototype, { 'constructor': Button });