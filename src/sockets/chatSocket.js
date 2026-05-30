const chatSocket = (io, socket) => {
  socket.on("joinConversation", (conversationId) => {
    socket.join(conversationId);
  });

  socket.on("leaveConversation", (conversationId) => {
    socket.leave(conversationId);
  });

  socket.on("typing", ({ conversationId, userId }) => {
    socket.to(conversationId).emit("userTyping", {
      userId,
    });
  });

  socket.on("stopTyping", ({ conversationId, userId }) => {
    socket.to(conversationId).emit("userStoppedTyping", {
      userId,
    });
  });
};

export default chatSocket;