const express = require("express");
const http = require("http");
const { Server: SocketIOServer } = require("socket.io");
const cors = require("cors");
const session = require("express-session");
const { createUser, getCurrentUser, getAllUsers } = require("./utils/users");
const { PrismaClient } = require("@prisma/client");
require("dotenv").config();

const prisma = new PrismaClient();
prisma.$connect()
  .then(() => console.log('Database connected successfully'))
  .catch((err) => console.error('Database connection error:', err));

const app = express();
const server = http.createServer(app);
const io = new SocketIOServer(server, {
  cors: {
    origin: 'http://localhost:5173',
    methods: ['GET', 'POST'],
    credentials: true,
  },
});

app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true,
}));

const sessionMiddleware = session({
  secret: 'your_session_secret',
  resave: false,
  saveUninitialized: true,
  cookie: { 
    secure: false,
    maxAge: 1000 * 60 * 60,
   }
});
app.use(sessionMiddleware);

app.use(express.json());

app.post('/api/users', async (req, res) => {
  try {
    const { username, nickname } = req.body;
    const newUser = await createUser(username, nickname);
    req.session.userId = newUser.id;
    res.json(newUser);
  } catch (error) {
    console.error('Error creating user:', error);
    res.status(400).json({ success: false, message: error.message });
  }
});

app.get('/api/current-user', (req, res) => {
  if (req.session.userId) {
    res.json({ userId: req.session.userId });
  } else {
    res.status(401).json({ message: 'No user session' });
  }
});


app.get('/api/users', async (req, res) => {
  try {
    const users = await getAllUsers();
    res.json(users);
  } catch (error) {
    console.error('Error fetching users:', error);
    res.status(500).json({ success: false, message: "Server error" });
  }
});

app.get('/api/users/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const user = await prisma.user.findUnique({
      where: { id }
    });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json(user);
  } catch (error) {
    console.error('Error fetching user:', error);
    res.status(500).json({ message: 'Server error' });
  }
});


app.get('/api/messages/:chatId', async (req, res) => {
  try {
    const { chatId } = req.params;
    const messages = await prisma.message.findMany({
      where: { chatId },
      include: { user: true },
      orderBy: { createdAt: 'asc' },
    });
    res.json(messages);
  } catch (error) {
    console.error('Error fetching messages:', error);
    res.status(500).json({ success: false, message: "Server error" });
  }
});

app.post('/api/chats', async (req, res) => {
  try {
    const { user1Id, user2Id } = req.body;

    let chat = await prisma.chat.findFirst({
      where: {
        OR: [
          { user1Id, user2Id },
          { user1Id: user2Id, user2Id: user1Id }
        ]
      }
    });

    if (!chat) {
      chat = await prisma.chat.create({
        data: { user1Id, user2Id }
      });
    }

    res.json(chat);
  } catch (error) {
    console.error('Error creating chat:', error);
    res.status(500).json({ success: false, message: "Server error" });
  }
});

app.get('/api/chats/:userId', async (req, res) => {
  try {
    const { userId } = req.params;
    const chats = await prisma.chat.findMany({
      where: {
        OR: [
          { user1Id: userId },
          { user2Id: userId }
        ]
      },
      include: {
        user1: true,
        user2: true,
        messages: {
          orderBy: { createdAt: 'desc' },
          take: 1
        }
      }
    });
    res.json(chats);
  } catch (error) {
    console.error('Error fetching chats:', error);
    res.status(500).json({ success: false, message: "Server error" });
  }
});


io.use((socket, next) => {
  sessionMiddleware(socket.request, {}, next);
});

io.on("connection", (socket) => {
  socket.on("joinChat", async ({ chatId }) => {
    if (!socket.request.session || !socket.request.session.userId) {
      socket.emit("error", "No user session");
      return;
    }

    socket.join(chatId);

    const messages = await prisma.message.findMany({
      where: { chatId },
      include: { user: true },
      orderBy: { createdAt: 'asc' },
    });
    socket.emit("chatHistory", messages);
  });

  socket.on("chatMessage", async ({ chatId, content }) => {
    if (!socket.request.session || !socket.request.session.userId) {
      socket.emit("error", "No user session");
      return;
    }

    const message = await prisma.message.create({
      data: {
        content,
        userId: socket.request.session.userId,
        chatId,
      },
      include: { user: true },
    });

    io.to(chatId).emit("message", message);
  });

  socket.on("disconnect", () => {
    console.log("User disconnected");
  });
});

const PORT = process.env.PORT || 3000;

server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
