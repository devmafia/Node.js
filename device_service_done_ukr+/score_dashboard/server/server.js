const { createServer } = require("http");
const { Server } = require("socket.io");

const httpServer = createServer();
const io = new Server(httpServer, {
    cors: {
        origin: ["http://localhost:5173"],
    }
});

let playerScores = []

io.on("connection", (socket) => {
    console.log('socket connected');

    socket.on('scores', data => {
        playerScores.push(data)

        socket.emit("playerScores", playerScores)

    })

    setInterval(() => {
        socket.emit("playerScores", playerScores)
    }, 5000)
})

httpServer.listen(3000, () => {
    console.log("Server is connected http://localhost:3000");
})