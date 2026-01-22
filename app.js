console.log("JS is running")
let workflow = {};
let currentNode = "start";

async function loadWorkflow(filename = "start.json") {
  try {
    const response = await fetch("workflows/" + filename);
    const data = await response.json();

    console.log("Loaded JSON:", data);

    workflow = data;
    renderNode("start");
  } catch (e) {
    console.error("JSON error:", e);
  }
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
    btn.onclick = () => {
  if (option.file) {
    loadWorkflow(option.file);   // loads login.json, printer.json, etc.
  } else {
    renderNode(option.next);     // moves inside the same workflow
  }
};
    optionsEl.appendChild(btn);
  });
}

loadWorkflow();