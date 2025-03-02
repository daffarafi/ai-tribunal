'use server'

export async function get_img_ai(figure1: string, figure2: string) {
  const url = 'https://api.getimg.ai/v1/essential-v2/text-to-image'
  const options = {
    method: 'POST',
    headers: {
      accept: 'application/json',
      'content-type': 'application/json',
      Authorization: `Bearer ${process.env.GETIMG_API}`,
    },
    body: JSON.stringify({
      style: 'anime',
      prompt: `an ace attorney style debate between ${figure1} and ${figure2}. The debate takes place in a courtroom with the figures on opposing sides facing eachother.`,
      aspect_ratio: '7:4',
      output_format: 'jpeg',
      response_format: 'url',
    }),
  }
  try {
    const res = await fetch(url, options)
    console.log(res)
    const content = (await res.json()) as { cost: number; url: string }
    console.log(content)
    return content
  } catch (e: unknown) {
    console.error(e)
    return e instanceof Error ? e.message : 'Unknown error'
  }
}

export async function get_img_ai_flux(figure1: string, figure2: string) {
  // buat coba-coba prompting
  const tryPropmt =
    'A digital illustration of a character inspired by Albert Einstein in Ace Attorney style, with wild, unkempt white hair, a bushy mustache, and intense eyes. He wears a formal gray suit with a red tie, striking a dramatic courtroom pose with one arm extended, pointing forward with determination. His expression shows passion and conviction. The background is a classic courtroom with wooden panels and a judge’s bench, slightly blurred to focus on the character. Warm lighting from above casts contrasting shadows that emphasize his facial features and dynamic stance. Created using: anime-style character design, bold linework, vibrant color palette, dynamic camera angles, expressive facial features, motion lines for emphasis, semi-realistic shading, HD quality, natural look '

  // prompt yg udah final
  const fixedPrompt = `A debate in Ace Attorney style: ${figure1} and ${figure2} face off in a heated courtroom debate with dramatic poses, exaggerated gestures, and intense expressions. The image capturing their fierce back-and-forth confrontation.`

  const url = 'https://api.getimg.ai/v1/flux-schnell/text-to-image'
  const options = {
    method: 'POST',
    headers: {
      accept: 'application/json',
      'content-type': 'application/json',
      Authorization: `Bearer ${process.env.GETIMG_API}`,
    },

    // kalau seed sama dan prompt sama, hasilnya persis 100%
    // berguna buat konsistensi antar gambar
    // kalo mau random seed = 0
    body: JSON.stringify({
      prompt: tryPropmt,
      steps: 4,
      seed: 9283,
      width: 1280,
      height: 256,
      response_format: 'url',
    }),
  }
  try {
    const res = await fetch(url, options)
    console.log(res)
    const content = (await res.json()) as { cost: number; url: string }
    console.log(content)
    return content
  } catch (e: unknown) {
    console.error(e)
    return e instanceof Error ? e.message : 'Unknown error'
  }
}
