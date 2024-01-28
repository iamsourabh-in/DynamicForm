//The Script is prepared for the following:
// Show the controls in the toolbox
// Render the controls in the designer
// Add the controls to the JSON schema
const formSpec= [];
let jsonSchema = [];
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
    { key: 'Button', icon: 'button-icon', description: 'Button' },
    { key: 'Column', icon: 'bi-microsoft', description: 'Column' },
    { key: 'Row', icon: 'bi-menu-button-wide', description: 'Row' }
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
    const elementType = e.dataTransfer.getData('text/plain');
    createControlInDesigner(elementType, e);
}


function handleDropInGrid(e) {
    e.preventDefault();
    const elementType = e.dataTransfer.getData('text/plain');
    console.log(elementType);
    createControlInsideElement(elementType, e);
}


function createControlInsideElement(elementType, e) {
    const designer = document.getElementById(elementType.id);
    const controlElement = createControlElement(elementType);

    if (elementType === 'Row' || elementType === 'Column') {
        // Create a div element for the row or column
        const controlElement = document.createElement('div');
        controlElement.classList.add(elementType.toLowerCase());
        controlElement.style.border = '1px solid #000'; // 1px border
        controlElement.style.minHeight = '20px'; // Adjust the height as needed

        // Make the row or column resizable
        //resizableControl(controlElement);

        // Make the control draggable within the designer
        controlElement.draggable = true;

        controlElement.addEventListener('dragstart', (e) => {
            e.dataTransfer.setData('text/plain', JSON.stringify({
                type: elementType,
                id: Date.now().toString()
            }));
        });
        controlElement.addEventListener('drop', handleDropInGrid);

        designer.appendChild(controlElement);

    }
    else {
        controlElement.addEventListener('click', () => {
            selectedControl = controlElement;
            showControlProperties(elementType);
        });

        // Make the control draggable within the designer
        controlElement.draggable = true;

        controlElement.addEventListener('dragstart', (e) => {
            e.dataTransfer.setData('text/plain', JSON.stringify({
                type: elementType,
                id: Date.now().toString()
            }));
        });

        designer.appendChild(controlElement);


    }
    // Update the JSON Schema with the new control
    jsonSchema.push({
        type: elementType,
        id: Date.now().toString(),
        name: '',
        label: '',
        placeholder: '',
        required: false,
        min: '',
        max: '',
        step: '',
        value: '',
        defaultValue: '',
        options: [],
        multiple: false,
        accept: ''
    });
    // Render the updated JSON Schema
    renderJsonSchema();
}


function hideProperties() {
    const properties = document.getElementById('properties');
    properties.innerHTML = '';
    selectedControl = null;
}

function createControlInDesigner(elementType, e) {
    const designer = document.getElementById('designer');
    const controlElement = createControlElement(elementType);
    if (elementType.startsWith('Form')) {
    }
    else
        if (elementType === 'Row' || elementType === 'Column') {
            // Create a div element for the row or column
            const div = document.createElement('div');

            div.classList.add("row", "show-hover");// Adjust the height as needed



            const controlElement = document.createElement('div');

            controlElement.classList.add(elementType.toLowerCase(), "col-md-6");
            controlElement.style.border = '5px solid #000'; // 1px border
            controlElement.style.minHeight = '50px'; // Adjust the height as needed

            const controlElement1 = document.createElement('div');

            controlElement1.classList.add(elementType.toLowerCase(), "col-md-6");
            controlElement1.style.border = '5px solid #000'; // 1px border
            controlElement1.style.minHeight = '50px'; // Adjust the height as needed

            const controlElement2 = document.createElement('div');

            controlElement2.classList.add(elementType.toLowerCase(), "col-md-12");
            controlElement2.style.border = '5px solid #000'; // 1px border
            controlElement2.style.minHeight = '50px'; // Adjust the height as needed

            // Make the row or column resizable
            //resizableControl(controlElement);

            // Make the control draggable within the designer
            //controlElement.draggable = true;

            controlElement.addEventListener('dragstart', (e) => {
                e.dataTransfer.setData('text/plain', JSON.stringify({
                    type: elementType,
                    id: Date.now().toString()
                }));
            });
            controlElement.addEventListener('drop', handleDropInGrid);

            div.appendChild(controlElement);
            div.appendChild(controlElement1);
            div.appendChild(controlElement2);
            designer.append(div);

        }
        else {
            controlElement.addEventListener('click', () => {
                selectedControl = controlElement;
                showControlProperties(elementType);
            });

            // Make the control draggable within the designer
            //controlElement.draggable = true;

            controlElement.addEventListener('dragstart', (e) => {
                e.dataTransfer.setData('text/plain', JSON.stringify({
                    type: elementType,
                    id: Date.now().toString()
                }));
            });

            designer.appendChild(controlElement);


        }
    // Update the JSON Schema with the new control
    jsonSchema.push({
        type: elementType,
        id: Date.now().toString(),
        name: '',
        label: '',
        placeholder: '',
        required: false,
        min: '',
        max: '',
        step: '',
        value: '',
        defaultValue: '',
        options: [],
        multiple: false,
        accept: ''
    });
    // Render the updated JSON Schema
    renderJsonSchema();
}

