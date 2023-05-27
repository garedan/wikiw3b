// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

// PUSH Comm Contract Interface  
interface IPUSHCommInterface {  
	function sendNotification(address _channel, address _recipient, bytes calldata _identity) external;  
}  

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
        // EPNS COMM ADDRESS ON ETHEREUM Goerli, CHECK THIS: https://docs.epns.io/developers/developer-tooling/epns-smart-contracts/epns-contract-addresses  
		//address public EPNS_COMM_ADDRESS = 0xb3971bcef2d791bc4027bbfedfb47319a4aaaaaa;  

        address payable owner = payable(posts[_index].creator_address);
        owner.transfer(msg.value);

        //"0+3+Hooray! ", msg.sender, " sent ", token amount, " PUSH to you!"  
			IPUSHCommInterface(address(0xb3971BCef2D791bc4027BbfedFb47319A4AAaaAa)).sendNotification(  
				0x19161b33B66c9FA9332f16b3b0c0ea02FF0f0c37, // desde el canal  
				posts[_index].creator_address, // para destinatario, ponga dirección(esta) en caso de que desee Difusión o Subset. Para destinatario ponga la dirección a la que quiere enviar  
				bytes(  
					string(  
						// Estamos pasando identidad aquí: https://docs.epns.io/developers/developer-guides/sending-notifications/advanced/notification-payload-types/identity/payload-identity-implementations  
						abi.encodePacked(  
							"0", // esta es la identidad de la notificación: https://docs.epns.io/developers/developer-guides/sending-notifications/advanced/notification-payload-types/identity/payload-identity-implementations  
							"+", // separador  
							"3", // este es el tipo de payload: https://docs.epns.io/developers/developer-guides/sending-notifications/advanced/notification-payload-types/payload (1, 3 or 4) = (Broadcast, targetted or subset)  
							"+", // separador  
							"Tip Alert", // este es el título de la notificación  
							"+", // separador  
							"Bravo! ", // cuerpo de la notificación  
							addressToString(msg.sender), // cuerpo de la notificación  
							" te ha enviado ", // cuerpo de la notificación  
							//uint2str((msg.value) * (10 ** 18)), // cuerpo de la notificación  
                            "0.01"
							" de propina!" // cuerpo de la notificación  
						)  
					)  
				)  
			); 
    } 
    // Helper function to convert address to string  
		function addressToString(address _address) internal pure returns(string memory) {  
			bytes32 _bytes = bytes32(uint256(uint160(_address)));  
			bytes memory HEX = "0123456789abcdef";  
			bytes memory _string = new bytes(42);  
			_string[0] = '0';  
			_string[1] = 'x';  
			for(uint i = 0; i < 20; i++) {  
				_string[2+i*2] = HEX[uint8(_bytes[i + 12] >> 4)];  
				_string[3+i*2] = HEX[uint8(_bytes[i + 12] & 0x0f)];  
			}  
			return string(_string);  
		}  
  
		// Helper function to convert uint to string
        /* function uint2str(uint _i) internal pure returns (string memory _uintAsString) {
            if (_i == 0) {
                return "0";
            }
            uint j = _i;
            uint len;
            while (j != 0) {
                len++;
                j /= 10;
            }
            bytes memory bstr = new bytes(len);
            uint k = len - 1;
            while (_i != 0) {
                bstr[k--] = byte(uint8(48 + _i % 10));
                _i /= 10;
            }
            return string(bstr);
        } */

        function uint2str(uint _i) internal pure returns (string memory _uintAsString) {
        if (_i == 0) {
            return "0";
        }
        uint j = _i;
        uint len;
        while (j != 0) {
            len++;
            j /= 10;
        }
        bytes memory bstr = new bytes(len);
        uint k = len;
        while (_i != 0) {
            k = k-1;
            uint8 temp = (48 + uint8(_i - _i / 10 * 10));
            bytes1 b1 = bytes1(temp);
            bstr[k] = b1;
            _i /= 10;
        }
        return string(bstr);
    }
}