import {Codebook} from "../Codebook";

export const mockCodebook: Codebook = {
  key: 'murine-rigor-mice-analysis',
  version: '1.0.0',
  spec: {


    paper: {
      name: {
        format: 'string',
        prompt: "What is the name of the article?"
      },
      children: {
        format: 'list',
        prompt: "Which study branches were described in the article?",
        items: 'branch'
      }
    },


    branch: {
      name: {
        format: 'text',
        prompt: "Give the branch a descriptive name"
      },
      questions: 'questions'
    },


    questions: {


      lighting: {
        prompt: "How many hours of lighting",
        format: 'number'
      },


      nutrition: {
        prompt: "What kind of diet did the mice receive?",
        format: {
          ingredients: {
            format: 'list',
            prompt: "List the ingredients",
            items: 'text'
          }
        }
      },


      breed: {
        prompt: "What breed were the mice?",
        format: 'select',
        options: [
          'c57/bl',
          { displayName: 'White Mouse', value: "white" }
        ]
      }
    }
  }
}
