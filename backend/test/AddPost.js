const { expect } = require("chai");
const { BigNumber, ethers } = require('hardhat')

describe("AddPost", function () {
  it("Add 2 new posts", async function () {
    const [owner, addr1] = await ethers.getSigners();
    const AddPost = await ethers.getContractFactory("AddPost");
    const addPost = await AddPost.deploy();
    await addPost.deployed();

    //idCounter, msg.sender, content, comments
    var addingPost = await addPost.addPost(
      "Javascript"
    );

    await addingPost.wait();

    var addingPost2 = await addPost
      .connect(addr1)
      .addPost(
        "Solidity"
    );

    await addingPost2.wait();

    var posts = await addPost.getAllPosts();
    expect(posts.length).to.equal(2);

    var postsByOwner = await addPost.getPostsByOwner();

    expect(postsByOwner.length).to.equal(1);    
  });
});