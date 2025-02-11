// users.js

const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// Create a new user
async function createUser(username, nickname) {
  try {
    // Check if the nickname is already taken
    if (nickname) {
      const isTaken = await isNicknameTaken(nickname);
      if (isTaken) {
        throw new Error("Nickname already exists");
      }
    }

    const existingUser = await prisma.user.findUnique({
        where: { username },
    });

    // If the user exists, return the existing user
    if (existingUser) {
        return existingUser;
    }

    const user = await prisma.user.create({
      data: {
        username,
        nickname: nickname || null,
      },
    });

    return user;
  } catch (error) {
    console.error('Error creating user:', error);
    throw error;
  }
}

// Get current user
async function getCurrentUser(id) {
  try {
    return await prisma.user.findUnique({
      where: { id },
    });
  } catch (error) {
    console.error('Error getting current user:', error);
    throw error;
  }
}

// Delete user
async function deleteUser(id) {
  try {
    const user = await getCurrentUser(id);
    if (user) {
      await prisma.user.delete({
        where: { id },
      });
      return user;
    }
  } catch (error) {
    console.error('Error deleting user:', error);
    throw error;
  }
}

// Check if nickname is taken
async function isNicknameTaken(nickname) {
  try {
    if (!nickname || nickname.trim() === '') {
      return false; // Empty nicknames are not considered taken
    }
    const user = await prisma.user.findFirst({
      where: { nickname: nickname.trim() },
    });
    return user !== null; // Returns true if a user with the nickname exists
  } catch (error) {
    console.error('Error checking nickname:', error);
    throw error;
  }
}

// Get all users
async function getAllUsers() {
  try {
    const users = await prisma.user.findMany();
    return users || [];
  } catch (error) {
    console.error('Error getting all users:', error);
    return [];
  }
}

module.exports = {
  createUser,
  getCurrentUser,
  deleteUser,
  isNicknameTaken,
  getAllUsers,
};