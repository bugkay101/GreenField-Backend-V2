// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;


contract AggicContract {
    address public owner;

    uint16 public tax = 10;

    address[] private addresses;
    uint256 private id = 0;

    Item[] public allItems;
    Order[] public allOrders;

    //struct of information of listing items four
    //array category
    struct Item {
        uint256 id;
        address seller;
        string author;
        string name;
        string category;
        string image;
        string discription;
        uint256 cost;
        uint256 stock;
        uint256 createdAt;
        uint256 updatedAt;
    }

    struct Order {
        uint256 time;
        address buyer;
        Item item;
    }

    struct Wishlist {
        address buyer;
        Item[] items;
    }

    // so make product seperate from the struct and put it in a private mapping to be able to get product
    // a view for msg.sender to check through items he has order if the item id is there then he can view the product

    // mapping(address => Order) public orders;
    mapping(uint256 => Item) public items;
    mapping(address => mapping(uint256 => Order)) public orders;
    mapping(address => Wishlist) public wishlists;
    mapping(address => uint256) public orderCount;
    mapping(uint256 => string) private products;

    event Buy(address buyer, uint256 orderId, uint256 itemId);
    event List(
        string author,
        string name,
        uint256 cost,
        uint256 quantity,
        string discription
    );
    
    modifier onlyOwner() {
        require(msg.sender == owner);
        _;
    }

    constructor() {
        //the owner of the contract the one that can add to the array of lister
        owner = msg.sender;
    }

    function findItemIndex(uint256 _id) internal view returns (uint256) {
        uint256 index = 0;
        for (uint256 i = 0; i < allItems.length; i++) {
            if (allItems[i].id == _id) {
                index = i;
                break;
            }
        }
        return index;
    }

    function ifSellerExist(address _address) public view returns (bool) {
        for (uint256 i = 0; i < addresses.length; i++) {
            if (addresses[i] == _address) {
                return true;
            }
        }
        return false;
    }

    // Function to add an address to the array
    function addSeller(address _address) public onlyOwner {
        require(ifSellerExist(_address) == false, "Address already in array.");
        addresses.push(_address);
    }

    //function to remove address from array
    function removeSeller(address _address) public onlyOwner {
        require(ifSellerExist(_address), "Address not in array.");
        for (uint256 i = 0; i < addresses.length; i++) {
            if (addresses[i] == _address) {
                addresses[i] = addresses[addresses.length - 1];
                addresses.pop();
                break;
            }
        }
    }

    function generateNewId() internal returns (uint256) {
        id = id + 1;
        return id;
    }

    //creates a product that will be brought on the site
    function list(
        string memory _author,
        string memory _name,
        string memory _category,
        string memory _image,
        string memory _product,
        string memory _discription,
        uint256 _cost,
        uint256 _stock
    ) public {
        require(
            ifSellerExist(msg.sender),
            "Only addresses in the array can list new items."
        );

        // Check if inputs are within the specified length
        require(
            bytes(_author).length <= 150 && bytes(_name).length <= 150,
            "Author and name should not have more than 150 characters."
        );
        require(
            bytes(_category).length <= 100,
            "Category should not have more than 100 characters."
        );
        require(
            bytes(_discription).length <= 2000,
            "Description should not have more than 2000 characters."
        );
        require(
            bytes(_product).length >= 5,
            "Image should not have more than 500 characters."
        );
        require(
            bytes(_name).length >= 5,
            "Image should not have more than 500 characters."
        );

        uint256 _id = generateNewId();

        // Create Item
        Item memory item = Item(
            _id,
            msg.sender,
            _author,
            _name,
            _category,
            _image,
            _discription,
            _cost,
            _stock,
            block.timestamp,
            block.timestamp
        );
        // Add Item to mapping
        items[_id] = item;
        allItems.push(item);

        // Add product to products mapping
        products[_id] = _product;

        // Emit event
        emit List(_author, _name, _cost, _stock, _discription);
    }

    function editItem(
        uint256 _id,
        string memory _name,
        string memory _category,
        string memory _image,
        string memory _product,
        string memory _discription,
        uint256 _cost,
        uint256 _stock
    ) public {
        // Fetch item
        Item memory item = items[_id];

        require(item.id == _id, "Item does not exist");
        require(item.seller == msg.sender, "You did not list this item");

        // Check if inputs are within the specified length
        require(
            bytes(_name).length <= 150,
            "Name should not have more than 150 characters."
        );
        require(
            bytes(_category).length <= 100,
            "Category should not have more than 100 characters."
        );
        require(
            bytes(_discription).length <= 2000,
            "Description should not have more than 2000 characters."
        );
        require(
            bytes(_product).length >= 5,
            "product should be more than 5 characters."
        );
        require(
            bytes(_name).length >= 5,
            "name should be more than 5 characters."
        );
        items[_id].name = _name;
        items[_id].category = _category;
        items[_id].image = _image;
        items[_id].discription = _discription;
        items[_id].cost = _cost;
        items[_id].stock = _stock;
        items[_id].updatedAt = block.timestamp;

        // Edit product in products mapping
        products[_id] = _product;

        uint256 index = findItemIndex(_id);
        allItems[index].discription = _discription;
        allItems[index].name = _name;
        allItems[index].category = _category;
        allItems[index].image = _image;
        allItems[index].cost = _cost;
        allItems[index].stock = _stock;
        allItems[index].updatedAt = block.timestamp;
    }

    //this function removes an item from the mapping
    function removeItem(uint256 _id) public {
        // Fetch item
        Item memory item = items[_id];

        require(item.id == _id, "Item does not exist");
        require(
            item.seller == msg.sender || owner == msg.sender,
            "you did not list this item"
        );

        delete items[_id];

        uint256 index = findItemIndex(_id);
        delete allItems[index];
    }

    function getAllItems() public view returns (Item[] memory) {
        return allItems;
    }

    function getallOrders() public view returns (Order[] memory) {
        return allOrders;
    }

    function getOrdersByBuyer(address _buyer)
        public
        view
        returns (Order[] memory)
    {
        // Initialize a new dynamic array to store the buyer's orders
        uint256 ordered = orderCount[_buyer];
        Order[] memory buyerOrders = new Order[](ordered);

        // Loop through the buyer's orders using the order count
        for (uint256 i = 1; i <= ordered; i++) {
            // Fetch the order
            Order memory order = orders[_buyer][i];

            // Add the order to buyerOrders
            buyerOrders[i - 1] = order;
        }

        // Return the buyer's orders
        return buyerOrders;
    }

    function hasOrderedItem(address _buyer, uint256 _itemId)
        internal
        view
        returns (bool)
    {
        Order[] memory buyerOrders = getOrdersByBuyer(_buyer);
        for (uint256 i = 0; i < buyerOrders.length; i++) {
            if (buyerOrders[i].item.id == _itemId) {
                return true;
            }
        }
        return false;
    }

    function viewProduct(uint256 itemId)
        public
        view
        returns (string memory product)
    {
        require(
            hasOrderedItem(msg.sender, itemId),
            "You have not bought this product"
        );

        // Fetch product
        product = products[itemId];
    }

    function setTax(uint16 _tax) public onlyOwner {
        tax = _tax;
    }

    //call transfer function in here
    function buy(uint256 _id) public payable {
        // Fetch item
        Item memory item = items[_id];
        // URGENT IF DEPLOYING NEXT CONTRACT
        // replace this with just normal value multiple value in the front end and end result also divid value in transformer
        uint256 costInWei = (item.cost);
        // Require enough ether to buy item
        require(msg.value >= costInWei, "you don not have enough funds");

        // Require item is in stock
        require(item.stock > 0, "item is out of stock");

        // Create order
        Order memory order = Order(block.timestamp, msg.sender, item);

        // Add order for user
        orderCount[msg.sender]++; // <-- Order ID
        orders[msg.sender][orderCount[msg.sender]] = order;

        // Subtract stock
        items[_id].stock = item.stock - 1;
        uint256 index = findItemIndex(_id);
        allItems[index].stock = item.stock - 1;

        //percentage to take from the buyer to the seller (figure it out)
        uint256 amount = (msg.value * tax) / 100;

        //transfer to seller
        payable(item.seller).transfer(msg.value - amount);
        payable(owner).transfer(amount);
        allOrders.push(order);

        // Emit event
        emit Buy(msg.sender, orderCount[msg.sender], item.id);
    }

    // function addWishlistItem(uint256 _itemId) public {
    //    Item memory item = items[_itemId];
    //     require(item.stock > 0, "item is out of stock");// Ensure item exists

    //     Wishlist storage wishlist = wishlists[msg.sender];

    //     if (wishlist.buyer == address(0)) {
    //         wishlist.buyer = msg.sender;
    //     }

    //     wishlist.items.push(item);
    // }

    // function removeWishlistItem(uint256 index) public {
    //     require(index < wishlists[msg.sender].items.length, "Invalid index");

    //     // Shift array elements left to fill the gap
    //     for (uint256 i = index; i < wishlists[msg.sender].items.length - 1; i++) {
    //         wishlists[msg.sender].items[i] = wishlists[msg.sender].items[i + 1];
    //     }

    //     wishlists[msg.sender].items.pop();
    //   }

    //this will be for the money made by the smart contract don't ask me y i dont know yet 🤷🏾‍♂ but just incase 🤦🏾‍♂
    function withdraw() public onlyOwner {
        (bool success, ) = owner.call{value: address(this).balance}("");
        require(success);
    }
}

