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
    case "Label":
      return createLabelSchema(element);

    // etc for other field types
  }
}

function createLayoutSchemaForDrop(element) {
  switch (element) {
    case "2Column":
      return createLayoutSchema(2);
    case "3Column":
      return createLayoutSchema(3);
    case "4Column":
      return createLayoutSchema(4);
    case "5Column":
      return createLayoutSchema(5);
    case "6Column":
      return createLayoutSchema(6);
    case "1Column":
      return createLayoutSchema(1);

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
    class: "",
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
    step: 1,
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

function createLabelSchema(element) {
  return {
    type: element,
    id: Date.now().toString(),
    name: element,
    label: element,
    accept: "",
    class: "",
  };
}

function createLayoutSchema(columns) {
  return {
    type: columns + "Column",
    id: Date.now().toString(),
    name: columns + "Column",
    label: columns + "Column",
    width: columns,
  };
}

function createLayoutSchemaNew(type, count) {
  const columns = [];
  for (let i = 0; i < count; i++) {
    const column = createObject(i + 4, `aligned`, [], type);
    columns.push(column);
  }
  return { type: "Row", columns: columns };
}

function createObject(width, className, controls, type) {
  return {
    id: Date.now().toString(),
    type: type,
    width: width,
    className: className,
    controls: controls,
  };
}
