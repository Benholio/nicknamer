"use server"

import { generateText } from "ai"
import { openai } from "@ai-sdk/openai"

export async function generateTeamNames(playerList: string): Promise<string[]> {
  try {
    const prompt = `
      Generate 8 creative, funny, and clever fantasy baseball team names based on this list of players:
      ${playerList}
      
      The names should be:
      - Clever wordplay or puns based on player names
      - Baseball-themed
      - Family-friendly
      - Short and catchy (1-5 words)
      - Unique from each other
      
      Return only the list of names, one per line, with no numbering or additional text.
    `

    const { text } = await generateText({
      model: openai("gpt-4o-mini"),
      prompt,
      temperature: 0.8,
      maxTokens: 300,
    })

    // Split the response into an array of names and clean them up
    const names = text
      .split("\n")
      .map((name) => name.trim())
      .filter((name) => name.length > 0)

    return names
  } catch (error) {
    console.error("Error generating team names:", error)
    throw new Error("Failed to generate team names")
  }
} 