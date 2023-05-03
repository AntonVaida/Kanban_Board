const PREF_URL = 'https://api.github.com/repos';

export const getActiveIssues = async (baseURL:string) => {
  let URL = `${PREF_URL}/${baseURL}/issues`;

  const response = await fetch(URL);

  return response.json();
}