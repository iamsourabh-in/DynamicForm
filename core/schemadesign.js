var uischema = {
  type: "TupleLayout",
  rows: 1 ,
  column: 3,
  elements: [
    {
      type: "Control",
      scope: "properties.rating",
    },
    {
      type: "VerticalLayout",
      elements: [
        {
          type: "Control",
          scope: "#/properties/rating",
        },
        {
          type: "Control",
          scope: "#/properties/recurrence",
        },
        {
          type: "Control",
          scope: "#/properties/recurrenceInterval",
        },
      ],
    },
  ],
}

//Properties

var x = {
  properties: {
    name: {
      type: "string",
      minLength: 1,
      description: "The task's name"
    },
    description: {
      title: "Long Description",
      type: "string",
    },
    done: {
      type: "boolean",
    },
    dueDate: {
      type: "string",
      format: "date",
      description: "The task's due date"
    },
    rating: {
      type: "integer",
      maximum: 5,
    },
    recurrence: {
      type: "string",
      enum: ["Never", "Daily", "Weekly", "Monthly", "Always"]
    },
    recurrenceInterval: {
      type: "integer",
      description: "Days until recurrence"
    }
  }


  ///////
    
    
    
 var data = [{
    type: 'button',
    buttonLabel: 'Save',
    conditions: [
      ['text', 'not_empty'],
      ['phone', '^', '1'],
    ],
    target: '_top',
    between: 'asd',
    after: 'asd',
    before: 'asd',
    columns: {
      container: 3,
    },
  }]



