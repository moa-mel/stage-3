import React, { Component } from "react";
import "./styles.css";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import image1 from "../../images/image1.jpg"
import image2 from "../../images/image2.jpg"
import selfie from "../../images/picture.jpeg"
import { Spinner } from '@chakra-ui/react'

export class UploadComponent extends Component {
  state = {
    searchText: "",
    staticImages: [
      {
        id: "1",
        imageSrc: image1,
        tag: "Nature",
      },
      {
        id: "2",
        imageSrc: image2,
        tag: "Travel",
      },
      {
        id: "3",
        imageSrc: selfie,
        tag: "Selfie",
      },
    ],
    loading: false,
  };

  handleSearch = (e) => {
    this.setState({ searchText: e.target.value });
  };

  onDragEnd = (result) => {
    if (!result.destination) return;

    const staticImages = [...this.state.staticImages];
    const [reorderedImage] = staticImages.splice(result.source.index, 1);
    staticImages.splice(result.destination.index, 0, reorderedImage);

    this.setState({ staticImages });
  };

  simulateLoading = () => {
    this.setState({ loading: true });

    // Simulate loading for 2 seconds
    setTimeout(() => {
      this.setState({ loading: false });
    }, 2000);
  };

  componentDidMount() {
    // Simulate loading when the component mounts
    this.simulateLoading();
  }

  render() {
    const { searchText, staticImages, loading } = this.state;

    // Filter static images based on the search text
    const filteredStaticImages = staticImages.filter((item) =>
      item.tag.toLowerCase().includes(searchText.toLowerCase())
    );

    return (
      <div id="drop-area">
        <input
          type="text"
          placeholder="Search tags"
          value={searchText}
          onChange={this.handleSearch}
        />
        {loading ? (
          <div className="loading-spinner">
            <Spinner loading={loading}/>
          </div>
        ) : (
          <DragDropContext onDragEnd={this.onDragEnd}>
            <Droppable droppableId="static-images">
              {(provided) => (
                <div
                  className="image-list"
                  {...provided.droppableProps}
                  ref={provided.innerRef}
                >
                  {filteredStaticImages.map((staticImage, index) => (
                    <Draggable
                      key={staticImage.id}
                      draggableId={staticImage.id}
                      index={index}
                    >
                      {(provided) => (
                        <div
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                        >
                          <img
                            src={staticImage.imageSrc}
                            className="image"
                            alt=" "
                          />
                          <div>Tag: {staticImage.tag}</div>
                        </div>
                      )}
                    </Draggable>
                  ))}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          </DragDropContext>
        )}
      </div>
    );
  }
}