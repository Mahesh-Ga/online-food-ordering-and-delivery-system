INSERT INTO role(user_role) VALUES("ROLE_CUSTOMER");
INSERT INTO role(user_role) VALUES("ROLE_ADMIN");
INSERT INTO role(user_role) VALUES("ROLE_RESTAURANT");
INSERT INTO role(user_role) VALUES("ROLE_DELIVERY_PARTNER");

INSERT INTO user(id, active,email,password) VALUES(3, true,"lalit@gmail.com","Lalit@123");
INSERT INTO user_roles(role_id,user_id) VALUES(2,3);


Lalit@123 ==>  $2y$10$6SW0ca67pAblDOUg6rzLauTvPVbbOeXSHSjQSMGeO65xMefNSBwgS
