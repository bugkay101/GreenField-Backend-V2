import { NextApiRequest, NextApiResponse } from "next";
import { itemsTransformer } from "@/lib/transformers/useItemsTransformer";
import { connectEther } from "@/contract/connect";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "GET") {
    return res.status(405).end();
  }
  try {
    let zendmartItem: any = connectEther();
    const allItems = await zendmartItem.getAllItems();
    const items = allItems
      .map(itemsTransformer)
      .filter((item: any) => item.stock !== 0)
      .reverse();

    res.status(200).json(items);
  } catch (error) {
    // console.log(error);
    res.status(400).end();
  }
}
