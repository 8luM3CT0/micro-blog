//front-end
import Head from 'next/head'
import Sidebar from '../components/sidebar/Sidebar'
import Chats from '../components/chat-component/Chats'
import Welcome from '../components/chat-component/Welcome'
//back-end

function ChatHome () {
  return (
    <div className='h-screen overflow-hidden bg-black'>
      <Head>
        <title>Chat-page</title>
      </Head>
      <main className='flex mx-auto xl:max-w-7xl'>
        {/**Sidebar */}
        <Sidebar />
        {/**Chats */}
        <Chats />
        {/**Welcome */}
        <Welcome />
      </main>
    </div>
  )
}

export default ChatHome
