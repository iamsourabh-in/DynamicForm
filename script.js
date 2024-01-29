let selectedControl = null;
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
];

let uischema = [
  {
    type: "text",
    name: "username",
  },
  {
    type: "radio",
    name: "username",
  },
  {
    type: "select",
    name: "gender",
    options: [
      {
        label: "Male",
        value: "Male",
      },
    ],
  },
];

let lookupData = [
  {
    id: "text",
    data: [],
  },
  {
    type: "radio",
    name: "username",
  },
  {
    type: "select",
    name: "gender",
    options: [
      {
        label: "Male",
        value: "Male",
      },
    ],
  },
];

const controls = [
  { key: "Textbox", icon: "bi-fonts", description: "Text Input" },
  {
    key: "Dropdown",
    icon: "bi-arrow-down-square-fill",
    description: "Dropdown Selection",
  },
  { key: "Number", icon: "bi-1-square", description: "Numeric Input" },
  { key: "URL", icon: "bi-link-45deg", description: "URL Input" },
  { key: "Email", icon: "bi-mailbox", description: "Email Input" },
  { key: "Checkbox", icon: "bi-card-checklist", description: "Checkbox" },
  { key: "Radio", icon: "bi-0-circle", description: "Radio Button" },
  { key: "Date Picker", icon: "bi-calendar-date", description: "Date Picker" },
  { key: "Slider", icon: "bi-sliders", description: "Slider Input" },
  {
    key: "File Upload",
    icon: "bi-file-earmark-arrow-up",
    description: "File Upload",
  },
  { key: "Label", icon: "bi-bookmark", description: "Label" },
  { key: "Button", icon: "bi-btn", description: "Button" },
  { key: "Column", icon: "bi-microsoft", description: "Column" },
  { key: "Row", icon: "bi-menu-button-wide", description: "Row" },
  { key: "Iframe", icon: "bi-bounding-box", description: "Row" },
];

function renderToolbox() {
  const controlsTab = document.getElementById("controls");
  const layoutTab = document.getElementById("layout");
  const formTab = document.getElementById("form");

  controlsTab.innerHTML = "<h3>Controls</h3>";
  layoutTab.innerHTML = "<h3>Layout</h3>";
  formTab.innerHTML = "<h3>Form</h3>";

  controls.forEach((control) => {
    const controlElement = createToolboxItem(control);

    if (control.key.startsWith("Form") || control.key.startsWith("FTForm")) {
      // Add to the "Form" tab
      formTab.appendChild(controlElement);
    } else if (control.key === "Column" || control.key === "Row") {
      // Add to the "Layout" tab
      layoutTab.appendChild(controlElement);
    } else {
      // Add to the "Controls" tab
      controlsTab.appendChild(controlElement);
    }
  });
}

function createToolboxItem(control) {
  const rootElement = document.createElement("div");
  rootElement.draggable = true;
  rootElement.classList.add("widgets_div");
  rootElement.dataset.type = control.key;

  const icon_div = document.createElement("div");
  icon_div.classList.add("icon_div");
  const icon = document.createElement("i");
  icon.classList.add("bi", control.icon);
  icon_div.appendChild(icon);
  rootElement.appendChild(icon_div);

  const text_div = document.createElement("div");
  text_div.classList.add("text_div");

  const tool = document.createElement("span");
  tool.innerText = control.key;
  text_div.appendChild(tool);

  const br = document.createElement("br");
  text_div.appendChild(br);

  const desc = document.createElement("span");
  desc.innerText = control.description;
  text_div.appendChild(desc);
  rootElement.appendChild(text_div);

  rootElement.addEventListener("dragstart", (e) => {
    e.dataTransfer.setData("text/plain", control.key);
  });

  return rootElement;
}
// ############# DESIGNER FUNCTIONS

function DropInDesignerHandler(event) {
  const elementType = event.dataTransfer.getData("text/plain");

  if (elementType == "Row") {

  } else {
    schema.push({
      type: elementType,
      id: Date.now().toString(),
      name: elementType,
      label: elementType,
      placeholder: elementType,
      required: false,
      value: "",
      options: [],
      multiple: false,
      accept: "",
      class: "",
    });
  }
}

function handleDrop(event) {
  event.preventDefault();
  var highlightedDropArea = event.target;
  highlightedDropArea.classList.remove("highlight-dragover");

  DropInDesignerHandler(event);

  var form = new FormBuilder(schema);
  form.render("#designer");
  //createControlInDesigner(elementType, e);
  renderJsonSchema();
}

function highlightDropArea(event) {
  console.log(event);
  var highlightedDropArea = event.target;
  if (event.target.classList.contains("form-group") || event.target.classList.contains("form-control")) { } else {
    highlightedDropArea.classList.add("highlight-dragover");
  }
  // Check if the dragged item is a control
}

function removeHighlight(event) {
  console.log(event);
  var highlightedDropArea = event.target;
  highlightedDropArea.classList.remove("highlight-dragover");
  // Check if the dragged item is a control
}

// # #######################################  END Left Toolbox

// Usage

function handleDragOver(e) {
  e.preventDefault(); // Prevent default behavior to enable drop
}



