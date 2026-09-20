import "./App.css"
import {Editor} from "@monaco-editor/react"
import {MonacoBinding} from "y-monaco"
import { useRef, useMemo, useState , useEffect} from "react"
import * as Y from "yjs"
import {SocketIOProvider} from "y-socket.io"


function App() {
  const editorRef = useRef(null)
  const [username, setUsername] = useState(()=> {
    return new URLSearchParams(window.location.search).get("username") || ""
  })
  const [users, setUsers] = useState([])

  const ydoc = useMemo(() => new Y.Doc(), [])
  const yText = useMemo(() => ydoc.getText("monaco"), [ydoc])


  const handleMount = (editor) => {
    editorRef.current = editor

    
      new MonacoBinding(
        yText,
        editorRef.current.getModel(), 
        new Set([editorRef.current]),
      
      )

    const provider = new SocketIOProvider("http://localhost:3000", "monaco", ydoc,{
      autocorrect: true,
    })
    const monacoBinding = new MonacoBinding(
      yText,
      editorRef.current.getModel(),
      new Set([editorRef.current]),
      provider.awareness
    )
  }


  const handleJoin = (e) => {
    e.preventDefault()
    setUsername(e.target.username.value)
    window.history.pushState({}, "", "?username=" + e.target.username.value)
  }

  useEffect(() => {

    console.log(username)

    if(username){
      const provider = new SocketIOProvider("http://localhost:3000", "monaco", ydoc, {
        autocorrect: true,
      })

      provider.awareness.setLocalStateField("user", { username})

      const states = Array.from(provider.awareness.getStates().values())
      
      console.log(states)

      
      setUsers(states.filter(state => state.user && state.user.username).map((state) => state.user))

      provider.awareness.on("change", () => {

        const states = Array.from(provider.awareness.getStates().values())
        setUsers(states.filter(state => state.user && state.user.username).map((state) => state.user))
      })

      function handleBeforeUnload() {
        provider.awareness.setLocalStateField("user", null)
      }

      window.addEventListener("beforeunload", handleBeforeUnload)

      return () => {
        provider.disconnect()
        window.removeEventListener("beforeunload", handleBeforeUnload)
      }
    }
  }, [
    username
  ])

  if(!username){
    return (
      <main className="h-screen w-full bg-gray-950 flex gap-4 p-4 items-center justify-center">
        <div className="collaboration-visual" aria-hidden="true">
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
        <form
          onSubmit={handleJoin}
          className="translate-y-12 flex flex-col gap-4 items-center justify-center">
          <h1 className="text-6xl font-semibold text-gray-200">Welcome to CoCreate</h1>
          <input
            type="text"
            placeholder="Enter your username"
            className="w-64 h-10 p-2 rounded-lg text-white bg-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
            name="username"
        
          />
          <button
            className="w-64 h-10 p-2 rounded-lg bg-amber-50 text-gray-950 font-bold hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
          Join
          </button>
        </form>
      </main>
    )
  }

  return (
  <main
   className="h-screen w-full bg-gray-950 flex gap-4 p-4">
    <aside className="h-full w-1/4 bg-amber-50 rounded-lg">
    <h2 className="text-2xl font-bold p-4 border-b border-gray-300">Users</h2>
    <ul className="p-4">
      {users.map((user, index) => (
        <li key={index} className="p-2 bg-gray-800 text-white tound mb-2">
          {user.username}
        </li>
      ))}
    </ul>
    </aside>
    <section className="w-3/4 bg-neutral-800 rounded-lg">
      <Editor
        height="100%"
        defaultLanguage="javascript"
        defaultValue="// Write your code here"
        theme="vs-dark"
        onMount={handleMount}
      />
    </section>
   </main>
      
  )

}

export default App
