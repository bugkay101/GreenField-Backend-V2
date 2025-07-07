import { ironOptions } from "@/lib/iron";
import { withIronSessionApiRoute } from "iron-session/next";
import type { NextApiRequest, NextApiResponse } from "next";
import { generateSiweNonce } from "viem/siwe";


const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { method } = req;
  switch (method) {
    case "GET":
      //@ts-ignore
      req.session.nonce = generateSiweNonce();
      await req.session.save();
      res.setHeader("Content-Type", "text/plain");
      //@ts-ignore
      res.send(req.session.nonce);
      break;
    default:
      res.setHeader("Allow", ["GET"]);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
};

export default withIronSessionApiRoute(handler, ironOptions);
