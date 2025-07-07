import { ethers } from "ethers";
export const itemTransformer = (item: any) => {
  // Determine type and expected based on numbers length
  let costInWei = ethers.BigNumber.from(item.cost);
  let costInEther = parseFloat(ethers.utils.formatEther(costInWei));
  let costEthers: any;

  if (costInEther < 0.001) {
    costEthers = "< 0.001";
  } else {
    costEthers = costInEther.toFixed(3);
  }
  return {
    id: parseInt(item.id),
    seller: item.seller,
    author: item.author,
    name: item.name,
    category: item.category,
    image: item.image,
    discription: item.discription,
    cost: costEthers,
    stock: parseInt(item.stock),
    createdAt: (parseInt(item.createdAt) * 1000)
  };
};
