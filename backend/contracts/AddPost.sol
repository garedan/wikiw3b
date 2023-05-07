// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

contract AddPost {
    constructor () {}

    struct PostItem {
        uint32 id;
        address creator_address;
        string topic;
    }

    uint32 private idCounter;
    PostItem[] private posts;

    function addPost(
        string memory topic
    ) public {
        posts.push(
            PostItem(idCounter, msg.sender, topic)
        );
        idCounter++;
    }

    function getAllPosts() public view returns(PostItem[] memory) {
        return posts;
    }

    function getPostsByOwner() 
        public
        view
        returns (PostItem[] memory)
    {
        uint256 itemCount = 0;

        for(uint256 i = 0; i < posts.length; i++) {
            if(posts[i].creator_address == msg.sender) {
                itemCount += 1;
            }
        }

        PostItem[] memory myPosts = new PostItem[](itemCount);
        for(uint256 i = 0; i < posts.length; i++) {
            if(posts[i].creator_address == msg.sender) {
                myPosts[i] = posts[i];
            }
        }

        return myPosts;
    }   

    function tip(uint256 _index) 
        external 
        payable 
    {
        address payable owner = payable(posts[_index].creator_address);
        owner.transfer(msg.value);
    } 
}