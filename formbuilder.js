class FormBuilder {
  constructor(uiSchema, schema) {
    this.schema = schema;
    this.uiSchema = uiSchema;
  }

  render(container) {
    this.container = document.querySelector(container);
    this.container.innerHTML = "";
    this.form = document.createElement("form");
    this.container.appendChild(this.form);
    // if (this.uiSchema.rows.length > 0) {
    //   this.uiSchema.rows.forEach((row) => {
    //     row.columns.forEach((column) => {
    //       const element = this.createField(column);
    //       this.form.appendChild(element);
    //     });
    //   });
    // } else
    if (schema != null && schema.length > 0) {
      this.schema.forEach((field) => {
        const element = this.createField(field);
        this.form.appendChild(element);
      });
    } else {
      this.container.style;
      this.container.innerHTML =
        "<h1> Drag Elements from the Toolbar here...</h1>";
    }
  }
  renderFull() {}
  createField(field) {
    switch (field.type) {
      case "Textbox":
        return this.createTextBox(field);
      case "Dropdown":
        return this.createSelect(field);
      case "Number":
        return this.createNumber(field);
      case "Radio":
        return this.createRadio(field);
      case "Label":
        return this.createLabel(field);
      case "2Column":
        return this.createLayout(field);
      case "3Column":
        return this.createLayout(field);
      case "4Column":
        return this.createLayout(field);
      case "5Column":
        return this.createLayout(field);
      case "6Column":
        return this.createLayout(field);
      case "1Column":
        return this.createLayout(field);
      case "Row":
        return this.createLayout(field);

      // etc for other field types
    }
  }

  createTextBox(field) {
    const wrapper = document.createElement("div");
    wrapper.classList.add("form-group", "show-hover");
    const label = document.createElement("label");
    const input = document.createElement("input");

    input.classList.add("form-control");
    label.textContent = field.label;
    input.id = field.id;
    input.type = "text";
    input.name = field.name;
    input.placeholder = field.placeholder;
    input.value = field.value;

    wrapper.name = field.name;
    wrapper.addEventListener("click", () => {
      selectedControl = wrapper;
      showControlProperties(field.id);
    });

    wrapper.appendChild(label);
    wrapper.appendChild(input);

    return wrapper;
  }

  createSelect(field) {
    const wrapper = document.createElement("div");

    const label = document.createElement("label");
    label.textContent = field.label;

    const select = document.createElement("select");
    select.name = field.name;
    select.classList.add("form-control");
    select.id = field.id;
    select.value = field.value;

    wrapper.name = field.name;
    wrapper.addEventListener("click", () => {
      selectedControl = wrapper;
      showControlProperties(field.id);
    });

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

  createNumber(field) {
    const wrapper = document.createElement("div");
    const label = document.createElement("label");
    const input = document.createElement("input");

    input.id = field.id;
    input.classList.add("form-control");
    label.innerHTML = field.label;
    input.type = "number";
    input.name = field.name;
    input.placeholder = field.placeholder;
    input.value = field.value;

    wrapper.name = field.name;
    wrapper.addEventListener("click", () => {
      selectedControl = wrapper;
      showControlProperties(field.id);
    });

    wrapper.appendChild(label);
    wrapper.appendChild(input);

    return wrapper;
  }

  createRadio(field) {
    const wrapper = document.createElement("div");
    const label = document.createElement("label");
    const input = document.createElement("input");

    input.id = field.id;
    input.classList.add("form-control");
    label.innerHTML = field.label;
    input.type = "radio";
    input.name = field.name;
    input.placeholder = field.placeholder;
    input.value = field.value;

    wrapper.addEventListener("click", () => {
      selectedControl = wrapper;
      showControlProperties(field.id);
    });

    wrapper.name = field.name;
    wrapper.appendChild(label);
    wrapper.appendChild(input);

    return wrapper;
  }

  createLabel(field) {
    const wrapper = document.createElement("div");
    const label = document.createElement("label");

    label.innerHTML = field.label;

    wrapper.addEventListener("click", () => {
      selectedControl = wrapper;
      showControlProperties(field.id);
    });

    wrapper.name = field.name;
    wrapper.appendChild(label);

    return wrapper;
  }
  // Create rows and cols
  createLayout(field) {
    let rows = 1;
    let cols = field.width;
    // Outer container
    const container = document.createElement("div");
    //container.classList.add("container");
    container.addEventListener("click", () => {
      selectedControl = container;
      showLayoutProperties(field.id);
    });
    for (let i = 0; i < 1; i++) {
      // Create row
      const row = document.createElement("div");
      row.classList.add("row");
      row.id = field.id;
      for (let j = 0; j < cols; j++) {
        // Create column
        const col = document.createElement("div");
        let colid = Math.floor(Math.random() * 1000);
        col.id = Date.now().toString() + colid;
        col.setAttribute("data-index", j);
        // Size column based on number of cols
        col.classList.add("col-md-" + Math.floor(12 / cols), "p-5", "dropzone");

        // Add styling
        col.style.border = "1px dashed #ccc";
        col.style.padding = "10px";

        row.appendChild(col);
      }

      container.appendChild(row);
    }

    return container;
  }

  renderLayout(layout) {
    let result = "";

    layout.rows.forEach((row) => {
      result += '<div class="row">';
      row.columns.forEach((column) => {
        result += `<div class="col-${column.width} ${column.className || ""}">`;
        if (column.controls) {
          column.controls.forEach((control) => {
            const controlDetails = controls[control.controlId];
            result += renderControl(controlDetails);
          });
        }
        result += "</div>";
      });
      result += "</div>";
    });

    return result;
  }
  // Other field creation methods

  getValue() {
    // Get field values
  }

  validate() {
    // Validate form
  }
}
