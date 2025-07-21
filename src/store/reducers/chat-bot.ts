import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { nanoid } from "nanoid";
import { getOrCreateDailySessionId } from "@/utils/getOrCreateSessionId";

interface Message {
  id: string;
  text: string;
  userType: "user" | "bot";
}

interface ChatBotState {
  messages: Message[];
  enableSendButton?: boolean;
  loading?: boolean;
  sessionId?: string;
}
const sessionId = getOrCreateDailySessionId();

const initialState: ChatBotState = {
  messages: [
    {
      id: nanoid(),
      text: "Hi! I'm HomeHero. How can I assist you today?",
      userType: "bot",
    },
  ],
  enableSendButton: true,
  loading: false,
  sessionId: sessionId,
};

const chatBotSlice = createSlice({
  name: "chatBot",
  initialState,
  reducers: {
    addUserMessage: (state, action: PayloadAction<{ text: string }>) => {
      state.messages.push({
        id: nanoid(),
        text: action.payload.text,
        userType: "user",
      });
      state.enableSendButton = false;
      state.loading = true;
    },
    addBotMessage: (state, action: PayloadAction<{ text: string }>) => {
      state.messages.push({
        id: nanoid(),
        text: action.payload.text,
        userType: "bot",
      });
      state.enableSendButton = true;
      state.loading = false;
    },
    clearMessages: (state) => {
      state.messages = [
        {
          id: nanoid(),
          text: "Hi! I'm HomeHero. How can I assist you today?",
          userType: "bot",
        },
      ];
    },
  },
});

export const { addUserMessage, addBotMessage, clearMessages } =
  chatBotSlice.actions;
export default chatBotSlice.reducer;
