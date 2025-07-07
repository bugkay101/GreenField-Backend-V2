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
    let { category } = req.query; // Added id here

    let zendmartItem: any = connectEther();
    const allItems = await zendmartItem.getAllItems();
    const items = allItems
      .map(itemTransformer)
      .filter((item: any) => {
        if (typeof category === "string") {
          // Check if item.category array includes the category string
          return item.category === category && item.stock !== 0;
        }
        return false;
      })
      .reverse();

    res.status(200).json(items);
  } catch (error) {
    // console.log(error);
    res.status(400).end();
  }
}
