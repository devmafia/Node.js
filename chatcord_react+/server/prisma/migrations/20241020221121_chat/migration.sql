/*
  Warnings:

  - A unique constraint covering the columns `[user1Id,user2Id]` on the table `Chat` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[user2Id,user1Id]` on the table `Chat` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Chat_user1Id_user2Id_key" ON "Chat"("user1Id", "user2Id");

-- CreateIndex
CREATE UNIQUE INDEX "Chat_user2Id_user1Id_key" ON "Chat"("user2Id", "user1Id");
