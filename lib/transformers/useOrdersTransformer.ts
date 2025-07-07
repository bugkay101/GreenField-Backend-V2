import { ethers } from "ethers";

export const ordersTransformer = (order: any) => {
  // Determine type and expected based on numbers length
  let costInWei = ethers.BigNumber.from(order.item.cost);
  let costInEther = parseFloat(ethers.utils.formatEther(costInWei));
  let costEthers: any;

  if (costInEther < 0.001) {
    costEthers = "< 0.001";
  } else {
    costEthers = costInEther.toFixed(3);
  }
  return {
    time: (parseInt(order.time) * 1000),
    id: parseInt(order.item.id),
    seller: order.item.seller,
    author: order.item.author,
    name: order.item.name,
    category: order.item.category,
    image: order.item.image,
    product: order.item.product,
    discription: order.item.discription,
    cost: costEthers,
    stock: parseInt(order.item.stock),
    createdAt: (parseInt(order.item.createdAt) * 1000),
  };
};
