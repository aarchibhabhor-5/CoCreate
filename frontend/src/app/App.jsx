import "./App.css"
import { Editor } from "@monaco-editor/react"
import { MonacoBinding } from "y-monaco"
import { useRef, useMemo, useState, useEffect } from "react"
import * as monaco from "monaco-editor"
import * as Y from "yjs"
import { SocketIOProvider } from "y-socket.io"
import { UserPeekingAnimal } from "./UsernameAnimals"

const USER_COLORS = [
  "#8b5cf6",
  "#22c55e",
  "#f59e0b",
  "#38bdf8",
  "#f472b6",
  "#fb7185",
  "#a3e635",
]

const getUserColor = (name) => {
  if (!name) return USER_COLORS[0]

  let hash = 0
  for (let i = 0; i < name.length; i += 1) {
    hash = name.charCodeAt(i) + ((hash << 5) - hash)
  }

  return USER_COLORS[Math.abs(hash) % USER_COLORS.length]
}

const colorToRgba = (hex, alpha = 0.18) => {
  const clean = hex.replace("#", "")
  const full = clean.length === 3
    ? clean.split("").map((char) => char + char).join("")
    : clean

  const value = Number.parseInt(full, 16)
  const r = (value >> 16) & 255
  const g = (value >> 8) & 255
  const b = value & 255

  return `rgba(${r}, ${g}, ${b}, ${alpha})`
}

const safeClassName = (hex) => hex.replace(/[^a-zA-Z0-9]/g, "")

const updateLineAuthors = (ydoc, lineAuthors, changes, author, lineCount) => {
  const authors = new Map(lineAuthors.entries())
  const orderedChanges = [...changes].sort(
    (first, second) => second.range.startLineNumber - first.range.startLineNumber
  )

  orderedChanges.forEach((change) => {
    const startLine = change.range.startLineNumber
    const endLine = change.range.endLineNumber
    const insertedLineCount = (change.text.match(/\r\n|\r|\n/g) || []).length
    const lineShift = insertedLineCount - (endLine - startLine)
    const shiftedAuthors = new Map()

    authors.forEach((lineAuthor, lineKey) => {
      const lineNumber = Number(lineKey)

      if (lineNumber < startLine) {
        shiftedAuthors.set(lineKey, lineAuthor)
      } else if (lineNumber > endLine) {
        shiftedAuthors.set(String(lineNumber + lineShift), lineAuthor)
      }
    })

    for (let lineNumber = startLine; lineNumber <= startLine + insertedLineCount; lineNumber += 1) {
      shiftedAuthors.set(String(lineNumber), author)
    }

    authors.clear()
    shiftedAuthors.forEach((lineAuthor, lineKey) => authors.set(lineKey, lineAuthor))
  })

  ydoc.transact(() => {
    lineAuthors.clear()
    authors.forEach((lineAuthor, lineKey) => {
      const lineNumber = Number(lineKey)
      if (lineNumber >= 1 && lineNumber <= lineCount) {
        lineAuthors.set(lineKey, lineAuthor)
      }
    })
  })
}

