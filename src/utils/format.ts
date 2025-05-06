export function formatApiName(move: string) {
  return move
    .split(/[-_]/)
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

export function formatToCamelCase(str: string) {
  return str.replace(
    /([^-_]+)/g,
    (word) => word.charAt(0).toUpperCase() + word.slice(1)
  );
}
