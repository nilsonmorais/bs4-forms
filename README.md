# Dependencies

- Lodash
- Jquery
- Bootstrap 4
- Font Awesome
- @nilsonmorais/bs4-js

# Install

Just include bs4-forms-es6.js (Old browsers) or bs4-forms.js in your html.

# Use

f = new Form({
    items: [
        {
            type: "inputText",
            label: "Título",
            placeholder: "Digite texto",
            value: "Default Value",
            id: "input-label"
        },
        {
            type: "label",
            label: "Some label"
        }
    ]
});

$("body").append(f.html);