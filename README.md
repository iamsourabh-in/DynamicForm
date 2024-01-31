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
  "method": "POST",
  "action": "http://localhost:8080/api/v1/form",
  "type": "form",
  "rows": [
    {
      "type": "row",
      "height": 10,
      "columns": [
        {
          "width": 6,
          "controls": [
            {
              "type": "control",
              "controlId": "username"
            }
          ]
        },
        {
          "width": 6,
          "controls": [
            {
              "type": "control",
              "controlId": "email"
            }
          ]
        }
      ]
    },
    {
      "type": "row",
      "columns": [
        {
          "width": 6,
          "controls": [
            {
              "type": "control",
              "controlId": "password"
            }
          ]
        },
        {
          "width": 6,
          "controls": [
            {
              "type": "control",
              "controlId": "confirmPassword"
            }
          ]
        }
      ]
    },
    {
      "type": "row",
      "columns": [
        {
          "width": 6,
          "controls": [
            {
              "type": "control",
              "controlId": "age"
            }
          ]
        },
        {
          "width": 6,
          "controls": [
            {
              "type": "control",
              "controlId": "country"
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
              "controlId": "submitButton"
            }
          ]
        }
      ]
    }
  ]
}
```

# Scehma

```json
{
  "username": {
    "type": "control",
    "controlType": "textbox",
    "label": "Username",
    "id": "username",
    "name": "username",
    "placeholder": "Enter username",
    "required": true,
    "class": "form-control",
    "validation": [
      {
        "type": "pattern",
        "pattern": "^[a-zA-Z0-9_]+$",
        "errorMessage": "Username must contain only letters, numbers, and underscores."
      },
      {
        "type": "compare",
        "pattern": ["!=", "#password"],
        "errorMessage": "Username must not be the same as the password."
      }
    ],
    "newvalidation": [
      {
        "type": "pattern",
        "pattern": "/^[a-zA-Z0-9_]+$/",
        "errorMessage": "Username must contain only letters, numbers, and underscores."
      },
      {
        "type": "compare",
        "pattern": ["==", "#textControl1"],
        "errorMessage": "Username must be equal"
      },
      {
        "type": "compare",
        "pattern": ["==", "#textControl1"],
        "errorMessage": "Username must contain only letters, numbers, and underscores."
      }
    ],
    "Conditions": [
      {
        "ref": "#control2",
        "action": "Hide",
        "match": ["input.col.id", "==", "tsesting"]
      }
    ]
  },
  "email": {
    "type": "control",
    "controlType": "textbox",
    "label": "Email",
    "id": "email",
    "name": "email",
    "placeholder": "Enter email",
    "required": true,
    "class": "form-control",
    "validation": [
      {
        "type": "pattern",
        "pattern": "^\\S+@\\S+\\.\\S+$",
        "errorMessage": "Invalid email format."
      }
    ]
  },
  "password": {
    "type": "control",
    "controlType": "password",
    "label": "Password",
    "id": "password",
    "placeholder": "Enter password",
    "required": true,
    "class": "form-control",
    "validation": [
      {
        "type": "minLength",
        "minLength": 8,
        "errorMessage": "Password must be at least 8 characters long."
      }
    ]
  },
  "confirmPassword": {
    "type": "control",
    "controlType": "password",
    "label": "Confirm Password",
    "id": "confirmPassword",
    "name": "confirm-password",
    "placeholder": "Confirm password",
    "required": true,
    "class": "form-control",
    "validation": [
      {
        "type": "minLength",
        "minLength": 8,
        "errorMessage": "Password must be at least 8 characters long."
      },
      {
        "type": "equalTo",
        "equalTo": "#password",
        "errorMessage": "Passwords do not match."
      }
    ]
  },
  "age": {
    "type": "control",
    "controlType": "number",
    "label": "Age",
    "id": "age",
    "name": "age",
    "placeholder": "Enter age",
    "required": true,
    "class": "form-control",
    "validation": [
      {
        "type": "range",
        "min": 18,
        "max": 100,
        "errorMessage": "Age must be between 18 and 100."
      }
    ]
  },
  "country": {
    "type": "control",
    "controlType": "select",
    "label": "Country",
    "id": "country",
    "name": "country",
    "lookup": true,
    "lookupKey": "countries",
    "required": true,
    "class": "form-control"
  },
  "submitButton": {
    "type": "control",
    "controlType": "button",
    "buttonType": "submit",
    "label": "Sign Up",
    "id": "submitButton",
    "class": "btn btn-primary"
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
