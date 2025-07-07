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
    let { searchQuery } = req.query;

    let zendmartItem: any = connectEther();
   const allItems = await zendmartItem.getAllItems();
   const items = allItems
     .map(itemTransformer)
     .filter((item: any) => {
       if (typeof searchQuery === "string" && searchQuery.length > 3) {
         // Convert search string to lowercase and replace hyphens with spaces
         const formattedSearchQuery = searchQuery
           .toLowerCase()
           .replace(/-/g, " ");
         // Check if formatted search string is in any string property of the item
         return (
           Object.values(item).some(
             (value) =>
               typeof value === "string" &&
               value.toLowerCase().includes(formattedSearchQuery)
           ) && item.stock !== 0
         );
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
