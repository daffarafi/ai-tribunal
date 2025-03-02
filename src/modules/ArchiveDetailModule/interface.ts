export interface DebateDataProps {
  id: number
  topic: string
  creator: string
  createdAt: Date
  figure1Name: string
  figure1ImageUrl: string
  figure2Name: string
  figure2ImageUrl: string
  figure1Votes: number
  figure2Votes: number
  dialogue: {
    name: string
    text: string
    imageUrl: string
  }[]
}
