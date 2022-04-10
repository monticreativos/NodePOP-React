import client from '../../api/client';

const advertsBaseUrl = '/api/v1/adverts';

export const getLatestAdverts = () => {
  const url = `${advertsBaseUrl}anun&sale=true&price=50&tags=lifestyle`;
  return client.get(url);
};

export const getTweet = advertId => {

  if (advertId) {
    const url = `${advertsBaseUrl}/${advertId}`;
    return client.get(url);
  }else{
    const url = `${advertsBaseUrl}/`;
    return client.get(url);
  }
  // const url = `${advertsBaseUrl}/${tweetId}`;
};

export const createAdvert = advert => {
  const url = advertsBaseUrl;
  return client.post(url, advert);
};

export const deletedAdvert = advertId => {
  const url = `${advertsBaseUrl}/${advertId}`;
  return client.delete(url);
};
