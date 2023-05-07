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


    const balanceBefore = await ethers.provider.getBalance(addr1.address);
    console.log("addr1 balance before!", ethers.utils.formatEther(balanceBefore));
    const tipTxn = await addPost.tip(1, {value: ethers.utils.parseEther("1000")}); 

    await tipTxn.wait();
    const balanceAfter = await ethers.provider.getBalance(addr1.address)
    console.log("addr1 balance after!", ethers.utils.formatEther(balanceAfter));
  });
});