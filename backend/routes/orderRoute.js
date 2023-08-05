const express = require('express');
const router = express.Router();
const {isAuthenticatedUser, authorizeRoles} = require('../middleware/auth');
const { newOrder, getSingleOrder, myOrders, getAllOrders, updateOrder, deleteOrder } = require('../controller/orderController');


router.post("/order/new" ,isAuthenticatedUser,newOrder)

router.get("/order/:id", isAuthenticatedUser, authorizeRoles("admin"),getSingleOrder);

router.get("/order/me", isAuthenticatedUser, myOrders);

router.get("/admin/orders", isAuthenticatedUser, authorizeRoles("admin"), getAllOrders);

router.put("/admin/order/:id", isAuthenticatedUser, authorizeRoles("admin"), updateOrder);

router.delete("/admin/order/:id", isAuthenticatedUser, authorizeRoles("admin"), deleteOrder);



module.exports = router;