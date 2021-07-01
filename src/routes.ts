import { Router } from 'express'

// Middlewares
import { ensureAdmin } from './middlewares/ensureAdmin'

// Controllers
import { CreateUserController } from './controllers/CreateUserController'
import { CreateTagController } from './controllers/CreateTagController'
import { AuthenticateUserController } from './controllers/AuthenticateUserController'
import { CreateComplimentController } from './controllers/CreateComplimentController'
import { ensureAuthenticated } from './middlewares/ensureAuthenticated'
import { ListSendedUserComplimentsController } from './controllers/ListSendedUserComplimentsController'
import { ListReceivedUserComplimentsController } from './controllers/ListReceivedUserComplimentsController copy'
import { ListTagsController } from './controllers/ListTagsController'
import { ListUsersController } from './controllers/ListUsersController'

export const routes = Router()

const listUsersController = new ListUsersController()
const createUserController = new CreateUserController()
const authenticateUserController = new AuthenticateUserController()

const listTagsController = new ListTagsController()
const createTagController = new CreateTagController()

const createComplimentController = new CreateComplimentController()
const listSendedUserComplimentsController = new ListSendedUserComplimentsController()
const listReceivedUserComplimentsController = new ListReceivedUserComplimentsController()


routes.get('/users', ensureAuthenticated, ensureAdmin,  listUsersController.handle)
routes.post('/users', createUserController.handle)

routes.post('/sessions', authenticateUserController.handle)

routes.get('/tags', ensureAuthenticated, listTagsController.handle)
routes.post('/tags', ensureAuthenticated, ensureAdmin, createTagController.handle)

routes.get('/compliments/sended', ensureAuthenticated, listSendedUserComplimentsController.handle)
routes.get('/compliments/received', ensureAuthenticated, listReceivedUserComplimentsController.handle)
routes.post('/compliments', ensureAuthenticated, createComplimentController.handle)
