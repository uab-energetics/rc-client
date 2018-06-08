import {FormSpec, GroupListSpec, GroupSpec, QuestionSpec} from "./FormSpec";

const addSpec = (groupSpec: GroupSpec, key: string, spec: FormSpec): GroupSpec => ({
  ...groupSpec,
  fields: {
    ...groupSpec.fields,
    [key]: spec
  }
})

const removeSpec = (groupSpec: GroupSpec, key: string): GroupSpec => {
  let copy = { ...groupSpec }
  delete copy.fields[key]
  return copy
}

const setListItem = (groupListSpec: GroupListSpec, groupSpec: GroupSpec): GroupListSpec => ({
  ...groupListSpec,
  listItem: groupSpec
})
