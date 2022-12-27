import type { Block } from '$core/Block';

export function renderDOM(query: string, block: Block) {
  const root = document.querySelector(query);
  const blockContent = block.getContent();

  if (!root || !blockContent) {
    return null;
  }

  root.appendChild(blockContent);
  block.dispatchComponentDidMount();

  return root;
}
