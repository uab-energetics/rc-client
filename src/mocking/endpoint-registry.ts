import {MockUser} from "./mock-data/User";
import {FakeJWT} from "./mock-data/JWT";

interface MockAPI {
  [endpoint: string]: object | Function
}

export const MOCK_API = {

  'GET /auth/login': {
    user: MockUser,
    token: FakeJWT
  },

  'GET /users/projects': [{"id":6,"name":"SP Trial 1","created_at":"2018-01-18 18:27:17","updated_at":"2018-01-18 18:27:17","description":"Test of SPICO subset with Obesity Journal Articles published in 2016","pivot":{"researcher_id":"1","project_id":"6"}},{"id":3,"name":"Caleb Temporary","created_at":"2018-01-08 22:09:43","updated_at":"2018-01-08 22:09:43","description":"ajk","pivot":{"researcher_id":"1","project_id":"3"}}],

  'GET /projects/*/dashboard': {"users":{"encoder_cnt":4,"researcher_cnt":5,"encoders":[{"id":6,"name":"Hannah Sweeney","email":"hsweeney@uab.edu","created_at":"2018-01-11 21:22:46","updated_at":"2018-05-31 23:52:52","image":"https:\/\/image.flaticon.com\/icons\/svg\/149\/149071.svg","location":null,"bio":null,"website":null,"department":null,"theme":null,"uuid":"6","pivot":{"project_id":"6","coder_id":"6"}},{"id":3,"name":"Kathryn Kaiser","email":"kakaiser@uab.edu","created_at":"2018-01-08 21:58:14","updated_at":"2018-05-31 23:52:52","image":"https:\/\/image.flaticon.com\/icons\/svg\/149\/149071.svg","location":"UAB - Birmingham, AL","bio":null,"website":null,"department":null,"theme":null,"uuid":"3","pivot":{"project_id":"6","coder_id":"3"}},{"id":2,"name":"Andrew Brown","email":"awb1@iu.edu","created_at":"2018-01-08 20:37:42","updated_at":"2018-05-31 23:52:52","image":"https:\/\/image.flaticon.com\/icons\/svg\/149\/149071.svg","location":"Bloomington, IN","bio":null,"website":null,"department":null,"theme":null,"uuid":"2","pivot":{"project_id":"6","coder_id":"2"}},{"id":11,"name":"Michelle Kaiser","email":"whalen.michelle@gmail.com","created_at":"2018-04-08 23:39:09","updated_at":"2018-05-31 23:52:52","image":"https:\/\/image.flaticon.com\/icons\/svg\/149\/149071.svg","location":"Oxford, UK","bio":null,"website":null,"department":null,"theme":null,"uuid":"11","pivot":{"project_id":"6","coder_id":"11"}}],"researchers":[{"id":3,"name":"Kathryn Kaiser","email":"kakaiser@uab.edu","created_at":"2018-01-08 21:58:14","updated_at":"2018-05-31 23:52:52","image":"https:\/\/image.flaticon.com\/icons\/svg\/149\/149071.svg","location":"UAB - Birmingham, AL","bio":null,"website":null,"department":null,"theme":null,"uuid":"3","pivot":{"project_id":"6","researcher_id":"3"}},{"id":6,"name":"Hannah Sweeney","email":"hsweeney@uab.edu","created_at":"2018-01-11 21:22:46","updated_at":"2018-05-31 23:52:52","image":"https:\/\/image.flaticon.com\/icons\/svg\/149\/149071.svg","location":null,"bio":null,"website":null,"department":null,"theme":null,"uuid":"6","pivot":{"project_id":"6","researcher_id":"6"}},{"id":1,"name":"Chris Rocco","email":"chris.rocco7@gmail.com","created_at":"2018-01-07 22:31:03","updated_at":"2018-05-31 23:52:52","image":"https:\/\/static1.squarespace.com\/static\/552a5cc4e4b059a56a050501\/565f6b57e4b0d9b44ab87107\/566024f5e4b0354e5b79dd24\/1449141991793\/NYCGifathon12.gif","location":"Birmingham, AL","bio":null,"website":null,"department":null,"theme":null,"uuid":"1","pivot":{"project_id":"6","researcher_id":"1"}},{"id":4,"name":"Caleb Falcione","email":"caleb.falcione@gmail.com","created_at":"2018-01-08 22:07:37","updated_at":"2018-05-31 23:52:52","image":"https:\/\/media4.giphy.com\/avatars\/nikdudukovic\/ylDRTR05sy6M.gif","location":null,"bio":null,"website":null,"department":null,"theme":null,"uuid":"4","pivot":{"project_id":"6","researcher_id":"4"}},{"id":2,"name":"Andrew Brown","email":"awb1@iu.edu","created_at":"2018-01-08 20:37:42","updated_at":"2018-05-31 23:52:52","image":"https:\/\/image.flaticon.com\/icons\/svg\/149\/149071.svg","location":"Bloomington, IN","bio":null,"website":null,"department":null,"theme":null,"uuid":"2","pivot":{"project_id":"6","researcher_id":"2"}}],"total":9},"publications":305,"codebooks":3,"tasks":{"complete":0,"in_progress":730,"pending":0,"total":730}},

  'GET /notifications': [],

  'GET /users/tasks': {"current_page":1,"data":[],"first_page_url":"http:\/\/backend\/users\/tasks?page=1","from":null,"last_page":1,"last_page_url":"http:\/\/backend\/users\/tasks?page=1","next_page_url":null,"path":"http:\/\/backend\/users\/tasks","per_page":"15","prev_page_url":null,"to":null,"total":0},

  'GET /projects/*/researchers': [{"id":6,"name":"Hannah Sweeney","email":"hsweeney@uab.edu","created_at":"2018-01-11 21:22:46","updated_at":"2018-05-31 23:52:52","image":"https:\/\/image.flaticon.com\/icons\/svg\/149\/149071.svg","location":null,"bio":null,"website":null,"department":null,"theme":null,"uuid":"6","pivot":{"project_id":"6","coder_id":"6"}},{"id":3,"name":"Kathryn Kaiser","email":"kakaiser@uab.edu","created_at":"2018-01-08 21:58:14","updated_at":"2018-05-31 23:52:52","image":"https:\/\/image.flaticon.com\/icons\/svg\/149\/149071.svg","location":"UAB - Birmingham, AL","bio":null,"website":null,"department":null,"theme":null,"uuid":"3","pivot":{"project_id":"6","coder_id":"3"}},{"id":2,"name":"Andrew Brown","email":"awb1@iu.edu","created_at":"2018-01-08 20:37:42","updated_at":"2018-05-31 23:52:52","image":"https:\/\/image.flaticon.com\/icons\/svg\/149\/149071.svg","location":"Bloomington, IN","bio":null,"website":null,"department":null,"theme":null,"uuid":"2","pivot":{"project_id":"6","coder_id":"2"}},{"id":11,"name":"Michelle Kaiser","email":"whalen.michelle@gmail.com","created_at":"2018-04-08 23:39:09","updated_at":"2018-05-31 23:52:52","image":"https:\/\/image.flaticon.com\/icons\/svg\/149\/149071.svg","location":"Oxford, UK","bio":null,"website":null,"department":null,"theme":null,"uuid":"11","pivot":{"project_id":"6","coder_id":"11"}}],

  'GET /projects/*/encoders': [{"id":6,"name":"Hannah Sweeney","email":"hsweeney@uab.edu","created_at":"2018-01-11 21:22:46","updated_at":"2018-05-31 23:52:52","image":"https:\/\/image.flaticon.com\/icons\/svg\/149\/149071.svg","location":null,"bio":null,"website":null,"department":null,"theme":null,"uuid":"6","pivot":{"project_id":"6","coder_id":"6"}},{"id":3,"name":"Kathryn Kaiser","email":"kakaiser@uab.edu","created_at":"2018-01-08 21:58:14","updated_at":"2018-05-31 23:52:52","image":"https:\/\/image.flaticon.com\/icons\/svg\/149\/149071.svg","location":"UAB - Birmingham, AL","bio":null,"website":null,"department":null,"theme":null,"uuid":"3","pivot":{"project_id":"6","coder_id":"3"}},{"id":2,"name":"Andrew Brown","email":"awb1@iu.edu","created_at":"2018-01-08 20:37:42","updated_at":"2018-05-31 23:52:52","image":"https:\/\/image.flaticon.com\/icons\/svg\/149\/149071.svg","location":"Bloomington, IN","bio":null,"website":null,"department":null,"theme":null,"uuid":"2","pivot":{"project_id":"6","coder_id":"2"}},{"id":11,"name":"Michelle Kaiser","email":"whalen.michelle@gmail.com","created_at":"2018-04-08 23:39:09","updated_at":"2018-05-31 23:52:52","image":"https:\/\/image.flaticon.com\/icons\/svg\/149\/149071.svg","location":"Oxford, UK","bio":null,"website":null,"department":null,"theme":null,"uuid":"11","pivot":{"project_id":"6","coder_id":"11"}}],

  'GET /projects/*/forms': [],

  'POST /projects/*/pub-repos/*/publications': [],

  'POST /projects/*/pub-repos/*/publications/delete': [],

  'GET /projects/*/pub-repos/*/publications': [{"id":41,"name":"Assessing the effects of 35 European-derived BMI-associated SNPs in Mexican children,","embeddingURL":"https:\/\/www.ncbi.nlm.nih.gov\/pubmed\/27486100","created_at":"2018-01-23 01:06:47","updated_at":"2018-02-16 03:08:51","source_id":"PMC27486100","pivot":{"project_id":"6","publication_id":"41"}},{"id":42,"title":"CNV analysis and mutation screening indicate an important role for the NPY4R gene in human obesity,","embeddingURL":"https:\/\/www.ncbi.nlm.nih.gov\/pubmed\/26921218","created_at":"2018-01-23 01:06:47","updated_at":"2018-02-16 03:08:51","source_id":"PMC26921218","pivot":{"project_id":"6","publication_id":"42"}},{"id":43,"title":"Future research in weight bias: What next?,","embeddingURL":"https:\/\/www.ncbi.nlm.nih.gov\/pubmed\/27129601","created_at":"2018-01-23 01:06:47","updated_at":"2018-02-16 03:08:51","source_id":"PMC27129601","pivot":{"project_id":"6","publication_id":"43"}},{"id":44,"title":"Optimal anthropometric measures and thresholds to identify undiagnosed type 2 diabetes in three major Asian ethnic groups,","embeddingURL":"https:\/\/www.ncbi.nlm.nih.gov\/pubmed\/27558457","created_at":"2018-01-23 01:06:47","updated_at":"2018-02-16 03:08:51","source_id":"PMC27558457","pivot":{"project_id":"6","publication_id":"44"}},{"id":45,"title":"Desire for weight loss, weight-related social contact, and body mass outcomes,","embeddingURL":"https:\/\/www.ncbi.nlm.nih.gov\/pubmed\/27227697","created_at":"2018-01-23 01:06:47","updated_at":"2018-02-16 03:08:51","source_id":"PMC27227697","pivot":{"project_id":"6","publication_id":"45"}},{"id":46,"title":"The obesity associated FTO gene variant and the risk of adverse pregnancy outcomes: Evidence from the SCOPE study,","embeddingURL":"https:\/\/www.ncbi.nlm.nih.gov\/pubmed\/27768255","created_at":"2018-01-23 01:06:47","updated_at":"2018-02-16 03:08:51","source_id":"PMC27768255","pivot":{"project_id":"6","publication_id":"46"}},{"id":47,"title":"Impact on weight and physical function of intensive medical weight loss in older adults with stage II and III obesity,","embeddingURL":"https:\/\/www.ncbi.nlm.nih.gov\/pubmed\/27430587","created_at":"2018-01-23 01:06:47","updated_at":"2018-02-16 03:08:51","source_id":"PMC27430587","pivot":{"project_id":"6","publication_id":"47"}},{"id":48,"title":"Efficacy of an orlistat-resveratrol combination for weight loss in subjects with obesity: A randomized controlled trial,","embeddingURL":"https:\/\/www.ncbi.nlm.nih.gov\/pubmed\/27221771","created_at":"2018-01-23 01:06:47","updated_at":"2018-02-16 03:08:51","source_id":"PMC27221771","pivot":{"project_id":"6","publication_id":"48"}},{"id":49,"title":"Can response to dietary restriction predict weight loss after Roux-en-Y gastroplasty?,","embeddingURL":"https:\/\/www.ncbi.nlm.nih.gov\/pubmed\/26853430","created_at":"2018-01-23 01:06:47","updated_at":"2018-02-16 03:08:51","source_id":"PMC26853430","pivot":{"project_id":"6","publication_id":"49"}},{"id":50,"title":"Uptake of the centers for medicare and medicaid obesity benefit: 2012-2013,","embeddingURL":"https:\/\/www.ncbi.nlm.nih.gov\/pubmed\/27465909","created_at":"2018-01-23 01:06:47","updated_at":"2018-02-16 03:08:51","source_id":"PMC27465909","pivot":{"project_id":"6","publication_id":"50"}},{"id":51,"title":"Weight loss maintenance strategies among rural breast cancer survivors: The rural women connecting for better health trial,","embeddingURL":"https:\/\/www.ncbi.nlm.nih.gov\/pubmed\/27581328","created_at":"2018-01-23 01:06:47","updated_at":"2018-02-16 03:08:51","source_id":"PMC27581328","pivot":{"project_id":"6","publication_id":"51"}},{"id":52,"title":"The impact of obstructive sleep apnea on nonalcoholic fatty liver disease in patients with severe obesity,","embeddingURL":"https:\/\/www.ncbi.nlm.nih.gov\/pubmed\/26880657","created_at":"2018-01-23 01:06:47","updated_at":"2018-02-16 03:08:51","source_id":"PMC26880657","pivot":{"project_id":"6","publication_id":"52"}},{"id":53,"title":"Differential methylation in inflammation and type 2 diabetes genes in siblings born before and after maternal bariatric surgery,","embeddingURL":"https:\/\/www.ncbi.nlm.nih.gov\/pubmed\/26637991","created_at":"2018-01-23 01:06:47","updated_at":"2018-02-16 03:08:51","source_id":"PMC26637991","pivot":{"project_id":"6","publication_id":"53"}},{"id":54,"title":"Impact of sugars and sugar taxation on body weight control: A comprehensive literature review,","embeddingURL":"https:\/\/www.ncbi.nlm.nih.gov\/pubmed\/27273733","created_at":"2018-01-23 01:06:47","updated_at":"2018-02-16 03:08:51","source_id":"PMC27273733","pivot":{"project_id":"6","publication_id":"54"}},{"id":55,"title":"Guideline-concordant weight-loss programs in an urban area are uncommon and difficult to identify through the internet,","embeddingURL":"https:\/\/www.ncbi.nlm.nih.gov\/pubmed\/26861769","created_at":"2018-01-23 01:06:47","updated_at":"2018-02-16 03:08:51","source_id":"PMC26861769","pivot":{"project_id":"6","publication_id":"55"}}],

  'GET /projects/*/publications': {"current_page":1,"data":[{"id":41,"title":"Assessing the effects of 35 European-derived BMI-associated SNPs in Mexican children,","embeddingURL":"https:\/\/www.ncbi.nlm.nih.gov\/pubmed\/27486100","created_at":"2018-01-23 01:06:47","updated_at":"2018-02-16 03:08:51","source_id":"PMC27486100","pivot":{"project_id":"6","publication_id":"41"}},{"id":42,"title":"CNV analysis and mutation screening indicate an important role for the NPY4R gene in human obesity,","embeddingURL":"https:\/\/www.ncbi.nlm.nih.gov\/pubmed\/26921218","created_at":"2018-01-23 01:06:47","updated_at":"2018-02-16 03:08:51","source_id":"PMC26921218","pivot":{"project_id":"6","publication_id":"42"}},{"id":43,"title":"Future research in weight bias: What next?,","embeddingURL":"https:\/\/www.ncbi.nlm.nih.gov\/pubmed\/27129601","created_at":"2018-01-23 01:06:47","updated_at":"2018-02-16 03:08:51","source_id":"PMC27129601","pivot":{"project_id":"6","publication_id":"43"}},{"id":44,"title":"Optimal anthropometric measures and thresholds to identify undiagnosed type 2 diabetes in three major Asian ethnic groups,","embeddingURL":"https:\/\/www.ncbi.nlm.nih.gov\/pubmed\/27558457","created_at":"2018-01-23 01:06:47","updated_at":"2018-02-16 03:08:51","source_id":"PMC27558457","pivot":{"project_id":"6","publication_id":"44"}},{"id":45,"title":"Desire for weight loss, weight-related social contact, and body mass outcomes,","embeddingURL":"https:\/\/www.ncbi.nlm.nih.gov\/pubmed\/27227697","created_at":"2018-01-23 01:06:47","updated_at":"2018-02-16 03:08:51","source_id":"PMC27227697","pivot":{"project_id":"6","publication_id":"45"}},{"id":46,"title":"The obesity associated FTO gene variant and the risk of adverse pregnancy outcomes: Evidence from the SCOPE study,","embeddingURL":"https:\/\/www.ncbi.nlm.nih.gov\/pubmed\/27768255","created_at":"2018-01-23 01:06:47","updated_at":"2018-02-16 03:08:51","source_id":"PMC27768255","pivot":{"project_id":"6","publication_id":"46"}},{"id":47,"title":"Impact on weight and physical function of intensive medical weight loss in older adults with stage II and III obesity,","embeddingURL":"https:\/\/www.ncbi.nlm.nih.gov\/pubmed\/27430587","created_at":"2018-01-23 01:06:47","updated_at":"2018-02-16 03:08:51","source_id":"PMC27430587","pivot":{"project_id":"6","publication_id":"47"}},{"id":48,"title":"Efficacy of an orlistat-resveratrol combination for weight loss in subjects with obesity: A randomized controlled trial,","embeddingURL":"https:\/\/www.ncbi.nlm.nih.gov\/pubmed\/27221771","created_at":"2018-01-23 01:06:47","updated_at":"2018-02-16 03:08:51","source_id":"PMC27221771","pivot":{"project_id":"6","publication_id":"48"}},{"id":49,"title":"Can response to dietary restriction predict weight loss after Roux-en-Y gastroplasty?,","embeddingURL":"https:\/\/www.ncbi.nlm.nih.gov\/pubmed\/26853430","created_at":"2018-01-23 01:06:47","updated_at":"2018-02-16 03:08:51","source_id":"PMC26853430","pivot":{"project_id":"6","publication_id":"49"}},{"id":50,"title":"Uptake of the centers for medicare and medicaid obesity benefit: 2012-2013,","embeddingURL":"https:\/\/www.ncbi.nlm.nih.gov\/pubmed\/27465909","created_at":"2018-01-23 01:06:47","updated_at":"2018-02-16 03:08:51","source_id":"PMC27465909","pivot":{"project_id":"6","publication_id":"50"}},{"id":51,"title":"Weight loss maintenance strategies among rural breast cancer survivors: The rural women connecting for better health trial,","embeddingURL":"https:\/\/www.ncbi.nlm.nih.gov\/pubmed\/27581328","created_at":"2018-01-23 01:06:47","updated_at":"2018-02-16 03:08:51","source_id":"PMC27581328","pivot":{"project_id":"6","publication_id":"51"}},{"id":52,"title":"The impact of obstructive sleep apnea on nonalcoholic fatty liver disease in patients with severe obesity,","embeddingURL":"https:\/\/www.ncbi.nlm.nih.gov\/pubmed\/26880657","created_at":"2018-01-23 01:06:47","updated_at":"2018-02-16 03:08:51","source_id":"PMC26880657","pivot":{"project_id":"6","publication_id":"52"}},{"id":53,"title":"Differential methylation in inflammation and type 2 diabetes genes in siblings born before and after maternal bariatric surgery,","embeddingURL":"https:\/\/www.ncbi.nlm.nih.gov\/pubmed\/26637991","created_at":"2018-01-23 01:06:47","updated_at":"2018-02-16 03:08:51","source_id":"PMC26637991","pivot":{"project_id":"6","publication_id":"53"}},{"id":54,"title":"Impact of sugars and sugar taxation on body weight control: A comprehensive literature review,","embeddingURL":"https:\/\/www.ncbi.nlm.nih.gov\/pubmed\/27273733","created_at":"2018-01-23 01:06:47","updated_at":"2018-02-16 03:08:51","source_id":"PMC27273733","pivot":{"project_id":"6","publication_id":"54"}},{"id":55,"title":"Guideline-concordant weight-loss programs in an urban area are uncommon and difficult to identify through the internet,","embeddingURL":"https:\/\/www.ncbi.nlm.nih.gov\/pubmed\/26861769","created_at":"2018-01-23 01:06:47","updated_at":"2018-02-16 03:08:51","source_id":"PMC26861769","pivot":{"project_id":"6","publication_id":"55"}}],"first_page_url":"http:\/\/backend\/projects\/6\/publications?page=1","from":1,"last_page":21,"last_page_url":"http:\/\/backend\/projects\/6\/publications?page=21","next_page_url":"http:\/\/backend\/projects\/6\/publications?page=2","path":"http:\/\/backend\/projects\/6\/publications","per_page":"15","prev_page_url":null,"to":15,"total":305},

  'GET /projects/*/pub-repos': [
    {
      displayName: "Murine Rigor Repo",
      id: "murine-rigor-repo-34gf65"
    },
    {
      displayName: "Screening Repo",
      id: "screening-q34t"
    },
    {
      displayName: "Stage One Articles",
      id: "stage-1-articles-23r"
    }
  ],

  'POST /projects/*/pub-repos': (req) => ({...req.body, id: 'my-new-repo-23r43r' }),

  'GET /entrez/*': {
    "header": {
      "type": "esummary",
      "version": "0.3"
    },
    "result": {
      "uids": [
        "3539452"
      ],
      "3539452": {
        "uid": "3539452",
        "pubdate": "2012 Feb 23",
        "epubdate": "2012 Feb 23",
        "printpubdate": "2013 Feb",
        "source": "Cereb Cortex",
        "authors": [
          {
            "name": "Kind PC",
            "authtype": "Author"
          },
          {
            "name": "Sengpiel F",
            "authtype": "Author"
          },
          {
            "name": "Beaver CJ",
            "authtype": "Author"
          },
          {
            "name": "Crocker-Buque A",
            "authtype": "Author"
          },
          {
            "name": "Kelly GM",
            "authtype": "Author"
          },
          {
            "name": "Matthews RT",
            "authtype": "Author"
          },
          {
            "name": "Mitchell DE",
            "authtype": "Author"
          }
        ],
        "title": "The Development and Activity-Dependent Expression of Aggrecan in the Cat Visual Cortex",
        "volume": "23",
        "issue": "2",
        "pages": "349-360",
        "articleids": [
          {
            "idtype": "pmid",
            "value": "22368089"
          },
          {
            "idtype": "doi",
            "value": "10.1093/cercor/bhs015"
          },
          {
            "idtype": "pmcid",
            "value": "PMC3539452"
          }
        ],
        "fulljournalname": "Cerebral Cortex (New York, NY)",
        "sortdate": "2012/02/23 00:00",
        "pmclivedate": "2014/02/01"
      }
    }
  },

}
