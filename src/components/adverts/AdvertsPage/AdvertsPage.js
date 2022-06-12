import { useState, useEffect } from 'react'
import React from 'react'
import { Navigate } from 'react-router-dom'
import FiltersForm from './filter'

import { Link } from 'react-router-dom'
import Page from '../../layout/Page'
import Button from '../../common/Button'
import Advert from './Advert'
import { getTweet } from '../service'
import storage from '../../../utils/storage'
import useQuery from '../../../hooks/useQuery'

import './AdvertsPage.css'
import styles from './AdvertsPage.module.css'
import Filter from './filter'
import { defaultFilters, filterAdverts } from './filters'

const EmptyList = () => (
  <div style={{ textAlign: 'center' }}>
    <p>There are no ads to show!</p>
    <Button as={Link} to="/tweets/new" variant="primary">
      Add Advert
    </Button>
  </div>
)

const getFilters = () => storage.get('filters') || defaultFilters
const saveFilters = (filters) => storage.set('filters', filters)

const AdvertsPage = () => {
  const [filters, setFilters] = React.useState(getFilters)
  const { isLoading, error, data: adverts = [] } = useQuery(getTweet)

  // const [advertsPrint, setAdvertsPrint] = useState([])

  React.useEffect(() => {
    saveFilters(filters)
  }, [filters])

  if (error?.statusCode === 401) {
    return <Navigate to="/login" />
  }

  const filteredAdverts = filterAdverts(adverts, filters)

  // useEffect(() => {
  //   const execute = async() => {
  //     const filter = await getTweet();
  //     setAdvertsPrint(filter)
  //   };
  //   execute();
  //   return () => {};
  // }, []);

  // useEffect(() => {
  //   const buttonSend = document.querySelector('#buttonFilter')

  //   buttonSend.addEventListener('click',async(e) => {
  //     e.preventDefault();

  //     const advertsPrint = await getTweet();
  //     setAdvertsPrint(advertsPrint);

  //     const inputName = document.querySelector('[name=name]');
  //     const inputSale = document.querySelector('[name=sale]');
  //     const inputPrice = document.querySelector('[name=price]');
  //     const inputTags= document.querySelector('[name=tags]');

  //     const inputs = inputName.value.toUpperCase();
  //     const expresion = inputs;
  //     const arrayName = [];
  //     const arraySale = [];
  //     const arrayPrice = [];
  //     const arrayTags = [];
  //     const sale = inputSale.value == 'true' ? true : false;
  //     let price = inputPrice.value !== '' ? inputPrice.value : 0;
  //     const tags = [];

  //     if(inputTags.value !== ''){
  //       for (var i = 0; i < inputTags.options.length; i++) {
  //         if(inputTags.options[i].selected == true){
  //           tags.push(inputTags.options[i].value)
  //         };
  //       }
  //     };

  //     let count = 0;

  //     const advertFilter = advertsPrint.filter((advert) => {
  //       const advertsNameTrue = advert.name.toUpperCase().match(expresion);
  //       const advertTags = advert.tags;
  //       let advertPrice = advert.price;
  //       let tagTrue = true;

  //       if(tags.length > 0){
  //         for (let i = 0; i < tags.length; i++) {
  //           if(advertTags.includes(tags[i])){
  //              tagTrue = true;
  //           } else {
  //             tagTrue = false;
  //           }
  //         }
  //       }

  //       if( price == 0 || price == undefined ){
  //         price = undefined;
  //         advertPrice = undefined;
  //       }

  //       return advertsNameTrue && advert.sale == sale && (advertPrice == price) && tagTrue ;
  //     });

  //     if(advertFilter !== ''){
  //       setAdvertsPrint(advertFilter);
  //     }

  //   })

  //   return () => {};
  // }, []);

  return (
    <Page title="What are you looking for?">
      {/* {console.log(adverts)} */}
      <FiltersForm
        initialFilters={filters}
        defaultFilters={defaultFilters}
        prices={adverts.map(({ price }) => price)}
        onFilter={setFilters}
      />
      <div className={styles.tweetsPage}>
        {filteredAdverts.length ? (
          <ul>
            {filteredAdverts.map((advert) => (
              <li key={advert.id}>
                <Link to={`/adverts/${advert.id}`}>
                  <Advert {...advert} />
                </Link>
              </li>
            ))}
          </ul>
        ) : (
          <EmptyList />
        )}
      </div>
    </Page>
  )
}

export default AdvertsPage
