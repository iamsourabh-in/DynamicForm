function createSchemaForDrop(element) {
    switch (element) {
        case "Textbox":
            return createTextBoxSchema(element);
        case "Dropdown":
            return createSelectSchema(element);
        case "Number":
            return createNumberSchema(element);
        case "Radio":
            return createRadioSchema(element);
        case "Column":
            return createLayoutSchema(2, 2);
        case "Row":
            return renderLayoutSchema();

        // etc for other field types
    }
}

//
function createTextBoxSchema(element) {
    return {
        type: element,
        id: Date.now().toString(),
        name: element,
        label: element,
        placeholder: element,
        required: false,
        value: "",
        class: "",
    };
}
function createSelectSchema(element) {
    return {
        type: element,
        id: Date.now().toString(),
        name: element,
        label: element,
        placeholder: element,
        required: false,
        value: "",
        options: [{ label: "Option1", value: "Option1" }],
        multiple: false,
        accept: "",
        class: ""
    };
}

function createNumberSchema(element) {
    return {
        type: element,
        id: Date.now().toString(),
        name: element,
        label: element,
        placeholder: element,
        required: false,
        value: 1,
        accept: "",
        class: "",
        min: 0,
        max: 100000,
        step: 1
    };
}

function createRadioSchema(element) {
    return {
        type: element,
        id: Date.now().toString(),
        name: element,
        label: element,
        placeholder: element,
        required: false,
        value: "",
        options: [],
        multiple: false,
        accept: "",
        class: "",
    };
}
