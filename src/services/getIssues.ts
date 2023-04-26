const PREF_URL = 'https://api.github.com/repos';
const TOKEN = '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';

export const getIssues = async (baseURL:string ,status: boolean) => {
  let URL = `${PREF_URL}/${baseURL}/issues`;

  if (status) {
    URL = `${URL}?state=closed`;
  }

  const headers = { Authorization: `Token ${TOKEN}` };
  const response = await fetch(URL, {headers});

  return response.json();
}