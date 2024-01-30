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


// ############# DESIGNER FUNCTIONS

function DropInDesignerHandler(event) {
  const elementType = event.dataTransfer.getData("type");
  const element = event.dataTransfer.getData("text/plain");
  if (elementType == "layout") {

  } else {
    schema.push(createSchemaForDrop(element));
  }
}

function handleDrop(event) {
  event.preventDefault();
  var highlightedDropArea = event.target;
  highlightedDropArea.classList.remove("highlight-dragover");

  DropInDesignerHandler(event);

  RefreshForm();
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


function handleDragOver(e) {
  e.preventDefault(); // Prevent default behavior to enable drop
}

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
