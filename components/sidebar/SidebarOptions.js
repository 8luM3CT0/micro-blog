//front-end
//back-end
function SidebarOptions ({ Icon, title, src }) {
  return (
    <div className='sidebarOption'>
      {src && (
        <img
          src={src}
          alt=''
          className='rounded-full ml-3'
          width={30}
          height={30}
          layout='fixed'
        />
      )}
      {Icon && (
        <Icon
          className='
                text-blue-300
                h-10
                w-10
                ml-3
                '
        />
      )}
      <p
        className='
            hidden
            sm:inline-flex
            font-bold
            text-blue-100
            text-lg
            sm:hidden
            '
      >
        {title}
      </p>
    </div>
  )
}

export default SidebarOptions
