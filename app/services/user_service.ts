import User from '#models/user'
import hash from '@adonisjs/core/services/hash'

export default class UserService {
  async createUser(name: string, email: string, password: string) {
    const exists = await this.findUserByEmail(email)

    if (exists) {
      throw new Error('User already exists')
    }

    const user = new User()
    user.fullName = name
    user.email = email
    user.password = password

    await user.save()
  }

  async findUserByEmail(email: string) {
    return User.findBy('email', email)
  }

  async findUserById(id: number) {
    return User.findBy('id', id)
  }

  async update(fullName: string, email: string, id: number) {
    const user = await User.findBy('id', id)

    if (!user) {
      throw new Error('User not found')
    }

    user.fullName = fullName
    user.email = email

    await user.save()

    return user
  }

  async changePassword(id: number, password: string, currentPassword: string) {
    const user = await User.findBy('id', id)

    if (!user) {
      throw new Error('User not found')
    }

    const verified = await this.verify(user.password, currentPassword)

    if (!verified) {
      throw new Error('Invalid password')
    }

    user.password = password

    await user.save()
  }

  private async verify(password: string, rawPassword: string) {
    return hash.verify(password, rawPassword)
  }
}
