export const debateDeseralizer = (raw: any[]) => {
  return {
    id: raw[0],
    topic: raw[1],
    creator: raw[2],
    createdAt: new Date(raw[3] || new Date()),
    figure1Name: raw[4],
    figure1ImageUrl: raw[5],
    figure2Name: raw[6],
    figure2ImageUrl: raw[7],
    dialogue: raw[8].map((dialogue: any) => ({
      name: dialogue[0],
      text: dialogue[1],
      imageUrl: dialogue[2],
    })),
    figure1Votes: raw[9],
    figure2Votes: raw[10],
  }
}
