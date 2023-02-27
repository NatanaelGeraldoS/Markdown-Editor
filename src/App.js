import './App.css';
import React, { Component } from 'react';
import ReactMarkdown from 'react-markdown';
import rehypeRaw from 'rehype-raw';
import remarkGfm from 'remark-gfm';
// import { rehype } from 'rehype'
import rehypeHighlight from 'rehype-highlight';
import remarkToc from 'remark-toc';
import rehypeParse from 'rehype-parse'
import rehypeSanitize, { defaultSchema } from 'rehype-sanitize'
import rehypeStringify from 'rehype-stringify'
import { unified } from 'unified'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPenToSquare, faDesktop, faUpRightAndDownLeftFromCenter, faDownLeftAndUpRightToCenter } from '@fortawesome/free-solid-svg-icons'
class App extends Component {
  constructor() {
    super();
    this.state = { text: "", editorFullScreen: false, viewerFullScreen: false }
    this.transferMarkdown = this.transferMarkdown.bind(this);
    this.MaxSize = this.MaxSize.bind(this);
    this.MinSize = this.MinSize.bind(this);
  }
  async transferMarkdown(event) {
    const file = await unified()
      .use(rehypeRaw)
      .use(rehypeParse, { fragment: true })
      .use(rehypeSanitize, {
        ...defaultSchema,
        attributes: {
          ...defaultSchema.attributes,
          code: [
            ...(defaultSchema.attributes.code || []),
            // List of all allowed languages:
            ['className', 'language-js', 'language-css', 'language-md']
          ]
        }
      })
      .use(rehypeHighlight)
      .use(rehypeStringify)
      .process(event.target.value)
    this.setState({ text: file.value });
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
        <div className='container row mx-auto justify-content-evenly mt-5 pb-5'>
          <div id='editor-side' className={`card p-0 mb-5 ${this.state.editorFullScreen ? 'col-12' : this.state.viewerFullScreen ? 'd-none' : 'col-md-5'}`} >
            <HeaderCard FullScreen={this.state.editorFullScreen} MinSize={this.MinSize} MaxSize={this.MaxSize} Value={"Editor"} Icon={faPenToSquare} />
            <textarea className='w-100 card p-2' onChange={this.transferMarkdown} style={{ minHeight: "500px" }}></textarea>
          </div>
          <div id='viewer-side' className={`card p-0 mb-5 ${this.state.viewerFullScreen ? 'col-12' : this.state.editorFullScreen ? 'd-none' : 'col-md-5'}`}>
            <HeaderCard FullScreen={this.state.viewerFullScreen} MinSize={this.MinSize} MaxSize={this.MaxSize} Value={"Viewer"} Icon={faDesktop} />
            <ReactMarkdown className='w-100 p-2' remarkPlugins={[remarkToc, remarkGfm]}>{this.state.text}</ReactMarkdown>
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
        <button onClick={props.FullScreen ? props.MinSize : props.MaxSize} value={props.Value}>
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
