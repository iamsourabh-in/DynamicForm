# Lookup Scehma

```json
{
  "countries": {
    "values": [
      {
        "name": "USA",
        "cities": ["New York", "Los Angeles", "Chicago"]
      },
      {
        "name": "Canada",
        "cities": ["Toronto", "Vancouver", "Montreal"]
      }
      // ... other countries
    ],
    "nested": true
  },
  "ageRanges": {
    "values": ["0-18", "19-30", "31-50", "51+"],
    "nested": false
  }
}
```

# UI Schema

```json
{
  "form": {
    "method": "GET",
    "type": "layout",
    "rows": [
      {
        "type": "row",
        "columns": [
          {
            "width": 4,
            "className": "left-aligned",
            "controls": [
              {
                "type": "control",
                "controlId": "171230812368"
              }
            ]
          },
          {
            "width": 4,
            "className": "right-aligned",
            "controls": [
              {
                "type": "control",
                "controlId": "textControl2"
              }
            ]
          },
          {
            "width": 4,
            "controls": [
              {
                "type": "control",
                "controlId": "selectControl"
              },
              {
                "type": "control",
                "controlId": "tableControl"
              }
            ]
          }
        ]
      }
    ]
  }
}
```

# Scehma

```json
 {
            "textControl1": {
                "type": "control",
                "controlType": "textbox",
                "label": "Text Input 1",
                "id": "textInput1",
                "name": "text-input-1",
                "placeholder": "Enter text",
                "required": true,
                "validation": [{
                    "type": 'pattern',
                    "pattern": /^[a-zA-Z0-9_]+$/,
                    "errorMessage": 'Username must contain only letters, numbers, and underscores.',
                },
                {
                    "type": 'compare',
                    "pattern": ["==", "#textControl1"],
                    "errorMessage": 'Username must be equal',
                },
                {
                    "type": 'compare',
                    "pattern": ["==", "#textControl1"],
                    "errorMessage": 'Username must contain only letters, numbers, and underscores.',
                }],
                "Conditions":[
                    {
                    ref: "#control2",
                    action: "Hide",
                    match: ["input.col.id", "==", "tsesting"],
                    }
                ]
            },
            "textControl2": {
                "type": "control",
                "controlType": "textbox",
                "label": "Text Input 2",
                "id": "textInput2",
                "name": "text-input-2",
                "placeholder": "Enter text",
                "required": true
            },
            "numberControl2": {
                "type": "control",
                "controlType": "number",
                "label": "Number Input 2",
                "id": "numberInput2",
                "name": "number-input-2",
                "placeholder": "Enter number",
                "min": 0,
                "max": 100,
                "step": 1,
                "required": true,
                "defaultValue": 50
            },
              "selectControl": {
              "type": "control",
              "controlType": "select",
              "label": "Select Country",
              "id": "selectCountry",
              "name": "select-country",
              "lookup": true,
              "lookupKey": "countries",
              "required": true
            },
              "selectControl1": {
              "type": "control",
              "controlType": "select",
              "label": "Select cities",
              "id": "selectCountry",
              "name": "select-country",
              "lookup": false,
              "options": [""],
              "required": true
        }
 }

```

# HELPERS

```
if (lookups[control.lookupKey]) {
              lookups[control.lookupKey].forEach(option => {
                selectElement.appendChild(createElement('option', {}, option));
              });
            }
```

# ONE IN ALL:

```json
{
  "uiSchema": {
    "type": "layout",
    "rows": [
      {
        "type": "row",
        "columns": [
          {
            "width": 6,
            "controls": [
              {
                "type": "control",
                "controlId": "textControl1",
                "element": {
                  "elementType": "input",
                  "inputType": "text",
                  "label": "Text Input 1",
                  "id": "textInput1",
                  "name": "text-input-1",
                  "placeholder": "Enter text",
                  "required": true,
                  "class": "form-control",
                  "validation": {
                    "maxLength": 50
                  },
                  "visibilityConditions": [
                    {
                      "targetControlId": "selectControl",
                      "operator": "equals",
                      "value": "Option 1"
                    }
                  ]
                }
              }
            ]
          },
          {
            "width": 6,
            "controls": [
              {
                "type": "control",
                "controlId": "selectControl",
                "element": {
                  "elementType": "select",
                  "label": "Select Input",
                  "id": "selectInput",
                  "name": "select-input",
                  "required": true,
                  "class": "form-control",
                  "lookup": true,
                  "lookupKey": "options",
                  "visibilityConditions": [
                    {
                      "targetControlId": "textControl1",
                      "operator": "notEquals",
                      "value": "Some Value"
                    }
                  ]
                }
              }
            ]
          }
        ]
      },
      {
        "type": "row",
        "columns": [
          {
            "width": 12,
            "controls": [
              {
                "type": "control",
                "controlId": "dateControl",
                "element": {
                  "elementType": "input",
                  "inputType": "date",
                  "label": "Date Input",
                  "id": "dateInput",
                  "name": "date-input",
                  "required": true,
                  "class": "form-control",
                  "validation": {
                    "minDate": "2022-01-01",
                    "maxDate": "2022-12-31"
                  },
                  "visibilityConditions": [
                    {
                      "targetControlId": "selectControl",
                      "operator": "contains",
                      "value": "Option 2"
                    }
                  ]
                }
              },
              {
                "type": "control",
                "controlId": "numberControl",
                "element": {
                  "elementType": "input",
                  "inputType": "number",
                  "label": "Number Input",
                  "id": "numberInput",
                  "name": "number-input",
                  "placeholder": "Enter number",
                  "min": 0,
                  "max": 100,
                  "step": 1,
                  "required": true,
                  "class": "form-control",
                  "visibilityConditions": [
                    {
                      "targetControlId": "selectControl",
                      "operator": "startsWith",
                      "value": "Option"
                    }
                  ]
                }
              }
            ]
          }
        ]
      }
    ]
  }

```
