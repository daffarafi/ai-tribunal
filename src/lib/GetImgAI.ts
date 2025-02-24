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
      prompt: `an ace attorney style debate between ${figure1} and ${figure2}`,
      aspect_ratio: '3:2',
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
      prompt: `an ace attorney style debate between ${figure1} and ${figure2}`,
      aspect_ratio: '3:2',
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
