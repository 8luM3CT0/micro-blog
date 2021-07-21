//front-end
import { SearchIcon } from '@heroicons/react/outline'
import {
  TwitterTimelineEmbed,
  TwitterShareButton,
  TwitterTweetEmbed
} from 'react-twitter-embed'
//back-end

function Widgets () {
  return (
    <div
      className='
    hidden 
    lg:flex 
    flex-col 
    max-w-[600px]
    xl:min-w-[300px]
    p-4 
    mt-5'
    >
      <div
        className='flex 
        ml-3 
        items-center
        w-full 
        rounded-full 
        bg-gray-700 
        text-gray-50
        p-2'
      >
        {/**searchIcon */}
        <SearchIcon className='text-gray-600 h-6' />
        {/**input */}
        <input
          type='text'
          placeholder='Search Twitter'
          className='widgetsInput'
        />
      </div>
      <div className='mt-4 ml-3 mb-5 w-full p-5 pr-3 bg-gray-700 rounded-3xl'>
        {/**Twitter widgets */}
        <h2 className='text-md text-gray-50 font-bold mb-3'>
          What's happening ?
        </h2>

        <TwitterTimelineEmbed
          sourceType='profile'
          screenName='reaperiff697'
          options={{ height: 800, width: 400 }}
        />

        <TwitterShareButton
          url={'https://facebook.com/BlumeCTO'}
          options={{ text: '#webdevelopment is awesome', via: 'blumecto' }}
        />
      </div>
    </div>
  )
}

export default Widgets
