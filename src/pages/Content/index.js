import { printLine } from './modules/print';

setTimeout(() => {
  const topSpaceNode = document.querySelector('.p-ia4_top_nav__left_container');
  printLine('topSpaceNode', topSpaceNode);
  topSpaceNode.innerHTML = `<p>拡張機能 適応中</p>`;
}, 3000);
