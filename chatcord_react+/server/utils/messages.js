const moment = require('moment');

function formatMessage(username, text) {
  return {
    username,
    text,
    time: moment().format('h:mm a')
  };
}

module.exports = formatMessage;


// async function mergeChats(user1Id, user2Id) {
//   const duplicateChats = await prisma.chat.findMany({
//     where: {
//       OR: [
//         { user1Id, user2Id },
//         { user1Id: user2Id, user2Id: user1Id }
//       ]
//     },
//     orderBy: { id: 'asc' }
//   });

//   if (duplicateChats.length > 1) {

//     const chatToKeep = duplicateChats[0];

//     for (let i = 1; i < duplicateChats.length; i++) {
//       await prisma.message.updateMany({
//         where: { chatId: duplicateChats[i].id },
//         data: { chatId: chatToKeep.id }
//       });


//       await prisma.chat.delete({
//         where: { id: duplicateChats[i].id }
//       });
//     }

//     console.log(`Chats merged for users ${user1Id} and ${user2Id}`);
//   }
// }

// async function merge() {
//   await mergeChats("", "");
// }
