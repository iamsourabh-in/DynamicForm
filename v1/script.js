const controls = [
    'Textbox', 
    'Dropdown', 
    'Number Input', 
    'URL', 
    'Email', 
    'Checkbox', 
    'Radio', 
    'Date Picker', 
    'Slider', 
    'File Upload',
    'Label', 
    'Button'
];

let jsonSchema = [];

function renderToolbox() {
    const toolbox = document.getElementById('toolbox');
    toolbox.innerHTML = '';

    controls.forEach(control => {
        const controlElement = createToolboxItem(control);
        controlElement.addEventListener('dragstart', handleDragStart);
        toolbox.appendChild(controlElement);
    });
}


function createToolboxItem(controlType) {
    const controlElement = document.createElement('div');
    controlElement.classList.add('toolbox-item');
    controlElement.draggable = true;
    controlElement.dataset.type = controlType;
    controlElement.innerText = controlType;
    return controlElement;
}

function handleDragStart(e) {
    e.dataTransfer.setData('text/plain', e.target.dataset.type);
}

function renderDesigner() {
    const designer = document.getElementById('designer');
    designer.innerHTML = '';

    designer.addEventListener('dragover', handleDragOver);
    designer.addEventListener('drop', handleDrop);
}

function handleDragOver(e) {
    e.preventDefault();
}

function handleDrop(e) {
    e.preventDefault();
    const elementType = e.dataTransfer.getData('text/plain');
    createControlInDesigner(elementType, e);
}

function createControlInDesigner(elementType, e) {
    const designer = document.getElementById('designer');
    const controlElement = createControlElement(elementType, e.clientX, e.clientY);
    controlElement.addEventListener('click', () => {
        selectedControl = controlElement;
        showControlProperties(elementType);
    });
    designer.appendChild(controlElement);

    const controlId = `control_${Date.now()}`;
    const controlName = getControlName(elementType);
    const position = getControlPosition(e, controlElement);

    jsonSchema.push({
        id: controlId,
        type: elementType,
        name: controlName,
        validation: '',
        cssClass: '',
        required: false,
        position: position
    });

    renderJsonSchema();
}
function showControlProperties(elementType) {
    const properties = document.getElementById('properties');
    properties.innerHTML = ''; // Clear previous properties

    const propertiesHeader = document.createElement('h4');
    propertiesHeader.innerText = `Properties for ${elementType}`;
    properties.appendChild(propertiesHeader);

    // Create input fields for control properties
    const propertyNameInput = createPropertyInput('Name', 'text', 'controlName', selectedControl.dataset.name);
    const validationInput = createPropertyInput('Validation', 'text', 'validation', selectedControl.dataset.validation);
    const cssClassInput = createPropertyInput('CSS Class', 'text', 'cssClass', selectedControl.dataset.cssClass);
    const requiredCheckbox = createPropertyCheckbox('Required', 'required', selectedControl.dataset.required);

    properties.appendChild(propertyNameInput);
    properties.appendChild(validationInput);
    properties.appendChild(cssClassInput);
    properties.appendChild(requiredCheckbox);

    // Create input field for control position
    const positionInput = createPropertyInput('Position', 'text', 'position', getPositionString(selectedControl));
    properties.appendChild(positionInput);

    // Add update button
    const updateButton = document.createElement('button');
    updateButton.classList.add('btn', 'btn-primary');
    updateButton.innerText = 'Update';
    updateButton.addEventListener('click', updateControlProperties);
    properties.appendChild(updateButton);
}

function createPropertyInput(labelText, inputType, id, value) {
    const formGroup = document.createElement('div');
    formGroup.classList.add('form-group');

    const label = document.createElement('label');
    label.innerText = labelText;

    const input = document.createElement('input');
    input.type = inputType;
    input.id = id;
    input.classList.add('form-control');
    input.value = value;

    formGroup.appendChild(label);
    formGroup.appendChild(input);

    return formGroup;
}

function createPropertyCheckbox(labelText, id, checked) {
    const formGroup = document.createElement('div');
    formGroup.classList.add('form-group', 'form-check');

    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.classList.add('form-check-input');
    checkbox.id = id;
    checkbox.checked = checked;

    const label = document.createElement('label');
    label.classList.add('form-check-label');
    label.innerText = labelText;

    formGroup.appendChild(checkbox);
    formGroup.appendChild(label);

    return formGroup;
}

