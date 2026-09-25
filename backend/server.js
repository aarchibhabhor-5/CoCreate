import express from "express"
import {createServer} from "http"
import {Server} from "socket.io"
import {YSocketIO} from "y-socket.io/dist/server"

const app=express()
app.use(express.static("public"))
const httpServer = createServer(app)


const io = new Server(httpServer, {
    cors: {
        origin: "*",
        methods: ["GET", "POST"]
    }
})


const ySocketIO = new YSocketIO(io)
ySocketIO.initialize()

// ── In-Memory Animal Visibility & Ownership State ──
// Map: username -> boolean (default true)
const userAnimalVisibility = new Map()
// Map: socket.id -> username (enforces ownership)
const socketToUser = new Map()

io.on("connection", (socket) => {
    // Send existing animal visibility state to new socket
    const currentState = Object.fromEntries(userAnimalVisibility)
    socket.emit("animal-visibility-state", currentState)

    // Register user with their socket session
    socket.on("register-user", ({ username }) => {
        if (!username || typeof username !== "string") return
        const cleanName = username.trim()
        socketToUser.set(socket.id, cleanName)

        // If user hasn't set visibility before, default to false (hidden by default)
        if (!userAnimalVisibility.has(cleanName)) {
            userAnimalVisibility.set(cleanName, false)
        }

        // Broadcast current state to ensure all clients are in sync
        io.emit("animal-visibility-updated", {
            username: cleanName,
            visible: userAnimalVisibility.get(cleanName),
        })
    })

    // Set animal visibility with STRICT SERVER-SIDE OWNERSHIP VALIDATION
    socket.on("set-animal-visibility", ({ username, visible }) => {
        if (!username || typeof username !== "string") return
        const registeredUser = socketToUser.get(socket.id)

        // Ownership rule check: A user can ONLY toggle their own animal
        if (!registeredUser || registeredUser !== username.trim()) {
            console.warn(`[Ownership Violation] Socket ${socket.id} (${registeredUser}) attempted to change animal for "${username}"`)
            socket.emit("animal-visibility-error", {
                message: "Unauthorized: You can only control your own animal.",
            })
            return
        }

        const isVisible = Boolean(visible)
        userAnimalVisibility.set(username.trim(), isVisible)

        // Broadcast updated state to all connected clients
        io.emit("animal-visibility-updated", {
            username: username.trim(),
            visible: isVisible,
        })
    })

    socket.on("disconnect", () => {
        socketToUser.delete(socket.id)
    })
})




app.get("/", (req, res)=>{
    res.status(200).json({message: "Server is running",sucess: true})
})

app.get('/health', (req, res)=>{
    res.status(200).json({
        message: "ok",
        sucess: true})
})


httpServer.listen(3000, ()=>{
    console.log("Server is running on port 3000")
})