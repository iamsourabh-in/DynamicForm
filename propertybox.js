function showLayoutProperties(row) {
  const index = uiSchema.rows.findIndex((obj) => obj.id === row.id);

  const properties = document.getElementById("properties");
  properties.innerHTML = "";
  const propertiesHeader = document.createElement("h4");
  propertiesHeader.innerText = `Properties for Row`;
  properties.appendChild(propertiesHeader);

  const classInput = createLayoutPropertyInput(
    "class",
    "text",
    "class",
    row.classList ? row.classList || "" : "",
    index
  );

  properties.appendChild(classInput);

  // const updateButton = document.createElement("button");
  // updateButton.classList.add("btn", "btn-primary", "mt-5");
  // updateButton.innerText = "Update";
  // updateButton.addEventListener("click", function () {
  //   updateLayoutProperties(index);
  // });
  // properties.appendChild(updateButton);

  const removeButton = document.createElement("button");
  removeButton.classList.add("btn", "btn-danger", "mt-5");
  removeButton.innerText = "Remove";
  removeButton.addEventListener("click", function () {
    removeLayoutProperties(index);
  });
  properties.appendChild(removeButton);
}

function showControlProperties(controlId) {
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
    schema ? schema[index].name || "" : ""
  );
  const labelInput = createPropertyInput(
    "label",
    "text",
    "label",
    schema ? schema[index].label || "" : ""
  );

  const idInput = createPropertyInput(
    "id",
    "text",
    "id",
    schema ? schema[index].id || "" : ""
  );
  const classInput = createPropertyInput(
    "class",
    "text",
    "class",
    schema ? schema[index].classList || "" : ""
  );
  const valueInput = createPropertyInput(
    "value",
    "text",
    "value",
    schema ? schema[index].value || false : ""
  );
  const hiddenInput = createPropertyInput(
    "type",
    "hidden",
    "type",
    schema ? schema[index].type || "" : ""
  );

  if (schema[index].type == "Dropdown") {
    const option = createPropertyInput(
      "options",
      "text",
      "options",
      schema ? JSON.stringify(schema[index].options) || false : ""
    );
    properties.appendChild(option);
  }

  properties.appendChild(nameInput);
  properties.appendChild(labelInput);
  properties.appendChild(idInput);
  properties.appendChild(classInput);
  properties.appendChild(valueInput);
  properties.appendChild(hiddenInput);
  // const updateButton = document.createElement("button");
  // updateButton.classList.add("btn", "btn-primary", "mt-5");
  // updateButton.innerText = "Update";
  // updateButton.addEventListener("click", updateControlProperties);
  // properties.appendChild(updateButton);

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
  //idInput.disabled = "disabled";
  input.onchange = function () {
    updateControlProperties();
  };
  formGroup.appendChild(label);
  formGroup.appendChild(input);

  return formGroup;
}

function createLayoutPropertyInput(labelText, inputType, id, value, index) {
  const formGroup = document.createElement("div");
  formGroup.classList.add("form-group", "mt-5");

  const label = document.createElement("label");
  label.innerText = labelText;

  const input = document.createElement("input");
  input.type = inputType;
  input.id = id;
  input.classList.add("form-control", "props");
  input.value = value || "";
  //idInput.disabled = "disabled";
  input.onchange = function () {
    updateLayoutProperties(index);
  };
  formGroup.appendChild(label);
  formGroup.appendChild(input);

  return formGroup;
}
function updateLayoutProperties(index) {
  const cssClass = document.getElementById("class").value;
  uiSchema.rows[index].classList = [];
  cssClass.split(",").forEach((css) => {
    uiSchema.rows[index].classList.push(css);
  });
  RenderPreview();
  //hideProperties();
  renderUIJsonSchema();
  RefreshForm();
  UpdateLocalstorage();
}
function updateControlProperties() {
  if (!selectedControl) return;

  const name = document.getElementById("name").value;
  const id = document.getElementById("id").value;
  const value = document.getElementById("value").value;
  const cssClass = document.getElementById("class").value;
  const label = document.getElementById("label").value;
  const type = document.getElementById("type").value;
  let classList = [];
  let optionsJson = [];
  if (type == "Dropdown") {
    const optionsString = document.getElementById("options").value;
    optionsJson = JSON.parse(optionsString);
  }
  // selectedControl.name = name;
  // selectedControl.id = id;
  // selectedControl.children[1].value = value;
  // selectedControl.children[1].classList.add(cssClass);
  // const index = schema.findIndex((obj) => obj.id === id);
  cssClass.split(",").forEach((css) => {
    classList.push(css);
  });
  schema = updateSchemaInfo(schema, id, {
    name: name,
    id: id,
    value: value,
    classList: classList,
    label: label,
    options: optionsJson,
  });
  RenderPreview();
  //hideProperties();
  renderJsonSchema();
  UpdateLocalstorage();
  RefreshForm();
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

function removeLayoutProperties(index) {
  uiSchema.rows.splice(index, 1);
  hideProperties();

  UpdateLocalstorage();
  RefreshForm();
  RenderPreview();
  renderUIJsonSchema();
}
function removeControl() {
  if (!selectedControl) return;

  // Remove the corresponding entry from the JSON and UI Schema
  const controlId = selectedControl.children[1].id;
  selectedControl.remove();

  for (let i = 0; i < uiSchema.rows.length; i++) {
    for (let j = 0; j < uiSchema.rows[i].columns.length; j++) {
      const index = uiSchema.rows[i].columns[j].controls.findIndex(
        (obj) => obj.id === controlId
      );
      if (index != -1) uiSchema.rows[i].columns[j].controls.splice(index, 1);
    }
  }
  // uiSchema.rows.forEach((row) => {
  //   row = row.columns.forEach((column) => {
  //     column = column.controls.filter((control) => control.id !== controlId);
  //   });
  // });
  schema = schema.filter((control) => control.id !== controlId);
  console.log(schema);
  // // Render the updated JSON Schema
  // renderJsonSchema();

  // Clear the properties section
  hideProperties();
  UpdateLocalstorage();
  RefreshForm();
  renderJsonSchema();
  renderUIJsonSchema();
}
