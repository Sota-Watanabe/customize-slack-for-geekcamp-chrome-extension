import { printLine } from './modules/print';

console.log('Content script works!');
console.log('Must reload extension for modifications to take effect.');

printLine("Using the 'printLine' function from the Print Module");

const topSpaceNode = document.querySelector('.p-ia4_top_nav__left_container');
topSpaceNode.innerHTML = `<p>拡張機能 適応中</p>`;
