//front-end
import TwitterIcon from '@material-ui/icons/Twitter'
//back-end

function Loading () {
  return (
    <center
      className='bg-gray-900'
      style={{
        display: 'grid',
        placeItems: 'center',
        height: '100vh'
      }}
    >
      <div className='bg-gray-900'>
        <TwitterIcon height={180} width={180} />
      </div>
    </center>
  )
}

export default Loading
