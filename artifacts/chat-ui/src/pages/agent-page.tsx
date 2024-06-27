import { useState } from "react";
import BaseAppLayout from "../components/base-app-layout";
import { AgentUI } from "../components/dynamic-agent/agent-ui";
import { ChatMessage, ChatMessageType } from "../components/dynamic-agent/types";

export default function AgentPage() {
  const [running, setRunning] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  
  const sendMessage = (message: string, type: string) => {
    if (type === ChatMessageType.Human) {
      setMessages((prevMessages) => [
        ...prevMessages,
        { type: ChatMessageType.Human, content: message },
        {
          type: ChatMessageType.AI,
          content: "",
        },
      ]);
    } else if (type === ChatMessageType.AI) {
        setMessages((prevMessages) => [
          ...prevMessages.splice(0, prevMessages.length - 1),
          {
            type: ChatMessageType.AI,
            content: message,
          },
        ]);
        setRunning(false);
    }


    // setTimeout(() => {
    //   setMessages((prevMessages) => [
    //     ...prevMessages.splice(0, prevMessages.length - 1),
    //     {
    //       type: ChatMessageType.AI,
    //       content:
    //         "I am a chatbot. Please try to connect me to Amazon Bedrock.",
    //     },
    //   ]);

    //   setRunning(false);
    // }, 1000);

  };

  return (
    <BaseAppLayout
      content={
        <AgentUI
          onSendMessage={sendMessage}
          messages={messages}
          running={running}
        />
      }
    />
  );
}
