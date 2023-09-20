import React, { useState, useRef, useEffect } from 'react';
import image1 from "./images/image1.jpg";
import image2 from "./images/image2.jpg"; // Import your images 
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
        { id: '1', content: <img src={image1} alt=" " style={{ width: '200px', height: 'auto' }}/>, tag: 'Nature' },
        { id: '2', content: <img src={image2} alt=" " style={{ width: '200px', height: 'auto' }}/>, tag: 'Travel' },
        // Add more images with tags as needed
      ]);
      setLoading(false); // Set loading to false when images are ready
    }, 8000); // Simulate a 2-second loading delay
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
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '20px' }}>
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
