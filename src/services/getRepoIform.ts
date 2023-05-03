const PREF_URL = 'https://api.github.com/repos';

export const getRepoInform = async (baseURL:string) => {
  let URL = `${PREF_URL}/${baseURL}`;


  const response = await fetch(URL);

  return response.json();
}