import { addUserMessage,addBotMessage } from "../reducers/chat-bot";
import { AppDispatch } from "../config/store";
import { post } from "@/utils/constants";
import { apiEndpoints } from "@/utils/apiEndpoints";


export const sendMessageAction = (message: {  text: string,sessionId?:string}) => async (dispatch: AppDispatch) => {
  try {
    dispatch(addUserMessage(message));
    console.log(message)
    const response = await post(apiEndpoints.CHAT_CHAT, {question: message.text,session_id: message.sessionId},undefined,"Bot");
    dispatch(addBotMessage({ text: response?.data.data.answer }));
    console.log(response)
    
  } catch (error) {
    console.error("Error sending message:", error);
    throw error;
  }
}