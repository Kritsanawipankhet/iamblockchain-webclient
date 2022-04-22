// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";

type Data = {
  access_token: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  console.log(req);
  const ressample = await fetch(`http://localhost:3000/api/oauth/token`, {
    method: "post",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },

    //make sure to serialize your JSON body
    body: JSON.stringify({
      name: "555",
      password: "666",
    }),
  })
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
    });
  res.status(200).json({ access_token: "John Doe" });
}
