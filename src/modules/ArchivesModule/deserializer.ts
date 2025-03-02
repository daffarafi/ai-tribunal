export const debateDeseralizer = (raw: any[]) => {
  return {
    id: raw[0],
    topic: raw[1],
    creator: raw[2],
    createdAt: new Date(raw[3]),
    figure1Name: raw[4],
    figure1ImageUrl: raw[5],
    figure2Name: raw[6],
    figure2ImageUrl: raw[7],
    figure1Votes: raw[8],
    figure2Votes: raw[9],
  }
}
