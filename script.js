let selectedControl = null;
const controls = [
    { key: 'Textbox', icon: 'bi-fonts', description: 'Text Input' },
    { key: 'Dropdown', icon: 'bi-arrow-down-square-fill', description: 'Dropdown Selection' },
    { key: 'Number', icon: 'bi-1-square', description: 'Numeric Input' },
    { key: 'URL', icon: 'bi-link-45deg', description: 'URL Input' },
    { key: 'Email', icon: 'bi-mailbox', description: 'Email Input' },
    { key: 'Checkbox', icon: 'bi-card-checklist', description: 'Checkbox' },
    { key: 'Radio', icon: 'bi-0-circle', description: 'Radio Button' },
    { key: 'Date Picker', icon: 'bi-calendar-date', description: 'Date Picker' },
    { key: 'Slider', icon: 'bi-sliders', description: 'Slider Input' },
    { key: 'File Upload', icon: 'bi-file-earmark-arrow-up', description: 'File Upload' },
    { key: 'Label', icon: 'bi-bookmark', description: 'Label' },
    { key: 'Button', icon: 'bi-btn', description: 'Button' },
    { key: 'Column', icon: 'bi-microsoft', description: 'Column' },
    { key: 'Row', icon: 'bi-menu-button-wide', description: 'Row' },
    { key: 'Iframe', icon: 'bi-bounding-box', description: 'Row' }
];

function renderToolbox() {
    const controlsTab = document.getElementById('controls');
    const layoutTab = document.getElementById('layout');
    const formTab = document.getElementById('form');

    controlsTab.innerHTML = '<h3>Controls</h3>';
    layoutTab.innerHTML = '<h3>Layout</h3>';
    formTab.innerHTML = '<h3>Form</h3>';

    controls.forEach(control => {
        const controlElement = createToolboxItem(control);

        if (control.key.startsWith('Form') || control.key.startsWith('FTForm')) {
            // Add to the "Form" tab
            formTab.appendChild(controlElement);
        } else if (control.key === 'Column' || control.key === 'Row') {
            // Add to the "Layout" tab
            layoutTab.appendChild(controlElement);
        } else {
            // Add to the "Controls" tab
            controlsTab.appendChild(controlElement);
        }
    });
}

function createToolboxItem(control) {
    const rootElement = document.createElement('div');
    rootElement.draggable = true;
    rootElement.classList.add('widgets_div');
    rootElement.dataset.type = control.key;

    const icon_div = document.createElement('div');
    icon_div.classList.add('icon_div');
    const icon = document.createElement('i');
    icon.classList.add('bi', control.icon);
    icon_div.appendChild(icon);
    rootElement.appendChild(icon_div);

    const text_div = document.createElement('div');
    text_div.classList.add('text_div');

    const tool = document.createElement('span');
    tool.innerText = control.key;
    text_div.appendChild(tool);

    const br = document.createElement('br');
    text_div.appendChild(br);

    const desc = document.createElement('span');
    desc.innerText = control.description;
    text_div.appendChild(desc);
    rootElement.appendChild(text_div);

    rootElement.addEventListener('dragstart', (e) => {
        e.dataTransfer.setData('text/plain', control.key);
    });

    return rootElement;
}

function handleDrop(e) {
    e.preventDefault();
    var highlightedDropArea = e.target;
    highlightedDropArea.classList.remove('highlight-dragover');
    const elementType = e.dataTransfer.getData('text/plain');

    schema.push({
        type: elementType,
        id: Date.now().toString(),
        name: elementType,
        label: elementType,
        placeholder: elementType,
        required: false,
        value: '',
        options: [],
        multiple: false,
        accept: ''
    });


    var form = new FormBuilder(schema);
    form.render('#designer');
    //createControlInDesigner(elementType, e);

}

function highlightDropArea(event) {
    console.log(event);
    var highlightedDropArea = event.target;
    highlightedDropArea.classList.add('highlight-dragover');
    // Check if the dragged item is a control
}

function removeHighlight(event) {
    console.log(event);
    var highlightedDropArea = event.target;
    highlightedDropArea.classList.remove('highlight-dragover');
    // Check if the dragged item is a control
}

// # #######################################  Left Toolbox

class FormBuilder {
    constructor(schema) {
        this.schema = schema;
    }



    render(container) {
        this.container = document.querySelector(container);
        this.container.innerHTML = '';
        this.form = document.createElement('form');
        this.container.appendChild(this.form);

        this.schema.forEach(field => {
            const element = this.createField(field);
            this.form.appendChild(element);
        });
    }

