const express = require('express');
const app = express();
const http = require("http");
const cors = require("cors");
const { Server } = require("socket.io");

app.use(cors());

const server = http.createServer(app);

const io = new Server(server, {
    cors: {
        origin: "http://127.0.0.1:8000",
        methods: ["GET", "POST"],
    },
});

const kullanicilar = {};
// kullanicilar[data.id] = data.newUserName
// Socket User Control Area
io.on("connection", (socket) => {

    socket.on('login', (data, gelen) => {
        socket.join(data);
        console.log(`User socket id: ${socket.id} User name: ${data}`)
        if (Object.values(kullanicilar).indexOf(data) > -1) {
            gelen(false);
            console.log(`${data} var. İzin verilmedi...`);
        } else {
            kullanicilar[socket.id] = data;
            console.log(`${data} isim ile girişe izin verildi...`);
            gelen(true)
            users();
        }
    });

    // Socket Send_Message area
    socket.on("send_message", (data) => {
        io.sockets.emit("take_message", data);
    });

    // Socket users list area

    const users = () => {
        io.sockets.emit("take_users", kullanicilar);
    };

    // Socket User Dconnect Area
    socket.on("disconnect", () => {
        console.log("User Disconnected", kullanicilar[socket.id]);
        delete kullanicilar[socket.id];        
        users();
    });
});


server.listen(3001, () => {
    console.log("SERVER RUNNING");
});
