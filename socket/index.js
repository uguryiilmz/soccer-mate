const io = require("socket.io")(8900, {
    cors: {
      origin: "http://localhost:3000",
    },
  });
  
  let users = [];
  
  const addUser = (userId, socketId) => {
    !users.some((user) => user.userId === userId) &&
      users.push({ userId, socketId });
  };
  
  const removeUser = (socketId) => {
    users = users.filter((user) => user.socketId !== socketId);
  };
  
  const getUser = (userId) => {
    return users.find((user) => user.userId === userId);
  };
  
  io.on("connection", (socket) => {
    //when ceonnect
    console.log("a user connected.");
  
    //take userId and socketId from user
    socket.on("addUser", (user) => {
      console.log("user added",user._id)
      addUser(user._id, socket.id);
      console.log("users are",users)
      io.emit("getUsers", users);
    });
  

    // socket.on("sendNotification", ({ senderName, receiverId, type }) => {
    //     console.log("receiver id",receiverId)
    //     const receiver = getUser(receiverId);
    //     console.log("receiver is",receiver)
    //     io.to(receiver.socketId).emit("getNotification", {
    //       senderName,
    //       type,
    //     });
    //   });

      socket.on("sendNotification", ({ senderId,senderName, receiverId, type,notificationId }) => {
        console.log("receiver id",receiverId)
        console.log("notification id",notificationId)
        const receiver = getUser(receiverId);
        console.log("receiver is",receiver)
        io.to(receiver.socketId).emit("getNotification", {
          senderId,
          senderName,
          type,
          notificationId
        });
      });


      socket.on("answerToGameRequest", ({ sender_id,receiver_id,receiver_name }) => {
        console.log("sender", sender_id,"receiver",receiver_id,receiver_name)
        const receiver = getUser(receiver_id);
        const sender = getUser(sender_id)
        console.log("anser here",sender)
        console.log("andswer to game req receiver is",receiver)
        io.to(sender.socketId).emit("getanswerToGameRequest", {
          receiver_name,
        });
      });

    //   socket.on("sendOneWayNotification", ({ receiverId, message }) => {
    //     console.log("receiver id",receiverId)
    //     const receiver = getUser(receiverId);
    //     console.log("receiver is",receiver)
    //     io.to(receiver.socketId).emit("getOneWayNotification", {
    //       senderName,
    //       type,
    //     });
    //   });


      //send and get message
    socket.on("sendMessage", ({ senderId, receiverId, text }) => {
        console.log("sender",senderId,receiverId,text)
        const user = getUser(receiverId);
        console.log("user",user)
        io.to(user.socketId).emit("getMessage", {
        senderId,
        text,
        });
    });


  
  
    //when disconnect
    socket.on("disconnect", () => {
      console.log("a user disconnected!");
      removeUser(socket.id);
      io.emit("getUsers", users);
    });
  });