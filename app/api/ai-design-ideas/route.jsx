import { AIDesignIdea } from "@/configs/AiModel";
import { NextResponse } from "next/server";

export async function POST(req) {

  try {

    const body = await req.json();

    const result = await AIDesignIdea(body.prompt);

    return NextResponse.json(result);

  } catch (error) {

    console.log("API ERROR:", error);

    return NextResponse.json(
      { error: error.message },
      { status: 500 }
    );
  }
}