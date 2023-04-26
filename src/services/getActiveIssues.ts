const PREF_URL = 'https://api.github.com/repos';
const TOKEN = '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';

export const getActiveIssues = async (baseURL:string) => {
  let URL = `${PREF_URL}/${baseURL}/issues`;


  const headers = { Authorization: `Token ${TOKEN}` };
  const response = await fetch(URL, {headers});

  return response.json();
}