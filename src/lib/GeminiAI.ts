/* eslint-disable */
'use server'

import {
  GoogleGenerativeAI,
  SchemaType,
  ArraySchema,
} from '@google/generative-ai'

export default async function generate_script_gemini(
  topic: string,
  figure1: string,
  figure2: string
) {
  const genAI = new GoogleGenerativeAI(process.env.GEMINI_API ?? '')

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
