export async function POST(req) {

  try {

    const { prompt } = await req.json();

    const response = await fetch(
      process.env.WORKER_URL,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${process.env.WORKER_API_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ prompt }),
      }
    );

    if (!response.ok) {
      throw new Error("Worker request failed");
    }

    const imageBuffer = await response.arrayBuffer();

    return new Response(imageBuffer, {
      headers: {
        "Content-Type": "image/jpeg",
      },
    });

  } catch (error) {

    return Response.json(
      { error: error.message },
      { status: 500 }
    );

  }
}