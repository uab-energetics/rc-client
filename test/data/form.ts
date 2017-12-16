

export const form = {
  layout: {
    root: {
      name: 'Category One',
      questions: [
        {
          name: 'Lighting'
        },
        {
          name: 'Temperature'
        }
      ],
      children: [
        {
          name: 'Category Two',
          questions: [
            {
              name: 'Enrichment'
            }
          ],
          children: [
            {
              name: 'Category Three',
              questions: [
                {
                  name: 'Weight'
                }
              ],
              children: []
            }
          ]
        }
      ]
    }
  }
}
