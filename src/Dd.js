import React, { useState, useRef, useEffect } from 'react';
import image1 from "./images/image1.jpg";
import image2 from "./images/image2.jpg"; 
import fire from "./images/fire.jpg"; 
import baloon from "./images/baloon.jpg"; 
import sitting from "./images/sitting.jpg"; 
import sky from "./images/sky.jpg"; 
import moon from "./images/moon.jpg"; 
import sunset from "./images/sunset.jpg"; 
import "./Dd.css"

const Dd = () => {
  const [loading, setLoading] = useState(true); // State to track loading
  const dragItem = useRef();
  const dragOverItem = useRef();
  const [list, setList] = useState([]);
  const [searchText, setSearchText] = useState('');

  useEffect(() => {
    // Simulate loading images
    setTimeout(() => {
      setList([
        { id: '1', content: <img src={image1} alt=" " style={{ width: '200px', height: 'auto' }}/>, tag: 'nature' },
        { id: '2', content: <img src={image2} alt=" " style={{ width: '200px', height: 'auto' }}/>, tag: 'travel' },
        { id: '3', content: <img src={fire} alt=" " style={{ width: '200px', height: '300px' }}/>, tag: 'fire' },
        { id: '4', content: <img src={baloon} alt=" " style={{ width: '200px', height: 'auto' }}/>, tag: 'sky' },
        { id: '5', content: <img src={sitting} alt=" " style={{ width: '200px', height: '300px' }}/>, tag: 'travel' },
        { id: '6', content: <img src={moon} alt=" " style={{ width: '200px', height: '300px' }}/>, tag: 'travel' },
        { id: '7', content: <img src={sky} alt=" " style={{ width: '200px', height: '300px' }}/>, tag: 'sky' },
        { id: '8', content: <img src={sunset} alt=" " style={{ width: '200px', height: 'auto' }}/>, tag: 'sun' },
      ]);
      setLoading(false); // Set loading to false when images are ready
    }, 3000); // Simulate a 2-second loading delay
  }, []);

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
    <div>
      {loading ? ( // Display loading spinner when loading is true
        <p>Loading...</p>
      ) : (
        <>
          <input
          className='dd-input'
            type="text"
            placeholder="Search tags"
            value={searchText}
            onChange={handleSearch}
          />
          <div className='dd-image' >
            {filteredList.map((item, index) => (
              <div
                style={{ textAlign: 'center', fontSize: '20px' }}
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
          </div>
        </>
      )}
    </div>
  );
};

export default Dd;