    createField(field) {
        switch (field.type) {
            case 'Textbox':
                return this.createTextBox(field);
            case 'Dropdown':
                return this.createSelect(field);
            case 'Number':
                return this.createNumber(field);
            case 'Radio':
                return this.createRadio(field);
            case 'Column':
                return this.createLayout(2, 2);
            case 'Row':
                return this.renderLayout();

            // etc for other field types
        }
    }

    createTextBox(field) {
        const wrapper = document.createElement('div');
        wrapper.classList.add('form-group', 'show-hover');
        const label = document.createElement('label');
        const input = document.createElement('input');
        input.classList.add('form-control');
        label.textContent = field.label;
        input.id = field.id;
        input.type = 'text';
        input.name = field.name;
        input.placeholder = field.placeholder;
        wrapper.name = field.name;
        wrapper.addEventListener('click', () => {
            selectedControl = wrapper;
            showControlProperties(input);
        });

        wrapper.appendChild(label);
        wrapper.appendChild(input);

        return wrapper;
    }

    createSelect(field) {
        const wrapper = document.createElement('div');

        const label = document.createElement('label');
        label.textContent = field.label;
        wrapper.name = field.name;
        const select = document.createElement('select');
        select.name = field.name;
        select.classList.add('form-control');
        select.id = field.id;
        wrapper.addEventListener('click', () => {
            selectedControl = wrapper;
            showControlProperties(select);
        });

        field.options.forEach(option => {
            const opt = document.createElement('option');
            opt.value = option.value;
            opt.textContent = option.label;
            select.appendChild(opt);
        });


        wrapper.appendChild(label);
        wrapper.appendChild(select);

        return wrapper;
    }

    createNumber(field) {
        const wrapper = document.createElement('div');
        const label = document.createElement('label');
        const input = document.createElement('input');

        wrapper.name = field.name;
        input.id = field.id;
        input.classList.add('form-control');
        label.innerHTML = field.label;
        input.type = 'number';
        input.name = field.name;
        input.placeholder = field.placeholder;
        wrapper.addEventListener('click', () => {
            selectedControl = wrapper;
            showControlProperties(input);
        });

        wrapper.appendChild(label);
        wrapper.appendChild(input);

        return wrapper;
    }

    createRadio(field) {
        const wrapper = document.createElement('div');
        const label = document.createElement('label');
        const input = document.createElement('input');

        wrapper.name = field.name;
        input.id = field.id;
        input.classList.add('form-control');
        label.innerHTML = field.label;
        input.type = 'radio';
        input.name = field.name;
        input.placeholder = field.placeholder;

        wrapper.appendChild(label);
        wrapper.appendChild(input);

        return wrapper;
    }

    // Create rows and cols 
    createLayout(rows, cols) {

        // Outer container
        const container = document.createElement('div');
        container.classList.add('container');

        for (let i = 0; i < rows; i++) {

            // Create row
            const row = document.createElement('div');
            row.classList.add('row');

            for (let j = 0; j < cols; j++) {

                // Create column
                const col = document.createElement('div');

                // Size column based on number of cols
                col.classList.add('col-md-' + (12 / cols));

                // Add styling
                col.style.border = '1px solid';
                col.style.padding = '10px';

                row.appendChild(col);

            }

            container.appendChild(row);

        }

        return container;

    }
    // Recursive function to render layout 
    renderLayout() {
        var layout = {
            "type": "layout",
            "rows": [
                {
                    "cols": {
                        "length": 4,
                        "elements": [
                            { "type": "textbox" },
                            { "type": "textbox" }
                        ]
                    }
                }
            ]
        };
        if (layout.type === 'layout') {

            // Render layout rows
            const row = document.createElement('div');
            row.classList.add('row');

            layout.rows.forEach(row => {
                this.renderRow(row, row);
            });

            return row;

        } else {

            // Render control 
            return createControl(layout);

        }

    }

    // Render row with columns
    renderRow(row, parent) {

        const rowEl = document.createElement('div');
        rowEl.classList.add('row');
        const cols = row.cols;
        cols.elements.forEach(col => {

            const colEl = document.createElement('div');

            // Size based on nested columns
            colEl.classList.add('col-md-' + 12 / row.cols.length);

            // Render column content
            colEl.appendChild(this.renderLayout());

            rowEl.appendChild(colEl);

        });

        parent.appendChild(rowEl);

    }
    // Usage


    // Other field creation methods

    getValue() {
        // Get field values
    }

