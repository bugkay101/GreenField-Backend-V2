import { NextApiRequest, NextApiResponse } from "next";
import { orderTransformer } from "@/lib/transformers/useOrderTransformer";
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
    // console.log(zendmartItem)
    const allorders = await zendmartItem.getallOrders();
    console.log(allorders)
    const orders = allorders
      .map(orderTransformer)

    res.status(200).json(orders);
  } catch (error) {
    console.log(error);
    res.status(400).end();
  }
}
