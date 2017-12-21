import {factory} from "./appFactory";

describe("Factories", () => {
  it("Creates mock data", () => {

    let form = factory('form');

    console.log(form);

    expect(form).toBeTruthy();

  })
});
