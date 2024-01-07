import * as express from 'express'
import ArticleController from '../controller/ArticleController'
import VoterController from '../controller/VoterController'
import PartaiController from '../controller/PartaiController'
import PaslonController from '../controller/PaslonController'
import AuthController from '../controller/AuthController'
import AuthMiddleware from '../middlewares/Auth'
import UploadFile from '../middlewares/UploadFile'
import UserController from '../controller/UserController'
import multer = require('multer')

const router = express.Router()
const upload = multer();

router.get('/articles', ArticleController.find)
router.get('/article/:id', ArticleController.getOne)
router.get('/articless', ArticleController.getAll)
router.post('/article', AuthMiddleware.Auth, UploadFile.upload("gambar"), ArticleController.create)
router.put('/article/:id', AuthMiddleware.Auth, UploadFile.upload("gambar"), ArticleController.update)
router.delete('/article/:id', AuthMiddleware.Auth, ArticleController.delete)

router.get('/paslons', PaslonController.find)
router.get('/paslon/:id', PaslonController.getOne)
router.get('/paslonss', PaslonController.getAll)
router.post('/paslon', UploadFile.upload("paslonImg"), PaslonController.create)
router.put('/paslon/:id', AuthMiddleware.Auth, UploadFile.upload("paslonImg"), PaslonController.update)
router.delete('/paslon/:id', AuthMiddleware.Auth, PaslonController.delete)

router.get('/partais', PartaiController.find)
router.get('/partai/:id', PartaiController.getOne)
router.get('/partaiss', PartaiController.getAll)
router.post('/partai', UploadFile.upload("partaiImg"), PartaiController.create)
router.put('/partai/:id', AuthMiddleware.Auth, UploadFile.upload("partaiImg"), PartaiController.update)
router.delete('/partai/:id', AuthMiddleware.Auth, PartaiController.delete)

router.get('/voter/:id', VoterController.getOne)
router.get('/voters', VoterController.getAll)
router.get("/votercount/:id", VoterController.getCountVoter);
router.post('/voter', AuthMiddleware.Auth, VoterController.create)
router.put('/voter/:id', AuthMiddleware.Auth, VoterController.update)
router.delete('/voter/:id', AuthMiddleware.Auth, VoterController.delete)

router.post('/auth/register', AuthController.register)
router.post('/auth/login', AuthController.login)

router.delete("/user/:id", UserController.delete)
router.get('/user/:id', UserController.getOne)
router.get('/users', UserController.getAll)
router.put('/user/:id', AuthMiddleware.Auth, UserController.update)
router.delete('/user/:id', AuthMiddleware.Auth, UserController.delete)

export default router