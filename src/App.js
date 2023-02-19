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
    var Editor = "editor-side"
    console.log("max");
    if (event.currentTarget.value === Editor) {
      this.setState({ editorFullScreen: true, viewerFullScreen: false })
    }
    else {
      this.setState({ editorFullScreen: false, viewerFullScreen: true })
    }
  }
  MinSize(event) {
    var Editor = "editor-side"
    console.log("min");
    if (event.currentTarget.value === Editor) {
      this.setState({ editorFullScreen: false, viewerFullScreen: false })
    }
    else {
      this.setState({ editorFullScreen: false, viewerFullScreen: false })
    }
  }
  render() {


    return (
      <div>
        <h1 className='text-center'>Markdown Viewer</h1>
        <h5 className='text-center'>By Natanael Geraldo</h5>
        <div className='container row mx-auto justify-content-evenly'>
          {console.log(this.state.editorFullScreen)}
          <div id='editor-side' className={`card p-0 ${this.state.editorFullScreen ? 'col-12' : this.state.viewerFullScreen ? 'd-none' : 'col-md-5'}`} >
            <div className="card-header d-flex justify-content-between">
              <div>
                <FontAwesomeIcon icon={faPenToSquare} />
                <span className='px-3'>Editor</span>
              </div>
              <div>
                <button onClick={this.state.editorFullScreen ? this.MinSize : this.MaxSize} value="editor-side">
                  {this.state.editorFullScreen
                    ?
                    <FontAwesomeIcon icon={faDownLeftAndUpRightToCenter} />
                    :
                    <FontAwesomeIcon icon={faUpRightAndDownLeftFromCenter} />
                  }
                </button>

              </div>
            </div>
            <textarea className='w-100 card p-2' onChange={this.transferMarkdown} style={{ minHeight: "500px" }}></textarea>
          </div>
          <div id='viewer-side' className={`card p-0 ${this.state.viewerFullScreen ? 'col-12' : this.state.editorFullScreen ? 'd-none' : 'col-md-5'}`}>
            <div className="card-header d-flex justify-content-between">
              <div>
                <FontAwesomeIcon icon={faDesktop} />
                <span className='px-3'>Viewer</span>
              </div>
              <div>
                <button onClick={this.state.viewerFullScreen ? this.MinSize : this.MaxSize} value="viewer-side">
                  {this.state.viewerFullScreen
                    ?
                    <FontAwesomeIcon icon={faDownLeftAndUpRightToCenter} />
                    :
                    <FontAwesomeIcon icon={faUpRightAndDownLeftFromCenter} />
                  }
                </button>
              </div>
            </div>
            <ReactMarkdown className='w-100 p-2' remarkPlugins={[remarkToc, remarkGfm]}>{this.state.text}</ReactMarkdown>
          </div>
        </div>

      </div>
    );
  }
}

export default App;
