import type { PositionParams } from './types';

export function getTooltipPosition(params: {
  contentElement: HTMLElement;
  gap: number;
  triggerElement: HTMLElement;
}): PositionParams {
  const { contentElement, gap, triggerElement } = params;

  const triggerRect = triggerElement.getBoundingClientRect();
  const contentRect = contentElement.getBoundingClientRect();
  const { clientHeight, clientWidth } = document.documentElement;

  let top: number | undefined = triggerRect.bottom + gap;
  let bottom: number | undefined;
  let left: number | undefined = triggerRect.left;
  let right: number | undefined;

  if (top + contentRect.height > clientHeight) {
    top = undefined;
    bottom = clientHeight - triggerRect.top + gap;
  }

  if (left + contentRect.width > clientWidth) {
    left = undefined;
    right = clientWidth - triggerRect.right;
  }

  return {
    top,
    bottom,
    left,
    right,
  };
}

export function getStylesFromPositionParams(params: PositionParams) {
  const result: Partial<Record<keyof PositionParams, string>> = {};

  for (const key in params) {
    const value = params[key as keyof PositionParams];

    if (value !== undefined) {
      result[key as keyof PositionParams] = `${value}px`;
    } else {
      result[key as keyof PositionParams] = 'auto';
    }
  }

  return result as Record<keyof PositionParams, string>;
}
