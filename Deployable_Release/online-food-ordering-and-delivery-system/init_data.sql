USE food;
INSERT INTO `role` VALUES (1,'ROLE_CUSTOMER'),(2,'ROLE_ADMIN'),(3,'ROLE_RESTAURANT'),(4,'ROLE_DELIVERY_PARTNER');
INSERT INTO user(id, active,email,password) VALUES(1, true,"lalit@gmail.com","$2y$10$6SW0ca67pAblDOUg6rzLauTvPVbbOeXSHSjQSMGeO65xMefNSBwgS");
INSERT INTO user_roles(role_id,user_id) VALUES(2,1);

