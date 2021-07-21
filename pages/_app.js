//front-end
import '../styles/globals.css'
import Login from './login'
import Loading from '../components/loading/Loading'
//back-end
import { useEffect } from 'react'
import { useAuthState } from 'react-firebase-hooks/auth'
import { auth, db } from '../firebase'
import firebase from 'firebase'

function MyApp ({ Component, pageProps }) {
  const [user, loading] = useAuthState(auth)

  useEffect(() => {
    if (user) {
      db.collection('users')
        .doc(user.uid)
        .set(
          {
            email: user.email,
            username: user.displayName,
            lastSeen: firebase.firestore.FieldValue.serverTimestamp(),
            photoURL: user.photoURL
          },
          { merge: true }
        )
    }
  }, [user])

  if (loading)
    return (
      <h1>
        <Loading />
      </h1>
    )
  if (!user) return <Login />

  return <Component {...pageProps} />
}

export default MyApp