// Resizable function using resizable library
function resizableControl(element) {
    Resizable.create(element, {
        // Options for resizable behavior
        // You can customize the resizing behavior here
        // See the documentation: https://github.com/nielsboogaard/resizable#options
        handleSelector: '.resizable-handle',
        onResize: () => {
            // Handle resize events if needed
        }
    });
}

function createControlElement(elementType) {
    const controlElement = document.createElement('div');
    controlElement.classList.add('form-control', 'show-hover');
    controlElement.dataset.type = elementType;
    controlElement.style.width = '100%';
    const inputElement = createInputElement(elementType);

    controlElement.appendChild(inputElement);

    return controlElement;
}

function createInputElement(elementType) {
    let inputElement;

    switch (elementType) {
        case 'Textbox':
            inputElement = document.createElement('input');
            inputElement.id = Date.now().toString();
            inputElement.type = 'text';
            break;
        case 'Number':
            inputElement = document.createElement('input');
            inputElement.id = Date.now().toString();
            inputElement.type = 'number';
            break;
        case 'URL':
            inputElement = document.createElement('input');
            inputElement.id = Date.now().toString();
            inputElement.type = 'url';
            break;
        case 'Email':
            inputElement = document.createElement('input');
            inputElement.id = Date.now().toString();
            inputElement.type = 'email';
            break;
        case 'Dropdown':
            inputElement = document.createElement('select');
            inputElement.id = Date.now().toString();
            inputElement.appendChild(createOption('Option 1'));
            break;
        case 'Checkbox':
        case 'Radio':
            inputElement = document.createElement('input');
            inputElement.id = Date.now().toString();
            inputElement.type = elementType.toLowerCase();
            break;
        case 'Date Picker':
            inputElement = document.createElement('input');
            inputElement.id = Date.now().toString();
            inputElement.type = 'date';
            break;
        case 'Slider':
            inputElement = document.createElement('input');
            inputElement.id = Date.now().toString();
            inputElement.type = 'range';
            break;
        case 'File Upload':
            inputElement = document.createElement('input');
            inputElement.id = Date.now().toString();
            inputElement.type = 'file';
            break;
        case 'Label':
            inputElement = document.createElement('label');
            inputElement.id = Date.now().toString();
            inputElement.innerText = 'Label';
            break;
        case 'Button':
            inputElement = document.createElement('button');
            inputElement.id = Date.now().toString();
            inputElement.innerText = 'Button';
            break;
        case 'Iframe':
            inputElement = document.createElement('iframe');
            inputElement.id = Date.now().toString();
            inputElement.src = "vue-app.html"
            break;
        default:
            inputElement = document.createElement('input');
            inputElement.id = Date.now().toString();
            inputElement.type = 'text';
    }

    return inputElement;
}

function createOption(value) {
    const option = document.createElement('option');
    option.value = value;
    option.text = value;
    return option;
}

function showControlProperties(elementType) {
    const properties = document.getElementById('properties');
    properties.innerHTML = '';

    const propertiesHeader = document.createElement('h4');
    propertiesHeader.innerText = `Properties for ${elementType}`;
    properties.appendChild(propertiesHeader);

    const nameInput = createPropertyInput('Name', 'text', 'name', selectedControl ? selectedControl.name || '' : '');
    const idInput = createPropertyInput('ID', 'text', 'id', selectedControl ? selectedControl.id || '' : '');
    const classInput = createPropertyInput('Class', 'text', 'mt-5', selectedControl ? selectedControl.value || '' : '');
    const requiredInput = createPropertyInput('Required', 'checkbox', 'required', selectedControl ? selectedControl.required || false : '');

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
    formGroup.classList.add('form-group');

    const label = document.createElement('label');
    label.innerText = labelText;

    const input = document.createElement('input');
    input.type = inputType;
    input.id = id;
    input.classList.add('form-control', 'props');
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
    const required = document.getElementById('required').checked;

    selectedControl.name = name;
    selectedControl.id = id;
    selectedControl.value = value;
    selectedControl.required = required;

    hideProperties();
}

function renderJsonSchema() {
    const jsonSchemaDisplay = document.getElementById('json-schema');
    jsonSchemaDisplay.innerHTML = JSON.stringify(jsonSchema, null, 2);
}

function renderDesigner() {
    const designer = document.getElementById('designer');
    designer.innerHTML = '';

    // Set the designer container to flex with column layout
    designer.style.display = 'flex';
    designer.style.flexDirection = 'column';

    designer.addEventListener('dragover', handleDragOver);
    designer.addEventListener('drop', handleDrop);
}



function removeControl() {
    if (!selectedControl) return;

    // Remove the selected control from the designer
    selectedControl.remove();

    // Remove the corresponding entry from the JSON Schema
    const controlId = selectedControl.dataset.id;
    jsonSchema = jsonSchema.filter(control => control.id !== controlId);

    // Render the updated JSON Schema
    renderJsonSchema();

    // Clear the properties section
    hideProperties();
}

function handleDragOver(e) {
    e.preventDefault(); // Prevent default behavior to enable drop
}

function init() {
    renderToolbox();
    renderDesigner();
    renderJsonSchema();
}

init();
