interface IUser {
  _id: string;
  username: string;
  profileIcon?: string; // Optional, because it has a default value
  occupation: string;
  dob?: Date; // Optional, because it is not required
  createdAt?: Date; // Optional, will be set by Mongoose
  updatedAt?: Date; // Optional, can be set by Mongoose
  gender: "male" | "female";
  password: string;
  salt: string;
  status?: number;
  theme?: "dark" | "light";
}

interface IMessage {
  from_user: mongoose.Types.ObjectId;
  content: string;
  type: "text" | "gif" | "image";
  sendAt?: Date; // Optional because it has a default value
  conversation_id: mongoose.Types.ObjectId;
  status?: number;
}

interface IMessageCount {
  user: mongoose.Types.ObjectId;
  conversation: mongoose.Types.ObjectId;
  msg_count: number;
  unread_msg_count: number;
}
