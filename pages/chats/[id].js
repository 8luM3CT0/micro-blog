//front-end
import Head from 'next/head'
import Sidebar from '../../components/sidebar/Sidebar'
import Chats from '../../components/chat-component/Chats'
import ChatComponent from '../../components/chat-component/ChatComponent'
//back-end
import { db, auth } from '../../firebase'
import firebase from 'firebase'
import { useAuthState } from 'react-firebase-hooks/auth'
import getReceiver from '../../utils/getReceiver'

function Chat ({ chat, messages }) {
  const [user] = useAuthState(auth)

  return (
    <div className='h-screen overflow-hidden bg-black'>
      <Head>
        <title>Microblogging/chat/user</title>
      </Head>
      <main className='flex mx-auto xl:max-w-7xl'>
        <Sidebar />
        <Chats />
        <div className='flex-1 h-screen overflow-y-scroll scrollbar-hide bg-black'>
          {/**CHatFeed */}
          <ChatComponent chat={chat} messages={messages} />
        </div>
      </main>
    </div>
  )
}

export default Chat

export async function getServerSideProps (context) {
  const ref = db.collection('chat-users').doc(context.query.id)

  // Prepare the messages
  const messageRes = await ref
    .collection('messages')
    .orderBy('timestamp', 'asc')
    .get()

  const messages = messageRes.docs
    .map(doc => ({
      id: doc.id,
      ...doc.data()
    }))
    .map(messages => ({
      ...messages,
      timestamp: messages.timestamp.toDate().getTime()
    }))

  //Prepare the chat itself
  const chatRes = await ref.get()
  const chat = {
    id: chatRes.id,
    ...chatRes.data()
  }

  return {
    props: {
      messages: JSON.stringify(messages),
      chat: chat
    }
  }
}
