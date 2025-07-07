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
    let { address } = req.query; 

    let zendmartItem: any = connectEther();

    let allItems = await zendmartItem.getAllItems();
    const items = allItems
      .map(itemTransformer)
      .filter((item: any) => item.seller == address)

    return res
      .status(200)
      .json({products: items});
  } catch (error) {
    // console.log(error);
    res.status(400).end();
  }
}
