import User from '#models/user'

export default class SessionService {
  async signIn(email: string, password: string) {
    const user = await User.verifyCredentials(email, password)

    if (!user) {
      throw new Error('Invalid credentials')
    }

    return user
  }
}
