let selectedControl = null;
// Schema
let schema = [ { "type": "6Column", "id": "1706706044914", "name": "6Column", "label": "6Column", "width": 6 }, { "type": "2Column", "id": "1706706108232", "name": "2Column", "label": "2Column", "width": 2 }, { "type": "2Column", "id": "1706706109406", "name": "2Column", "label": "2Column", "width": 2 } ];

const uiSchema = {
  method: "POST",
  action: "http://localhost:8080/api/v1/form",
  type: "layout",
  rows: [],
};

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
    //uiSchema.rows.push(createLayoutSchemaForDrop(element));
    schema.push(createLayoutSchemaForDrop(element));
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
  renderUIJsonSchema();
}

function highlightDropArea(event) {
  var highlightedDropArea = event.target;
  if (!event.target.classList.contains("dropzone")) {
  } else {
    console.log(event);
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

function renderUIJsonSchema() {
  const jsonSchemaDisplay = document.getElementById("json-schema-box");
  jsonSchemaDisplay.innerHTML += JSON.stringify(uiSchema, null, 4);
}

// RUN
function RefreshForm() {
  const form = new FormBuilder(uiSchema, schema);
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
