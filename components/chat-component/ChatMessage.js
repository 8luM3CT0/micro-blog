//front-end
import moment from 'moment'
import styled from 'styled-components'
//back-end
import { useAuthState } from 'react-firebase-hooks/auth'
import { auth } from '../../firebase'

function ChatMessage ({ user, message }) {
  const [userLoggedIn] = useAuthState(auth)

  const TypeOfMessage = user === userLoggedIn?.email ? Sender : Receiver

  return (
    <div>
      <TypeOfMessage>
        {message?.message}
        <span className='text-gray-300 mt-3 p-3 text-sm absolute bottom-0 text-right right-0'>
          {message.timestamp ? moment(message.timestamp).format('LT') : '...'}
        </span>
      </TypeOfMessage>
    </div>
  )
}

export default ChatMessage

const MessageElement = styled.p`
  width: fit-content;
  padding: 15px;
  border-radius: 20px;
  margin: 10px;
  min-width: 60px;
  padding-bottom: 26px;
  position: relative;
  text-align: right;
`

const Sender = styled(MessageElement)`
  margin-left: auto;
  background-color: #1da1f2;
  color: whitesmoke;
`

const Receiver = styled(MessageElement)`
  background-color: gray;
  color: white;
  text-align: left;
`
