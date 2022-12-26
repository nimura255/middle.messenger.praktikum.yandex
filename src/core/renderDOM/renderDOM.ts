import type { Block } from './Block';

export function renderDOM(query: string, block: Block) {
  const root = document.querySelector(query);
  const blockContent = block.getContent();

  if (!root || !blockContent) {
    return null;
  }

  // Можно завязаться на реализации вашего класса Block
  root.appendChild(blockContent);
  block.dispatchComponentDidMount();

  return root;
}
