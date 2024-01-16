import React, { useState, useEffect } from "react";

const Chip = ({ item, onRemove }) => (
  <div className="flex items-center p-2 border rounded mr-2 bg-gray-200 h-60">
    <img
      src={`https://robohash.org/${item.id}u?50x50`}
      alt="robot"
      className="h-8 w-8 rounded-full mr-2"
    />
    <span className="mr-2">{item.name}</span>

    <button onClick={onRemove} className="text-red-500">
      Remove
    </button>
  </div>
);

const SearchField = () => {
  const [searchText, setSearchText] = useState("");
  const [searchItems, setSearchItems] = useState([]);
  const [selectedItems, setSelectedItems] = useState([]);
  const [notselectedItems, setNotselectedItems] = useState([]);
  const [dropdownItems, setdropItems] = useState([]);
  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/users")
      .then((Response) => {
        return Response.json();
      })
      .then((data) => {
        setdropItems(data);
        setNotselectedItems(data);
      })
      .catch((err) => console.log("oops error occured", err));
  }, []);

  useEffect(() => {
    console.log(searchText);
    console.log("not selected itms", notselectedItems);
    let currItems = notselectedItems.filter((item) => {
      return item.name.toLowerCase().includes(searchText.toLowerCase());
    });
    console.log(currItems);
    setSearchItems(currItems);
  }, [searchText]);

  useEffect(() => {
    setSearchItems(notselectedItems);
  }, [notselectedItems]);

  const handleItemClick = (item) => {
    console.log("handle clicked item", item);
    let currItem = notselectedItems.filter((data) => data.id != item.id);
    let currsearchItem = searchItems.filter((data) => data.id != item.id);
    setSelectedItems([...selectedItems, item]);
    setNotselectedItems(currItem);
    setSearchItems(currsearchItem);
  };

  const handleRemoveItem = (index) => {
    const newItems = [...selectedItems];
    setSearchItems([...notselectedItems, newItems[index]]);
    setNotselectedItems([...notselectedItems, newItems[index]]);
    newItems.splice(index, 1);
    setSelectedItems(newItems);
  };

  return (
    <div className="max-w-md mx-auto mt-8 p-4 border rounded-lg shadow-lg">
      <div className="flex flex-wrap mb-4">
        {selectedItems.length > 0
          ? selectedItems.map((item, index) => (
              <Chip
                key={item.id}
                item={item}
                onRemove={() => handleRemoveItem(index)}
              />
            ))
          : ""}
      </div>
      <div className="relative mb-4">
        <input
          type="text"
          placeholder="Search..."
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
          className="w-full p-2 pl-8 border rounded focus:outline-none focus:shadow-outline"
        />
      </div>
      <div className="mb-4">
        {searchItems.length > 0
          ? searchItems.map((item) => (
              <div
                key={item.id}
                onClick={() => handleItemClick(item)}
                className="flex items-center p-2 cursor-pointer hover:bg-gray-100"
              >
                <img
                  src={`https://robohash.org/${item.id}u?50x50`}
                  alt="robot"
                  className="h-8 w-8 rounded-full mr-2"
                />
                <span>{item.name}</span>
                <span className="p-10 m-10">{item.email}</span>
              </div>
            ))
          : ""}
      </div>
    </div>
  );
};

export default SearchField;
