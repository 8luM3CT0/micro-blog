//front-end
import styled from 'styled-components'
import Head from 'next/head'
import { Button } from '@material-ui/core'
import { Twitter } from '@material-ui/icons'
//back-end
import { auth, provider } from '../firebase'

function Login () {
  const signIn = () => {
    auth.signInWithPopup(provider).catch(alert)
  }
  return (
    <div className='flex h-screen overflow-hidden'>
      <Head>
        <title>Login page</title>
      </Head>
      <div className='loginLeft'>
        <div className='items-center grid '>
          <BigLogo className='text-blue-100' />
        </div>
      </div>
      <div className='loginRight'>
        <div className='items-center grid'>
          <div className=' grid items-center mb-4'>
            <Logo className='text-blue-300' />
            <h1 className='loginText2'>
              See what's happening in the world right now
            </h1>
          </div>
          <div className='grid items-center'>
            <h2 className='loginText3 text-md'>Join Twitter today</h2>
            <SignInBtn
              className='sm:p-2 sm:w-40 xl:w-80 sm:break-words sm:truncate'
              onClick={signIn}
            >
              <h2>Sign in with Google</h2>
            </SignInBtn>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Login

const BigLogo = styled(Twitter)`
  &&& {
    height: 180px;
    width: 180px;
  }
`

const Logo = styled(Twitter)`
  &&& {
    height: 60px;
    width: 60px;
  }
`
const SignInBtn = styled(Button)`
  &&& {
    padding: 10px;
    background-color: #90b0d4;
    margin-top: 10px;
    text-transform: capitalize;
    color: white;
    border-radius: 16px;
    font-weight: 600;
    :hover {
      background-color: #74a6df;
    }
  }
`
