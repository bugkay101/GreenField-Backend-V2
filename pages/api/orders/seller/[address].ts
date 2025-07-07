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
    let { address} = req.query; // Added id here
    let zendmartItem: any = connectEther();
    const allorders = await zendmartItem.getallOrders();
    const orders = allorders
      .map(orderTransformer)
      .filter((item: any) => item.seller == address);

    res.status(200).json(orders);
  } catch (error) {
    // console.log(error);
    res.status(400).end();
  }
}
