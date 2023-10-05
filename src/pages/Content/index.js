// トップに文言追加
window.addEventListener('load', setTextInTop, false);
function setTextInTop() {
  const jsInitCheckTimer = setInterval(jsLoaded, 1000);
  function jsLoaded() {
    const topSpaceNode = document.querySelector(
      '.p-ia4_top_nav__left_container'
    );
    if (topSpaceNode) {
      clearInterval(jsInitCheckTimer);
      topSpaceNode.innerHTML = `<p>拡張機能 適応中</p>`;
    }
  }
}
