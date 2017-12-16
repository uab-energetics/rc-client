

import { makeForm } from "../../src/app/models/Form";
import { makeCategory } from "../../src/app/models/Category";
import {makeQuestion, Question} from "../../src/app/models/Question";

export const form = {
  layout: {
    root: {
      children: [
        {
          id: 1,
          type: 'C',
          name: 'root1',
          children: [
            { id: 2, name: 'child1', type: 'Q' },
            { id: 3, name: 'child2', type: 'Q' }
          ]
        },
        {
          id: 4,
          name: 'root2',
          type: 'C',
          children: [
            { id: 5, name: 'child2.1', type: 'Q' },
            {
              id: 6,
              type: 'C',
              name: 'child2.2',
              children: [
                { id: 7, name: 'subsub', type: 'Q' }
              ]
            }
          ]
        }
      ]
    }
  }
};
