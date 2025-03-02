export interface DebateScript {
  debate: DebateRound[]
}

export interface DebateRound {
  name: string
  message: string
  description: string
}

export interface GeneratedImageURL {
  cost: number
  url: string
}

export interface GeneratedImageB64 {
  cost: number
  b64: string
}
