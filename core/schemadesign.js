{
  "type": "layout",
  "rows": [
    {
      "type": "row",
      "columns": [
        {
          "type": "column",
          "width": 6,
          "content": [
            {
              "controlId": "textControl1"
            },
            {
              "controlId": "numberControl1"
            }
          ]
        },
        {
          "type": "column",
          "width": 6,
          "content": [
            {
              "controlId": "dropdownControl1"
            },
            {
              "controlId": "dateControl1"
            }
          ]
        }
      ]
    }
  ]
}

{
  "textControl1": {
    "type": "control",
    "controlType": "textbox",
    "label": "Text Input 1",
    "id": "textInput1",
    "name": "text-input-1",
    "placeholder": "Enter text",
    "required": true
  },
  "numberControl1": {
    "type": "control",
    "controlType": "number",
    "label": "Number Input 1",
    "id": "numberInput1",
    "name": "number-input-1",
    "placeholder": "Enter number",
    "min": 0,
    "max": 100,
    "step": 1,
    "required": true,
    "defaultValue": 50
  },
  "dropdownControl1": {
    "type": "control",
    "controlType": "dropdown",
    "label": "Dropdown 1",
    "id": "dropdown1",
    "name": "dropdown-1",
    "options": ["Option 1", "Option 2", "Option 3"],
    "required": true
  },
  "dateControl1": {
    "type": "control",
    "controlType": "date",
    "label": "Date Input 1",
    "id": "dateInput1",
    "name": "date-input-1",
    "required": true
  }
}


