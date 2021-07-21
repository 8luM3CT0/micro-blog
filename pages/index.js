//front-end
import Head from 'next/head'
import Sidebar from '../components/sidebar/Sidebar'
import Feed from '../components/feed/Feed'
import Widgets from '../components/widgets/Widgets'
//back-end
import { auth, db } from '../firebase'
import { useAuthState } from 'react-firebase-hooks/auth'
export default function Home ({ tweets }) {
  return (
    <div className='h-screen overflow-hidden bg-black'>
      <Head>
        <title>Microblogging</title>
      </Head>
      <main className='flex mx-auto xl:max-w-7xl'>
        {/**Sidebar */}
        <Sidebar />
        {/**Feed */}
        <Feed tweets={tweets} />
        {/**Widgets */}
        <Widgets />
      </main>
    </div>
  )
}

export async function ServerSideProps (context) {
  //gets the tweets
  const ref = db.collection('tweets').doc(context.query.id)

  //prepare tweets server side
  const tweetRes = await ref
    .collection('tweets')
    .orderBy('timestamp', 'asc')
    .get()

  const tweets = tweetRes.docs
    .map(doc => ({
      id: doc.id,
      ...doc.data()
    }))
    .map(tweets => ({
      ...tweets,
      timestamp: tweets.timestamp.toDate().getTime()
    }))

  return {
    props: {
      tweets: JSON.stringify(tweets)
    }
  }
}
