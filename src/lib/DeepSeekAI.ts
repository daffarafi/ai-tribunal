'use server'
import OpenAI from 'openai'
import { DebateScript } from './interface'

const openai = new OpenAI({
  apiKey: process.env.DEEPSEEK_API,
  baseURL: 'https://api.deepseek.com',
})

export default async function create_debate_script(
  topic: string,
  figure1: string,
  figure2: string
) {
  const system_prompt = `The user will provide some exam text. Please parse the 'question' and 'answer' and output them in JSON format. 
    EXAMPLE INPUT: 
Create a 3-round debate between ${figure1} and ${figure2} on the topic of ${topic}. Each round should include one statement from each figure, with a natural back-and-forth flow of arguments.

EXAMPLE JSON OUTPUT:
{
  "debate": [
    {
      "name": "${figure1}",
      "message": "AI can enhance productivity by automating repetitive tasks."
    },
    {
      "name": "${figure2}",
      "message": "But over-reliance on AI could reduce human creativity and critical thinking."
    },
    {
      "name": "${figure1}",
      "message": "However, AI can free humans to focus on more creative and strategic work."
    },
    {
      "name": "${figure2}",
      "message": "We must ensure that AI is developed ethically to prevent misuse."
    },
    {
      "name": "${figure1}",
      "message": "Ethical guidelines are important, but excessive regulation could slow innovation."
    },
    {
      "name": "${figure2}",
      "message": "Finding the right balance is key to ensuring AI benefits humanity while minimizing risks."
    }
  ]
}
`
  const user_prompt = `Create a 3-round debate between ${figure1} and ${figure2} on the topic of ${topic}. Each round should include one statement from each figure, with a natural back-and-forth flow of arguments.`

  const response = await openai.chat.completions.create({
    messages: [
      { role: 'system', content: system_prompt },
      { role: 'user', content: user_prompt },
    ],
    model: 'deepseek-chat',
  })

  const content = response.choices[0].message.content
  if (!content) {
    throw new Error('Empty response content from DeepSeek API')
  }
  try {
    return JSON.parse(content) as DebateScript
  } catch (err: unknown) {
    throw new Error(
      'Failed to parse debate JSON: ' +
        (err instanceof Error ? err.message : 'unknown error')
    )
  }
}
