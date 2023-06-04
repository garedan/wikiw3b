import React, { useEffect, useState } from "react";
import "@uiw/react-md-editor/markdown-editor.css";
import "@uiw/react-markdown-preview/markdown.css";
import dynamic from "next/dynamic";
import rehypeSanitize from "rehype-sanitize";
import { abiAddPostAddress } from "../utils/config.js";
import AddPost from "../utils/abi/AddPost.json"
import { useRouter } from "next/router";
import { ethers } from "ethers";

const MDEditor = dynamic(
    () => import("@uiw/react-md-editor").then((mod) => mod.default),
    { ssr: false }
  );

const AddArticle = () => {
  const router = useRouter();
  const [formInput, updateFormInput] = useState({
    topic: "",
  });

  const addArticle = async () => {
    const { ethereum } = window;
    if(ethereum) {
        const provider = new ethers.providers.Web3Provider(ethereum);    
        const signer = provider.getSigner();
        const contract = new ethers.Contract(abiAddPostAddress, AddPost.abi, signer);
        const transaction = await contract.addPost(formInput.topic);
        transaction.wait();
        router.push('/');
    }

}
  
  let signer = '0';
  let dir;
  const { ethereum } = window;
  if(ethereum) {
      const provider = new ethers.providers.Web3Provider(ethereum);    
      signer = provider.getSigner();
      dir = signer.getAddress();
  }

  async function myAddress() {
    await signer.getAddress();
  }

  const [value, setValue] = useState(
    (`### Building ![](https://img.stackshare.io/service/5936/nextjs.png)
    A web form has a client-server relationship. 
    They are used to send data handled by a web server 
    for processing and storage. The form itself is the client, 
    and the server is any storage mechanism that can be used to store, 
    retrieve and send data when needed.
    This guide will teach you how to create a web form with Next.js.`)
    
    );
  return (
    <div>
    <div data-color-mode="light">
      {
        <MDEditor value={formInput.content} 
            onChange={(e) =>
              updateFormInput({ ...formInput, content: e.target.value })
          }  
          style={{ display: 'none' }}
          /> 
          }
      <MDEditor
        value={value}
        onChange={setValue}
        previewOptions={{
          rehypePlugins: [[rehypeSanitize]],
        }}
        style={{ width: '50%', margin: 'auto', marginTop: '2%', height: '500px' }}
      />
      
        <span style={{ marginLeft: '40%'}}>Tema: </span>
        <select name="topic" id="topic" className="mt-2 border rounded p-4" onChange={(e) =>
            updateFormInput({ ...formInput, topic: e.target.value })
          }   style={{ marginLeft: '3%', marginTop: '2%' }} >
          <option value="Javascript">Javascript</option>
          <option value="React">React</option>
        </select>
      
          
    </div>
     <button
          onClick={addArticle}
          className="font-bold mt-4 bg-blue-500 text-white rounded p-4 shadow-lg"
          style={{ marginLeft: '45%', marginTop: '2%' }}
          >

          Add article
        </button>
    </div>
  )
  
}

export default AddArticle
