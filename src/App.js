import './App.css';
import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPenToSquare, faDesktop, faUpRightAndDownLeftFromCenter, faDownLeftAndUpRightToCenter } from '@fortawesome/free-solid-svg-icons'

import Prism from "prismjs"
import "prismjs/themes/prism-okaidia.min.css"
import { convertMd } from "./util/convert-md"

class App extends Component {
  constructor() {
    super();
    this.state = { text: "", editorFullScreen: false, viewerFullScreen: false }
    this.transferMarkdown = this.transferMarkdown.bind(this);
    this.MaxSize = this.MaxSize.bind(this);
    this.MinSize = this.MinSize.bind(this);
  }
  transferMarkdown(e) {
    const val = e.target.value
    this.setState({ text: convertMd(val) });

  }

  componentDidMount() {
    if (this.state.text) {
      Prism.highlightAll()
    }
  }
  componentDidUpdate() {
    if (this.state.text) {
      Prism.highlightAll()
    }
  }
  MaxSize(event) {
    var Editor = "Editor"
    if (event.currentTarget.value === Editor) {
      this.setState({ editorFullScreen: true, viewerFullScreen: false })
    }
    else {
      this.setState({ editorFullScreen: false, viewerFullScreen: true })
    }
  }
  MinSize() {
    this.setState({ editorFullScreen: false, viewerFullScreen: false })
  }
  render() {


    return (
      <div>
        <Header />
        <div className=' row mx-auto justify-content-evenly mt-5 pb-5'>
          <div id='editor-side' className={`card p-0 mb-5 ${this.state.editorFullScreen ? 'col-12' : this.state.viewerFullScreen ? 'd-none' : 'col-md-5'}`} >
            <HeaderCard FullScreen={this.state.editorFullScreen} MinSize={this.MinSize} MaxSize={this.MaxSize} Value={"Editor"} Icon={faPenToSquare} />
            <textarea className='w-100 card p-2 h-100' onChange={this.transferMarkdown} style={{ minHeight: "500px" }} placeholder='Type here..'></textarea>
          </div>
          <div id='viewer-side' className={`card p-0 mb-5 ${this.state.viewerFullScreen ? 'col-12' : this.state.editorFullScreen ? 'd-none' : 'col-md-5'}`}>
            <HeaderCard FullScreen={this.state.viewerFullScreen} MinSize={this.MinSize} MaxSize={this.MaxSize} Value={"Viewer"} Icon={faDesktop} />
            <div dangerouslySetInnerHTML={{ __html: this.state.text }} className="p-2" />
          </div>
        </div>
      </div>
    );
  }
}

const Header = (props) => {
  return (
    <header>
      <h1 className='text-center main-color mt-3'>Markdown Viewer</h1>
      <h5 className='text-center'>By Natanael Geraldo</h5>
    </header>
  );
}

const HeaderCard = (props) => {
  return (
    <div className="card-header d-flex justify-content-between">
      <div>
        <FontAwesomeIcon icon={props.Icon} />
        <span className='px-3'>{props.Value}</span>
      </div>
      <div>
        <button onClick={props.FullScreen ? props.MinSize : props.MaxSize} value={props.Value} className='d-md-block d-none'>
          {props.FullScreen
            ?
            <FontAwesomeIcon icon={faDownLeftAndUpRightToCenter} />
            :
            <FontAwesomeIcon icon={faUpRightAndDownLeftFromCenter} />
          }
        </button>

      </div>
    </div>
  );
}

export default App;
