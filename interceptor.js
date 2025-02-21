document.addEventListener("click", (e) => {
  const linkDom = document.querySelector(
    "div.action-wrap>div.title-area__copy-link-button.agi-dropdown"
  );
  if (!linkDom) return;
  const { x: clickX, y: clickY } = e;
  const { x: domX, y: domY, width, height } = linkDom.getBoundingClientRect();
  if (
    clickX < domX ||
    clickX > domX + width ||
    clickY < domY ||
    clickY > domY + height
  )
    return;
  const id = document
    .querySelector("span.detail-container-header-id")
    .innerText.match(/(\d+)/)[0];
  const user = document.querySelector("div.avatar.avatar-nav").title;
  const title = document.querySelector("p.label-selectable__tag").innerText;
  const message = `--story=${id} --user=${user} ${title}`;
  navigator.clipboard
    .writeText(message)
    .then(() => {
      alert(`复制成功,消息为:\n${message}`);
    })
    .catch(console.error);
});
