// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";

type Data = {
  name: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  res.status(200).json({
    id: "6264339ea8793807b96b60c3",
    name: "KRITSANA-KMITL",
    email: "kritsanawipankhet@icloud.com",
    image: "https://avatars.githubusercontent.com/u/34856790?v=4",
  });
}
