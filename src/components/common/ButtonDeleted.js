import React from 'react'
import { Navigate, useNavigate } from 'react-router-dom'
// import Swal from 'sweetalert2'
import { deletedAdvert } from '../adverts/service'
import ConfirmationButton from './ConfirmationButton'

function ButtonDeleted(props) {
  const navigate = useNavigate()

  const handleDeletedAdvert = () => {
    try {
      deletedAdvert(props.advertId).then((_response) => {
        // <Navigate to='/adverts'/>
        navigate('/adverts', { replace: true })
      })
      // this.setState({ advert, isLoading: false });
      // window.location.href = '/adverts';
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <ConfirmationButton
      confirmation="Are you sure?"
      onConfirm={handleDeletedAdvert}
    >
      Delete
    </ConfirmationButton>
  )
}

export default ButtonDeleted
