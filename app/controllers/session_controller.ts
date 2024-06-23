import { inject } from '@adonisjs/core'
import { HttpContext } from '@adonisjs/core/http'
import SessionService from '#services/session_service'

@inject()
export default class SessionController {
  constructor(private sessionService: SessionService) {}

  async signIn({ view }: HttpContext) {
    return view.render('pages/auth/login')
  }

  async store({ request, auth, response, view }: HttpContext) {
    try {
      const { email, password } = request.only(['email', 'password'])

      const user = await this.sessionService.signIn(email, password)

      await auth.use('web').login(user)

      response.redirect('/dashboard')
    } catch (error) {
      return view.render('pages/auth/login', { error: error.message })
    }
  }

  async signOut({ auth, response }: HttpContext) {
    await auth.use('web').logout()

    response.redirect('/')
  }
}
