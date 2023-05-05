// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

contract Wikiw3b {
    constructor () {}

    struct Wikiw3bItem {
        uint32 id;
        address creator_address;
        string content;
        string comments;
    }

    uint32 private idCounter;
    Wikiw3bItem[] private wikiw3bs;

    function addWikiw3b(
        string memory content,
        string memory comments
    ) public {
        wikiw3bs.push(
            Wikiw3bItem(idCounter, msg.sender, content, comments)
        );
        idCounter++;
    }

    function getAllWikiw3bs() public view returns(Wikiw3bItem[] memory) {
        return wikiw3bs;
    }

    function getWikiw3bsByOwner() 
        public
        view
        returns (Wikiw3bItem[] memory)
    {
        uint256 itemCount = 0;

        for(uint256 i = 0; i < wikiw3bs.length; i++) {
            if(wikiw3bs[i].creator_address == msg.sender) {
                itemCount += 1;
            }
        }

        Wikiw3bItem[] memory myWebs = new Wikiw3bItem[](itemCount);
        for(uint256 i = 0; i < wikiw3bs.length; i++) {
            if(wikiw3bs[i].creator_address == msg.sender) {
                myWebs[i] = wikiw3bs[i];
            }
        }

        return myWebs;
    }    
}