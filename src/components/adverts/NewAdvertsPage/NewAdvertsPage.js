import Page from '../../layout/Page';
import Photo from '../../common/Photo';
import Textarea from '../../common/Textarea';
import Button from '../../common/Button';
import Select from 'react-select';

import './NewAdvertsPage.css';
import { useCallback, useMemo, useState } from 'react';
import { createAdvert } from '../service';
import { Navigate, useLocation, useNavigate } from 'react-router-dom';

const MAX_CHARACTERS = 50;

const NewTweetPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [advert, setadvert] = useState({
    name: '',
    sale: true,
    price: '',
    tags: [],

  });

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const { name, sale, price, tags } = advert;
  let { photo } = advert;
  const resetError = () => setError(null);
  const validateSelect = () => {
    const select = document.querySelector('#tags');
    for (var i = 0; i < select.options.length; i++) {
      if(select.options[i].selected ==true){   
        tags.push(select.options[i].value)           
         console.log(select.options[i].value);
        }
    }
  }

  const validateIMG = () => {
    const inputPhoto = document.querySelector('#photoPath');
    advert.photo = inputPhoto.files[0];
  }

  const handleSubmit = async event => {
    event.preventDefault();
    try {
      validateSelect();
      validateIMG();
      resetError();
      setIsLoading(true);
      console.log(advert)
      
      const formData = new FormData();

      for( var ad in advert){
        formData.append(ad, advert[ad]);
      }

      await createAdvert(formData);
      setIsLoading(false);
      const from = location.state?.from?.pathname || '/adverts';
      navigate(from, { replace: true });
    } catch (error) {
      setError(error);
      setIsLoading(false);
    }
  };

  const buttonDisabled = useMemo(() => {
    console.log('calculando...');
    return !name || !sale || !price || !tags || isLoading;
  }, [name, sale, price, tags, isLoading]);


  const handleChange = useCallback(event => {
    setadvert(users => ({
      ...users,
      [event.target.name]:
        event.target.type === 'checkbox'
          ? event.target.checked
          : event.target.value,
    }));
  }, []);



  return (
    <Page title="What are you thinking...">
      <div className="newTweetPage bordered">
        <div className="right">
          <form onSubmit={handleSubmit}>
            <label className="form-label" htmlFor="name">Name</label>
            <input
              type="text"
              name="name"
              placeholder="Name"
              className="form-control"
              value={name}
              onChange={handleChange}

            />
            <label className="form-label" htmlFor="sale">Sale</label>
            <select 
              id="sale" 
              name="sale"
              placeholder="--"
              className="form-control"
              value={sale}
              onChange={handleChange}>
                <option 
                  value={true}>
                    YES
                </option>
                <option 
                  value={false}>
                    NO
                </option>
            </select>
            <label className="form-label" htmlFor="price">Name</label>
            <input
              type="number"
              name="price"
              placeholder="Price"
              className="form-control"
              value={price}
              onChange={handleChange}
            />
            
            <label htmlFor="tags">Choose the tabs:</label>

            <select name="tags" id="tags" multiple>
              <option value="lifestyle">LifeStyle</option>
              <option value="mobile">Mobile</option>
              <option value="motor">Motor</option>
              <option value="work">Work</option>
            </select>

            <label htmlFor="photoPath">Select a file:</label>
            <input type="file" id="photoPath" name="photo"></input>
               
            <div className="newTweetPage-footer">
              <Button
                type="submit"
                className="newTweetPage-submit"
                variant="primary"
                disabled={buttonDisabled}
              >
                Let's go!
              </Button>
            </div>
          </form>
        </div>
      </div>
    </Page>
  );
};

export default NewTweetPage;
