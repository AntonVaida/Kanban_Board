export const normalizeIssuesText = (text: string) => {
  if (text.length >= 30) {
    return `${text.slice(0, 27)}...`;
  }

  return text;
}