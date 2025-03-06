"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent } from "@/components/ui/card"
import { Loader2, Copy, CheckCircle2 } from "lucide-react"
import { generateTeamNames } from "@/app/actions"

export function TeamNameGenerator() {
  const [playerList, setPlayerList] = useState("")
  const [teamNames, setTeamNames] = useState<string[]>([])
  const [isGenerating, setIsGenerating] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null)

  const handleGenerate = async () => {
    if (!playerList.trim()) {
      setError("Please enter at least one player name")
      return
    }

    setIsGenerating(true)
    setError(null)

    try {
      const names = await generateTeamNames(playerList)
      setTeamNames(names)
    } catch (err) {
      setError("Failed to generate team names. Please try again.")
      console.error(err)
    } finally {
      setIsGenerating(false)
    }
  }

  const copyToClipboard = (text: string, index: number) => {
    navigator.clipboard.writeText(text)
    setCopiedIndex(index)
    setTimeout(() => setCopiedIndex(null), 2000)
  }

  return (
    <div className="space-y-6">
      <Card className="border-blue-200 shadow-md">
        <CardContent className="pt-6">
          <div className="space-y-4">
            <div>
              <label htmlFor="players" className="block text-sm font-medium text-gray-700 mb-1">
                Your Team Roster
              </label>
              <Textarea
                id="players"
                placeholder="Paste your player list here (e.g., Mike Trout, Aaron Judge, Shohei Ohtani...)"
                className="min-h-[150px] border-blue-200"
                value={playerList}
                onChange={(e) => setPlayerList(e.target.value)}
              />
              <p className="text-xs text-gray-500 mt-1">
                Tip: The more players you add, the more personalized your team names will be!
              </p>
            </div>

            {error && <p className="text-red-500 text-sm">{error}</p>}

            <Button onClick={handleGenerate} className="w-full bg-blue-700 hover:bg-blue-800" disabled={isGenerating}>
              {isGenerating ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Generating Names...
                </>
              ) : (
                "Generate Team Names"
              )}
            </Button>
          </div>
        </CardContent>
      </Card>

      {teamNames.length > 0 && (
        <div className="space-y-4">
          <h2 className="text-xl font-bold text-blue-800">Your Team Name Suggestions</h2>
          <div className="grid gap-3">
            {teamNames.map((name, index) => (
              <Card key={index} className="border-blue-100 hover:border-blue-300 transition-colors">
                <CardContent className="p-4 flex justify-between items-center">
                  <p className="font-medium text-gray-800">{name}</p>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => copyToClipboard(name, index)}
                    className="text-gray-500 hover:text-blue-700"
                  >
                    {copiedIndex === index ? (
                      <CheckCircle2 className="h-4 w-4 text-green-500" />
                    ) : (
                      <Copy className="h-4 w-4" />
                    )}
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

