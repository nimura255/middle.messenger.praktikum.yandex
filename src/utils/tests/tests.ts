export function click(element: HTMLElement) {
  element.dispatchEvent(new MouseEvent('click'));
}

export function waitFor(
  callback: () => void,
  options?: { timeout?: number }
) {
  const { timeout = 2000 } = options || {};
  const startDate = new Date();

  return new Promise<void>((resolve, reject) => {
    const intervalId = setInterval(() => {
      const iterationDate = new Date();

      try {
        callback();
        clearInterval(intervalId);
        resolve();
      } catch (error) {
        const timeDiff = iterationDate.getTime() - startDate.getTime();

        if (timeDiff >= timeout) {
          clearInterval(intervalId);
          reject(error);
        }
      }
    }, 500);
  });
}
