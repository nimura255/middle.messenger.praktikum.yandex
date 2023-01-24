function isProtocol(value: string) {
  return /^\w*:\/\/$/.test(value);
}

function clearSegmentFromTrailingSlashes(segment: string) {
  if (isProtocol(segment)) {
    return segment;
  }

  const matches = segment.match(/^\/?([\w\-?=&[\]/:]+?)\/?$/);

  return matches ? matches[1] : segment;
}

export function urlJoin(...segments: string[]): string {
  const clearSegments = segments.map(clearSegmentFromTrailingSlashes);

  return clearSegments.join('/');
}
