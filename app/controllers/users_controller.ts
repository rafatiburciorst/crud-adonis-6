import type { HttpContext } from '@adonisjs/core/http'
import { inject } from '@adonisjs/core'
import UserService from '#services/user_service'

@inject()
export default class UsersController {
  constructor(private userService: UserService) {}

  async create({ view }: HttpContext) {
    return view.render('pages/users/create')
  }

  async store({ request, response, view }: HttpContext) {
    try {
      const { name, email, password, passwordConfirmation } = request.only([
        'name',
        'email',
        'password',
        'passwordConfirmation',
      ])

      if (password !== passwordConfirmation) {
        throw new Error('Passwords do not match')
      }

      await this.userService.createUser(name, email, password)

      response.redirect('/login')
    } catch (error) {
      return view.render('pages/users/create', { error: error.message })
    }
  }

  async profile({ view, auth }: HttpContext) {
    const user = auth.user
    return view.render('pages/users/profile', { user })
  }

  async editProfile({ request, auth, response }: HttpContext) {
    try {
      const { fullName, email } = request.all()

      const user = await this.userService.update(fullName, email, auth.user!.id)

      return response.status(200).send(user)
    } catch (error) {
      console.error(error)
      return response.status(400).send({ error: error.message })
    }
  }

  async changePassword({ request, auth, response }: HttpContext) {
    try {
      const { currentPassword, password, passwordConfirmation } = request.all()
      console.log(currentPassword, password, passwordConfirmation)
      if (password !== passwordConfirmation) {
        throw new Error('Passwords do not match')
      }

      await this.userService.changePassword(auth.user!.id, password, currentPassword)

      return response.status(200).send({ message: 'Password updated successfully' })
    } catch (error) {
      return response.status(400).send({ error: error.message })
    }
  }
}
