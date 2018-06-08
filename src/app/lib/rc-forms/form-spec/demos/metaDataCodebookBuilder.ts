export default {
  type: 'group',
  title: 'Form Form',
  fields: {
    question: {
      type: 'group-inline',
      style: 'group-inline',
      title: "Question Form",
      fields: {
        title: {
          type: 'text',
          prompt: "Give the question a title",
          meta: {
            options: [ '' ]
          },
          placeholder: 'Question Title...' },
        prompt: {
          type: 'text',
          placeholder: 'Question Prompt...'
        },
        type: {
          type: 'select',
          placeholder: 'Question Type...',
          options: ['text', 'number', 'boolean']
        },
        hovertip: { type:'text', placeholder: 'Hover Tip...'}
      }
    },
    question2: {
      type: 'group-inline',
      style: 'group-inline',
      title: "Question Form",
      fields: {
        title: { type: 'text', placeholder: 'Question Title...' },
        prompt: {
          type: 'text',
          placeholder: 'Question Title...'
        },
        type: {
          type: 'select',
          placeholder: 'Question Type...',
          options: ['text', 'number', 'boolean']
        },
        hovertip: { type:'text', placeholder: 'Hover Tip...'}
      }
    },
    question3: {
      type: 'group-inline',
      style: 'group-inline',
      title: "Question Form",
      fields: {
        title: { type: 'text', placeholder: 'Question Title...' },
        prompt: {
          type: 'text',
          placeholder: 'Question Title...'
        },
        type: {
          type: 'select',
          placeholder: 'Question Type...',
          options: ['text', 'number', 'boolean']
        },
        hovertip: { type:'text', placeholder: 'Hover Tip...'}
      }
    },
    branched: {
      type: 'group',
      title: 'Encoding Branches',
      fields: {
        hasBranches: { type: 'text', placeholder: 'Were there branches in the experiment?' }
      }
    },
    experiments: {
      type: 'group-list',
      title: 'Encoding Experiment',
      listItem: {
        type: 'group',
        title: 'Encoding Branches',
        fields: {
          hasBranches: { type: 'text', placeholder: 'Were there branches in the experiment?' }
        }
      }
    }
  }
}
