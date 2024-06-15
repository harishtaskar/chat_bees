interface IUser {
  user_id?: string;
  group_id?: string;
  username: string;
  password?: string;
  occupation: string;
  gender: string;
  age: number | null;
  iconIndex?: number;
}

interface IMessage {
  from_user: string;
  text: string;
  sendAt?: Date; // Optional, because it has a default value
  conversation_id: mongoose.Types.ObjectId;
}
