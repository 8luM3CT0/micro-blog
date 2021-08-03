//front-end
import { Avatar } from '@material-ui/core'
//back-end
import getReceiver from '../../utils/getReceiver'
import { useAuthState } from 'react-firebase-hooks/auth'
import { useCollection } from 'react-firebase-hooks/firestore'
import { auth, db } from '../../firebase'
import { useRouter } from 'next/router'
import TimeAgo from 'timeago-react'

function ChatUser ({ id, users }) {
  const [user] = useAuthState(auth)
  const [receiverSnapshot] = useCollection(
    db.collection('users').where('email', '==', getReceiver(users, user))
  )

  const goToChat = () => {
    router.push(`/chats/${id}`)
  }

  const receiver = getReceiver(users, user)
  const receiverPhoto = receiverSnapshot?.docs?.[0]?.data()
  const router = useRouter()

  return (
    <div
      onClick={goToChat}
      className='flex justify-between items-center cursor-pointer break-words space-x-1 p-5 hover:bg-gray-700'
    >
      {/**divided by flex and justify between with a space-x & align-items center */}
      {/**Left -> Has the avatar and the username in a flex */}
      <div className='items-center flex'>
        {receiver ? (
          <Avatar src={receiverPhoto?.photoURL} />
        ) : (
          <Avatar>{receiver[0]}</Avatar>
        )}
        <h4 className='font-medium ml-2 text-blue-100 hover:text-blue-200 w-32 break-words truncate'>
          {receiverPhoto?.username}
        </h4>
        {/**Right -> Has the time of when user was logged in */}
      </div>
      {receiverSnapshot ? (
        <h5 className='text-gray-600 font-semibold'>
          {receiverPhoto?.lastSeen?.toDate() ? (
            <TimeAgo datetime={receiverPhoto?.lastSeen?.toDate()} />
          ) : (
            'N/A'
          )}
        </h5>
      ) : (
        <h5 className='text-gray-600 font-semibold'>Loading...</h5>
      )}
    </div>
  )
}

export default ChatUser
