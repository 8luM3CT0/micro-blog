//front-end
import { SparklesIcon } from '@heroicons/react/outline'
import TweetBox from './tweet-box/TweetBox'
import Tweets from './tweets/Tweets'
//back-end
import { useEffect, useState } from 'react'
import { db } from '../../firebase'

function Feed () {
  const [tweets, setTweets] = useState([])

  useEffect(() => {
    db.collection('tweets').onSnapshot(snapshot =>
      setTweets(snapshot.docs.map(doc => doc.data()))
    )
  }, [])

  return (
    <div
      className='
    flex-grow 
    h-screen 
    w-screen
    pb-44 
    pt-6 
    mr-4 
    xl:mr-40 
    overflow-y-auto 
    scrollbar-hide 
    border-l-2 
    border-r-2 
    border-gray-800
    '
    >
      <div className='flex flex-1 items-center justify-between space-x-2 border-b-2 border-gray-600 p-4'>
        <h2 className='text-lg font-bold text-gray-100'>Home</h2>
        <SparklesIcon className='text-blue-400 h-6 w-6' />
      </div>
      <div className='mx-auto max-w-md md:max-w-lg lg:max-w-2xl'>
        {/**TweetBox */}
        <TweetBox />
        {/**Tweets */}
        {tweets.map(post => (
          <Tweets
            key={post.tweet}
            name={post.name}
            image={post.image}
            tweet={post.tweet}
            timestamp={post.timestamp}
            tweetImg={post.tweetImg}
          />
        ))}
      </div>
    </div>
  )
}

export default Feed
