import React, { Component } from "react";
import "./styles.css";

export class UploadComponent extends Component {
  state = {
    imageTags: [],
    imageSrc: null,
    currentTag: "",
    loading: false, // Added loading state
    searchText: "", // Added search text state
  };

  componentDidMount() {
    const dropArea = document.getElementById("drop-area");
    ["dragenter", "dragover", "dragleave", "drop"].forEach((eventName) => {
      dropArea.addEventListener(eventName, this.preventDefaults, false);
    });

    ["dragenter", "dragover"].forEach((eventName) => {
      dropArea.addEventListener(eventName, this.highlight, false);
    });

    ["dragleave", "drop"].forEach((eventName) => {
      dropArea.addEventListener(eventName, this.unHightLight, false);
    });

    dropArea.addEventListener("drop", this.handleDrop, false);
  }

  componentWillUnmount() {
    const dropArea = document.getElementById("drop-area");
    ["dragenter", "dragover", "dragleave", "drop"].forEach((eventName) => {
      dropArea.removeEventListener(eventName, this.preventDefaults, false);
    });

    ["dragenter", "dragover"].forEach((eventName) => {
      dropArea.removeEventListener(eventName, this.highlight, false);
    });

    ["dragleave", "drop"].forEach((eventName) => {
      dropArea.removeEventListener(eventName, this.unHightLight, false);
    });

    dropArea.removeEventListener("drop", this.handleDrop, false);
  }

  preventDefaults = (e) => {
    e.preventDefault();
    e.stopPropagation();
  };

  highlight = () => {
    const ele = document.querySelector(".upload-label");
    if (ele) {
      ele.style.backgroundColor = "#e9e9e9";
      ele.style.border = "2px dotted #999";
    }
  };

  unHightLight = () => {
    const ele = document.querySelector(".upload-label");
    if (ele) {
      ele.style.backgroundColor = "#f6f6f6";
      ele.style.border = "unset";
    }
  };

  addTagToImage = (tag, imageSrc) => {
    this.setState((prevState) => ({
      imageTags: [
        ...prevState.imageTags,
        { imageSrc: imageSrc, tag: tag },
      ],
      currentTag: "",
    }));
  };

  handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();

    const dt = e.dataTransfer;
    const { files } = dt;

    if (files.length > 0) {
      let reader = new FileReader();
      reader.readAsDataURL(files[0]);

      // Set loading to true while loading the image
      this.setState({ loading: true });

      reader.onloadend = () => {
        const imageSrc = reader.result;

        // Simulate a delay to demonstrate the loading state
        setTimeout(() => {
          this.setState({ imageSrc, loading: false });

          const tag = prompt("Enter a tag for this image:");

          if (tag) {
            this.addTagToImage(tag, imageSrc);
          }
        }, 1000); // You can adjust the delay as needed
      };
    }
  };

  handleTagChange = (e) => {
    this.setState({ currentTag: e.target.value });
  };

  handleAddTag = () => {
    const { currentTag, imageSrc } = this.state;
    if (currentTag) {
      this.addTagToImage(currentTag, imageSrc);
    }
  };

  handleSearch = (e) => {
    this.setState({ searchText: e.target.value });
  };

  render() {
    const { imageTags, imageSrc, currentTag, loading, searchText } = this.state;

    // Filter images based on the search text
    const filteredImages = imageTags.filter((item) =>
      item.tag.toLowerCase().includes(searchText.toLowerCase())
    );

    return (
      <div id="drop-area" >
        <input
          type="file"
          id="fileElem"
          accept="image/*"
          onChange={(e) => {
            this.handleDrop(e);
          }}
        />
        <label className="upload-label" htmlFor="fileElem">
          <div className="upload-text">
            Drag Image here or click to upload
          </div>
        </label>
        {loading && <div className="loading-spinner">Loading...</div>}
        {imageSrc && !loading && (
          <div key={imageSrc} className="image-list">
            <img src={imageSrc} className="image" alt="Uploaded" />
            <div>Tag: {currentTag}</div>
          </div>
        )}
       
        <input
          type="text"
          placeholder="Search tags"
          value={searchText}
          onChange={this.handleSearch}
        />
        <div className="image-list">
          {filteredImages.map((item, index) => (
            <div key={index}>
              <img src={item.imageSrc} className="image" alt="Uploaded" />
              <div>Tag: {item.tag}</div>
            </div>
          ))}
        </div>
      </div>
    );
  }
}
