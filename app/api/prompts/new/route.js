import Prompt from "@models/prompt";
import { db } from "@utils/db";

export const POST = async (req, res) => {
  const { userId, prompt, tag } = await req.json();

  try {
    await db.connect();
    const newPrompt = new Prompt({
      creator: userId,
      prompt,
      tag: tag,
    });

    await newPrompt.save();
    return new Response(JSON.stringify(newPrompt), { status: 201 });
  } catch (error) {
    return new Response("Failed to create new prompt", { status: 400 });
  }
};
