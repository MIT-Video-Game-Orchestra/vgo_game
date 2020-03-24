import * as React from "react";

export function HitboxEditor(){
  return <UploadButton/>
};

// Modified boilerplate upload button
class UploadButton extends React.Component {
  fileInput: React.RefObject<HTMLInputElement>;
  readonly state = {
    imgSrc: null,
    imgWidth: null,
    imgHeight: null
  }
  constructor(props) {
    super(props);
    this.handleUpload = this.handleUpload.bind(this);
    this.handleExport = this.handleExport.bind(this);
    this.onImgLoad = this.onImgLoad.bind(this);
    this.fileInput = React.createRef();
  }
  handleUpload(event) {
    event.preventDefault();
    this.setState({
      imgSrc: URL.createObjectURL(event.target.files[0]),
    })
  }
  handleExport(event) {
    console.log("export");
  }
  onImgLoad(event) {
    console.log(event.target.naturalWidth);
    console.log(event.target.naturalHeight);
    this.setState({
      imgWidth: event.target.naturalWidth,
      imgHeight: event.target.naturalHeight
    })
    console.log(this.state.imgWidth);
    console.log(this.state.imgHeight);
  }

  render() {
    return (
      <div>
          <input 
          type="file" 
          accept="image/*" 
          onChange={this.handleUpload} 
          ref={this.fileInput}
          />
          <img 
          src={this.state.imgSrc}
          draggable={false}
          onLoad={this.onImgLoad}
          />
          <button
          type="button"
          onClick={this.handleExport}
          >
            Export Hitboxes
          </button>
      </div>
    );
  }
}
