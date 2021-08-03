//front-end
import Avatar from '@material-ui/core/Avatar'
import {
  InfoOutlined,
  Photo,
  Gif,
  SentimentSatisfiedOutlined,
  SendOutlined
} from '@material-ui/icons'
import styled from 'styled-components'
import ChatMessage from './ChatMessage'
//back-end
import { auth, db } from '../../firebase'
import { useAuthState } from 'react-firebase-hooks/auth'
import { useCollection } from 'react-firebase-hooks/firestore'
import { useRouter } from 'next/router'
import { useRef, useState } from 'react'
import firebase from 'firebase'
import getReceiver from '../../utils/getReceiver'
import TimeAgo from 'timeago-react'

function ChatComponent ({ chat, messages }) {
  const [user] = useAuthState(auth)
  const [input, setInput] = useState('')
  const endOfChatRef = useRef(null)
  const router = useRouter()
  const [receiverSnapshot] = useCollection(
    db.collection('users').where('email', '==', getReceiver(chat.users, user))
  )
  const [messageSnapshot] = useCollection(
    db
      .collection('chat-users')
      .doc(router.query.id)
      .collection('messages')
      .orderBy('timestamp', 'asc')
  )

  const showMessages = () => {
    if (messageSnapshot) {
      return messageSnapshot.docs.map(message => (
        <ChatMessage
          key={message.id}
          user={message.data().user}
          message={{
            ...message.data(),
            timestamp: message
              .data()
              .timestamp?.toDate()
              .getTime()
          }}
        />
      ))
    } else {
      return JSON.parse(messages).map(message => (
        <ChatMessage key={message.id} user={message.user} message={message} />
      ))
    }
  }

  const scrollToBottom = () => {
    endOfChatRef.current.scrollIntoView({
      behavior: 'smooth',
      block: 'start'
    })
  }

  const receiver = receiverSnapshot?.docs?.[0]?.data()
  const receiverEmail = getReceiver(chat.users, user)

  const sendMessage = e => {
    e.preventDefault()

    db.collection('users')
      .doc(user.uid)
      .set(
        {
          lastSeen: firebase.firestore.FieldValue.serverTimestamp()
        },
        { merge: true }
      )
    db.collection('chat-users')
      .doc(router.query.id)
      .collection('messages')
      .add({
        timestamp: firebase.firestore.FieldValue.serverTimestamp(),
        message: input,
        user: user.email,
        photoURL: user.photoURL
      })
    setInput('')
    scrollToBottom()
  }

  return (
    <div className='h-screen flex-1 border-r-2 border-gray-400'>
      {/**header */}
      <div className='sticky top-0 justify-between bg-black z-50 items-center flex p-3 border-b-2 border-gray-700'>
        <div className='flex items-center space-x-3'>
          {receiver ? (
            <Avatar src={receiver?.photoURL} />
          ) : (
            <Avatar src={receiverEmail[0]} />
          )}
          <div className='grid items-center'>
            <h2 className='text-gray-100 font-bold text-xl'>
              {receiver?.username}
            </h2>
            <h4 className='text-gray-600 font-semibold'>{receiverEmail}</h4>
          </div>
        </div>
        <InfoOutlined className='text-blue-500 hover:text-blue-400 h-12 cursor-pointer' />
      </div>
      {/**message feed */}
      <MessageDiv>
        {showMessages()}
        <div ref={endOfChatRef} className='mb-12' />
      </MessageDiv>
      {/**input field */}
      <form className='flex items-center space-x-2 p-4 sticky bottom-0 z-50 border-t-2 border-gray-700 '>
        <div className='space-x-3 items-center flex'>
          {/**PhotoraphIcon */}
          <Photo className='text-blue-500 hover:text-blue-400 h-12 cursor-pointer' />
          {/**GifIcon */}
          <Gif className='text-blue-500 hover:text-blue-400 h-12 border-2 border-blue-500 rounded-md cursor-pointer' />
        </div>
        <div className='flex-grow border-2 border-blue-400 rounded-full h-8 py-4 px-2  bg-black flex items-center'>
          <input
            type='text'
            value={input}
            onChange={e => setInput(e.target.value)}
            placeholder='Start a new message'
            className='bg-transparent outline-none flex-grow text-white'
          />
          <button hidden disabled={!input} type='submit' onClick={sendMessage}>
            Send
          </button>
          <SentimentSatisfiedOutlined className='text-blue-500 hover:text-blue-400 h-12 cursor-pointer' />
        </div>
        <SendOutlined
          disabled={!input}
          onClick={sendMessage}
          className='text-blue-500 hover:text-blue-400 h-12 cursor-pointer'
        />
      </form>
    </div>
  )
}

export default ChatComponent

const MessageDiv = styled.div`
  min-height: 90vh;
  background-color: black;
  padding: 30px;
`