    validate() {
        // Validate form
    }
}
// Schema 
let schema = [
    // {
    //     id: 'Textbox1',
    //     type: 'Textbox',
    //     name: 'username',
    //     label: 'Username',
    //     placeholder: 'Username'
    // },
    // {
    //     id: 'Radio1',
    //     type: 'Radio',
    //     name: 'choose',
    //     label: 'choose',
    //     placeholder: 'choose',
    // },
    // {
    //     id: 'Number1',
    //     type: 'Number',
    //     name: 'age',
    //     label: 'age',
    //     placeholder: 24,
    // },
    // {
    //     id: 'Dropdown1',
    //     type: 'Dropdown',
    //     name: 'gender',
    //     options: [{
    //         label: 'Male',
    //         value: 'Male'
    //     }],
    //     placeholder: ''
    // }
]

let uischema = [
    {
        type: 'text',
        name: 'username'
    },
    {
        type: 'radio',
        name: 'username'
    },
    {
        type: 'select',
        name: 'gender',
        options: [{
            label: 'Male',
            value: 'Male'
        }]
    }
]

let lookupData = [
    {
        id: 'text',
        data: []
    },
    {
        type: 'radio',
        name: 'username'
    },
    {
        type: 'select',
        name: 'gender',
        options: [{
            label: 'Male',
            value: 'Male'
        }]
    }
]
// Usage
init();
const form = new FormBuilder(schema);
form.render('#designer');

function renderDesigner() {
    const designer = document.getElementById('designer');
    designer.innerHTML = '';

    // Set the designer container to flex with column layout
    designer.style.display = 'flex';
    designer.style.flexDirection = 'column';

    designer.addEventListener('dragover', handleDragOver);
    designer.addEventListener('drop', handleDrop);
}

function handleDragOver(e) {
    e.preventDefault(); // Prevent default behavior to enable drop
}

function init() {
    renderToolbox();
    renderDesigner();
}

// ############# PROPERTY WINDOW

function showControlProperties(elementType) {
    const properties = document.getElementById('properties');
    properties.innerHTML = '';

    const propertiesHeader = document.createElement('h4');
    propertiesHeader.innerText = `Properties for ${elementType.name}`;
    properties.appendChild(propertiesHeader);

    const nameInput = createPropertyInput('name', 'text', 'name', selectedControl ? selectedControl.children[1].name || '' : '');
    const idInput = createPropertyInput('id', 'text', 'id', selectedControl ? selectedControl.children[1].id || '' : '');
    const classInput = createPropertyInput('class', 'text', 'class', selectedControl ? selectedControl.children[1].class || '' : '');
    const requiredInput = createPropertyInput('value', 'text', 'value', selectedControl ? selectedControl.children[1].value || false : '');

    properties.appendChild(nameInput);
    properties.appendChild(idInput);
    properties.appendChild(classInput);
    properties.appendChild(requiredInput);

    const updateButton = document.createElement('button');
    updateButton.classList.add('btn', 'btn-primary', 'mt-5');
    updateButton.innerText = 'Update';
    updateButton.addEventListener('click', updateControlProperties);
    properties.appendChild(updateButton);

    const removeButton = document.createElement('button');
    removeButton.classList.add('btn', 'btn-danger', 'mt-5');
    removeButton.innerText = 'Remove';
    removeButton.addEventListener('click', removeControl);
    properties.appendChild(removeButton);
}


function createPropertyInput(labelText, inputType, id, value) {
    const formGroup = document.createElement('div');
    formGroup.classList.add('form-group', 'mt-5');

    const label = document.createElement('label');
    label.innerText = labelText;

    const input = document.createElement('input');
    input.type = inputType;
    input.id = id;
    input.classList.add('form-control', 'props',);
    input.value = value || '';

    formGroup.appendChild(label);
    formGroup.appendChild(input);

    return formGroup;
}

function updateControlProperties() {
    if (!selectedControl) return;

    const name = document.getElementById('name').value;
    const id = document.getElementById('id').value;
    const value = document.getElementById('value').value;
    const cssClass = document.getElementById('class').value;

    selectedControl.name = name;
    selectedControl.id = id;
    selectedControl.children[1].value = value;
    selectedControl.classList.add(cssClass);

    hideProperties();
}

function hideProperties() {
    const properties = document.getElementById('properties');
    properties.innerHTML = '';
    selectedControl = null;
}

function removeControl() {
    if (!selectedControl) return;

    // Remove the selected control from the designer
    selectedControl.remove();

    // Remove the corresponding entry from the JSON Schema
    const controlId = selectedControl.children[1].id;
    schema = schema.filter(control => control.id !== controlId);
    console.log(schema);
    // // Render the updated JSON Schema
    // renderJsonSchema();

    // Clear the properties section
    hideProperties();
}
