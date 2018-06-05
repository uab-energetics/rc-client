export interface PMCResult {
  authors: { name: string, authtype: string }[]
  uid: string
  source: string
  pubdate: string
  epubdate: string
  title: string
  volume: string
  pages: string
  issue: string
  articleids: { idtype: string, value: string }[]
  fulljournalname: string
  sortdate: string
  pmclivedate: string
  embedding_url?: string
}
