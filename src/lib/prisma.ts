import db from "./db";
import Groq from "groq-sdk";

export const CreateSession = async (teamId: number, title: string) => {
  return await db.sessions.create({
    data: {
      team_id: teamId,
      title,
    },
  });
};

export const getTeamsOfUser = async (userId: number) => {
  return await db.memberships.findMany({
    where: { user_id: userId },
    include: { teams: true },
  });
};

export const getSessionsOfTeam = async (teamId: number) => {
  return await db.sessions.findMany({
    where: { team_id: teamId },
  });
};

export const getConversationsOfSession = async (sessionId: number) => {
  return await db.conversations.findMany({
    where: { session_id: sessionId },
  });
};

export const GetAIResponse = async (sessionId: number, userPrompt: string) => {
  const groq_api_key = process.env.GROQ_API_KEY;
  const groq = new Groq({
    apiKey: groq_api_key,
  });

  const groQResponse = await groq.chat.completions.create({
    messages: [
      {
        role: "user",
        content: userPrompt,
      },
    ],
    model: "mixtral-8x7b-32768",
  });

  const aiResponse = groQResponse.choices[0]?.message?.content ?? "";
  return await db.conversations.create({
    data: {
      session_id: sessionId,
      user_prompt: userPrompt,
      generated_result: aiResponse,
    },
  });
};

export const addMemberToTeam = async (userId: number, teamId: number) => {
  return await db.memberships.create({
    data: {
      user_id: userId,
      team_id: teamId,
    },
  });
};
