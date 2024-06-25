import React, { useRef, useState } from 'react';
import './styles/style.css';

function parseText(text) {
  const chapters = text.split('endchapter\n');
  const sections = [];
  chapters.forEach(element => {
    sections.push(element.split('endsection\n'))
  });
  return sections
}

function renderSections(sections) {
  const sections_html_list = sections.map(
    (section, index) => 
      `
      <h4>第${ index + 1 }節</h4>\n
      ${ section }
      `
  )
  return sections_html_list.join('\n')
}

function renderChapters(chapters) {
  const chapters_html_list = chapters.map(
    (chapter, index) => 
      `
      <h2>第${ index + 1 }章</h2>\n
      ${ renderSections(chapter) }\n
      `
  )
  return chapters_html_list.join('\n')
}

function renderAsHtml(title, subtitle, chapters) {
  return (
    `
    <head>
    <meta name="viewport" content="width=device-width,initial-scale=1">
    <meta charset="UTF-8">
    <title>Novel Page</title>
    </head>

    <body>

    <div class="header" id="top"><!-- ヘッダー -->

    <h1> 小説集 </a></h1>
    <h6> 小説集 </h6>

    </div><!-- ヘッダー：終わり -->

    <div class="base">  
      <div class="text">
  
        <hr class="hr3">
        <h1>${ title }<span>${ subtitle }</span></h1>
 
        ${ renderChapters(chapters) }
      </div>
    </div>

    </body>
    `
  )
}

function HTMLEditor() {
  const [title, setTitle] = useState('');
  const [subTitle, setSubTitle] = useState('');
  const [htmlText, setHtmlText] = useState('');

  const iframeRef = useRef(null);
  const fileInputRef = useRef(null);
  
  const handleHtmlChange = (e) => {
    if (iframeRef.current) {
      const iframeDocument = iframeRef.current.contentDocument;
      iframeDocument.body.innerHTML = renderAsHtml(title, subTitle, parseText(e.target.value));
    }
    setHtmlText(e.target.value);
  };

  const handleTitleChange = (e) => {
    if (iframeRef.current) {
      const iframeDocument = iframeRef.current.contentDocument;
      iframeDocument.body.innerHTML = renderAsHtml(e.target.value, subTitle, parseText(htmlText));
    }
    setTitle(e.target.value);
  };

  const handleSubTitleChange = (e) => {
    if (iframeRef.current) {
      const iframeDocument = iframeRef.current.contentDocument;
      iframeDocument.body.innerHTML = renderAsHtml(title, e.target.value, parseText(htmlText));
    }
    setSubTitle(e.target.value);
  };

  const loadText = (text) => {
    const ssObj = JSON.parse(text)
    setTitle(ssObj["title"]);
    setSubTitle(ssObj["subtitle"]);
    setHtmlText(ssObj["content"]);
  }

  const handleFileChange = async (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setHtmlText(e.target.result);
        loadText(e.target.result);
      };
      reader.readAsText(file);
    }
  };

  const handleSave = () => {
    const textToDownload = JSON.stringify({title: title, subtitle: subTitle, content: htmlText});
    const blob = new Blob([textToDownload], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'input.json'; 
    a.click();
    URL.revokeObjectURL(url); 
  };

  return (
    <div style={{ height: '100%'}}>
      <div className="app-bar">
        <h1>HTML Editor</h1>
        <div style={{ display: 'block', marginRight: '20px'}}>
          <input
            type="file"
            ref={fileInputRef}
            accept=".json"
            onChange={handleFileChange}
            style={{ display: 'none' }}
          />
          <button style={{ margin: '3px'}} onClick={() => fileInputRef.current.click()}>Load</button>
          <button style={{ margin: '3px'}} onClick={handleSave}>Save</button>
        </div>
      </div>
      <div className='editor-root'>
        <div style={{ display: 'flex', flexFlow: 'column', width: '50%', height: '100%' }} >
          <div style = {{ display: 'flex', margin: '3px', justifyContent: 'space-between' }}>
            <p>Title: </p>
            <input value={title} onChange={handleTitleChange} style={{ width: '75%' }}/>
          </div>
          <div style = {{ display: 'flex', margin: '3px', justifyContent: 'space-between' }}>
            <p>SubTitle: </p>
            <input value={subTitle} onChange={handleSubTitleChange} style={{ width: '75%' }}/>
          </div>
          <textarea
            value={htmlText}
            onChange={handleHtmlChange}
            style = {{ flexGrow: 1, margin: '3px' }}
          />
        </div>
        <iframe
          ref={iframeRef}
          title="Preview"
          style={{ width: '50%', height: '100%', border: 'none' }}
        />
      </div>
    </div>
  );
}

export default HTMLEditor;
