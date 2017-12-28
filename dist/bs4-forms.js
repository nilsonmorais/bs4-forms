'use strict';

/* 
bs4-forms: Bootstrap 4 forms elements created in js.
Dependencies: lodash, fontawesome, jquery-ui, bs4-js and jquery.
*/

class Form {
    constructor(options) {
        this.options = {
            inline: false,
            items: []
        }
        _.merge(this.options, options);

        this.html = $("<form>");
        _.each(this.options.items, _i => {
            if (_.has(_i, "type")) {
                if (_.toLower(_i.type) == "inputtext") {
                    this.addInputText(_i);
                }
                if (_.toLower(_i.type) == "label") {
                    this.addLabel(_i);
                }
            }
        });
    }
    addInputText(_item) {
        let _input = new FormInput(_item);
        this.html.append(_input.html);
    }
    addLabel(_item) {
        let _label = new FormLabel(_item);
        this.html.append(_label.html);
    }
    addInputEmail() { }
    addInputPassword() { }
    addInputTextarea() { }
    addCheckbox() { }
    addRadio() { }
    addSubmitButton() { }
}
class FormLabel {
    constructor(options) {
        this.options = {
            id: _.uniqueId("label_"),
            label: ""
        };
        _.merge(this.options, options);

        this.html = $("<label>")
            .attr("for", this.options.id)
            .html(this.options.label);
    }
}
class FormInput {
    constructor(options) {
        this.options = {
            id: _.uniqueId("input_"),
            placeholder: "",
            value: "",
            className: "",
            classNameDefault: "form-control",
            source: ""
        }
        _.merge(this.options, options);

        let _html = $("<div>").addClass("form-group");
        let _id = this.options.id;

        if (_.has(this.options, "label")) {
            _html.prepend(
                $("<label>")
                    .attr("for", _id)
                    .html(this.options.label)
            );
        }
        _html.append(
            $("<input>")
                .attr({
                    type: "text",
                    id: _id,
                    placeholder: this.options.placeholderm,
                    'data-source': this.options.source
                })
                .addClass(this.options.classNameDefault)
                .addClass(this.options.className)
                .val(this.options.value)
        );
        if (_.has(this.options.help, "help")) {
            _html.append(
                $("<small>")
                    .addClass("form-text text-muted")
                    .val(this.options.help)
            );
        }
        this.html = _html;
    }
}

class FormSelect {
    constructor(options) {
        this.options = {
            id: _.uniqueId("select_"),
            title: undefined,
            items: [],
        }
        _.merge(this.options, options);

        let _c = new Card();
        _c.html.removeAttr("style");

        if (_.has(this.options, "title")) {
            this.header = $("<div>").addClass("card-header").text(this.options.title);
            _c.html.prepend(this.header);
        }

        // toolbar
        let removeButton = new Button({
            className: "btn-danger btn-sm",
            icon: "fa-trash"
        });
        let newButton = new Button({
            className: "btn-primary btn-sm",
            icon: "fa-plus-circle"
        });
        let saveButton = new Button({
            className: "btn-success btn-sm",
            icon: "fa-save"
        });
        let _toolbar = $("<div>")
            .addClass("card-header bg-white")
            .append(newButton.html, saveButton.html, removeButton.html);
        _toolbar.insertAfter(_c.html.find(".card-header"));

        // Form
        let _select = $("<select>")
            .addClass("form-control")
            .attr("id", this.options.id);
        let _form1 = $("<div>")
            .addClass("form-group")
            .append(_select);
        let _form2 = $("<div>").addClass("form-group");
        let _container = $("<div>").addClass("row")
            .append(
            $("<div>").addClass("col").append(_form1),
            $("<div>").addClass("col").append(_form2)
            );

        _.each(this.options.items, _o => {
            let _option = $("<option>").text(_o[this.options.label]);
            _.each(Object.keys(_o), _key => {
                let _dk = 'data-' + _key;
                _option.attr(_dk, _o[_key]);
            });
            _select.append(_option);
        });
        _select.on("change", _event => {
            let _target = _event.target;
            let _selected = _target.options[_target.selectedIndex];
            let _attr = _selected.attributes;
            _.each(_attr, _a => {
                let _attr_name = _a.name;
                let _attr_value = _a.value;
                // Criar forms 
            });
        });
        _c.body.append(_container);
        this.html = _c.html;
    };
}