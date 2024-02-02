const controls = [
  {
    key: "Textbox",
    icon: "bi-fonts",
    description: "Text Input",
    type: "control",
  },
  {
    key: "Dropdown",
    icon: "bi-arrow-down-square-fill",
    description: "Dropdown Selection",
    type: "control",
  },
  {
    key: "Number",
    icon: "bi-1-square",
    description: "Numeric Input",
    type: "control",
  },
  // {
  //   key: "URL",
  //   icon: "bi-link-45deg",
  //   description: "URL Input",
  //   type: "control",
  // },
  {
    key: "Email",
    icon: "bi-mailbox",
    description: "Email Input",
    type: "control",
  },
  {
    key: "Checkbox",
    icon: "bi-card-checklist",
    description: "Checkbox",
    type: "control",
  },
  {
    key: "Radio",
    icon: "bi-0-circle",
    description: "Radio Button",
    type: "control",
  },
  {
    key: "DatePicker",
    icon: "bi-calendar-date",
    description: "Date Picker",
    type: "control",
  },
  {
    key: "Slider",
    icon: "bi-sliders",
    description: "Slider Input",
    type: "control",
  },
  { key: "H1", icon: "bi-1-square", description: "Heading 1", type: "control" },
  { key: "H2", icon: "bi-2-square", description: "Heading 2", type: "control" },
  { key: "H3", icon: "bi-3-square", description: "Heading 3", type: "control" },
  {
    key: "Section",
    icon: "bi-sliders",
    description: "Section",
    type: "control",
  },
  {
    key: "FileUpload",
    icon: "bi-file-earmark-arrow-up",
    description: "File Upload",
    type: "control",
  },
  { key: "Label", icon: "bi-bookmark", description: "Label", type: "control" },
  { key: "Button", icon: "bi-box2", description: "Button", type: "control" },
  {
    key: "Reset",
    icon: "bi-box2-fill",
    description: "Reset Button",
    type: "control",
  },
  {
    key: "1Column",
    icon: "bi-dice-1",
    description: "1 Column",
    type: "layout",
  },
  {
    key: "2Column",
    icon: "bi-dice-2",
    description: "Two Column",
    type: "layout",
  },
  {
    key: "3Column",
    icon: "bi-dice-3",
    description: "Three Column",
    type: "layout",
  },
  {
    key: "4Column",
    icon: "bi-dice-4",
    description: "Four Column",
    type: "layout",
  },
  // { key: "5Column", icon: "bi-dice-5", description: "Five Column", type: "layout" },
  {
    key: "6Column",
    icon: "bi-dice-6",
    description: "Six Column",
    type: "layout",
  },
  {
    key: "8Column",
    icon: "bi-dice-6",
    description: "Eight Column",
    type: "layout",
  },
  {
    key: "12Column",
    icon: "bi-dice-6",
    description: "Twelve Column",
    type: "layout",
  },
  {
    key: "Iframe",
    icon: "bi-bounding-box",
    description: "Custom Component 002 - App 1",
    type: "control",
  },
];

function renderToolbox() {
  const controlsTab = document.getElementById("controls");
  const layoutTab = document.getElementById("layout");
  const formTab = document.getElementById("form");

  controlsTab.innerHTML =
    "<h3 class='mt-1 p-2 text-light bg-dark'>Controls</h3>";
  layoutTab.innerHTML = "<h3 class='mt-1 p-2 text-light bg-dark'>Layout</h3>";
  formTab.innerHTML = "<h3 class='mt-1 p-2 text-light bg-dark'>Form</h3>";

  controls.forEach((control) => {
    const controlElement = createToolboxItem(control);

    if (control.type === "form") {
      // Add to the "Form" tab
      formTab.appendChild(controlElement);
    } else if (control.type === "layout") {
      // Add to the "Layout" tab
      layoutTab.appendChild(controlElement);
    } else if (control.type === "control") {
      // Add to the "Controls" tab
      controlsTab.appendChild(controlElement);
    }
  });
}

function createToolboxItem(control) {
  const rootElement = document.createElement("div");
  rootElement.draggable = true;
  rootElement.classList.add("widgets_div");
  rootElement.dataset.type = control.key;

  const icon_div = document.createElement("div");
  icon_div.classList.add("icon_div");
  const icon = document.createElement("i");
  icon.classList.add("bi", control.icon);
  icon_div.appendChild(icon);
  rootElement.appendChild(icon_div);

  const text_div = document.createElement("div");
  text_div.classList.add("text_div");

  const tool = document.createElement("span");
  tool.innerText = control.description;
  text_div.appendChild(tool);

  const br = document.createElement("br");
  text_div.appendChild(br);

  const desc = document.createElement("span");
  desc.innerText = control.description;
  text_div.appendChild(desc);
  rootElement.appendChild(text_div);

  rootElement.addEventListener("dragstart", (e) => {
    e.dataTransfer.setData("text/plain", control.key);
    e.dataTransfer.setData("type", control.type);
  });

  return rootElement;
}
