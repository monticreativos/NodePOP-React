import React from 'react';
import formatDistanceToNow from 'date-fns/formatDistanceToNow';

import LikeButton from './LikeButton';
import Photo from '../../common/Photo';
import './Advert.css';

const Advert = ({ name, createdAt, sale, price, tags, photo }) => {
  let saleTxt;
  let count;
  if(sale){
    if (sale == true) {
      saleTxt = 'Sale';
    }else{
      saleTxt = 'Search';
    }
  }

  return (
    <article className="adverts bordered">
      <div className="">
        <Photo photo={photo} className="tweet-photo" />
      </div>
      <div className="">
        <div className="tweet-header">
          <time dateTime={createdAt}>
            {formatDistanceToNow(new Date(createdAt))}
          </time>
          <span className="adverts-name">{name}</span>
          <span className="adverts-sale"><small>Sale/Search: </small><strong>{saleTxt ? saleTxt : ''}</strong></span>
          <span className="adverts-price">Price: {price} €</span>
          
        </div>
        <div>Tags: {
          tags.length > 1 ? tags.map(function(tag){
            return tag + ', ';
          }) : tags
        }
        </div>
      </div>
    </article>
  );
};

export default Advert;
