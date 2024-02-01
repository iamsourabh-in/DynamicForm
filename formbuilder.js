class FormBuilder {
  constructor(uiSchema, schema, preview) {
    this.schema = schema;
    this.uiSchema = uiSchema;
    this.preview = preview;
  }

  render(container) {
    if (this.preview) {
      this.container = document.querySelector(container);
      this.container.innerHTML = "";
      this.form = document.createElement("form");
      this.container.appendChild(this.form);
      if (this.uiSchema.rows != null && this.uiSchema.rows.length > 0) {
        this.form.appendChild(this.renderPreview(this.uiSchema));
      } else {
        this.container.style;
        this.container.innerHTML =
          "<h1> Drag Elements from the Toolbar in Designer...</h1>";
      }
    } else {
      this.container = document.querySelector(container);
      this.container.innerHTML = "";
      this.form = document.createElement("form");
      this.container.appendChild(this.form);
      if (this.uiSchema.rows != null && this.uiSchema.rows.length > 0) {
        this.form.appendChild(this.renderLayout(this.uiSchema));
      } else if (schema != null && schema.length > 0) {
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
  }

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
      case "DatePicker":
        return this.createDate(field);
      case "Slider":
        return this.createSlider(field);
      case "FileUpload":
        return this.createFile(field);
      case "Label":
        return this.createLabel(field);
      case "Button":
        return this.createButton(field);
      case "Reset":
        return this.createResetButton(field);
      case "Email":
        return this.createEmail(field);
      case "Checkbox":
        return this.createCheckbox(field);
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
      case "8Column":
        return this.createLayout(field);
      case "12Column":
        return this.createLayout(field);
      case "1Column":
        return this.createLayout(field);
      case "Row":
        return this.createLayout(field);

      // etc for other field types
    }
  }

  createEmail(field) {
    const wrapper = document.createElement("div");
    wrapper.classList.add("form-group", "show-hover");
    const label = document.createElement("label");
    const input = document.createElement("input");

    input.classList.add("form-control");
    label.textContent = field.label;
    input.id = field.id;
    input.type = "email";
    input.name = field.name;
    input.placeholder = field.placeholder;
    input.value = field.value;

    wrapper.name = field.name;
    wrapper.addEventListener("click", (event) => {
      selectedControl = wrapper;
      showControlProperties(field.id);
      event.stopPropagation();
    });

    wrapper.appendChild(label);
    wrapper.appendChild(input);

    return wrapper;
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
    wrapper.addEventListener("click", (event) => {
      selectedControl = wrapper;
      showControlProperties(field.id);
      event.stopPropagation();
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
    wrapper.addEventListener("click", (event) => {
      selectedControl = wrapper;
      showControlProperties(field.id);
      event.stopPropagation();
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
    wrapper.addEventListener("click", (event) => {
      selectedControl = wrapper;
      showControlProperties(field.id);
      event.stopPropagation();
    });

    wrapper.appendChild(label);
    wrapper.appendChild(input);

    return wrapper;
  }

  createCheckbox(field) {
    const wrapper = document.createElement("div");
    const label = document.createElement("label");
    const input = document.createElement("input");

    input.id = field.id;
    input.classList.add("form-control");
    label.innerHTML = field.label;
    input.type = "checkbox";
    input.name = field.name;
    input.placeholder = field.placeholder;
    input.value = field.value;

    wrapper.name = field.name;
    wrapper.addEventListener("click", (event) => {
      selectedControl = wrapper;
      showControlProperties(field.id);
      event.stopPropagation();
    });

    wrapper.appendChild(label);
    wrapper.appendChild(input);

    return wrapper;
  }

  createDate(field) {
    const wrapper = document.createElement("div");
    const label = document.createElement("label");
    const input = document.createElement("input");

    input.id = field.id;
    input.classList.add("form-control");
    label.innerHTML = field.label;
    input.type = "date";
    input.name = field.name;
    input.placeholder = field.placeholder;
    input.value = field.value;

    wrapper.name = field.name;
    wrapper.addEventListener("click", (event) => {
      selectedControl = wrapper;
      showControlProperties(field.id);
      event.stopPropagation();
    });

    wrapper.appendChild(label);
    wrapper.appendChild(input);

    return wrapper;
  }

  createFile(field) {
    const wrapper = document.createElement("div");
    const label = document.createElement("label");
    const input = document.createElement("input");

    input.id = field.id;
    input.classList.add("form-control");
    label.innerHTML = field.label;
    input.type = "file";
    input.name = field.name;
    input.placeholder = field.placeholder;
    input.value = field.value;

    wrapper.name = field.name;
    wrapper.addEventListener("click", (event) => {
      selectedControl = wrapper;
      showControlProperties(field.id);
      event.stopPropagation();
    });

    wrapper.appendChild(label);
    wrapper.appendChild(input);

    return wrapper;
  }

  createSlider(field) {
    const wrapper = document.createElement("div");
    const label = document.createElement("label");
    const input = document.createElement("input");

    input.id = field.id;
    input.classList.add("form-control");
    label.innerHTML = field.label;
    input.type = "range";
    input.name = field.name;
    input.placeholder = field.placeholder;
    input.value = field.value;

    wrapper.name = field.name;
    wrapper.addEventListener("click", (event) => {
      selectedControl = wrapper;
      showControlProperties(field.id);
      event.stopPropagation();
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

    wrapper.addEventListener("click", (event) => {
      selectedControl = wrapper;
      showControlProperties(field.id);
      event.stopPropagation();
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

  createButton(field) {
    const wrapper = document.createElement("div");
    const button = document.createElement("button");

    button.innerHTML = field.label;
    button.className = field.class;
    wrapper.addEventListener("click", () => {
      selectedControl = wrapper;
      showControlProperties(field.id);
    });

    wrapper.name = field.name;
    wrapper.appendChild(button);

    return button;
  }

  createResetButton(field) {
    const wrapper = document.createElement("div");
    const button = document.createElement("button");

    button.innerHTML = field.label;
    button.className = field.class;
    wrapper.addEventListener("click", () => {
      selectedControl = wrapper;
      showControlProperties(field.id);
    });

    wrapper.name = field.name;
    wrapper.appendChild(button);

    return button;
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
      row.classList.add("row", "w-50");
      row.id = field.id;
      for (let j = 0; j < cols; j++) {
        // Create column
        const col = document.createElement("div");
        let colid = Math.floor(Math.random() * 1000);
        col.id = Date.now().toString() + colid;
        col.setAttribute("data-index", i + "," + j);
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

  renderLayout(uiSchema) {
    let container = document.createElement("div");
    container.classList.add("container-fluid");

    let rowCount = 0;
    let colCount = 0;
    uiSchema.rows.forEach((row) => {
      let rowDiv = document.createElement("div");
      rowDiv.classList.add("row", "show-hover");
      row.classList.forEach(function (cssClass) {
        rowDiv.classList.add(cssClass);
      });
      rowDiv.id = row.id;
      rowDiv.addEventListener("click", (event) => {
        selectedControl = container;
        showLayoutProperties(row);
        event.stopPropagation();
      });
      row.columns.forEach((column) => {
        const colDiv = document.createElement("div");
        // const colWidth = 12 / column.width;
        //colDiv.classList.add(`col-md-${colWidth}`);
        colDiv.setAttribute(
          "data-index",
          rowCount.toString() + "," + colCount.toString()
        );
        colDiv.classList.add(
          "col-md-" + column.width,
          "p-5",
          "dropzone",
          "show-hover"
        );
        colDiv.style.border = "1px dashed #ccc";

        column.controls.forEach((control) => {
          // Customize control rendering based on type and controlId
          let controlElement = this.createField(control);

          colDiv.appendChild(controlElement);
        });

        colCount++;
        rowDiv.appendChild(colDiv);
      });
      rowCount++;
      colCount = 0;
      container.appendChild(rowDiv);
    });

    return container;
  }

  renderPreview(uiSchema) {
    let container = document.createElement("div");
    container.classList.add("container-fluid");

    let rowCount = 0;
    let colCount = 0;
    uiSchema.rows.forEach((row) => {
      let rowDiv = document.createElement("div");
      rowDiv.classList.add("row", "show-hover");
      row.classList.forEach(function (cssClass) {
        rowDiv.classList.add(cssClass);
      });
      rowDiv.id = row.id;
      rowDiv.addEventListener("click", (event) => {
        selectedControl = container;
        showLayoutProperties(row);
        event.stopPropagation();
      });
      row.columns.forEach((column) => {
        const colDiv = document.createElement("div");
        // const colWidth = 12 / column.width;
        //colDiv.classList.add(`col-md-${colWidth}`);
        colDiv.setAttribute(
          "data-index",
          rowCount.toString() + "," + colCount.toString()
        );
        colDiv.classList.add("col-md-" + column.width, "p-5");

        column.controls.forEach((control) => {
          // Customize control rendering based on type and controlId
          let controlElement = this.createField(control);

          colDiv.appendChild(controlElement);
        });

        colCount++;
        rowDiv.appendChild(colDiv);
      });
      rowCount++;
      colCount = 0;
      container.appendChild(rowDiv);
    });

    return container;
  }
  // Other field creation methods

  getValue() {
    // Get field values
  }

  validate() {
    // Validate form
  }
}
