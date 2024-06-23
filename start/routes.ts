const SessionController = () => import('#controllers/session_controller')
const UsersController = () => import('#controllers/users_controller')
import router from '@adonisjs/core/services/router'
import { middleware } from './kernel.js'

router.get('/', async ({ response }) => {
  response.send('Hello world')
})
router.on('/dashboard').render('pages/dashboard/index').as('dashboard').use(middleware.auth())

router.group(() => {
  router.get('/login', [SessionController, 'signIn'])
  router.post('/login', [SessionController, 'store'])
  router.get('/logout', [SessionController, 'signOut']).as('logout')
})

router.group(() => {
  router.get('/register', [UsersController, 'create'])
  router.post('/register', [UsersController, 'store'])
  router.get('/me', [UsersController, 'profile']).as('profile').use(middleware.auth())
  router
    .put('/profile/edit', [UsersController, 'editProfile'])
    .as('profile.edit')
    .use(middleware.auth())
  router
    .put('/password/edit', [UsersController, 'changePassword'])
    .as('changePassword')
    .use(middleware.auth())
})
