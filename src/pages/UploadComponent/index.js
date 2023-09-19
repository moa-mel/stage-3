import React, { Component } from "react";
import "./styles.css";

export class UploadComponent extends Component {
  state = {
    imageTags: [], // Change to an array to store multiple images and tags
    imageSrc: null,
    currentTag: "",
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
      reader.onloadend = () => {
        const imageSrc = reader.result;

        this.setState({ imageSrc });

        const tag = prompt("Enter a tag for this image:");

        if (tag) {
          this.addTagToImage(tag, imageSrc);
        }
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

  render() {
    const { imageTags, imageSrc, currentTag } = this.state;

    return (
      <div id="drop-area">
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
        {imageTags.map((item, index) => (
          <div key={index}>
            <img src={item.imageSrc} className="image" alt="Uploaded" />
            <div>Tag: {item.tag}</div>
          </div>
        ))}
       
      </div>
    );
  }
}
