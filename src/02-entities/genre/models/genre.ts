export type Genre = {
  _id: string
  linkId: {
    anime: number | null
    manga: number
  }
  name: {
    en: string
    ru: string
  }
  hentai: boolean
}
