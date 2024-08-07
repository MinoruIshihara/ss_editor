import "./styles/style.css";

function parseText(text) {
  const chapters = text.split("endchapter\n");
  const sections = [];
  chapters.forEach((element) => {
    sections.push(element.split("endsection\n"));
  });
  return sections;
}

function renderSections(sections) {
  const sections_html_list = sections.map(
    (section, index) =>
      `
      <h4>第${index + 1}節</h4>\n
      ${section.replace(/\n「/g, "\n\n「").replace(/」\n/g, "」\n\n").replace(/」\n\n\n「/g, "」\n\n「").replace(/\n/g, "<br>")}
      `
  );
  return sections_html_list.join("\n");
}

function renderChapters(chapters) {
  const chapters_html_list = chapters.map(
    (chapter, index) =>
      `
      <h2>第${index + 1}章</h2>\n
      ${renderSections(chapter)}\n
      `
  );
  return chapters_html_list.join("\n");
}

export default function renderAsHtml(title, subtitle, chapters) {
  return `
    <head>
    <meta name="viewport" content="width=device-width,initial-scale=1">
    <meta charset="UTF-8">
    <title>Novel Page</title>
    </head>
    <style>
    @charset "UTF-8";
    @import url("html5reset-1.6.1.css");
    @import url('https://fonts.googleapis.com/css2?family=Noto+Serif+JP&display=swap');

    /* ↓レイアウト↓ */

    * {
        line-height:150%;
        font-family: 'Noto Serif JP', serif;
    }

    body {
        color:#333;
        background-color:#faf0db;/* 背景色 */
        font-family:"Helvetica Neue",Arial,"Hiragino Kaku Gothic ProN","Hiragino Sans",Meiryo,sans-serif;
    }

    .base{
        margin:0 auto;
        max-width:1200px;
    }

    .header{
        padding:10px;
        margin:20px 0px;
        text-align:center;
    }

    .footer{
        padding:10px;
        text-align:center;
    }

    .menu{
        margin:20px 0px;
        display:flex;
        flex-wrap:wrap;
        justify-content:center;
        background:rgba(111,111,111,0.1);
    }

    .box{
        margin:0px 5px;
    }

    .text{
        margin:5px;
        padding:15px;
        line-height:180%;
    }

    img
    {
      max-width:100% ;
      height:auto ;
    }


    /* ↓タグ↓ */

    iframe h1{
        font-size:150%;
        font-weight:normal;
        text-shadow: 1px 1px 3px #555;
        text-align:center;
    }

    h1 span {
        display:block;
        margin-top:0px;
        color:#888;
        font-size:60%;
      }

    h2{
        font-size:140%;
        font-weight:normal;
        margin:20px 0px;
        text-align:right;
        border-width:0px 0px 1px 0px;
        border-style:solid;
        border-color:#888;
    }

    h3{
        font-size:140%;
        font-weight:normal;
        text-align:center;
        margin:20px 0px;
    }

    h3 span {
      display:block;
      margin-top:0px;
      color:#888;
      font-size:60%;
    }

    h4{
        font-size:120%;
        font-weight:normal;
        margin:20px 0px;
    }

    h4 span {
      display:block;
      margin-top:0px;
      color:#888;
      font-size:60%;
    }

    h5{
        font-size:140%;
        font-weight:normal;
        margin:20px 0px;
        padding:3px 0px;
        border-width:1px 0px 1px 0px;
        border-style:solid;
        text-align:center;
        border-color:#aaa;
    }

    h6{
        font-size:80%;
        font-weight:normal;
        margin:15px 0px;
    }

    p{
        text-align:left;
        margin:10px 0px;
        padding:5px;
        font-size:80%;
    }

    em{
        background: linear-gradient(transparent 60%, #fff799 60%);
        font-style:normal;
    }

    strong{
        font-weight:normal;
        background-color:#0070b8;
        color:#fff;
    }

    small{
        font-size:70%;
    }

    big{
        font-size:130%;
    }

    ins{
        background-color:#ffe4e1;
    }

    i{
        font-style:italic;
    }

    a:link{
        color:#000;
    }

    a:visited{
        color:#000;
    }

    a:hover{
        text-decoration:underline #0070b8;
        background-color:#fff;
    }

    h1 a:link{
        color:#333;
        text-decoration:none;
    }

    h1 a:visited{
        color:#333;
        text-decoration:none;
    }

    blockquote{
        position:relative;
        padding:10px 10px 10px 50px;
        box-sizing: border-box;
        background:#f5f5f5;
        border-left:6px double #ccc;
        box-shadow:1px 1px 3px -1px #888;
        margin:15px;
        font-size:90%;
    }

    blockquote:before{
        display:inline-block;
        position:absolute;
        top:15px;
        left:15px;
        vertical-align: middle;
        content:'\\00275e';
        color:#ccc;
        font-size:30px;
    }

    li{
        padding:5px;
        margin:0px 0px 0px 20px;
    }

    ul{
        margin:10px 0px;
    }

    ol{
        margin:10px 0px;
    }

    address{
        font-size:75%;
    }

    cite{
        font-size:smaller;
    }


    /* ↓classタグ↓ */

    .item{
        text-align:center;
        margin:5px;
        padding:5px;
    }

    .list1{
        list-style-type:circle;
    }

    .list2{
        list-style-type:upper-roman;
    }

    .hr1{
        margin:5px 0px;
        border-top: 1px #ccc;
        border-bottom: 1px #fff;
        border-style:solid;
    }

    .hr2{
        margin:5px 0px;
        border-top: 1px #aaa;
        border-style:dashed;
    }

    .hr3{
        margin:5px 0px;
        height:50px;
        border-width:0px;
    }

    .img1{
        box-shadow:1px 1px 3px -1px #888;
        margin:1px;
    }

    .pagetop{
        position: fixed;
        bottom: 10px;
        right: 14px;
    }
    
    .pagetop a{
        display: block;
        text-decoration: none;
    }
    
    .pagetop:hover{
        opacity: 0.7 ;
    }



    /*↓ディスプレイ480px以下用↓*/

    @media screen and (max-width:480px) 

    {
        
    .base{
        width:auto;
        margin:0px 5px;
    }

    .box{
        margin:0px;
    }

    .text{
        width:auto;
        margin:0px;
        padding:10px;
    }

    .menu{
        flex-direction:column;
        width:auto;
        margin:0px;
        font-size:90%;
    }

    .item a{
        display:block;
    }

    .item a:hover{
        background-color:#fff;
        margin:-5px;
        padding:5px;
    }

    h2,h3,h4,h5{
        font-size:130%;
    }

    }
    </style>

    <body>

    <div class="header" id="top"><!-- ヘッダー -->

    <h1> 小説集 </a></h1>
    <h6> 小説集 </h6>

    </div><!-- ヘッダー：終わり -->

    <div class="base">  
      <div class="text">
  
        <hr class="hr3">
        <h1>${title}<span>${subtitle}</span></h1>
 
        ${renderChapters(chapters)}
      </div>
    </div>

    </body>
    `;
}
