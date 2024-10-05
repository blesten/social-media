import { Request, Response } from 'express'
import bcrypt from 'bcrypt'
import User from '../models/User'
import Comment from '../models/Comment'
import Follower from '../models/Follower'
import Following from '../models/Following'
import MailToken from '../models/MailToken'
import Notification from '../models/Notification'
import Post from '../models/Post'
import Saved from '../models/Saved'

const resetCtrl = {
  resetData: async(req: Request, res: Response) => {
    try {
      await Comment.deleteMany({})
      await User.deleteMany({})
      await Follower.deleteMany({})
      await Following.deleteMany({})
      await MailToken.deleteMany({})
      await Notification.deleteMany({})
      await Post.deleteMany({})
      await Saved.deleteMany({})

      const giannaJamesPassword = await bcrypt.hash('Giannajames1234_', 12)
      const giannaJames = new User({
        name: 'Gianna James',
        username: 'gianna_james',
        email: 'giannajames@testmail.com',
        password: giannaJamesPassword,
        description: '',
        avatar: '',
        private: false
      })
      await giannaJames.save()

      const johnDoePassword = await bcrypt.hash('Johndoe1234_', 12)
      const johnDoe = new User({
        name: 'John Doe',
        username: 'john_',
        email: 'johndoe@testmail.com',
        password: johnDoePassword,
        description: 'Heyyo! I love cats 🤗',
        avatar: 'https://res.cloudinary.com/dpef9sjqt/image/upload/v1711682601/Social%20Media/users/pb56a9xsd8yuxiyc5yjb.jpg',
        private: true
      })
      await johnDoe.save()

      const marySmithPassword = await bcrypt.hash('Marysmith1234_', 12)
      const marySmith = new User({
        name: 'Mary Smith',
        username: 'mary_',
        email: 'marysmith@testmail.com',
        password: marySmithPassword,
        description: 'Hi! Welcome to my profile :)',
        avatar: 'https://res.cloudinary.com/dpef9sjqt/image/upload/v1711682713/Social%20Media/users/f6m5vpywotk76jvfww7f.jpg',
        private: false
      })
      await marySmith.save()

      const giannaLouisPassword = await bcrypt.hash('Giannalouis1234_', 12)
      const giannaLouis = new User({
        name: 'Gianna Louis',
        username: 'gianna_',
        email: 'giannalouis@testmail.com',
        password: giannaLouisPassword,
        description: 'Stay healthy! Stay motivated!',
        avatar: 'https://res.cloudinary.com/dpef9sjqt/image/upload/v1711682932/Social%20Media/users/zx5wxhgobfi2g7bdq0jv.jpg',
        private: false
      })
      await giannaLouis.save()

      const alexJohnsonPassword = await bcrypt.hash('Alexjohnson1234_', 12)
      const alexJohnson = new User({
        name: 'Alex Johnson',
        username: 'alex_',
        email: 'alexjohnson@testmail.com',
        password: alexJohnsonPassword,
        description: 'No gym no life!',
        avatar: 'https://res.cloudinary.com/dpef9sjqt/image/upload/v1711683070/Social%20Media/users/l3pwxcux6iretgzd30vz.jpg',
        private: true
      })
      await alexJohnson.save()

      const emilyBrownPassword = await bcrypt.hash('Emilybrown1234_', 12)
      const emilyBrown = new User({
        name: 'Emily Brown',
        username: 'emily_',
        email: 'emilybrown@testmail.com',
        password: emilyBrownPassword,
        description: "Hi, I'm Emily.",
        avatar: 'https://res.cloudinary.com/dpef9sjqt/image/upload/v1711683187/Social%20Media/users/rpmq0so4yeixehkep9ze.jpg',
        private: false
      })
      await emilyBrown.save()

      const emilyBrownFirstPost = new Post({
        user: emilyBrown._id,
        caption: 'My dream car 😍',
        images: [
          'https://res.cloudinary.com/dpef9sjqt/image/upload/v1711684394/Social%20Media/posts/usdhovetre99wetzyfvb.jpg'
        ]
      })
      await emilyBrownFirstPost.save()
      
      const giannaJamesFollower = new Follower({
        user: giannaJames._id,
        followers: []
      })
      await giannaJamesFollower.save()

      const giannaJamesFollowing = new Following({
        user: giannaJames._id,
        followings: [
          {
            user: emilyBrown._id,
            status: 1
          }
        ]
      })
      await giannaJamesFollowing.save()

      const giannaJamesSaved = new Saved({
        user: giannaJames._id,
        posts: []
      })
      await giannaJamesSaved.save()

      const johnDoeFollower = new Follower({
        user: johnDoe._id,
        followers: []
      })
      await johnDoeFollower.save()

      const johnDoeFollowing = new Following({
        user: johnDoe._id,
        followings: []
      })
      await johnDoeFollowing.save()

      const johnDoeSaved = new Saved({
        user: johnDoe._id,
        posts: []
      })
      await johnDoeSaved.save()

      const marySmithFollower = new Follower({
        user: marySmith._id,
        followers: []
      })
      await marySmithFollower.save()

      const marySmithFollowing = new Following({
        user: marySmith._id,
        followings: []
      })
      await marySmithFollowing.save()

      const marySmithSaved = new Saved({
        user: marySmith._id,
        posts: []
      })
      await marySmithSaved.save()

      const giannaLouisFollower = new Follower({
        user: giannaLouis._id,
        followers: []
      })
      await giannaLouisFollower.save()

      const giannaLouisFollowing = new Following({
        user: giannaLouis._id,
        followings: []
      })
      await giannaLouisFollowing.save()

      const giannaLouisSaved = new Saved({
        user: giannaLouis._id,
        posts: []
      })
      await giannaLouisSaved.save()

      const alexJohnsonFollower = new Follower({
        user: alexJohnson._id,
        followers: []
      })
      await alexJohnsonFollower.save()

      const alexJohnsonFollowing = new Following({
        user: alexJohnson._id,
        followings: []
      })
      await alexJohnsonFollowing.save()

      const alexJohnsonSaved = new Saved({
        user: alexJohnson._id,
        posts: []
      })
      await alexJohnsonSaved.save()

      const emilyBrownFollower = new Follower({
        user: emilyBrown._id,
        followers: [
          {
            user: giannaJames._id,
            status: 1
          }
        ]
      })
      await emilyBrownFollower.save()

      const emilyBrownFollowing = new Following({
        user: emilyBrown._id,
        followings: []
      })
      await emilyBrownFollowing.save()

      const emilyBrownSaved = new Saved({
        user: emilyBrown._id,
        posts: []
      })
      await emilyBrownSaved.save()

      return res.status(200).json({ msg: 'Data has been reset successfully' })
    } catch (err: any) {
      return res.status(500).json({ msg: err.message })
    }
  }
}

export default resetCtrl