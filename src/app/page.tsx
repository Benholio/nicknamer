import { TeamNameGenerator } from "@/components/team-name-generator"

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-blue-50 to-white p-4 md:p-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl md:text-5xl font-bold text-blue-800 mb-2">Fantasy Baseball Name Generator</h1>
          <p className="text-gray-600 text-lg">Paste in your roster and get AI-generated team name suggestions</p>
        </div>
        <TeamNameGenerator />
      </div>
    </main>
  )
}

