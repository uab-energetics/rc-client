export default {
  root: {
    type: 'group',
    title: "Experiment",
    prompt: "Answer the following questions about the paper",
    fields: {
      studyLevelQuestions: {
        type: 'group',
        title: 'Constant Level Questions',
        fields: {
          questionOne: {
            type: 'text',
            prompt: 'Example Text Question',
            placeholder: "Question Title",
            title: 'this is an example text question',
            hovertip: "Example hovertip"
          },
          questionTwo: {
            type: 'number',
            prompt: 'Example Number Question',
            title: 'this is an example number question'
          },
          questionThree: {
            type: 'select',
            title: "Example Select",
            prompt: "this is an example select question",
            options: ['yes', 'no']
          }
        }
      },
      branches: {
        type: 'group-list',
        title: "Study Branches",
        prompt: "List the branches in this experiment",
        listItem: {
          type: 'group',
          fields: {
            questionOne: {
              type: 'text',
              prompt: 'Example Text Question',
              title: 'this is an example text question'
            },
            questionTwo: {
              type: 'number',
              prompt: 'Example Number Question',
              title: 'this is an example number question'
            },
            questionThree: {
              type: 'multi-select',
              title: "Example Multi-Select",
              prompt: "What's your favorite cheese?",
              options: ['Muenster', 'White Cheddar', 'Edam', 'Amish', 'Gouda']
            }
          }
        }
      }
    }
  }
}
