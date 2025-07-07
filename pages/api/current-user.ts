import { connectEther } from "@/contract/connect";
import { db } from "@/lib/db";
import { ironOptions } from "@/lib/iron";
import { orderTransformer } from "@/lib/transformers/useOrderTransformer";
import { withIronSessionApiRoute } from "iron-session/next";
import type { NextApiRequest, NextApiResponse } from "next";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { method } = req;
  switch (method) {
  case "GET":
      //@ts-ignore
      const address = req.session.siwe?.address;
      if (!address)
        return res.status(404).json({ error: "User not logged in" });

      const user = await db.user.findUnique({ where: { address } });

      let contract: any = connectEther();
      const allorders = await contract.getallOrders();
      const sales = allorders
        .map(orderTransformer)
        .filter((item: any) => item.seller == address);
      const purchase = allorders
        .map(orderTransformer)
        .filter((item: any) => item.buyer == address);

      res.send({ user, sales, purchase });
      break;
    default:
      res.setHeader("Allow", ["GET"]);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
};

export default withIronSessionApiRoute(handler, ironOptions);
