import React, { useState, useRef } from 'react';
import image1 from "./images/image1.jpg";
import image2 from "./images/image2.jpg"; // Import your images
import "./Dd.css"

const Dd = () => {
  
  const dragItem = useRef();
  const dragOverItem = useRef();
  const [list, setList] = useState([
    { id: '1', content: <img src={image1} alt=" " />, tag: 'tag 1' },
    { id: '2', content: <img src={image2} alt=" " />, tag: 'Tag 2' },
    // Add more images with tags as needed
  ]);

  const [searchText, setSearchText] = useState('');

  const dragStart = (e, position) => {
    dragItem.current = position;
    console.log(e.target.innerHTML);
  };
 
  const dragEnter = (e, position) => {
    dragOverItem.current = position;
    console.log(e.target.innerHTML);
  };
 
  const drop = (e) => {
    const copyListItems = [...list];
    const dragItemContent = copyListItems[dragItem.current];
    copyListItems.splice(dragItem.current, 1);
    copyListItems.splice(dragOverItem.current, 0, dragItemContent);
    dragItem.current = null;
    dragOverItem.current = null;
    setList(copyListItems);
  };

  const handleSearch = (e) => {
    const searchTerm = e.target.value.toLowerCase();
    setSearchText(searchTerm);
  };

  // Filter the list based on the search text
  const filteredList = list.filter(item =>
    item.tag.toLowerCase().includes(searchText)
  );

  return (
    <>
      <input
        type="text"
        placeholder="Search tags"
        value={searchText}
        onChange={handleSearch}
      />
      {filteredList.map((item, index) => (
        <div
          style={{ backgroundColor: 'lightblue', margin: '20px 25%', textAlign: 'center', fontSize: '40px' }}
          onDragStart={(e) => dragStart(e, index)}
          onDragEnter={(e) => dragEnter(e, index)}
          onDragEnd={drop}
          key={item.id}
          draggable
        >
          {item.content}
          <div>Tag: {item.tag}</div>
        </div>
      ))}
    </>
  );
};

export default Dd;
