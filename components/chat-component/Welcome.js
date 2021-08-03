//front-end
//back-end
import { useAuthState } from 'react-firebase-hooks/auth'
import { useCollection } from 'react-firebase-hooks/firestore'
import * as EmailChecker from 'email-validator'
import { auth, db } from '../../firebase'

function Welcome () {
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
        flex-1 
        h-screen 
        grid
        border-r
        border-gray-600 
        place-items-center 
        bg-black'
    >
      <div className='text-center grid items-center place-items-center'>
        <h2 className='text-gray-50 font-bold text-lg my-3'>
          You don't have a message selected
        </h2>
        <h3 className='text-gray-600 font-semibold text-md my-3'>
          Choose one from your existing messages, or start a new one
        </h3>
        <div
          onClick={addChat}
          className='items-center p-4 bg-blue-300 rounded-3xl my-3 w-40 cursor-pointer hover:bg-blue-400'
        >
          <h1 className='text-gray-50 font-semibold text-lg'>New message</h1>
        </div>
      </div>
    </div>
  )
}

export default Welcome
