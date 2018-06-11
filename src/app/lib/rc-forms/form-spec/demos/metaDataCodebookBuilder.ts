export default {
  type: 'group',
  title: 'Form Form',
  fields: {
    questions: {
      type: 'group-list',
      title: 'Questions',
      listItem: {
        type: 'group-inline',
        fields: {
          type: {
            type: 'select',
            title: 'Question Type',
            options: [ 'select', 'text', 'multi-select', 'radio-button' ]
          },
          title: {
            type: 'text',
            title: "Question Title"
          },
          desc: {
            type: 'text',
            title: 'Question Description'
          },
          hovertip: {
            type: 'text',
            title: "Question Hovertip"
          },
          optional: {
            type: 'binary',
            options: ['Yes', 'No']
          },
          conditions: {
            type: 'group-list',
            title: 'Options',
            listItem: {
              type: 'text',
            }
          }
        }
      }
    }
  }
}
