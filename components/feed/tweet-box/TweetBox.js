//front-end
import styled from 'styled-components'
import {
  PhotographIcon,
  EmojiHappyIcon,
  CalendarIcon
} from '@heroicons/react/outline'
import { Button } from '@material-ui/core'
import { Gif, PollOutlined } from '@material-ui/icons'
//back-end
import { auth, db, storage } from '../../../firebase'
import { useAuthState } from 'react-firebase-hooks/auth'
import { useRef, useState } from 'react'
import firebase from 'firebase'

function TweetBox () {
  const [user] = useAuthState(auth)
  const inputRef = useRef(null)
  const filePickRef = useRef(null)
  const [imagePost, setImagePost] = useState(null)

  //add image to tweet
  const addImageToTweet = e => {
    const reader = new FileReader()
    if (e.target.value[0]) {
      reader.readAsDataURL(e.target.files[0])
    }
    reader.onload = readerEvent => {
      setImagePost(readerEvent.target.result)
    }
  }

  const removeImage = () => {
    setImagePost(null)
  }

  const sendTweet = e => {
    e.preventDefault()

    if (!inputRef.current.value) return

    db.collection('tweets')
      .add({
        tweet: inputRef.current.value,
        name: user.displayName,
        email: user.email,
        image: user.photoURL,
        timestamp: firebase.firestore.FieldValue.serverTimestamp()
      })
      .then(doc => {
        if (imagePost) {
          const uploadTask = storage
            .ref(`tweets/${doc.id}`)
            .putString(imagePost, 'data_url')

          removeImage()

          uploadTask.on(
            'state_change',
            null,
            error => console.error(error),
            () => {
              storage
                .ref('tweets')
                .child(doc.id)
                .getDownloadURL()
                .then(url => {
                  db.collection('tweets')
                    .doc(doc.id)
                    .set(
                      {
                        tweetImg: url
                      },
                      { merge: true }
                    )
                })
            }
          )
        }
      })
    inputRef.current.value = ' '
  }

  return (
    <div className='tweetBox'>
      {/**tweetBox top */}
      <div className='tweetBoxTop'>
        <img
          src={user.photoURL}
          width={40}
          height={40}
          layout='fixed'
          alt=''
          className='rounded-full'
        />
        <form className='flex flex-1'>
          <input
            className='rounded-full h-12 bg-black flex-grow px-5 outline-none'
            placeholder="What's happening ?"
            type='text'
            ref={inputRef}
          />
          <button hidden onClick={sendTweet} type='submit'>
            Send tweet
          </button>
        </form>
        {imagePost && (
          <div onClick={removeImage} className='removeImage'>
            <img src={imagePost} className='h-10 object-contain' alt='' />
            <p className='text-xs text-red-400 text-center'>Remove?</p>
          </div>
        )}
      </div>
      {/**tweetBox bottom */}
      <div className='tweetBoxBottom'>
        <div className='tweetBoxIcons'>
          {/**PhotographIcon (Hero) */}
          <div className='flex items-center space-x-1 flex-grow justify-center p-2'>
            <PhotographIcon
              onClick={() => filePickRef.current.click()}
              className='icon'
            />
            <input
              ref={filePickRef}
              type='file'
              hidden
              onChange={addImageToTweet}
            />
          </div>
          {/**GifIcon (MUi) */}
          <Gif className='icon border-2 border-blue-400 hover:border-blue-300 rounded-md' />
          {/** PollOutlinedIcon (MUi)*/}
          <PollOutlined className='icon' />
          {/**EmojiHappyIcon (Hero) */}
          <EmojiHappyIcon className='icon' />
          {/**CalendarIcon (Hero) */}
          <CalendarIcon className='icon' />
        </div>
        {/**Button (MUi) */}
        <Tweet onClick={sendTweet} type='submit' className='px-2'>
          <h1>Tweet</h1>
        </Tweet>
      </div>
    </div>
  )
}

export default TweetBox

const Tweet = styled(Button)`
  &&& {
    background-color: #5685bb;
    margin-top: 10px;
    text-transform: capitalize;
    color: white;
    border-radius: 999px;
    font-weight: 600;
  }
`
