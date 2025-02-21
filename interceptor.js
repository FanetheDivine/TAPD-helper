(() => {
  const data = new Map();

  const _open = XMLHttpRequest.prototype.open;
  XMLHttpRequest.prototype.open = function (method, url, ...args) {
    const api = "/aggregation/workitem_aggregation/common_get_info";
    if (url.includes(api)) {
      this.addEventListener("load", () => {
        try {
          const res = JSON.parse(this.responseText);
          const message = res.data.get_info_ret.data.copy_info.commit_keyword;
          const id = message.match(/--story=(\d+)/)[1];
          data.set(id, message);
        } catch (e) {
          console.log(e);
        }
      });
    }
    return _open.call(this, method, url, ...args);
  };

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
    // const user = document.querySelector("div.avatar.avatar-nav").title;
    const title = document.querySelector("p.label-selectable__tag").innerText;
    const message = data.get(id).replace("{#name#}", title);
    navigator.clipboard
      .writeText(message)
      .then(() => {
        alert(`复制成功,消息为:\n${message}`);
      })
      .catch(console.error);
  });
})();
