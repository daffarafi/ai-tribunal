/* eslint-disable */
'use server'

import {
  GoogleGenerativeAI,
  SchemaType,
  ArraySchema,
  Schema,
} from '@google/generative-ai'

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API ?? '')
export default async function generate_script_gemini(
  topic: string,
  figure1: string,
  figure2: string
) {
  const schema: ArraySchema = {
    description: 'List of debate rounds',
    type: SchemaType.ARRAY, // <-- Pastikan ini adalah SchemaType.ARRAY
    items: {
      type: SchemaType.OBJECT,
      properties: {
        name: {
          type: SchemaType.STRING,
          description: 'Name of the figure speaking in this round',
          nullable: false,
        },
        message: {
          type: SchemaType.STRING,
          description: 'Statement made by the figure during this round',
          nullable: false,
        },
        description: {
          type: SchemaType.STRING,
          description:
            "Visual description of the figure's posture and expression",
          nullable: false,
        },
      },
      required: ['name', 'message', 'description'],
    },
  }

  const model = genAI.getGenerativeModel({
    model: 'gemini-1.5-flash',
    generationConfig: {
      responseMimeType: 'application/json',
      responseSchema: schema,
    },
  })

  const user_prompt = `Create a 6-round debate between ${figure1} and ${figure2} on the topic of ${topic}. Each round should include one statement from each figure, with a natural back-and-forth flow of arguments.`

  const result = await model.generateContent(user_prompt)
  const res_json = JSON.parse(result.response.text())

  console.log({ debate: res_json })
  return { debate: res_json }
}

async function fetchGeminiResponse(
  user_prompt: string,
  schemaType: SchemaType.ARRAY
) {
  const schema = {
    description: 'List of public figures',
    type: schemaType,
    items: {
      type: SchemaType.STRING,
    },
  }

  const model = genAI.getGenerativeModel({
    model: 'gemini-1.5-flash',
    generationConfig: {
      responseMimeType: 'application/json',
      responseSchema: schema as Schema,
    },
  })

  const response = await model.generateContent(user_prompt)
  const parsedContent = JSON.parse(response.response.text())

  if (!parsedContent || !Array.isArray(parsedContent)) {
    throw new Error('Invalid response format from Gemini API')
  }
  return parsedContent
}

export async function generate_character_suggestions() {
  const user_prompt =
    'Generate exactly 10 well-known public figures suitable for a debate and return them as an array of names.'
  return await fetchGeminiResponse(user_prompt, SchemaType.ARRAY)
}

export async function get_typing_suggestions(input: string) {
  if (!input.trim()) return []

  const user_prompt = `Provide up to 10 well-known public figures whose names start with "${input}". Return them as an array.`
  return await fetchGeminiResponse(user_prompt, SchemaType.ARRAY)
}

export async function get_two_random_public_figures() {
  const user_prompt =
    'Provide exactly 2 well-known public figures. Return them as an array.'
  return await fetchGeminiResponse(user_prompt, SchemaType.ARRAY)
}

export async function generate_topic_suggestions(
  figure1: string,
  figure2: string
) {
  const user_prompt = `Generate exactly 5 debate topics that would be suitable for a debate between ${figure1} and ${figure2}. Return them as an array of string.`
  return await fetchGeminiResponse(user_prompt, SchemaType.ARRAY)
}
