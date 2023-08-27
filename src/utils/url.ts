export function getAccessTokenFromURL(url: string): string | null {
  const queryString: string | undefined = url.split('?')[1];
  if (!queryString) {
    return null;
  }

  const params: { [key: string]: string } = {};
  const paramPairs: string[] = queryString.split('&');
  for (let i = 0; i < paramPairs.length; i++) {
    const paramPair: string[] = paramPairs[i].split('=');
    const paramName: string = decodeURIComponent(paramPair[0]);
    const paramValue: string = decodeURIComponent(paramPair[1]);
    params[paramName] = paramValue;
  }

  return params['access_token'] || null;
}
