'use strict';

/* 
bs4-forms: Bootstrap 4 forms elements created in js.
Dependencies: lodash, fontawesome, jquery-ui, bs4-js and jquery.
*/

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Form = function () {
    function Form(options) {
        var _this = this;

        _classCallCheck(this, Form);

        this.options = {
            inline: false,
            items: []
        };
        _.merge(this.options, options);

        this.html = $("<form>");
        _.each(this.options.items, function (_i) {
            if (_.has(_i, "type")) {
                if (_.toLower(_i.type) == "inputtext") {
                    _this.addInputText(_i);
                }
                if (_.toLower(_i.type) == "label") {
                    _this.addLabel(_i);
                }
            }
        });
    }

    _createClass(Form, [{
        key: "addInputText",
        value: function addInputText(_item) {
            var _input = new FormInput(_item);
            this.html.append(_input.html);
        }
    }, {
        key: "addLabel",
        value: function addLabel(_item) {
            var _label = new FormLabel(_item);
            this.html.append(_label.html);
        }
    }, {
        key: "addInputEmail",
        value: function addInputEmail() {}
    }, {
        key: "addInputPassword",
        value: function addInputPassword() {}
    }, {
        key: "addInputTextarea",
        value: function addInputTextarea() {}
    }, {
        key: "addCheckbox",
        value: function addCheckbox() {}
    }, {
        key: "addRadio",
        value: function addRadio() {}
    }, {
        key: "addSubmitButton",
        value: function addSubmitButton() {}
    }]);

    return Form;
}();

var FormLabel = function FormLabel(options) {
    _classCallCheck(this, FormLabel);

    this.options = {
        id: _.uniqueId("label_"),
        label: ""
    };
    _.merge(this.options, options);

    this.html = $("<label>").attr("for", this.options.id).html(this.options.label);
};

var FormInput = function FormInput(options) {
    _classCallCheck(this, FormInput);

    this.options = {
        id: _.uniqueId("input_"),
        placeholder: "",
        value: "",
        className: "",
        classNameDefault: "form-control",
        source: ""
    };
    _.merge(this.options, options);

    var _html = $("<div>").addClass("form-group");
    var _id = this.options.id;

    if (_.has(this.options, "label")) {
        _html.prepend($("<label>").attr("for", _id).html(this.options.label));
    }
    _html.append($("<input>").attr({
        type: "text",
        id: _id,
        placeholder: this.options.placeholderm,
        'data-source': this.options.source
    }).addClass(this.options.classNameDefault).addClass(this.options.className).val(this.options.value));
    if (_.has(this.options.help, "help")) {
        _html.append($("<small>").addClass("form-text text-muted").val(this.options.help));
    }
    this.html = _html;
};

var FormSelect = function FormSelect(options) {
    var _this2 = this;

    _classCallCheck(this, FormSelect);

    this.options = {
        id: _.uniqueId("select_"),
        title: undefined,
        items: []
    };
    _.merge(this.options, options);

    var _c = new Card();
    _c.html.removeAttr("style");

    if (_.has(this.options, "title")) {
        this.header = $("<div>").addClass("card-header").text(this.options.title);
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
    var _toolbar = $("<div>").addClass("card-header bg-white").append(newButton.html, saveButton.html, removeButton.html);
    _toolbar.insertAfter(_c.html.find(".card-header"));

    // Form
    var _select = $("<select>").addClass("form-control").attr("id", this.options.id);
    var _form1 = $("<div>").addClass("form-group").append(_select);
    var _form2 = $("<div>").addClass("form-group");
    var _container = $("<div>").addClass("row").append($("<div>").addClass("col").append(_form1), $("<div>").addClass("col").append(_form2));

    _.each(this.options.items, function (_o) {
        var _option = $("<option>").text(_o[_this2.options.label]);
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
    this.html = _c.html;
};
