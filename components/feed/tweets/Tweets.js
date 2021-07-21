//front-end
import { ChatIcon, HeartIcon } from '@heroicons/react/outline'
import { Loop, Publish } from '@material-ui/icons'
//back-end
import { forwardRef } from 'react'
import { auth, db } from '../../../firebase'
import { useAuthState } from 'react-firebase-hooks/auth'

const Tweets = forwardRef(
  ({ email, image, name, timestamp, tweet, tweetImg }, ref) => {
    const [user] = useAuthState(auth)
    return (
      <div
        className='flex flex-col mt-3 mb-3 border-t-2 border-b-2 border-gray-600'
        ref={ref}
      >
        {/**top of the tweet box */}
        <div className='tweetMajor'>
          <div className='flex items-center space-x-2'>
            <img
              src={image}
              width={40}
              height={40}
              className='rounded-full'
              alt=''
            />
            <div>
              <p className='font-medium text-gray-300'>{name}</p>
              {timestamp ? (
                <p className='text-xs text-gray-300'>
                  {new Date(timestamp?.toDate()).toLocaleString()}
                </p>
              ) : (
                <p className='text-xs text-gray-300'>Loading...</p>
              )}
            </div>
          </div>
          <p className='pt-4 text-gray-300'>{tweet}</p>
        </div>
        {tweetImg && (
          <div className='relative h-56 md:h-96 bg-gray-800'>
            <img src={tweetImg} objectFit='cover' alt='' />
          </div>
        )}
        <div className='tweetFooter'>
          <div className='tweetIcon hover:rounded-full hover:bg-blue-900 hover:text-blue-200'>
            <ChatIcon />
          </div>
          <div className='tweetIcon hover:rounded-full hover:bg-green-900 hover:text-green-200'>
            <Loop />
          </div>
          <div className='tweetIcon hover:rounded-full hover:bg-red-900 hover:text-red-500'>
            <HeartIcon />
          </div>
          <div className='tweetIcon hover:rounded-full hover:bg-blue-900 hover:text-blue-200'>
            <Publish />
          </div>
        </div>
      </div>
    )
  }
)

export default Tweets
