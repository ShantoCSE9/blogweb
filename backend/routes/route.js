const express= require('express');
const { register, login} = require('../controller/userController');
const {  createBlog, updateBlog, homeBlogs, singleBlog, deleteBlog, allBlogs, uploadPhoto, categoryBlog, userBlog, userPendingBlog, UpdateBlog, draftBlogs, pendingBlogs, adminUpdateBlog } = require('../controller/userBlog');
const multer  = require('multer')
const router=express.Router();
const { adminBlog } = require('../controller/adminBlog');

const storage =multer.memoryStorage()
const upload = multer({ storage: storage })

router.post('/register', register);
router.post('/login',login);
router.get('/',allBlogs);
router.post('/upload',upload.single('avatar'),uploadPhoto)
router.post('/create-blog', createBlog);
router.get('/update-blog/:id',updateBlog);
router.put('/Update-Blog/:id',UpdateBlog);
router.get('/category/:category', categoryBlog)
router.post('/home-blogs',homeBlogs);
router.post('/draft-blog',draftBlogs);
router.get('/single-blog/:id',singleBlog);
router.get('/user-blog/:id',userBlog);
router.get('/userPending-blog/:id',userPendingBlog);
router.get('/adminBlog',adminBlog)
router.get('/pending-blogs',pendingBlogs)
router.post('/admin-update-blogs',adminUpdateBlog)
module.exports=router;