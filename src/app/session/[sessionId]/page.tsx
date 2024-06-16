"use client";

import {
  Avatar,
  ChatContainer,
  ConversationHeader,
  MainContainer,
  Message,
  MessageInput,
  MessageList,
  MessageModel,
  Sidebar,
  TypingIndicator,
} from "@chatscope/chat-ui-kit-react";
import { SetStateAction, useState } from "react";
import { Button } from "primereact/button";
import CreateSessionForm from "./create-session-form";

const ChatSession = () => {
  const [visible, setVisible] = useState(true);
  const [showCreateForm, setShowCreateForm] = useState<boolean>(false);
  const [typing, setTyping] = useState(false);
  const [messages, setMessages] = useState<MessageModel[]>([
    {
      message: "Hello, I'm Sky! What can I help you with?",
      sender: "Sky",
      direction: "incoming",
      position: 0,
    },
  ]);

  const sessions = [
    {
      sessionId: 1,
      customerId: 1,
      title: "Therapy session related to esims",
      category: "GENERAL",
      isManualInterventionRequired: false,
      status: "OPEN",
      threadId: null,
      runId: null,
      isPublic: false,
      isAnonymous: false,
      createTime: "2024-06-02 16:23:39",
      updateTime: "2024-06-02 16:23:39",
      conversation: [
        {
          id: 1,
          sessionId: 1,
          userPrompt: "why am i here",
          generatedResult: "why not?",
          createTime: "2024-06-02 21:55:36",
        },
      ],
    },
    {
      sessionId: 2,
      customerId: 1,
      title: "Why my esim no work??",
      category: "ESIM_RELATED",
      isManualInterventionRequired: true,
      status: "AWAITING_INTERVENTION",
      threadId: null,
      runId: null,
      isPublic: false,
      isAnonymous: false,
      createTime: "2024-06-02 16:23:39",
      updateTime: "2024-06-02 16:23:39",
      conversation: [
        {
          id: 3,
          sessionId: 2,
          userPrompt: "lets win thissssssssss",
          generatedResult:
            "sure, here are some results on how to win hackathons : ",
          createTime: "2024-06-02 21:55:36",
        },
        {
          id: 4,
          sessionId: 2,
          userPrompt: "lets win thissssssssss",
          generatedResult:
            "sure, here are some results on how to win hackathons : ",
          createTime: "2024-06-02 21:55:36",
        },
        {
          id: 5,
          sessionId: 2,
          userPrompt: "lets win thissssssssss",
          generatedResult:
            "sure, here are some results on how to win hackathons : ",
          createTime: "2024-06-02 21:55:36",
        },
      ],
    },
    {
      sessionId: 3,
      customerId: 1,
      title: "Why my esim no work???",
      category: "ESIM_RELATED",
      isManualInterventionRequired: false,
      status: "RESOLVED",
      threadId: null,
      runId: null,
      isPublic: false,
      isAnonymous: false,
      createTime: "2024-06-02 16:23:39",
      updateTime: "2024-06-02 16:23:39",
      conversation: [
        {
          id: 6,
          sessionId: 2,
          userPrompt: "lets win thissssssssss",
          generatedResult:
            "sure, here are some results on how to win hackathons : ",
          createTime: "2024-06-02 21:55:36",
        },
        {
          id: 7,
          sessionId: 2,
          userPrompt: "lets win thissssssssss",
          generatedResult:
            "sure, here are some results on how to win hackathons : ",
          createTime: "2024-06-02 21:55:36",
        },
        {
          id: 8,
          sessionId: 2,
          userPrompt: "lets win thissssssssss",
          generatedResult:
            "sure, here are some results on how to win hackathons : ",
          createTime: "2024-06-02 21:55:36",
        },
      ],
    },
  ];

  const teams = [
    { label: "Team 1", value: "team1" },
    { label: "Team 2", value: "team2" },
    { label: "Team 3", value: "team3" },
  ];

  const [selectedTeam, setSelectedTeam] = useState(teams[0].label);
  const handleTeamChange = (e: string) => {
    setSelectedTeam(e);
  };

  return (
    <>
      <MainContainer
        className="max-h-[50rem] w-full max-w-[80rem] rounded-md border p-8 font-custom shadow-xl"
        style={{
          position: "fixed",
          top: 0,
          bottom: 0,
          left: 0,
          right: 0,
          margin: "auto",
          zIndex: 10,
        }}
      >
        <div className={visible ? "visible" : "hidden"}>
          <Sidebar position="left">
            <div className="flex flex-col gap-1 overflow-x-hidden px-3 pt-3 min-w-[13rem] max-w-[13rem] w-full">
              <div className="flex justify-between pb-3">
                <Button
                  text
                  icon="material-icons-round mi-arrow-back-ios text-3xl text-blue-100 font-semibold"
                  onClick={() => {
                    setVisible(!visible);
                  }}
                />
                <Button
                  text
                  icon="material-icons-round mi-add-circle text-3xl text-blue-100 font-semibold"
                  onClick={() => {
                    setShowCreateForm(true);
                  }}
                />
              </div>
              {sessions.map((session, i) => {
                return (
                  <div
                    key={i}
                    className="cursor-pointer truncate rounded-sm p-1 hover:bg-blue-100 hover:text-blue-950"
                    onClick={() => {
                      setShowCreateForm(false);
                    }}
                  >
                    {session.title}
                  </div>
                );
              })}
              <div className="mt-3 pt-[30rem]">
                <div className="dropdown dropdown-top w-full bg-blue-950">
                  <div
                    tabIndex={0}
                    role="button"
                    className="btn m-1 w-full bg-blue-950 border-blue-950 text-blue-100 hover:bg-blue-100 hover:text-blue-950"
                  >
                    {selectedTeam}
                  </div>
                  <ul
                    tabIndex={0}
                    className="dropdown-content z-[1] menu p-2 shadow rounded-box w-48 bg-blue-100"
                  >
                    {teams.map((team, index) => (
                      <li
                        key={index}
                        className=" bg-blue-100 text-blue-950 hover:bg-blue-950 hover:text-blue-100 rounded-md"
                      >
                        <a onClick={() => handleTeamChange(team.label)}>
                          {team.label}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </Sidebar>
        </div>
        {showCreateForm ? (
          <CreateSessionForm setShowCreateForm={setShowCreateForm} />
        ) : (
          <div className="w-full">
            <ChatContainer>
              <ConversationHeader className="mb-8">
                <ConversationHeader.Content
                  userName={
                    <div className="flex w-full items-center justify-between bg-blue-200">
                      <div className="flex items-center gap-2 text-2xl text-blue-950">
                        <div className={visible ? "hidden" : "visible"}>
                          <Button
                            text
                            icon="material-icons-round mi-arrow-forward-ios text-2xl text-blue-950 font-semibold"
                            onClick={() => {
                              setVisible(!visible);
                            }}
                          />
                        </div>
                        <div>{"fdsadf".substring(0, 45)}...</div>
                      </div>
                      <div className="flex flex-col gap-2 text-sm">
                        <div className="border-1 rounded-sm border border-green-400 bg-green-200 p-1.5 px-2 text-green-800 cursor-pointer">
                          Open
                        </div>
                      </div>
                    </div>
                  }
                />
              </ConversationHeader>
              <MessageList
                typingIndicator={
                  typing ? <TypingIndicator content="Sky is typing" /> : null
                }
                className="pb-24"
              >
                <div className="w-full">
                  {messages.map((message, i) => {
                    return <Message key={i} model={message}></Message>;
                  })}
                </div>
              </MessageList>
              <MessageInput
                placeholder="Type message here"
                activateAfterChange
                // onSend={handleSend}
              />
            </ChatContainer>
          </div>
        )}
      </MainContainer>
    </>
  );
};

export default ChatSession;
