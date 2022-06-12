import Page from '../../layout/Page'
import useMutation from '../../../hooks/useMutation'
import SelectTags from '../SelectTags'
import useForm from '../../../hooks/useForm'
import { InputFile } from '../../common'

import './NewAdvertsPage.css'

import { createAdvert } from '../service'
import { Navigate, useLocation, useNavigate } from 'react-router-dom'

const validName = ({ name }) => name
const validPrice = ({ price }) =>
  !Number.isNaN(price) && Number.isFinite(price) && price >= 0
const validTags = ({ tags }) => !!tags.length

const NewTweetPage = () => {
  const navigate = useNavigate()
  const mutation = useMutation(createAdvert)

  const onSubmit = (newAdvert) => {
    console.log(newAdvert)
    mutation.execute(newAdvert).then(({ id }) => navigate(`/adverts/${id}`))
  }

  const { formValue: advert, handleChange, handleSubmit, validate } = useForm({
    name: '',
    sale: true,
    price: 0,
    tags: [],
    photo: null,
  })
  const { name, sale, price, tags } = advert

  return (
    <Page title="What are you thinking...">
      <div className="newTweetPage bordered">
        <div className="right">
          <form onSubmit={handleSubmit(onSubmit)}>
            <input name="name" value={name} onChange={handleChange} />
            <input
              type="checkbox"
              name="sale"
              checked={sale}
              onChange={handleChange}
            />
            <input
              type="number"
              name="price"
              value={price}
              onChange={handleChange}
            />
            <SelectTags name="tags" value={tags} onChange={handleChange} />
            <InputFile name="photo" onChange={handleChange} />
            <button disabled={!validate(validName, validPrice, validTags)}>
              Save
            </button>
          </form>
        </div>
      </div>
    </Page>
  )
}

export default NewTweetPage
