const notificationSocket = (io, socket) => {
  socket.on("joinNotifications", (userId) => {
    socket.join(userId);
  });
};

export default notificationSocket;