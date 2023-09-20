import React, { useState, useRef } from 'react';
import image1 from "./images/image1.jpg";
import image2 from "./images/image2.jpg"; // Import your images
import "./Dd.css"

const Dd = () => {
  
  const dragItem = useRef();
  const dragOverItem = useRef();
  const [list, setList] = useState([
    { id: 'image-1', content: <img src={image1} alt=" " style={{ width: '200px', height: 'auto' }} />, tag: 'Nature' },
    { id: 'image-2', content: <img src={image2} alt=" " style={{ width: '200px', height: 'auto' }} />, tag: 'Travel' },
    // Add more images with tags as needed
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
      className='dd-input'
        type="text"
        placeholder="Search tags"
        value={searchText}
        onChange={handleSearch}
      />
       <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '20px' }}>
      {filteredList.map((item, index) => (
        <div
          style={{ margin: '2px 5%', textAlign: 'center', fontSize: '2px', width: '10px' }}
          onDragStart={(e) => dragStart(e, index)}
          onDragEnter={(e) => dragEnter(e, index)}
          onDragEnd={drop}
          key={item.id}
          draggable
        >
          {item.content}
          <div style={{fontSize:'16px'}}> {item.tag}</div>
        </div>
      ))}
      </div>
    </>
  );
};

export default Dd;
