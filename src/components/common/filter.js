import React from 'react';
import Button from './Button';
import './Photo.css';

const Filter = () => (
  
  <div className="filter filter-component">
    <h4>Filter</h4>
      <form className="row">
      <div className="col-md-3 col-sm-12">
      <input type="text" className="form-control" placeholder="Name" name="name" /></div>
      <div className="col-md-2 col-sm-12">
            <select 
              id="sale" 
              name="sale"
              placeholder="--"
              className="form-control"
              >
                <option 
                  value='true'
                  hidden>
                    Sale
                </option>
                <option 
                  value='true'>
                    YES
                </option>
                <option 
                  value='false'>
                    NO
                </option>
            </select>
      </div>
      <div className="col-md-2 col-sm-12">
      <input type="number" className="form-control" placeholder="Price" name="price" />
      </div>
      <div className="col-md-2 col-sm-12">
      <label htmlFor="tags">Choose the tabs:</label>
        <select name="tags" id="tags" multiple>
        <option value="lifestyle">LifeStyle</option>
        <option value="mobile">Mobile</option>
        <option value="motor">Motor</option>
        <option value="work">Work</option>
        </select>
      </div>
      <div className="col-md-2 col-sm-12">
        
        <Button
                type="submit"
                className="newTweetPage-submit"
                variant="primary"
                id="buttonFilter"
              >
                Search!
        </Button>
      </div>

      </form>
  </div>
);

export default Filter;