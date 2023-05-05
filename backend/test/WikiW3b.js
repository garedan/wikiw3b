const { expect } = require("chai");
const { BigNumber, ethers } = require('hardhat')

describe("Wikiw3b", function () {
  it("Add a new article", async function () {
    const [owner, addr1] = await ethers.getSigners();
    const WikiW3b = await ethers.getContractFactory("Wikiw3b");
    const wikiw3b = await WikiW3b.deploy();
    await wikiw3b.deployed();

    //idCounter, msg.sender, content, comments
    var addArticle = await wikiw3b.addWikiw3b(
      "**Hello world!!!**",
      "Argentina"
    );

    await addArticle.wait();

    var addArticle2 = await wikiw3b
      .connect(addr1)
      .addWikiw3b(
        "**Hello world 2!!!**",
        "Argentina"
    );

    await addArticle2.wait();

    var articles = await wikiw3b.getAllWikiw3bs();
    expect(articles.length).to.equal(2);

    var articlesByOwner = await wikiw3b.getWikiw3bsByOwner();

    expect(articlesByOwner.length).to.equal(1);    
  });
});