export const scrollAutoRead = () => {
  // スクロール既読機能
  setUnreadParentObs();
  // 未読ページで未読なし時に更新があった場合
  // 自動で読み込む
  setEmptyObs();

  // 未読コンテナの追加を監視するオブザーバをセット
  function setUnreadParentObs() {
    // 未読コンテナが追加される親コンポーネントを取得
    const unreadParent = document.querySelector(
      `#unreads_view > div [role=list]`
    );

    if (unreadParent) {
      // 未読コンテナにイベントをバインドする
      for (const child of unreadParent.childNodes) {
        bindAutoReadEvent(child);
      }

      // 未読コンテナ追加時にイベントをバインドする
      // オブザーバーの作成
      const unreadParentObs = new MutationObserver((mutationsList) => {
        for (const mutation of mutationsList) {
          // 追加された対象ノードに、イベントをバインドする
          bindAutoReadEvent(mutation.addedNodes[0]);
        }
      });
      // 監視を開始
      unreadParentObs.observe(unreadParent, {
        childList: true,
      });
      // TODO: どこかで監視を停止したほうがいい？
    }
  }

  function bindAutoReadEvent(targetNode) {
    if (!targetNode) return;
    else if (targetNode.id.indexOf('unreads_view_spacer-bottom-') === 0) {
      const unreadId = targetNode.id.split('-').slice(-1)[0];
      let observing = true;

      // スクロール時に非表示になったら既読ボタンクリック
      // TODO: イベントリスナーを複数回追加するのをやめる
      document.addEventListener(
        'scroll',
        function () {
          const containerTop = targetNode.getBoundingClientRect().top;
          if (containerTop === 0) return;

          // TODO: 160 を可変にできるように、
          // ヘッダー + 未読 + 未読ヘッダー + container高さ(unreadBottom.clientHeight) = 160くらい
          if (containerTop < 160 - targetNode.clientHeight && observing) {
            observing = false;
            const readBtn = document.querySelector(
              `#unreads_view_header-${unreadId} > div > span > button`
            );
            if (readBtn) readBtn.click();
          }
        },
        { capture: true }
      );
    }
    // 「○件の新しいメッセージ」ボタンを自動クリック
    else if (targetNode.id.indexOf('unreads_view_show-newer-') === 0) {
      targetNode.firstElementChild.click();
    }
    // 最後までスクロールできるようパディング追加
    else if (targetNode.id === 'unreads_view_footer') {
      targetNode.firstElementChild.style.paddingBottom = `${window.innerHeight}px`;
    }
  }

  // 未読コンテナの存在確認をするオブザーバをセット
  function setEmptyObs() {
    const MainView = document.querySelector(`.p-workspace__primary_view_body`);
    if (MainView) {
      // オブザーバーの作成
      const emptyObs = new MutationObserver((mutationsList) => {
        // 新しいメッセージボタンの自動クリック
        if (
          mutationsList[0].previousSibling?.className ===
            'p-unreads_view__empty__message' &&
          mutationsList[0]?.addedNodes[0]?.className ===
            'c-button c-button--primary c-button--medium'
        ) {
          (mutationsList[0]?.addedNodes[0]).click();
        } else if (
          mutationsList[1]?.addedNodes[0]?.className === 'p-unreads_view'
        ) {
          setUnreadParentObs();
          // TODO: obs 停止？
        }
      });
      emptyObs.observe(MainView, {
        childList: true,
        subtree: true,
      });
    }
  }
};
