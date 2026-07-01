import axios from "axios"

export async function POST(req: Request) {
  try {
    const body = await req.json()

    const response = await axios.post(
      "https://api.pinata.cloud/pinning/pinJSONToIPFS",
      body,
      {
        headers: {
          Authorization: `Bearer ${process.env.PINATA_JWT}`,
          "Content-Type": "application/json",
        },
      }
    )

    return Response.json({
      cid: response.data.IpfsHash,
    })
  } catch (error) {
    console.error(error)
    return new Response("Upload failed", { status: 500 })
  }
}