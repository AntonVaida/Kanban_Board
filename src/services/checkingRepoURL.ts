export const checkingRepoURL = (URL: string) => {
  if (URL.length === 0) {
    return 'ERROR: Empty Repo URL';
  };

  if (!URL.includes('https://') || !URL.includes('github.com')) {
    return 'ERROR: You Enter Wrong URL';
  };

  const urlParts = URL.split('/');
  return `${urlParts[3]}/${urlParts[4]}`
}