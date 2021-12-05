CREATE DATABASE `GymDB`; 
USE `GymDB`;

CREATE TABLE User (
	user_id INT NOT NULL AUTO_INCREMENT,
  user_name VARCHAR(50) NOT NULL,
	pass_word VARCHAR(50) NOT NULL,
	fName VARCHAR(50),
	lName VARCHAR(50),
	gender VARCHAR(50),
	phone VARCHAR(50),
	dob VARCHAR(50),
  PRIMARY KEY (user_id)
);

CREATE TABLE Class (
  class_id int NOT NULL,
  class_name varchar(50) NOT NULL,
  class_type varchar(50) NOT NULL,
  PRIMARY KEY (class_id),
);
INSERT INTO class VALUES (274,'Curls n’ Crunches','Abs');
INSERT INTO class VALUES (288,	'Walk this Weigh',	'Strength');
INSERT INTO class VALUES (292, 'Wishful Shrinking',	'Cardio');
INSERT INTO class VALUES (294,	'Sweat',	'Cardio');
INSERT INTO class VALUES (295,	'Abs Fab / Fab Abs',	'Cardio');
INSERT INTO class VALUES (296,	'Power Hour',	'Strength');
INSERT INTO class VALUES (299,	'Fab & Fit & Fun',	'Abs');
INSERT INTO class VALUES (300,	'Move it, Shake it, Lift it',	'Cardio');

CREATE TABLE Membership (
  user_id int NOT NULL,
  payment varchar(50) NOT NULL,
  member_type varchar(7) NOT NULL,
  PRIMARY KEY (user_id),
  FOREIGN KEY (user_id) REFERENCES User(user_id)
);

CREATE TABLE UserClass (
    user_id int NOT NULL,
    class_id int NOT NULL,
    cl_status varchar(7) NOT NULL,
    PRIMARY KEY (user_id, class_id),
    FOREIGN KEY (user_id) REFERENCES User(user_id),
	  FOREIGN KEY (class_id) REFERENCES Class(class_id)
);


