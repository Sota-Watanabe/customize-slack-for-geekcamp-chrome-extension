import { setCloseSidePanelBottom } from './modules/set-close-side-panel-bottom';
import { scrollAutoRead } from './modules/scroll-auto-read';
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

// サイドバーを閉じるボタン追加
window.addEventListener('load', setObserverForCloseBottom, false);
function setObserverForCloseBottom() {
  const jsInitCheckTimer = setInterval(jsLoaded, 1000);
  function jsLoaded() {
    const workspaceLayoutNode = document.querySelector(
      '.p-client_workspace__layout'
    );
    if (workspaceLayoutNode) {
      clearInterval(jsInitCheckTimer);
      const observer = new MutationObserver((mutations) => {
        if (mutations && mutations[0] && mutations[0].addedNodes[0]) {
          if (
            mutations[0].addedNodes[0].classList.contains(
              'p-ia4_client__resizer--secondary'
            )
          ) {
            setCloseSidePanelBottom();
          }
        }
      });

      observer.observe(workspaceLayoutNode, { childList: true }); // 子要素の変更を監視
    }
  }
}

// スクロール既読機能
window.addEventListener('load', setScrollAutoRead, false);
function setScrollAutoRead() {
  const jsInitCheckTimer = setInterval(jsLoaded, 1000);
  function jsLoaded() {
    const workspaceLayoutNode = document.querySelector(
      '.p-ia__view_header__title'
    );
    // 未読ページを開いている場合
    if (workspaceLayoutNode) {
      if (workspaceLayoutNode.innerHTML.startsWith('未読')) {
        clearInterval(jsInitCheckTimer);
        scrollAutoRead();
      }
    }
  }
}