function App() {
  const editorRef = useRef(null)
  const decorationsRef = useRef([])
  const isLocalChangeRef = useRef(false)
  const [theme, setTheme] = useState("light")
  const [username, setUsername] = useState(() => {
    return new URLSearchParams(window.location.search).get("username") || ""
  })
  const [users, setUsers] = useState([])
  const [hoveredUser, setHoveredUser] = useState(null)
  const [animalVisibilityMap, setAnimalVisibilityMap] = useState({})

  const ydoc = useMemo(() => new Y.Doc(), [])
  const yText = useMemo(() => ydoc.getText("monaco"), [ydoc])
  const lineAuthors = useMemo(() => ydoc.getMap("lineAuthors"), [ydoc])
  const [lineAuthorsVersion, setLineAuthorsVersion] = useState(0)

  const provider = useMemo(() => {
    return new SocketIOProvider("http://localhost:3000", "monaco", ydoc, {
      autocorrect: true,
    })
  }, [ydoc])

  const editorHighlightStyles = useMemo(() => {
    return users
      .map((user) => {
        const color = user.color || getUserColor(user.username)
        return `
          .user-highlight-${safeClassName(color)} {
            background: ${colorToRgba(color, 0.2)} !important;
            box-shadow: inset 0 0 0 1px ${color};
            border-radius: 6px;
          }
        `
      })
      .join("\n")
  }, [users])

  const handleMount = (editor) => {
    editorRef.current = editor

    editor.updateOptions({
      tabSize: 2,
      insertSpaces: true,
      detectIndentation: false,
      autoIndent: "full",
      formatOnType: true,
      formatOnPaste: true,
      smoothScrolling: true,
      automaticLayout: true,
      wordWrap: "on",
      minimap: { enabled: false },
      bracketPairColorization: { enabled: true },
      autoClosingBrackets: "languageDefined",
      autoClosingQuotes: "languageDefined",
      folding: true,
      fontFamily: "'Fira Code', 'JetBrains Mono', 'SFMono-Regular', monospace",
      fontLigatures: true,
      fontSize: 16,
      lineHeight: 1.7,
      letterSpacing: 0.1,
      lineNumbersMinChars: 3,
      renderLineHighlight: "all",
      scrollBeyondLastLine: false,
      theme: "vs-dark",
    })

    const model = editor.getModel()
    if (model) {
      model.updateOptions({
        tabSize: 2,
        indentSize: 2,
        insertSpaces: true,
      })
    }

    editor.onDidChangeCursorSelection(() => {
      const selection = editor.getSelection()

      if (!selection) return

      provider.awareness.setLocalStateField("user", {
        username,
        color: getUserColor(username),
        cursor: {
          startLineNumber: selection.startLineNumber,
          endLineNumber: selection.endLineNumber,
          startColumn: selection.startColumn,
          endColumn: selection.endColumn,
        },
      })
    })

    editor.onDidChangeModelContent((event) => {
      const currentModel = editor.getModel()
      if (!currentModel || !username || event.changes.length === 0) return

      // Only attribute lines to the local user for locally-initiated edits.
      // Remote Yjs sync events come in with isFlush=false from the binding;
      // we detect them by checking the isLocalChangeRef flag that the
      // MonacoBinding fires BEFORE and AFTER applying remote ops.
      if (!isLocalChangeRef.current) return

      updateLineAuthors(
        ydoc,
        lineAuthors,
        event.changes,
        username,
        currentModel.getLineCount()
      )
    })
    // Track whether the current content change originates locally.
    // Monaco fires onDidChangeModelContent both for local keystrokes and for
    // remote Yjs updates applied by MonacoBinding. We wrap the binding setup
    // so that isLocalChangeRef is true only during user-driven edits.
    editor.onKeyDown(() => { isLocalChangeRef.current = true })
    editor.onKeyUp(() => { isLocalChangeRef.current = false })
    // Also handle paste / drag-drop / cut — reset after a tick
    editor.onDidPaste(() => {
      isLocalChangeRef.current = true
      setTimeout(() => { isLocalChangeRef.current = false }, 50)
    })

    new MonacoBinding(
      yText,
      model,
      new Set([editorRef.current]),
      provider.awareness
    )
  }

  useEffect(() => {
    const handleLineAuthorsChange = () => setLineAuthorsVersion((version) => version + 1)
    lineAuthors.observe(handleLineAuthorsChange)

    return () => lineAuthors.unobserve(handleLineAuthorsChange)
  }, [lineAuthors])

  const handleJoin = (e) => {
    e.preventDefault()
    const enteredName = e.target.username.value.trim()
    if (!enteredName) return
    setUsername(enteredName)
    window.history.pushState({}, "", "?username=" + enteredName)
  }

  // ── Real-Time Socket.IO Synchronization for Animal Visibility ──
  useEffect(() => {
    const socket = provider?.socket
    if (!socket) return

    if (username) {
      socket.emit("register-user", { username })
    }

    const handleVisibilityState = (state) => {
      if (state && typeof state === "object") {
        setAnimalVisibilityMap((prev) => ({ ...prev, ...state }))
      }
    }

    const handleVisibilityUpdated = ({ username: targetUser, visible }) => {
      if (targetUser) {
        setAnimalVisibilityMap((prev) => ({ ...prev, [targetUser]: visible }))
      }
    }

    socket.on("animal-visibility-state", handleVisibilityState)
    socket.on("animal-visibility-updated", handleVisibilityUpdated)

    return () => {
      socket.off("animal-visibility-state", handleVisibilityState)
      socket.off("animal-visibility-updated", handleVisibilityUpdated)
    }
  }, [provider, username])

  // ── Ownership-Validated Toggle For Active User's Companion Animal ──
  const toggleMyAnimal = () => {
    if (!username) return
    const isCurrentlyVisible = Boolean(animalVisibilityMap[username])
    const nextVisible = !isCurrentlyVisible

    // Optimistic local update
    setAnimalVisibilityMap((prev) => ({ ...prev, [username]: nextVisible }))

    // Emit event to server (which validates that socket.username === username)
    if (provider?.socket) {
      provider.socket.emit("set-animal-visibility", {
        username,
        visible: nextVisible,
      })
    }

    // Update awareness state for real-time peer visibility
    provider.awareness.setLocalStateField("user", {
      username,
      color: getUserColor(username),
      animalVisible: nextVisible,
    })
  }

  useEffect(() => {
    if (!username) return

    provider.awareness.setLocalStateField("user", {
      username,
      color: getUserColor(username),
      animalVisible: false,
    })

    const updateUsers = () => {
      const states = Array.from(provider.awareness.getStates().values())

      const allUsers = states
        .filter((state) => state.user && state.user.username)
        .map((state) => ({
          ...state.user,
          color: state.user.color || getUserColor(state.user.username),
          animalVisible: state.user.animalVisible,
        }))

      const uniqueUsers = Array.from(new Map(allUsers.map((user) => [user.username, user])).values())
      setUsers(uniqueUsers)
    }

    provider.awareness.on("change", updateUsers)
    updateUsers()

    const handleBeforeUnload = () => {
      provider.awareness.setLocalStateField("user", null)
    }

    window.addEventListener("beforeunload", handleBeforeUnload)

    return () => {
      provider.awareness.off("change", updateUsers)
      provider.awareness.setLocalStateField("user", null)
      window.removeEventListener("beforeunload", handleBeforeUnload)
    }
  }, [username, provider])

  useEffect(() => {
    const editor = editorRef.current
    if (!editor) return

    if (!hoveredUser) {
      decorationsRef.current = editor.deltaDecorations(decorationsRef.current, [])
      return
    }

    const user = users.find((candidate) => candidate.username === hoveredUser)
    const color = user?.color || getUserColor(hoveredUser)
    const model = editor.getModel()

    if (!model) return

    const newDecorations = Array.from(lineAuthors.entries())
      .filter(([lineNumber, author]) => {
        return author === hoveredUser && Number(lineNumber) >= 1 && Number(lineNumber) <= model.getLineCount()
      })
      .map(([lineNumber]) => ({
        range: new monaco.Range(Number(lineNumber), 1, Number(lineNumber), 1),
        options: {
          isWholeLine: true,
          className: `user-highlight-${safeClassName(color)}`,
          overviewRuler: {
            color,
            position: monaco.editor.OverviewRulerLane.Full,
          },
        },
      }))

    decorationsRef.current = editor.deltaDecorations(
      decorationsRef.current,
      newDecorations
    )

    return () => {
      if (editorRef.current) {
        decorationsRef.current = editorRef.current.deltaDecorations(
          decorationsRef.current,
          []
        )
      }
    }
    // lineAuthorsVersion triggers re-run whenever lineAuthors map changes
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [lineAuthorsVersion, users, hoveredUser])

  const isDark = theme === "dark"

  if (!username) {
    return (
      <main className={`h-screen w-full flex gap-4 p-4 items-center justify-center ${isDark ? "dark-welcome" : "light-welcome"}`}>
        <div className={isDark ? "dark-welcome-glow" : "light-welcome-glow"} aria-hidden="true" />
        <header className={`pointer-events-none fixed left-0 right-0 top-0 z-20 flex items-center justify-between px-5 py-4 md:px-8 ${isDark ? "text-slate-100" : "text-slate-900"}`}>
          <div className="flex flex-col items-start gap-2">
            <div className="flex items-center gap-2.5">
              <span className="cocreate-emblem" aria-hidden="true">
                <svg viewBox="0 0 40 40" className="h-5 w-5" fill="currentColor">
                  <path fillRule="evenodd" d="M20 3.5 23 6l3.8-1.1 1.3 3.7 3.7 1.3-1.1 3.8 2.5 3-2.5 3 1.1 3.8-3.7 1.3-1.3 3.7-3.8-1.1-3 2.5-3-2.5-3.8 1.1-1.3-3.7-3.7-1.3 1.1-3.8-2.5-3 2.5-3-1.1-3.8 3.7-1.3 1.3-3.7L17 6l3-2.5ZM20 11.7a8.3 8.3 0 1 0 0 16.6 8.3 8.3 0 0 0 0-16.6Z" clipRule="evenodd" />
                  <circle cx="20" cy="20" r="4.1" fill="#fff" />
                </svg>
              </span>
              <span className="cocreate-wordmark">cocreate.</span>
            </div>
            <span className={`rounded-full border px-3 py-1.5 text-xs font-medium ${isDark ? "bg-zinc-900 text-amber-300 border-amber-500/30" : "bg-amber-100/60 text-amber-800 border-amber-200/80"}`}>
              v1.0 <span className="mx-1" aria-hidden="true">•</span> Real-time Collaboration
            </span>
          </div>
        </header>
        <div className={`collaboration-visual ${isDark ? "dark-illustration" : ""}`} aria-hidden="true">
          <div className="computer">
            <div className="computer-screen">
              <div className="code-lines">
                <span className="code-line code-line-keyword" />
                <span className="code-line code-line-long" />
                <span className="code-line code-line-short" />
                <span className="code-line code-line-accent" />
              </div>
            </div>
            <div className="computer-base" />
          </div>
          <div className="network-line" />
          <div className="server">
            <div className="server-light" />
            <div className="server-light" />
            <div className="server-light" />
          </div>
          <div className="network-line" />
          <div className="computer">
            <div className="computer-screen">
              <div className="code-lines code-lines-second">
                <span className="code-line code-line-accent" />
                <span className="code-line code-line-short" />
                <span className="code-line code-line-long" />
                <span className="code-line code-line-keyword" />
              </div>
            </div>
            <div className="computer-base" />
          </div>
        </div>
        <div className="people-visual" aria-hidden="true">
          <div className="collaborator collaborator-blue">
            <span className="thought-bubble">...</span>
            <div className="person-head">
              <span className="person-hair" />
              <span className="person-eyes" />
            </div>
            <div className="person-body" />
            <div className="person-laptop">
              <span />
              <span />
              <span />
            </div>
          </div>
          <div className="shared-project-line" />
          <div className="collaborator collaborator-amber">
            <span className="thought-bubble">...</span>
            <div className="person-head">
              <span className="person-hair" />
              <span className="person-eyes" />
              <span className="person-freckles" />
            </div>
            <div className="headphones">
              <span className="headphone-band" />
              <span className="headphone-cup headphone-cup-left">*</span>
              <span className="headphone-cup headphone-cup-right">*</span>
            </div>
            <div className="star-choker">* * *</div>
            <div className="person-body" />
            <div className="person-laptop">
              <span />
              <span />
              <span />
            </div>
          </div>
        </div>
        <aside className={`welcome-preview welcome-preview-left hidden lg:block ${isDark ? "welcome-preview-dark" : "welcome-preview-light"}`} aria-label="Live collaboration preview">
          <div className="mb-3 flex items-center justify-between">
            <span className="text-xs font-semibold uppercase tracking-wider">Live collab</span>
            <span className="presence-dot" aria-label="Live" />
          </div>
          <div className="preview-code-line"><span className="preview-keyword">const</span> room = <span className="preview-string">"cocreate"</span></div>
          <div className="preview-code-line"><span className="preview-keyword">await</span> sync(room)</div>
          <div className="mt-3 flex items-center gap-2 text-xs">
            <span className="presence-avatar presence-avatar-gold">A</span>
            <span className="presence-avatar presence-avatar-blue">U</span>
            <span className="text-current/70">user1 typing...</span>
          </div>
        </aside>
        <aside className={`welcome-preview welcome-preview-right hidden lg:block ${isDark ? "welcome-preview-dark" : "welcome-preview-light"}`} aria-label="Editor telemetry preview">
          <div className="mb-3 text-xs font-semibold uppercase tracking-wider">Engine status</div>
          <div className="telemetry-row"><span>Latency</span><strong>12ms</strong></div>
          <div className="telemetry-row"><span>Yjs Synced</span><strong>100%</strong></div>
          <div className="telemetry-bar"><span /></div>
          <div className="mt-3 text-xs text-current/60">Monaco Powered</div>
        </aside>
        <div className="pointer-events-auto absolute right-5 top-5 z-30 flex items-center gap-2">
          <div className="github-action">
            <a
              href="https://github.com/aarchibhabhor-5/CoCreate"
              target="_blank"
              rel="noreferrer"
              className={`github-button ${isDark ? "github-button-dark" : "github-button-light"}`}
              aria-label="Start on GitHub?"
            >
              <svg viewBox="0 0 24 24" aria-hidden="true">
                <path fill="currentColor" d="M12 .7a11.3 11.3 0 0 0-3.57 22.02c.57.1.78-.25.78-.55v-2.16c-3.17.69-3.84-1.34-3.84-1.34-.52-1.32-1.27-1.67-1.27-1.67-1.04-.71.08-.7.08-.7 1.15.08 1.76 1.18 1.76 1.18 1.02 1.75 2.68 1.25 3.33.96.1-.74.4-1.25.72-1.54-2.53-.29-5.2-1.27-5.2-5.64 0-1.25.45-2.27 1.18-3.07-.12-.29-.51-1.45.11-3.02 0 0 .96-.31 3.13 1.17a10.9 10.9 0 0 1 5.7 0c2.17-1.48 3.13-1.17 3.13-1.17.62 1.57.23 2.73.11 3.02.73.8 1.18 1.82 1.18 3.07 0 4.38-2.68 5.35-5.22 5.63.41.36.77 1.07.77 2.16v3.2c0 .3.21.66.79.55A11.3 11.3 0 0 0 12 .7Z" />
              </svg>
            </a>
            <span className="github-tooltip">Start on GitHub?</span>
          </div>
          <div className="linkedin-action">
            <a
              href="https://www.linkedin.com/in/aarchi-bhabhor-4998aa33a"
              target="_blank"
              rel="noreferrer"
              className={`linkedin-button ${isDark ? "linkedin-button-dark" : "linkedin-button-light"}`}
              aria-label="Visit developer's profile?"
            >
              <svg viewBox="0 0 24 24" aria-hidden="true">
                <path fill="currentColor" d="M5.2 3.5A2.2 2.2 0 1 1 .8 3.5a2.2 2.2 0 0 1 4.4 0ZM1.1 8h4.2v12.7H1.1V8Zm6.8 0h4v1.7h.1c.6-1.1 2.1-2.2 4.3-2.2 4.6 0 5.5 3 5.5 6.9v6.3h-4.2v-5.6c0-1.3 0-3.8-2.3-3.8s-2.7 1.8-2.7 3.7v5.7H7.9V8Z" />
              </svg>
            </a>
            <span className="linkedin-tooltip">Visit developer&apos;s profile?</span>
          </div>
          <button
            type="button"
            onClick={() => setTheme(isDark ? "light" : "dark")}
            className={`rounded-full px-3 py-1.5 text-sm font-medium shadow-sm transition-all ${isDark ? "bg-zinc-800 text-zinc-100 hover:bg-zinc-700" : "bg-white text-slate-900 hover:bg-slate-100 border border-slate-200"}`}
          >
            {isDark ? "Light mode" : "Dark mode"}
          </button>
        </div>

        <form
          onSubmit={handleJoin}
          className={`translate-y-24 flex flex-col gap-5 items-center justify-center rounded-3xl p-8 ${isDark ? "bg-zinc-900/80 backdrop-blur-md border border-zinc-800 shadow-2xl" : "bg-white/90 backdrop-blur-md border border-amber-200/60 shadow-xl shadow-amber-900/5"}`}>
          <h1 className={`inter-heading text-5xl font-bold ${isDark ? "text-gray-200" : "text-stone-900"}`}>Code together, in real time.</h1>
          <div className="username-field">
            <svg
              className={`pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 ${isDark ? "text-slate-500" : "text-slate-400"}`}
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <circle cx="12" cy="8" r="4" />
              <path d="M4 21a8 8 0 0 1 16 0" />
            </svg>
            <input
              type="text"
              placeholder="Enter your username"
              className={`w-64 h-10 rounded-xl border py-2 pl-9 pr-2 focus:outline-none focus:ring-2 focus:border-transparent ${isDark ? "bg-zinc-900/80 border-zinc-800 text-zinc-100 placeholder:text-zinc-500 focus:ring-2 focus:ring-amber-400" : "bg-stone-50 border-stone-200 text-stone-900 placeholder:text-stone-400 focus:ring-2 focus:ring-amber-500 focus:bg-white"}`}
              name="username"
              autoComplete="off"
            />
          </div>
          <button
            className={`w-64 h-10 p-2 rounded-xl font-semibold transition-all focus:outline-none ${isDark ? "bg-amber-400 text-zinc-950 hover:bg-amber-300 focus:ring-2 focus:ring-amber-400" : "bg-amber-500 hover:bg-amber-600 text-white focus:ring-2 focus:ring-amber-500"}`}
          >
            Join
          </button>
          <div className={`flex items-center justify-center gap-2 text-xs ${isDark ? "rounded-full border border-amber-500/30 bg-zinc-900 px-3 py-1 text-amber-300" : "bg-amber-100/60 text-amber-800 border border-amber-200/80 px-3 py-1 rounded-full text-xs font-medium"}`}>
            <span>⚡ Zero Latency</span>
            <span aria-hidden="true">•</span>
            <span>🔒 P2P Synced</span>
            <span aria-hidden="true">•</span>
            <span>🎨 Monaco Powered</span>
          </div>
        </form>
      </main>
    )
  }

  return (
    <main
      className={`h-screen w-full flex flex-col p-4 ${isDark ? "dark-welcome" : "light-welcome"}`}>
      {isDark && <div className="dark-welcome-glow" aria-hidden="true" />}
      <style>{editorHighlightStyles}</style>

      {/* ── Studio Top Header (Controls & Dark Mode, Separated from Workspace) ── */}
      <header
        className={`studio-top-header ${isDark ? "border-zinc-800 bg-zinc-900/80 text-zinc-100" : "border-amber-200/70 bg-white/80 text-stone-900 shadow-sm shadow-amber-900/5"}`}
      >
        <div className="flex items-center gap-3">
          <div className={`flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider ${isDark ? "bg-amber-400/15 text-amber-300 border border-amber-500/30" : "bg-amber-100/90 text-amber-900 border border-amber-200"}`}>
            <span>⚡ CoCreate Studio</span>
          </div>
          <span className="hidden sm:inline-block text-xs font-medium opacity-60">
            Room: <span className="font-semibold">monaco</span>
          </span>
        </div>

        <div className="flex items-center gap-2.5">
          {/* User-Specific Animal Control: Only controls the current user's animal */}
          <button
            type="button"
            onClick={toggleMyAnimal}
            className={`animal-visibility-btn ${Boolean(animalVisibilityMap[username])
                ? isDark
                  ? "bg-emerald-500/15 text-emerald-300 border-emerald-500/30 hover:bg-emerald-500/25"
                  : "bg-emerald-50 text-emerald-800 border-emerald-300 hover:bg-emerald-100"
                : isDark
                  ? "bg-zinc-800/80 text-zinc-400 border-zinc-700 hover:bg-zinc-700 text-zinc-300"
                  : "bg-stone-100 text-stone-600 border-stone-300 hover:bg-stone-200"
              }`}
            title={
              Boolean(animalVisibilityMap[username])
                ? "Click to hide your companion animal"
                : "Click to show your companion animal"
            }
          >
            <span>{Boolean(animalVisibilityMap[username]) ? "🐾" : "🚫"}</span>
            <span>{Boolean(animalVisibilityMap[username]) ? "Hide My Animal" : "Show My Animal"}</span>
          </button>

          {/* Dark Mode toggle */}
          <button
            type="button"
            onClick={() => setTheme(isDark ? "light" : "dark")}
            className={`animal-visibility-btn ${isDark ? "bg-zinc-800 text-amber-300 border-amber-500/30 hover:bg-zinc-700" : "bg-white text-amber-800 hover:bg-amber-50 border-amber-200/80"}`}
          >
            <span>{isDark ? "☀️" : "🌙"}</span>
            <span>{isDark ? "Light mode" : "Dark mode"}</span>
          </button>
        </div>
      </header>

      {/* ── Main Workspace Layout (Editor Lowered & Protected From Overlap) ── */}
      <div className="flex-1 flex gap-4 min-h-0">
        <aside className={`h-full w-1/4 rounded-2xl border p-4 shadow-sm backdrop-blur-md flex flex-col justify-between overflow-hidden ${isDark ? "border-zinc-800 bg-zinc-900/80" : "border-amber-200/60 bg-white/90 shadow-amber-900/5"}`}>
          <div className="flex-1 overflow-y-auto pr-1">
            <div className="flex items-center justify-between border-b px-2 pb-3">
              <h2 className={`text-2xl font-bold ${isDark ? "text-zinc-100" : "text-stone-900"}`}>Users</h2>
              <span className={`text-xs px-2.5 py-0.5 rounded-full font-semibold ${isDark ? "bg-amber-400/15 text-amber-300 border border-amber-500/30" : "bg-amber-100/80 text-amber-800 border border-amber-200"}`}>
                {users.length} online
              </span>
            </div>
            <ul className="mt-6 space-y-5">
              {users.map((user, index) => {
                const color = user.color || getUserColor(user.username)
                const isHovered = hoveredUser === user.username
                const isAnimalVisible = Boolean(animalVisibilityMap[user.username] ?? user.animalVisible)
                const authoredLineCount = Array.from(lineAuthors.entries()).filter(
                  ([, author]) => author === user.username
                ).length

                return (
                  <li
                    key={index}
                    onMouseEnter={() => setHoveredUser(user.username)}
                    onMouseLeave={() => setHoveredUser(null)}
                    className={`user-list-item relative overflow-hidden cursor-pointer rounded-xl border px-3.5 py-2.5 transition-all duration-300 min-h-[58px] flex flex-col justify-center ${isDark ? "text-zinc-200" : "text-slate-800"}`}
                    style={{
                      backgroundColor: isHovered ? colorToRgba(color, 0.28) : isDark ? colorToRgba(color, 0.1) : "rgba(255, 251, 235, 0.72)",
                      borderColor: isHovered ? color : isDark ? "rgba(63, 63, 70, 0.8)" : "rgba(253, 230, 138, 0.8)",
                      boxShadow: isHovered ? `0 0 0 1px ${color}, 0 8px 24px ${colorToRgba(color, 0.18)}` : "none",
                      transform: isHovered ? "translateY(-2px)" : "none",
                    }}
                  >
                    <div className="flex items-center justify-between gap-2 relative z-10 w-full">
                      <div className="flex items-center gap-2 min-w-0 flex-1">
                        {/* Color swatch — unique per user */}
                        <span
                          className="user-color-dot"
                          style={{
                            background: color,
                            boxShadow: isHovered ? `0 0 6px 2px ${colorToRgba(color, 0.55)}` : "none",
                          }}
                          aria-hidden="true"
                        />
                        <span
                          className="font-semibold truncate text-sm"
                          style={{ color: isHovered ? color : isDark ? color : "#334155" }}
                        >
                          {user.username}
                          {user.username === username && (
                            <span
                              className="ml-1.5 text-xs opacity-60 font-normal"
                              style={{ color: isDark ? "#71717a" : "#a8a29e" }}
                            >
                              (you)
                            </span>
                          )}
                        </span>
                        {/* Line count badge */}
                        {authoredLineCount > 0 && (
                          <span
                            className="user-line-badge"
                            style={{
                              background: colorToRgba(color, 0.25),
                              color,
                              border: `1px solid ${colorToRgba(color, 0.45)}`,
                            }}
                          >
                            {authoredLineCount}L
                          </span>
                        )}
                      </div>

                      {/* Unique animated animal completely contained inside the box on the right */}
                      <div className="user-inside-animal-box flex-shrink-0 relative overflow-hidden flex items-center justify-end">
                        <UserPeekingAnimal
                          index={index}
                          name={user.username}
                          isHovered={isHovered}
                          isVisible={isAnimalVisible}
                        />
                      </div>
                    </div>
                  </li>
                )
              })}
            </ul>
          </div>
        </aside>
        <section className={`w-3/4 rounded-2xl border backdrop-blur-md ${isDark ? "border-zinc-800 bg-zinc-900/80" : "border-amber-200/60 bg-white/90 shadow-xl shadow-amber-900/5"}`}>
          <Editor
            height="100%"
            defaultLanguage="javascript"
            language="javascript"
            defaultValue={'// Write your code here\n\nif (true) {\n  console.log("Hello");\n}'}
            theme={isDark ? "vs-dark" : "vs"}
            onMount={handleMount}
            options={{
              tabSize: 2,
              insertSpaces: true,
              detectIndentation: false,
              autoIndent: "full",
              formatOnType: true,
              formatOnPaste: true,
              wordWrap: "on",
              minimap: { enabled: false },
              autoClosingBrackets: "languageDefined",
              autoClosingQuotes: "languageDefined",
              bracketPairColorization: { enabled: true },
              fontFamily: "'Fira Code', 'JetBrains Mono', 'SFMono-Regular', monospace",
              fontLigatures: true,
              fontSize: 16,
              lineHeight: 1.7,
              letterSpacing: 0.1,
              lineNumbersMinChars: 3,
              renderLineHighlight: "all",
              scrollBeyondLastLine: false,
              roundedSelection: true,
              automaticLayout: true,
              theme: isDark ? "vs-dark" : "vs",
              colors: {
                "editor.background": isDark ? "#18181b" : "#fffdf8",
                "editorLineNumber.foreground": isDark ? "#71717a" : "#a8a29e",
                "editorLineNumber.activeForeground": isDark ? "#d4d4d8" : "#57534e",
                "editor.selectionBackground": isDark ? "#3f3f46" : "#fde68a",
                "editor.lineHighlightBackground": isDark ? "#27272a" : "#fffbeb",
                "editorCursor.foreground": isDark ? "#fbbf24" : "#d97706",
                "editorWhitespace.foreground": isDark ? "#3f3f46" : "#e7e5e4",
              },
              extraEditorClassName: "vscode-like-editor",
            }}
          />
        </section>
      </div>
    </main>

  )

}

export default App
