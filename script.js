let selectedControl = null;
// Schema
var schema = [];

var defaultUiSchema = {
  method: "POST",
  action: "http://localhost:8080/api/v1/form",
  type: "layout",
  rows: [],
};

var uiSchema = {
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
    uiSchema.rows.push(createLayoutSchemaForDrop(element));
    //schema.push(createLayoutSchemaForDrop(element));
  } else {
    let data = createSchemaForDrop(element);
    let row = event.target.attributes["data-index"].value.split(",")[0];
    let col = event.target.attributes["data-index"].value.split(",")[1];
    //uiSchema.rows[row].columns[col].controls.push(data);

    uiSchema.rows[row].columns[col].controls.push({
      id: data.id,
    });
    schema.push(data);
  }
}

function handleDrop(event) {
  event.preventDefault();
  var highlightedDropArea = event.target;
  highlightedDropArea.classList.remove("highlight-dragover");

  DropInDesignerHandler(event);

  RefreshForm();
  RenderPreview();
  UpdateLocalstorage();
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
  const jsonSchemaDisplay = document.getElementById("json-uischema-box");
  jsonSchemaDisplay.innerHTML = JSON.stringify(uiSchema, null, 4);
}

// RUN
function RefreshForm() {
  const form = new FormBuilder(uiSchema, schema, false);
  form.render("#designer");
}

function RenderPreview() {
  const form = new FormBuilder(uiSchema, schema, true);
  form.render("#preview");
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

// Generate a function to set and get item from localstorage
function restore() {
  let localSchema = localStorage.getItem("uischema");
  let controls = localStorage.getItem("schema");
  if (localSchema != "null") {
    uiSchema = JSON.parse(localSchema);
  }
  if (controls != null) schema = JSON.parse(controls);
  UpdateLocalstorage();
}

function UpdateLocalstorage() {
  localStorage.setItem("uischema", JSON.stringify(uiSchema));
  localStorage.setItem("schema", JSON.stringify(schema));
}
function ClearLocalstorage() {
  if (confirm(' Alert! Are you sure you want to clear this form?')) {
    localStorage.setItem("uischema", JSON.stringify(defaultUiSchema));
    localStorage.setItem("schema", JSON.stringify([]));
    restore();
    location.reload();
  } else {
    // Do nothing!
    console.log('Thing was not saved to the database.');
  }

}

function init() {
  restore();
  renderToolbox();
  setupDesigner();
  renderJsonSchema();
  renderUIJsonSchema();
  RefreshForm();
  RenderPreview();
}

init();