// # #######################################  PROPERTY WINDOW
// function createProperty(field) {
//   switch (field.type) {
//     case "Textbox":
//       return this.createTextBox(field);
//     case "Dropdown":
//       return this.createSelect(field);
//     case "Number":
//       return this.createNumber(field);
//     case "Radio":
//       return this.createRadio(field);
//     case "Column":
//       return this.createLayout(2, 2);
//     case "Row":
//       return this.renderLayout();

//     // etc for other field types
//   }
// }

function showLayoutProperties(elementType, controlId) { }

function showControlProperties(elementType, controlId) {
  const index = schema.findIndex((obj) => obj.id === controlId);

  const properties = document.getElementById("properties");
  properties.innerHTML = "";
  const propertiesHeader = document.createElement("h4");
  propertiesHeader.innerText = `Properties for ${schema[index].name}`;
  properties.appendChild(propertiesHeader);

  const nameInput = createPropertyInput(
    "name",
    "text",
    "name",
    selectedControl ? schema[index].name || "" : ""
  );
  const idInput = createPropertyInput(
    "id",
    "text",
    "id",
    selectedControl ? schema[index].id || "" : ""
  );
  const classInput = createPropertyInput(
    "class",
    "text",
    "class",
    selectedControl ? schema[index].class || "" : ""
  );
  const requiredInput = createPropertyInput(
    "value",
    "text",
    "value",
    selectedControl ? schema[index].value || false : ""
  );

  properties.appendChild(nameInput);
  properties.appendChild(idInput);
  properties.appendChild(classInput);
  properties.appendChild(requiredInput);

  const updateButton = document.createElement("button");
  updateButton.classList.add("btn", "btn-primary", "mt-5");
  updateButton.innerText = "Update";
  updateButton.addEventListener("click", updateControlProperties);
  properties.appendChild(updateButton);

  const removeButton = document.createElement("button");
  removeButton.classList.add("btn", "btn-danger", "mt-5");
  removeButton.innerText = "Remove";
  removeButton.addEventListener("click", removeControl);
  properties.appendChild(removeButton);
}

function createSelectProperty(field) {
  const wrapper = document.createElement("div");

  const label = document.createElement("label");
  label.textContent = field.label;

  const select = document.createElement("select");
  select.name = field.name;
  select.classList.add("form-control");
  select.id = field.id;
  select.value = field.value;

  wrapper.name = field.name;

  field.options.forEach((option) => {
    const opt = document.createElement("option");
    opt.value = option.value;
    opt.textContent = option.label;
    select.appendChild(opt);
  });

  wrapper.appendChild(label);
  wrapper.appendChild(select);

  return wrapper;
}

function createPropertyInput(labelText, inputType, id, value) {
  const formGroup = document.createElement("div");
  formGroup.classList.add("form-group", "mt-5");

  const label = document.createElement("label");
  label.innerText = labelText;

  const input = document.createElement("input");
  input.type = inputType;
  input.id = id;
  input.classList.add("form-control", "props");
  input.value = value || "";

  formGroup.appendChild(label);
  formGroup.appendChild(input);

  return formGroup;
}

function updateControlProperties() {
  if (!selectedControl) return;

  const name = document.getElementById("name").value;
  const id = document.getElementById("id").value;
  const value = document.getElementById("value").value;
  const cssClass = document.getElementById("class").value;

  selectedControl.name = name;
  selectedControl.id = id;
  selectedControl.children[1].value = value;
  selectedControl.children[1].classList.add(cssClass);
  const index = schema.findIndex((obj) => obj.id === id);
  schema = updateSchemaInfo(schema, id, {
    name: name,
    id: id,
    value: value,
    class: cssClass,
  });
  hideProperties();
  renderJsonSchema();
}

function updateSchemaInfo(schema, id, update) {
  // Find index of object with given id
  const index = schema.findIndex((obj) => obj.id === id);

  // If object exists, update it
  if (index !== -1) {
    schema[index] = { ...schema[index], ...update };
  }

  return schema;
}

function hideProperties() {
  const properties = document.getElementById("properties");
  properties.innerHTML = "";
  selectedControl = null;
}

function removeControl() {
  if (!selectedControl) return;

  // Remove the selected control from the designer
  selectedControl.remove();

  // Remove the corresponding entry from the JSON Schema
  const controlId = selectedControl.children[1].id;
  schema = schema.filter((control) => control.id !== controlId);
  console.log(schema);
  // // Render the updated JSON Schema
  // renderJsonSchema();

  // Clear the properties section
  hideProperties();
  renderJsonSchema();
}

// # #######################################  JSON SCHEMA AREA

function renderJsonSchema() {
  const jsonSchemaDisplay = document.getElementById("json-schema-box");
  jsonSchemaDisplay.innerHTML = JSON.stringify(schema, null, 4);
}

// RUN
function RefreshForm() {
  const form = new FormBuilder(schema);
  form.render("#designer");
}

function setupDesigner() {
  const designer = document.getElementById("designer");
  designer.innerHTML = "";

  // Set the designer container to flex with column layout
  // designer.style.display = "flex";
  // designer.style.flexDirection = "column";

  designer.addEventListener("dragover", handleDragOver);
  designer.addEventListener("drop", handleDrop);
}

function init() {
  renderToolbox();
  setupDesigner();
  renderJsonSchema();
  RefreshForm();
}

init();
