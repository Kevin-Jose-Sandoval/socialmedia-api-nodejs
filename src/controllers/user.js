import User from '../models/User.js'
import { getFriends } from '../helpers/getFriends.js'

export const getUser = async (req, res) => {
  try {
    const { id } = req.params
    const user = await User.findById(id)

    return res.status(200).json(user)
  } catch (error) {
    return res.status(404).json({ message: error.message })
  }
}

export const getUserFriends = async (req, res) => {
  try {
    const { id } = req.params
    const user = await User.findById(id)

    const friends = await getFriends(user)

    return res.status(200).json(friends)
  } catch (error) {
    return res.status(404).json({ message: error.message })
  }
}

export const addRemoveFriend = async (req, res) => {
  try {
    const { id, friendId } = req.params
    const user = await User.findById(id)
    const friend = await User.findById(friendId)

    if (user.friends.includes(friendId)) {
      user.friends = user.friends.filter((id) => id !== friendId)
      friend.friends = friend.friends.filter((id) => id !== id)
    } else {
      user.friends.push(friendId)
      friend.friends.push(id)
    }
    await user.save()
    await friend.save()

    const friends = await getFriends(user)
    return res.status(200).json(friends)
  } catch (error) {
    return res.status(404).json({ message: error.message })
  }
}
