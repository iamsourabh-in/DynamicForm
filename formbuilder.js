class FormBuilder {
  constructor(schema) {
    this.schema = schema;
  }

  render(container) {
    this.container = document.querySelector(container);
    this.container.innerHTML = "";
    this.form = document.createElement("form");
    if (schema != null && schema.length > 0) {
      this.container.appendChild(this.form);

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
      case "Column":
        return this.createLayout(3, 3);
      case "Row":
        return this.renderLayout();

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

  // Create rows and cols
  createLayout(rows, cols) {
    // Outer container
    const container = document.createElement("div");
    container.classList.add("container");
    container.addEventListener("click", () => {
      selectedControl = container;
      showLayoutProperties(field.id);
    });
    for (let i = 0; i < rows; i++) {
      // Create row
      const row = document.createElement("div");
      row.classList.add("row");

      for (let j = 0; j < cols; j++) {
        // Create column
        const col = document.createElement("div");

        // Size column based on number of cols
        col.classList.add("col-md-" + 12 / cols);

        // Add styling
        col.style.border = "1px solid";
        col.style.padding = "10px";

        row.appendChild(col);
      }

      container.appendChild(row);
    }

    return container;
  }
  // Recursive function to render layout
  renderLayout() {
    var layout = {
      type: "layout",
      rows: [
        {
          cols: {
            length: 4,
            elements: [{ type: "textbox" }, { type: "textbox" }],
          },
        },
      ],
    };
    if (layout.type === "layout") {
      // Render layout rows
      const row = document.createElement("div");
      row.classList.add("row");

      layout.rows.forEach((row) => {
        this.renderRow(row, row);
      });

      return row;

    } else {
      
      // Render control
      return createControl(layout);
    }
  }

  // Render row with columns
  renderRow(row, parent) {
    const rowEl = document.createElement("div");
    rowEl.classList.add("row");
    const cols = row.cols;
    cols.elements.forEach((col) => {
      const colEl = document.createElement("div");

      // Size based on nested columns
      colEl.classList.add("col-md-" + 12 / row.cols.length);

      // Render column content
      colEl.appendChild(this.renderLayout());

      rowEl.appendChild(colEl);
    });

    parent.appendChild(rowEl);
  }
  // Usage

  // Other field creation methods

  getValue() {
    // Get field values
  }

  validate() {
    // Validate form
  }
}
