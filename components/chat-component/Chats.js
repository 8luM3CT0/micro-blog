//front-end
import { IconButton } from '@material-ui/core'
import {
  SettingsOutlined,
  SearchOutlined,
  MailOutline
} from '@material-ui/icons'
import ChatUser from './ChatUser'
//back-end
import * as EmailChecker from 'email-validator'
import { auth, db } from '../../firebase'
import { useAuthState } from 'react-firebase-hooks/auth'
import { useCollection } from 'react-firebase-hooks/firestore'

function Chats () {
  const [user] = useAuthState(auth)
  const userChatRef = db
    .collection('chat-users')
    .where('users', 'array-contains', user.email)
  const [chatSnapshot] = useCollection(userChatRef)

  const userExists = receiver =>
    !!chatSnapshot?.docs.find(
      chat => chat.data().users.find(user => user === receiver)?.length > 0
    )

  const addChat = () => {
    const input = prompt('Add a user to start chatting...: ')

    if (!input) return null

    if (
      input !== user.email &&
      EmailChecker.validate(input) &&
      !userExists(input)
    ) {
      db.collection('chat-users').add({
        users: [user.email, input]
      })
    }
  }

  return (
    <div
      className='
    max-w-[600px] 
    xl:min-w-[400px]  
    flex 
    flex-col
     p-2 
     h-screen 
     bg-black
     border-r-2
     border-l-2
     border-gray-500
     '
    >
      <div className='border-b-2 p-3 border-gray-500 flex items-center justify-between'>
        {/**chat header */}
        <h2 className='text-gray-100 capitalize font-bold text-lg'>Messages</h2>
        <div className='flex space-x-2'>
          {/**SettingsIcon */}
          <SettingsOutlined className='text-blue-400 hover:text-blue-500 cursor-pointer h-20' />
          {/**MailIcon */}
          <MailOutline
            onClick={addChat}
            className='text-blue-400 hover:text-blue-500 cursor-pointer h-20'
          />
        </div>
      </div>
      <div className='items-center flex p-5 border-b-2 border-gray-500'>
        {/**Chat search */}
        <div className=' flex flex-1 bg-gray-600 rounded-full p-3'>
          <SearchOutlined className='text-gray-300 h-6' />
          <input
            className='outline-none placeholder-gray-300 bg-transparent text-gray-50 ml-3'
            type='text'
            placeholder='Search messages'
          />
        </div>
      </div>
      <div>
        {chatSnapshot?.docs.map(chat => (
          <ChatUser key={chat.id} id={chat.id} users={chat.data().users} />
        ))}
      </div>
    </div>
  )
}

export default Chats
