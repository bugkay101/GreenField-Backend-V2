import { NextApiRequest, NextApiResponse } from "next";
import { itemTransformer } from "@/lib/transformers/useItemTransformer";
import { connectEther } from "@/contract/connect";


export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "GET") {
    return res.status(405).end();
  }
  try {
    const { itemId } = req.query;
  
    let zendmartItem: any = connectEther();
    let item = await zendmartItem.items(itemId);
    item = itemTransformer(item);
    if (item.createdAt === 0) {
      res.status(404).end();
    }

    return res.status(200).json(item);
  } catch (error) {
    // console.log(error);
    res.status(400).end();
  }
}
