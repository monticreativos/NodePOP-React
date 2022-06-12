import { formatDistanceToNow } from 'date-fns'
import React, { useEffect, useRef, useState } from 'react'
import { Navigate, useLocation, useNavigate, useParams } from 'react-router-dom'
import Filter from '../AdvertsPage/filter'
import Photo from '../../common/Photo'
import Page from '../../layout/Page'
import { deletedAdvert, getTweet } from '../service'
import Swal from 'sweetalert2'

import ButtonDeleted from '../../common/ButtonDeleted'

class AdvertPage extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      advert: null,
      error: null,
      isLoading: false,
    }
  }

  // handleDeletedAdvert = async() => {

  //   Swal.fire({
  //     title: 'Are you sure?',
  //     text: "You won't be able to revert this!",
  //     icon: 'warning',
  //     showCancelButton: true,
  //     confirmButtonColor: '#3085d6',
  //     cancelButtonColor: '#d33',
  //     confirmButtonText: 'Yes, delete it!'
  //   }).then(async(result) => {
  //     if (result.isConfirmed) {
  //       try {
  //         await deletedAdvert(this.props.tweetId);
  //         // this.setState({ advert, isLoading: false });
  //         this.navigate('/adverts')
  //         // window.location.href = '/adverts';
  //       } catch (error) {
  //         this.setState({ isLoading: false, error });
  //       }
  //     }
  //   })

  // }

  handleGetTweet = async () => {
    this.setState({ isLoading: true, error: null })
    try {
      console.log(this.props.tweetId)
      const advert = await getTweet(this.props.tweetId)
      this.setState({ advert, isLoading: false })
    } catch (error) {
      this.setState({ isLoading: false, error })
    }
  }

  componentDidMount() {
    this.handleGetTweet()
  }

  componentDidUpdate(prevProps, prevState) {
    console.log('old', prevProps, prevState)
    console.log('new', this.props, this.state)
    if (prevProps.tweetId !== this.props.tweetId) {
      console.log(this.props.tweetId)

      this.handleGetTweet()
    }
  }

  componentWillUnmount() {
    console.log('unmont')
    // clean tasks
  }

  render() {
    const { advert, error, isLoading } = this.state
    let count = 0
    // isLoading - show an spinner
    // error - show an alert
    if (error?.status === 401) {
      return <Navigate to="/login" />
    }

    if (error?.status === 404) {
      return <Navigate to="/404" />
    }

    return (
      <Page title="Advert detail">
        {console.log(advert + 'aqui')}
        <div>
          {advert ? (
            <div>
              <article className="adverts bordered">
                <div className="">
                  <Photo className="tweet-photo" photo={advert.photo} />
                </div>
                <div className="">
                  <div className="tweet-header">
                    <time dateTime={advert.createdAt}>
                      {formatDistanceToNow(new Date(advert.createdAt))}
                    </time>
                    <span className="adverts-name">{advert.name}</span>
                    <span className="adverts-sale">
                      <small>Sale/Search: </small>
                      <strong>{advert.sale ? 'Sale' : 'Search'}</strong>
                    </span>
                    <span className="adverts-price">
                      Price: {advert.price} €
                    </span>
                  </div>
                  <div>
                    Tags:{' '}
                    {advert.tags.length > 1
                      ? advert.tags.map(function (tag) {
                          return tag + ', '
                        })
                      : advert.tags}
                  </div>
                  {/* <button className="btn btn-warning" id="deleteButton" onClick={ () => {
                  this.handleDeletedAdvert()
                }
                  }>Delete Advert</button> */}
                  <ButtonDeleted advertId={this.props.tweetId} />
                </div>
              </article>
            </div>
          ) : (
            'Nothing to show'
          )}
        </div>
      </Page>
    )
  }
}

// const TweetPageFunction = () => {
//   const [tweet, setTweet] = useState(null);
//   const { tweetId } = useParams();
//   // return <TweetPage tweetId={tweetId} />;

//   useEffect(() => {
//     getTweet(tweetId).then(tweet => setTweet(tweet));

//     return () => {
//       // tweet 1
//       console.log('unmounted');
//     };
//   }, [tweetId]);

//   return (
//     <Page title="Tweet detail">
//       <div>{tweet ? JSON.stringify(tweet) : 'Nothing to show'}</div>
//     </Page>
//   );
// };

const TweetPageFunction = () => {
  const ref = useRef(null)
  const { id } = useParams()

  useEffect(() => {
    console.log('ref', ref.current)
  }, [])

  return <AdvertPage ref={ref} tweetId={id} />
}

export default TweetPageFunction
