import User from '../models/User.js'

export const getFriends = async (user) => {
  const friends = await Promise.all(user.friends.map((id) => User.findById(id)))
  const formattedFriends = friends.map(({ _id, firstName, lastName, occupation, location, picturePath }) => {
    return { _id, firstName, lastName, occupation, location, picturePath }
  })

  return formattedFriends
}