function getPositionString(control) {
    const position = {
        top: parseFloat(control.style.top),
        left: parseFloat(control.style.left)
    };

    return `${position.top}px, ${position.left}px`;
}


document.body.addEventListener('click', (event) => {
    const properties = document.getElementById('properties');
    const isPropertiesClicked = properties.contains(event.target);

    if (!isPropertiesClicked) {
       // hideProperties();
    }
});
function hideProperties() {
    const properties = document.getElementById('properties');
    properties.innerHTML = ''; // Clear the Properties section
    selectedControl = null; // Reset selected control
}

function updateControlProperties() {
    if (!selectedControl) return;

    selectedControl.dataset.name = document.getElementById('controlName').value;
    selectedControl.dataset.validation = document.getElementById('validation').value;
    selectedControl.dataset.cssClass = document.getElementById('cssClass').value;
    selectedControl.dataset.required = document.getElementById('required').checked;

    const positionInput = document.getElementById('position');
    const positionValues = positionInput.value.split(',').map(value => parseFloat(value.trim()));
    if (positionValues.length === 2 && !isNaN(positionValues[0]) && !isNaN(positionValues[1])) {
        selectedControl.style.top = positionValues[0] + 'px';
        selectedControl.style.left = positionValues[1] + 'px';
    }
    hideProperties();
    renderJsonSchema();
}
function createControlElement(elementType, x, y) {
    const controlElement = document.createElement('div');
    controlElement.classList.add('form-control');
    controlElement.dataset.type = elementType;
    controlElement.style.position = 'absolute';
    controlElement.style.left = `${x - controlElement.offsetWidth / 2}px`;
    controlElement.style.top = `${y - controlElement.offsetHeight / 2}px`;

    const inputElement = createInputElement(elementType);
    controlElement.appendChild(inputElement);

    return controlElement;
}

function createInputElement(elementType) {
    let inputElement;

    switch (elementType) {
        case 'Textbox':
        case 'Number Input':
        case 'URL':
        case 'Email':
            inputElement = document.createElement('input');
            inputElement.type = 'text';
            break;
        case 'Dropdown':
            inputElement = document.createElement('select');
            inputElement.appendChild(createOption('Option 1'));
            break;
        case 'Checkbox':
        case 'Radio':
            inputElement = document.createElement('input');
            inputElement.type = elementType.toLowerCase();
            break;
        case 'Date Picker':
            inputElement = document.createElement('input');
            inputElement.type = 'date';
            break;
        case 'Slider':
            inputElement = document.createElement('input');
            inputElement.type = 'range';
            break;
        case 'File Upload':
            inputElement = document.createElement('input');
            inputElement.type = 'file';
            break;
        case 'Label':
            const labelContent = prompt('Enter label text:');
            inputElement = document.createElement('label');
            inputElement.innerText = labelContent || 'Label';
            break;
        case 'Button':
            const buttonText = prompt('Enter button text:');
            inputElement = document.createElement('button');
            inputElement.innerText = buttonText || 'Button';
            break;
        default:
            inputElement = document.createElement('input');
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

function getControlName(elementType) {
    return (elementType === 'Label' || elementType === 'Button') ? prompt(`Enter ${elementType} text:`) || elementType : '';
}

function getControlPosition(e, controlElement) {
    return {
        top: parseFloat(controlElement.style.top),
        left: parseFloat(controlElement.style.left)
    };
}

function handleControlDragStart(e) {
    e.dataTransfer.setData('text/plain', e.target.dataset.type);
}

function handleControlDragOver(e) {
    e.preventDefault();
}

function handleControlDrop(e) {
    e.preventDefault();
    const elementType = e.dataTransfer.getData('text/plain');
    createControlInDesigner(elementType, e);
}

function renderJsonSchema() {
    const jsonSchemaDisplay = document.getElementById('json-schema');
    jsonSchemaDisplay.innerHTML = JSON.stringify(jsonSchema, null, 2);
}

function init() {
    renderToolbox();
    renderDesigner();
    renderJsonSchema();
}

init();
