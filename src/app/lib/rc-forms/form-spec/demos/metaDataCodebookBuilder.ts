export default {
  type: 'group',
  title: 'Form Form',
  fields: {
    paperQuestions: {
      type: 'group',
      title: 'Paper Questions',
      fields: {
        name: {
          type: 'text',
          title: "Paper Name",
          prompt: "What is the name of the article?",
          meta: {
            options: [ 'not-reported' ]
          }
        }
      }
    },
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
    experiments: {
      type: 'group-list',
      title: 'Encoding Experiment',
      listItem: {
        type: 'group-inline',
        fields: {
          desc: {
            type: 'text',
            title: 'Branch Name',
            placeholder: 'Describe this branch' }
        }
      }
    }
  }
}
