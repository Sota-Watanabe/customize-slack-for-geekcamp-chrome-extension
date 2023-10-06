export const setCloseSidePanelBottom = () => {
  const sidebarNode = document.querySelector(
    '.p-ia4_client__resizer--secondary'
  );
  const divElem = document.createElement('div');
  divElem.style.position = 'absolute';
  divElem.style.background = 'red';
  divElem.style.width = '100px';
  divElem.style.height = '100px';
  divElem.style.top = '50%';
  divElem.style.transform = 'translate(-100%, -50%)';
  divElem.style.cursor = 'pointer';
  divElem.innerText = 'ボタン';
  sidebarNode.appendChild(divElem);
};
