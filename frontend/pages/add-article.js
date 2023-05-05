import React from 'react'
import "@uiw/react-md-editor/markdown-editor.css";
import "@uiw/react-markdown-preview/markdown.css"; 
import dynamic from "next/dynamic";
import rehypeSanitize from "rehype-sanitize";
import { useState } from "react";
import { abiWikiw3bAddress } from "../utils/config.js";
import Wikiwe3b from "../utils/abi/Wikiw3b.json"
import { useRouter } from "next/router";
import { ethers } from "ethers";

const MDEditor = dynamic(
    () => import("@uiw/react-md-editor").then((mod) => mod.default),
    { ssr: false }
  );

const AddArticle = () => {
  const router = useRouter();
  const [formInput, updateFormInput] = useState({
    content: "",
    commnents: "",
  });

  const addArticle = async () => {
    const { ethereum } = window;
    if(ethereum) {
        const provider = new ethers.providers.Web3Provider(ethereum);    
        const signer = provider.getSigner();
        const contract = new ethers.Contract(abiWikiw3bAddress, Wikiwe3b.abi, signer);
        const transaction = await contract.addWikiw3b(formInput.content, formInput.commnents);
        transaction.wait();
        router.push('/');
    }

}

  const [value, setValue] = useState("**Hello world!!!**");
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
        style={{ width: '50%', margin: 'auto', marginTop: '2%' }}
      />
      <input
          placeholder="Comment"
          className="mt-2 border rounded p-4"
          onChange={(e) =>
            updateFormInput({ ...formInput, commnents: e.target.value })
          }
          style={{ marginLeft: '42%', marginTop: '2%' }}
        />

      {/* <div style={{ paddingTop: 50 }}>
        <Markdown source={value} />
      </div> */}
     {/*  <EditerMarkdown source={value} /> */}

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