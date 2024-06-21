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
}

interface IMessage {
  from_user: string;
  content: string;
  type: "text" | "gif" | "image";
  sendAt?: Date; // Optional because it has a default value
  conversation_id: mongoose.Types.ObjectId;
  status?: number;
}
