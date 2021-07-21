//front-end
import { Avatar, Button } from '@material-ui/core'
import { Twitter } from '@material-ui/icons'
import {
  HomeIcon,
  HashtagIcon,
  BellIcon,
  InboxIcon,
  BookmarkIcon,
  ClipboardListIcon,
  UserCircleIcon,
  DotsCircleHorizontalIcon
} from '@heroicons/react/outline'
import SidebarOptions from './SidebarOptions'
import styled from 'styled-components'
//back-end
import { auth, db } from '../../firebase'
import { useAuthState } from 'react-firebase-hooks/auth'

function Sidebar () {
  const [user] = useAuthState(auth)

  const logOut = () => {
    auth.signOut()
  }

  return (
    <Container
      className=' 
      p-2 
      flex
      max-w-[600px]
      xl:min-w-[300px]
      flex-col 
      justify-between
      h-screen
      '
    >
      <div className='flex flex-col items-center'>
        <div className='grid mt-5 mb-3'>
          <TwitterLogo className='text-white' />
          <div className='flex flex-col mt-4'>
            <SidebarOptions Icon={HomeIcon} title='Home' />
            <SidebarOptions Icon={HashtagIcon} title='Explore' />
            <SidebarOptions Icon={BellIcon} title='Notifications' />
            <SidebarOptions Icon={InboxIcon} title='Messages' />
            <SidebarOptions Icon={BookmarkIcon} title='Bookmarks' />
            <SidebarOptions Icon={ClipboardListIcon} title='Lists' />
            <SidebarOptions Icon={UserCircleIcon} title='Profile' />
            <SidebarOptions Icon={DotsCircleHorizontalIcon} title='More' />
            <TweetBtn>
              <h3>Tweet</h3>
            </TweetBtn>
          </div>
        </div>
      </div>
      <div className='sidebarOption'>
        {/**UserDetails */}
        <UserIcon src={user.photoURL} onClick={logOut} />
        <div className='grid items-center ml-2'>
          <h1 className='text-lg text-blue-100 font-semibold'>
            {user?.displayName}
          </h1>
          <p className='text-md text-gray-400 font-medium w-52 truncate'>
            {user?.email}
          </p>
        </div>
      </div>
    </Container>
  )
}

export default Sidebar

const Container = styled.div``

const TwitterLogo = styled(Twitter)`
  &&& {
    height: 40px;
    width: 40px;
  }
`
const TweetBtn = styled(Button)`
  &&& {
    background-color: #5685bb;
    margin-top: 10px;
    text-transform: capitalize;
    color: white;
    border-radius: 999px;
    font-weight: 600;
  }
`

const UserIcon = styled(Avatar)`
  &&& {
    height: 40px;
    width: 40px;
  }
`
