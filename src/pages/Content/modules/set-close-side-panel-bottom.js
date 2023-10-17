export const setCloseSidePanelBottom = () => {
  const sidebarNode = document.querySelector(
    '.p-ia4_client__resizer--secondary'
  );
  const image = document.createElement('img');

  image.style.position = 'absolute';
  image.style.width = '100px';
  image.style.height = '100px';
  image.style.top = '50%';
  image.style.transform = 'translate(-100%, -50%)';
  image.style.cursor = 'pointer';
  image.src = chrome.runtime.getURL('arrow.png');
  image.alt = 'アイコン';

  // Mac の場合
  const closeShortcut = new KeyboardEvent('keydown', {
    keyCode: 190,
    metaKey: true,
  });
  // Windows/Linux の場合
  // const closeShortcut = new KeyboardEvent('keydown', {
  //   keyCode: 190,
  //   ctrlKey: true,
  // });
  image.onclick = () => {
    document.dispatchEvent(closeShortcut);
  };
  sidebarNode.appendChild(image);
};
