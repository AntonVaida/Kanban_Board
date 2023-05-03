const PREF_URL = 'https://api.github.com/repos';
const TOKEN = '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';

export const getActiveIssues = async (baseURL:string) => {
  let URL = `${PREF_URL}/${baseURL}/issues`;


  const headers = { Authorization: `Token ${TOKEN}` };
  const response = await fetch(URL, {headers});

  return response.json();
}