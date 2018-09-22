// 解析字符串xml内容为DOMElement.

let xml = '<div><h1>HEADER</h1><p>PARAMETER</p></div>';
let p   = new DOMParser();
let doc = p.parseFromString(xml, 'text/xml');
let div = doc.childNodes[0];

h1=div.querySelector('h1');
h1.innerHTML;
h1.textContent='hhh';
h1.nodeType===1;
h1.nodeName==='h1';
