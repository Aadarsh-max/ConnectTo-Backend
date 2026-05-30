const onlineUsers = new Map();

const onlineUsersSocket = (io, socket) => {
  socket.on("userOnline", (userId) => {
    onlineUsers.set(userId, socket.id);

    io.emit("onlineUsers", Array.from(onlineUsers.keys()));

    socket.join(userId);
  });

  socket.on("disconnect", () => {
    for (const [userId, socketId] of onlineUsers.entries()) {
      if (socketId === socket.id) {
        onlineUsers.delete(userId);
        break;
      }
    }

    io.emit("onlineUsers", Array.from(onlineUsers.keys()));
  });
};

export { onlineUsers };
export default onlineUsersSocket;