import { getAccount, writeContract } from "@wagmi/core";
import { parseEther } from "ethers/lib/utils";
import abi from "./abi.json";
import { ethers } from "ethers";
import { contractAddress as address } from "./address";
import { writeConfig } from "@/lib/wagmi";

const { connector } = getAccount(writeConfig);

const createItem = async (
  author: string,
  name: string,
  category: string,
  category1: string,
  category2: string,
  category3: string,
  image: string,
  image1: string,
  image2: string,
  image3: string,
  product: string,
  description: string,
  cost: number,
  stock: number
) => {
  let costEthers: any = ethers.utils.parseUnits(cost.toString(), "ether");
  const hash = await writeContract(writeConfig, {
    address,
    abi,
    functionName: "list",
    args: [
      author,
      name,
      [category, category1, category2, category3],
      [image, image1, image2, image3],
      product,
      description,
      costEthers,
      stock,
    ],
  });

  return hash;
};

const editItem = async (
  id: number,
  name: string,
  category: string,
  category1: string,
  category2: string,
  category3: string,
  image: string,
  image1: string,
  image2: string,
  image3: string,
  product: string,
  description: string,
  cost: number,
  stock: number
) => {
  let costEthers: any = ethers.utils.parseUnits(cost.toString(), "ether");
  const hash = await writeContract(writeConfig, {
    address,
    abi,
    functionName: "editItem",
    args: [
      id,
      name,
      [category, category1, category2, category3],
      [image, image1, image2, image3],
      product,
      description,
      costEthers,
      stock,
    ],
  });

  return hash;
};

const buyItem = async (id: number, cost: string) => {
  const hash = await writeContract(writeConfig, {
    address,
    abi,
    functionName: "buy",
    args: [id],
    value: parseEther(cost),
  });

  return hash;
};

const deleteItem = async (id: number) => {
  const hash = await writeContract(writeConfig, {
    address,
    abi,
    functionName: "removeItem",
    args: [id],
  });

  return hash;
};

export { editItem, createItem, deleteItem, buyItem };
