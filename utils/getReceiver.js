const getReceiver = (users, userLoggedIn) =>
  users?.filter(userToFilter => userToFilter !== userLoggedIn?.email)[0]

export default getReceiver
