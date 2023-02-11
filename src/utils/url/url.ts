function clearSegmentFromTrailingSlashes(segment: string) {
  const matches = segment.match(/^\/?([\w\-?=&[\]/:]+?)\/?$/);

  return matches ? matches[1] : segment;
}

export function urlJoin(...segments: string[]): string {
  const clearSegments = segments
    .filter(Boolean)
    .map(clearSegmentFromTrailingSlashes);

  return clearSegments.join('/');
}
