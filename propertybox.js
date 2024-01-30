function showLayoutProperties(controlId) {
  const index = schema.findIndex((obj) => obj.id === controlId);

  const properties = document.getElementById("properties");
  properties.innerHTML = "";
  const propertiesHeader = document.createElement("h4");
  propertiesHeader.innerText = `Properties for ${schema[index].name}`;
  properties.appendChild(propertiesHeader);
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
  if (schema[index].type == "Dropdown") {
    const option = createPropertyInput(
      "value",
      "text",
      "value",
      selectedControl ? schema[index].options[0].value || false : ""
    );
    properties.appendChild(option);
  }


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