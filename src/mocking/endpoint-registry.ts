import {MockUser} from "./mock-data/User";
import {FakeJWT} from "./mock-data/JWT";

interface MockAPI {
  [endpoint: string]: object | Function
}

export const MOCK_API = {

  '/auth/login': {
    user: MockUser,
    token: FakeJWT
  },

  '/users/projects': [{"id":6,"name":"SP Trial 1","created_at":"2018-01-18 18:27:17","updated_at":"2018-01-18 18:27:17","description":"Test of SPICO subset with Obesity Journal Articles published in 2016","pivot":{"researcher_id":"1","project_id":"6"}},{"id":3,"name":"Caleb Temporary","created_at":"2018-01-08 22:09:43","updated_at":"2018-01-08 22:09:43","description":"ajk","pivot":{"researcher_id":"1","project_id":"3"}}],

  '/projects/*/dashboard': {"users":{"encoder_cnt":4,"researcher_cnt":5,"encoders":[{"id":6,"name":"Hannah Sweeney","email":"hsweeney@uab.edu","created_at":"2018-01-11 21:22:46","updated_at":"2018-05-31 23:52:52","image":"https:\/\/image.flaticon.com\/icons\/svg\/149\/149071.svg","location":null,"bio":null,"website":null,"department":null,"theme":null,"uuid":"6","pivot":{"project_id":"6","coder_id":"6"}},{"id":3,"name":"Kathryn Kaiser","email":"kakaiser@uab.edu","created_at":"2018-01-08 21:58:14","updated_at":"2018-05-31 23:52:52","image":"https:\/\/image.flaticon.com\/icons\/svg\/149\/149071.svg","location":"UAB - Birmingham, AL","bio":null,"website":null,"department":null,"theme":null,"uuid":"3","pivot":{"project_id":"6","coder_id":"3"}},{"id":2,"name":"Andrew Brown","email":"awb1@iu.edu","created_at":"2018-01-08 20:37:42","updated_at":"2018-05-31 23:52:52","image":"https:\/\/image.flaticon.com\/icons\/svg\/149\/149071.svg","location":"Bloomington, IN","bio":null,"website":null,"department":null,"theme":null,"uuid":"2","pivot":{"project_id":"6","coder_id":"2"}},{"id":11,"name":"Michelle Kaiser","email":"whalen.michelle@gmail.com","created_at":"2018-04-08 23:39:09","updated_at":"2018-05-31 23:52:52","image":"https:\/\/image.flaticon.com\/icons\/svg\/149\/149071.svg","location":"Oxford, UK","bio":null,"website":null,"department":null,"theme":null,"uuid":"11","pivot":{"project_id":"6","coder_id":"11"}}],"researchers":[{"id":3,"name":"Kathryn Kaiser","email":"kakaiser@uab.edu","created_at":"2018-01-08 21:58:14","updated_at":"2018-05-31 23:52:52","image":"https:\/\/image.flaticon.com\/icons\/svg\/149\/149071.svg","location":"UAB - Birmingham, AL","bio":null,"website":null,"department":null,"theme":null,"uuid":"3","pivot":{"project_id":"6","researcher_id":"3"}},{"id":6,"name":"Hannah Sweeney","email":"hsweeney@uab.edu","created_at":"2018-01-11 21:22:46","updated_at":"2018-05-31 23:52:52","image":"https:\/\/image.flaticon.com\/icons\/svg\/149\/149071.svg","location":null,"bio":null,"website":null,"department":null,"theme":null,"uuid":"6","pivot":{"project_id":"6","researcher_id":"6"}},{"id":1,"name":"Chris Rocco","email":"chris.rocco7@gmail.com","created_at":"2018-01-07 22:31:03","updated_at":"2018-05-31 23:52:52","image":"https:\/\/static1.squarespace.com\/static\/552a5cc4e4b059a56a050501\/565f6b57e4b0d9b44ab87107\/566024f5e4b0354e5b79dd24\/1449141991793\/NYCGifathon12.gif","location":"Birmingham, AL","bio":null,"website":null,"department":null,"theme":null,"uuid":"1","pivot":{"project_id":"6","researcher_id":"1"}},{"id":4,"name":"Caleb Falcione","email":"caleb.falcione@gmail.com","created_at":"2018-01-08 22:07:37","updated_at":"2018-05-31 23:52:52","image":"https:\/\/media4.giphy.com\/avatars\/nikdudukovic\/ylDRTR05sy6M.gif","location":null,"bio":null,"website":null,"department":null,"theme":null,"uuid":"4","pivot":{"project_id":"6","researcher_id":"4"}},{"id":2,"name":"Andrew Brown","email":"awb1@iu.edu","created_at":"2018-01-08 20:37:42","updated_at":"2018-05-31 23:52:52","image":"https:\/\/image.flaticon.com\/icons\/svg\/149\/149071.svg","location":"Bloomington, IN","bio":null,"website":null,"department":null,"theme":null,"uuid":"2","pivot":{"project_id":"6","researcher_id":"2"}}],"total":9},"publications":305,"codebooks":3,"tasks":{"complete":0,"in_progress":730,"pending":0,"total":730}},

  '/notifications': [],


}
