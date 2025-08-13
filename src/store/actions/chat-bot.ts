import {
  addUserMessage,
  addBotMessage,
  clearMessages,
  updateFeedBackStatus,
} from "../reducers/chat-bot";
import { AppDispatch } from "../config/store";
import { post } from "@/utils/constants";
import { apiEndpoints } from "@/utils/apiEndpoints";
import { FeedBackType } from "@/types/serviceTypes";

export const sendMessageAction =
  (message: { text: string; sessionId?: string }) =>
  async (dispatch: AppDispatch) => {
    try {
      dispatch(addUserMessage(message));
      console.log(message);
      const response = await post(
        apiEndpoints.CHAT_CHAT,
        { question: message.text, session_id: message.sessionId },
        undefined,
        "Bot"
      );
      dispatch(addBotMessage({ text: response?.data.data.answer }));
      console.log(response);
    } catch (error) {
      console.error("Error sending message:", error);
      throw error;
    }
  };

export const RefreshChatAction = () => async (dispatch: AppDispatch) => {
  try {
    dispatch(clearMessages());
  } catch (error) {
    console.error("Error With Refreshing", error);
  }
};

export const HandleUserFeedBack =
  (payload: FeedBackType) => async (dipatch: AppDispatch) => {
    try {
      dipatch(updateFeedBackStatus(payload.status));
      await post(apiEndpoints.CHAT_FEEDBACK, payload, undefined, "Bot");
      const chatSessionData = JSON.parse(
        localStorage.getItem("chat_session_data") || "{}"
      );
      chatSessionData.status = payload.status;
      localStorage.setItem(
        "chat_session_data",
        JSON.stringify(chatSessionData)
      );
    } catch (error) {
      console.error("Error With Refreshing", error);
    }
  };
