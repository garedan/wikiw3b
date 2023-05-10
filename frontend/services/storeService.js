import React, { useEffect, useState } from "react";
import { abiAddPostAddress } from "../utils/config.js";
import AddPost from "../utils/abi/AddPost.json"
import { ethers } from "ethers";

export const getAllArticles = async () => {
    const provider = new ethers.providers.JsonRpcProvider(
      "https://eth-sepolia.g.alchemy.com/v2/B54X_xFsbfi5cwsmQ-42FPPGzmIGzotb"
    );
    const contract = new ethers.Contract(
      abiAddPostAddress,
      AddPost.abi,
      provider
    );

    const articles = await contract.getAllPosts();
    //console.log(articles);
    let datos = [];
    var obj = {}  
    for(let i = 0;i < articles.length; i++){
      /* obj[i] = articles[i];
      datos.push(Object.assign({}, articles[i])); */
      obj['id'] = articles[i][0];
      obj['creator_address'] = articles[i][1];
      obj['topic'] = articles[i][2];
      datos.push(Object.assign({}, obj));
    }  
    //datos = datos.json();
    console.log(datos);
    return datos;
  };




export async function getItems() {
  const request = await fetch("http://localhost:3000/api/items");
  const items = await request.json();

  return items;
}

export async function getLatestItems() {
  const items = await getAllArticles();

  return items.slice(0, 3);
}
