import { simulateContract, writeContract } from "@wagmi/core";
import { parseEther } from "ethers/lib/utils";
import abi from "./abi.json";
import { ethers } from "ethers";
import { contractAddress as address } from "./address";
import { writeConfig } from "@/lib/wagmi";

const addSeller = async (address: string) => {
  const { request } = await simulateContract(writeConfig, {
    address,
    abi,
    functionName: "addSeller",
    args: [address],
  });

  const hash = await writeContract(writeConfig, request);
  return hash;
};
const removeSeller = async (address: string) => {
  const { request } = await simulateContract(writeConfig, {
    address,
    abi,
    functionName: "removeSeller",
    args: [address],
  });

  const hash = await writeContract(writeConfig, request);
  return hash;
};

const createItem = async (
  author: string,
  name: string,
  category: string,
  image: string,
  product: string,
  description: string,
  cost: number,
  stock: number
) => {
  let costEthers: any = ethers.utils.parseUnits(cost.toString(), "ether");
  const { request } = await simulateContract(writeConfig, {
    address,
    abi,
    functionName: "list",
    args: [
      author,
      name,
      category,
      image,
      product,
      description,
      costEthers,
      stock,
    ],
  });

  const hash = await writeContract(writeConfig, request);
  return hash;
};

const editItem = async (
  id: number,
  name: string,
  category: string,
  image: string,
  product: string,
  description: string,
  cost: number,
  stock: number
) => {
  let costEthers: any = ethers.utils.parseUnits(cost.toString(), "ether");
  const { request } = await simulateContract(writeConfig, {
    address,
    abi,
    functionName: "editItem",
    args: [
      id,
      name,
      category,
      image,
      product,
      description,
      costEthers,
      stock,
    ],
  });

  const hash = await writeContract(writeConfig, request);

  return hash;
};

const buyItem = async (id: number, cost: string) => {
  const { request } = await simulateContract(writeConfig, {
    address,
    abi,
    functionName: "buy",
    args: [id],
    value: parseEther(cost),
  });

  const hash = await writeContract(writeConfig, request);

  return hash;
};

const deleteItem = async (id: number) => {
  const { request } = await simulateContract(writeConfig, {
    address,
    abi,
    functionName: "removeItem",
    args: [id],
  });
  const hash = await writeContract(writeConfig, request);

  return hash;
};

export { editItem, createItem, deleteItem, buyItem, addSeller, removeSeller };
