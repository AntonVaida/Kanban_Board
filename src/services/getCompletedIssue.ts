const PREF_URL = 'https://api.github.com/repos';

export const getCompletedIssues = async (baseURL:string) => {
  let URL = `${PREF_URL}/${baseURL}/issues?state=closed`;

  const response = await fetch(URL);

  return response.json();
}