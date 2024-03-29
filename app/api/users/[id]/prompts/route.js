import Prompt from "@models/prompt";
import { db } from "@utils/db";

export const GET = async (req, { params }) => {
  try {
    console.log(params.id);
    await db.connect();
    const prompts = await Prompt.find({ creator: params.id }).populate(
      "creator"
    );


    return new Response(JSON.stringify(prompts), { status: 200 });
  } catch (error) {
    console.log(error);
    return new Response("Failed to fetch all prompts", { status: 400 });
  }
};
