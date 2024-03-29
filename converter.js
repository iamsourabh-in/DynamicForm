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
    case "Checkbox":
      return createCheckboxSchema(element);
    case "Slider":
      return createSliderSchema(element);
    case "DatePicker":
      return createDatePickerSchema(element);
    case "Button":
      return createButtonSchema(element);
    case "FileUpload":
      return createFileUploadSchema(element);
    case "Email":
      return createEmailSchema(element);
    case "Reset":
      return createResetButtonSchema(element);
    case "Iframe":
      return createIframeSchema(element);
    case "H1":
      return createHeading(element);
    case "H2":
      return createHeading(element);
    case "H3":
      return createHeading(element);
    // etc for other field types
  }
}

function createLayoutSchemaForDrop(element) {
  switch (element) {
    case "2Column":
      return createLayoutSchemaNew("Column", 2);
    case "3Column":
      return createLayoutSchemaNew("Column", 3);
    case "4Column":
      return createLayoutSchemaNew("Column", 4);
    case "5Column":
      return createLayoutSchemaNew("Column", 5);
    case "6Column":
      return createLayoutSchemaNew("Column", 6);
    case "1Column":
      return createLayoutSchemaNew("Column", 1);
    case "8Column":
      return createLayoutSchemaNew("Column", 8);
    case "12Column":
      return createLayoutSchemaNew("Column", 12);
    // etc for other field types
  }
}

//
function createTextBoxSchema(element) {
  return {
    type: element,
    controlType: "textbox",
    label: element,
    showLabel: true,
    id: Date.now().toString(),
    name: element,
    placeholder: element,
    required: true,
    classList: ["form-control"],
    validation: [
      {
        type: "pattern",
        pattern: "^[a-zA-Z0-9_]+$",
        errorMessage:
          "Username must contain only letters, numbers, and underscores.",
      },
      {
        type: "compare",
        pattern: ["!=", "#password"],
        errorMessage: "Username must not be the same as the password.",
      },
    ],
  };
}
function createSelectSchema(element) {
  return {
    type: element,
    id: Date.now().toString(),
    name: element,
    label: element,
    placeholder: element,
    showLabel: true,
    required: false,
    value: "",
    options: [
      { label: "Option1", value: "Option1" },
      { label: "Option2", value: "Option2" },
    ],
    lookup: true,
    multiple: false,
    accept: "",
    classList: ["form-control"],
  };
}

function createNumberSchema(element) {
  return {
    type: element,
    id: Date.now().toString(),
    name: element,
    showLabel: true,
    label: element,
    placeholder: element,
    required: false,
    value: 1,
    accept: "",
    classList: ["form-control"],
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
    classList: ["form-control"],
  };
}

function createEmailSchema(element) {
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
    classList: ["form-control"],
  };
}

function createCheckboxSchema(element) {
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
    classList: ["form-control"],
  };
}

function createButtonSchema(element) {
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
    classList: ["form-control", "btn", "btn-primary"]
  };
}
function createResetButtonSchema(element) {
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
    classList: ["form-control", "btn", "btn-danger"],
  };
}

function createDatePickerSchema(element) {
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
    classList: ["form-control"],
  };
}

function createHeading(element) {
  return {
    type: element.toLowerCase(),
    id: Date.now().toString(),
    name: element,
    label: element,
    placeholder: element,
    required: false,
    value: "Heading",
    options: [],
    multiple: false,
    accept: "",
    classList: ["m-1"]
  };
}

function createSliderSchema(element) {
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
    classList: ["form-control"]
  };
}

function createFileUploadSchema(element) {
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
    classList: ["form-control"]
  };
}

function createIframeSchema(element) {
  return {
    type: element,
    id: Date.now().toString(),
    name: element,
    label: element,
    placeholder: element,
    required: false,
    src: "vue-app.html",
    value: "",
    options: [],
    multiple: false,
    accept: "",
    classList: ["form-control"]
  };
}

function createLabelSchema(element) {
  return {
    type: element,
    id: Date.now().toString(),
    name: element,
    label: element,
    accept: "",
    classList: ["form-control"]
  };
}

function createLayoutSchemaNew(type, count) {
  const columns = [];
  for (let i = 0; i < count; i++) {
    const colWidth = 12 / count;
    const column = createObject(colWidth, `aligned`, [], type);
    columns.push(column);
  }
  return {
    type: "Row",
    id: Date.now().toString(),
    classList: ["offset-md-0", "w-100"],
    columns: columns,
  };
}

function createObject(width, classNames, controls, type) {
  return {
    id: Date.now().toString(),
    type: type,
    width: width,
    classNames: classNames,
    controls: controls,
  };
}
