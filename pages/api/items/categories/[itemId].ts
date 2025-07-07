import { NextApiRequest, NextApiResponse } from "next";
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
    let categories: string[] = [];
    for (let i = 0; i < 4; i++) {
      let category = await zendmartItem.getCategoryElement(itemId, i);
      categories.push(category);
    }

    return res.status(200).json(categories);
  } catch (error) {
    // console.log(error);
    res.status(400).end();
  }
}
