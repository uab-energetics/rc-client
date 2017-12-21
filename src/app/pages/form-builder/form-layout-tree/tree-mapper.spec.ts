

import {makeQuestion} from "../../../models/AppQuestion";
import {makeCategory} from "../../../models/AppCategory";
import {makeForm} from "../../../models/AppForm";
import {mapToTreeView} from "./tree-mapper";

describe("Tree mapping test", () => {

  it( "Builds a regular form layout, and maps it to a renderable tree", () => {

    let questions = [
      makeQuestion({ prompt: 'q1' }),
      makeQuestion({ prompt: 'q2' }),
      makeQuestion({ prompt: 'q3' })
    ];

    let categories = [
      makeCategory({ name: 'Lighting' }),
      makeCategory({ name: 'Weight' })
    ];

    categories[0].questions = [questions[0], questions[1]];
    categories[1].questions = [questions[2]];
    let root = makeCategory({}, categories);
    let form = makeForm({}, root);


    let tree = mapToTreeView(form);
    // console.log(JSON.stringify(tree, null, 2));

  })

});
