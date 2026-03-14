import { useState } from "react"
import { marked } from "marked"
import DOMpurify from "dompurify"

function App() {
  const [markdown, setMarkdown] = useState<string>("# Hello World\n\nType some **markdown** here")

  const getParsedHTML = () => {
    const rawHTML = marked.parse(markdown) as string
    return { __html: DOMpurify.sanitize(rawHTML)}
  }

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 p-8">
      <header className="max-w-6xl mx-auto mb-8">
        <h1 className="text-3xl font-bold text-indigo-300">Markdown Previewer</h1>
        <p className="text-slate-300">Type on the left, see the magic on the right</p>
      </header>

      <main className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6 h-[70vh]">

        {/* Input side */}
        <div className="flex flex-col">
          <label className="text-xs uppercase tracking-widest text-slate-400 mb-2 font-bold">Editor</label>
          <textarea 
            className="w-full h-full p-4 bg-slate-800 border border-slate-700 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none resize-none font-mono text-sm"
            value={markdown}
            onChange={(e) => setMarkdown(e.target.value)}
          />
        </div>

        {/* Preview side */}
        <div className="flex flex-col">
          <label className="text-xs uppercase tracking-widest text-slate-400 mb-2 font-bold">Preview</label>
          <div
            className="prose prose-invert prose-indigo w-full h-full p-4 bg-slate-800 border border-slate-700 rounded-xl overflow-y-auto"
            dangerouslySetInnerHTML={getParsedHTML()}
          >

          </div>
        </div>
      </main>
    </div>
  )
}

export default App
