console.log("JS is running")
let workflow = {};
let currentNode = "start";

async function loadWorkflow() {
  const response = await fetch("workflows/data.json")
  .then(r => r.json())
  .then(d => {
    console.log("Loaded JSON:", d);
    workflow = d;
    renderNode("start");
  })
  .catch(e => console.error("JSON error:", e));
  workflow = await response.json();
  renderNode(currentNode);
}

function renderNode(nodeKey) {
  const node = workflow[nodeKey];
  currentNode = nodeKey;

  document.getElementById("title").textContent = node.title;

  const contentEl = document.getElementById("content");
  contentEl.innerHTML = "";
  if (node.content) {
    node.content.forEach(item => {
      const li = document.createElement("li");
      li.textContent = item;
      contentEl.appendChild(li);
    });
  }

  const optionsEl = document.getElementById("options");
  optionsEl.innerHTML = "";
  node.options.forEach(option => {
    const btn = document.createElement("button");
    btn.textContent = option.label;
    btn.onclick = () => renderNode(option.next);
    optionsEl.appendChild(btn);
  });
}

loadWorkflow();