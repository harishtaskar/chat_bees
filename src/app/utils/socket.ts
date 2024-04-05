import { Socket, io } from "socket.io-client";

const URL = process.env.SERVER_URL || "http://localhost:8080";

export let _socket: Socket = io(URL);
