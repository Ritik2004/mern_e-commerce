const express = require('express');
const { getAllProducts, createProduct, updateProduct, deleteProduct, getProductDetail, createProductReview, getProductReviews, deleteReview } = require('../controller/productController');
const {isAuthenticatedUser, authorizeRoles} = require('../middleware/auth');

const router = express.Router();


//below if the user is authenticated then only he can do the operations
//there is also one more check for the admin
router.get("/products", getAllProducts);
router.post("/product/new", isAuthenticatedUser, authorizeRoles("admin"), createProduct)
router.put("/product/:id", isAuthenticatedUser, authorizeRoles("admin"),updateProduct)
router.delete("/product/:id",isAuthenticatedUser, authorizeRoles("admin"),deleteProduct)
router.get("/product/:id", getProductDetail) //isAuthenticatedUser, i am removing this just for frontend

router.put("/review",isAuthenticatedUser, createProductReview)

router.get("/reviews", getProductReviews)

router.delete("/reviews", isAuthenticatedUser, deleteReview)

module.exports = router 