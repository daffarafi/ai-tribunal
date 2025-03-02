'use server'
import OpenAI from 'openai'
import type { DebateScript } from './interface'

const openai = new OpenAI({
  apiKey: process.env.DEEPSEEK_API,
  baseURL: 'https://api.deepseek.com',
})

export default async function create_debate_script(
  topic: string,
  figure1: string,
  figure2: string
) {
  const system_prompt = `Please create a debate script according to the users prompt. 
EXAMPLE INPUT: 
Create a 3-round debate between ${figure1} and ${figure2} on the topic of ${topic}. Each round should include one statement from each figure, with a natural back-and-forth flow of arguments.

EXAMPLE JSON OUTPUT:
{
  "debate": [
    {
      "name": "${figure1}",
      "message": "AI can enhance productivity by automating repetitive tasks.",
      "description": "Standing confidently with one hand gesturing forward, symbolizing progress and innovation."
    },
    {
      "name": "${figure2}",
      "message": "But over-reliance on AI could reduce human creativity and critical thinking.",
      "description": "Arms crossed with a thoughtful expression, conveying caution and skepticism."
    },
    {
      "name": "${figure1}",
      "message": "However, AI can free humans to focus on more creative and strategic work.",
      "description": "Smiling slightly, with one hand raised as if presenting a new idea."
    },
    {
      "name": "${figure2}",
      "message": "We must ensure that AI is developed ethically to prevent misuse.",
      "description": "Pointing forward with a serious look, emphasizing the importance of responsibility."
    },
    {
      "name": "${figure1}",
      "message": "Ethical guidelines are important, but excessive regulation could slow innovation.",
      "description": "Hands open with palms facing upward, suggesting a balanced and open-minded stance."
    },
    {
      "name": "${figure2}",
      "message": "Finding the right balance is key to ensuring AI benefits humanity while minimizing risks.",
      "description": "Nodding with a calm smile, symbolizing agreement and a desire for harmony."
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
    response_format: {
      type: 'json_object',
    },
  })
  const content = response.choices[0].message.content
  if (!content) {
    console.log(content)
    throw new Error('Empty response content from DeepSeek API')
  }
  try {
    console.log(JSON.parse(content) as DebateScript)
    return JSON.parse(content) as DebateScript
  } catch (err: unknown) {
    throw new Error(
      'Failed to parse debate JSON: ' +
        (err instanceof Error ? err.message : 'unknown error')
    )
  }
}

export async function generate_character_suggestions(): Promise<string[]> {
  const system_prompt = `You are a helpful assistant. Generate a list of 10 well-known public figures suitable for a debate in JSON format. The output should be a valid JSON object with a "names" key containing an array of well-known names.`
  const user_prompt = `Generate exactly 10 well-known public figures suitable for a debate and return them in a JSON object with a "names" key containing an array of their names.`

  const response = await openai.chat.completions.create({
    messages: [
      { role: 'system', content: system_prompt },
      { role: 'user', content: user_prompt },
    ],
    model: 'deepseek-chat',
    response_format: {
      type: 'json_object',
    },
    seed: Math.floor(Math.random() * 1000000),
  })

  const content = response.choices[0]?.message?.content
  if (!content) {
    throw new Error('Empty response content from DeepSeek API')
  }

  try {
    const parsedContent = JSON.parse(content)
    if (
      !parsedContent.names ||
      !Array.isArray(parsedContent.names) ||
      !parsedContent.names.every((item: any) => typeof item === 'string')
    ) {
      throw new Error(
        'Invalid JSON format: Expected an object with a "names" key containing an array of strings'
      )
    }
    if (parsedContent.names.length !== 10) {
      throw new Error('Expected exactly 10 character suggestions')
    }
    return parsedContent.names
  } catch (err) {
    throw new Error(
      'Failed to parse character suggestions JSON: ' +
        (err instanceof Error ? err.message : 'unknown error')
    )
  }
}

export async function get_typing_suggestions(input: string): Promise<string[]> {
  if (!input.trim()) return []

  const system_prompt = `You are a helpful assistant. Provide autocomplete suggestions for well-known public figures whose names start with the given input. The output should be a valid JSON object with a "suggestions" key containing an array of matching names.`
  const user_prompt = `Provide a list of up to 10 well-known public figures whose names start with "${input}". Return the results in a JSON object with a "suggestions" key containing an array of matching names.`

  const response = await openai.chat.completions.create({
    messages: [
      { role: 'system', content: system_prompt },
      { role: 'user', content: user_prompt },
    ],
    model: 'deepseek-chat',
    response_format: {
      type: 'json_object',
    },
  })

  const content = response.choices[0]?.message?.content
  if (!content) {
    throw new Error('Empty response content from DeepSeek API')
  }

  try {
    const parsedContent = JSON.parse(content)
    if (
      !parsedContent.suggestions ||
      !Array.isArray(parsedContent.suggestions) ||
      !parsedContent.suggestions.every((item: any) => typeof item === 'string')
    ) {
      throw new Error(
        'Invalid JSON format: Expected an object with a "suggestions" key containing an array of strings'
      )
    }
    return parsedContent.suggestions
  } catch (err) {
    throw new Error(
      'Failed to parse typing suggestions JSON: ' +
        (err instanceof Error ? err.message : 'unknown error')
    )
  }
}

export async function get_two_random_public_figures(): Promise<string[]> {
  const system_prompt = `You are a helpful assistant. Provide autocomplete suggestions for well-known public figures whose names start with the given input. The output should be a valid JSON object with a "suggestions" key containing an array of matching names.`
  const user_prompt = `Provide a list of up to 2 well-known public figures. Return the results in a JSON object with a "suggestions" key containing an array of matching names.`

  const response = await openai.chat.completions.create({
    messages: [
      { role: 'system', content: system_prompt },
      { role: 'user', content: user_prompt },
    ],
    model: 'deepseek-chat',
    response_format: {
      type: 'json_object',
    },
    seed: Math.floor(Math.random() * 1000000),
  })

  const content = response.choices[0]?.message?.content
  if (!content) {
    throw new Error('Empty response content from DeepSeek API')
  }

  try {
    const parsedContent = JSON.parse(content)
    if (
      !parsedContent.suggestions ||
      !Array.isArray(parsedContent.suggestions) ||
      !parsedContent.suggestions.every((item: any) => typeof item === 'string')
    ) {
      throw new Error(
        'Invalid JSON format: Expected an object with a "suggestions" key containing an array of strings'
      )
    }
    return parsedContent.suggestions
  } catch (err) {
    throw new Error(
      'Failed to parse typing suggestions JSON: ' +
        (err instanceof Error ? err.message : 'unknown error')
    )
  }
}
