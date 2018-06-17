export const randomNum = (min = 0, max = 99000) => {
  return Math.floor(Math.random() * (max - min)) + min;
};

export const callApi = async ENDPOINT => {
    const response = await fetch(ENDPOINT);
    const body = await response.json();
    if (response.status !== 200) throw Error(body.message);
    return body;
  };