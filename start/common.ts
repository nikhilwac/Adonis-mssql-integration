import Route from '@ioc:Adonis/Core/Route'

Route.group(() => {
    Route.post('/user-registration', 'AuthenticationController.registerUser')
    Route.post('/user-login', 'AuthenticationController.tryLogin')
  }).prefix('/api')
