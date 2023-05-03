const PREF_URL = 'https://api.github.com/repos';
const TOKEN = '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';

export const getActiveIssues = async (baseURL:string) => {
  let URL = `${PREF_URL}/${baseURL}/issues`;


  const headers = { Authorization: `Token ${TOKEN}` };
  const response = await fetch(URL, {headers});

  return response.json();
}