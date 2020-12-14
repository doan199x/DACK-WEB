drop database if exists KhoaHocOnline;
create database KhoaHocOnline;
use KhoaHocOnline;
create table Teacher(
	teacherID int not null auto_increment,
    name varchar(30),
    email varchar(30),
    password varchar(100),
    avatarPath varchar(100),
    primary key(teacherID)
);
create table Category(
	categoryID int not null auto_increment,
    categoryName varchar(30),
    primary key(categoryID)
);
create table Admin(
	adminID int not null auto_increment,
    name varchar(30),
    email varchar(30),
    password varchar(50),
    primary key(adminID)
);
create table Log(
	logID int not null auto_increment,
    adminID int,
    activity varchar(30),
    time datetime,
    primary key(logID),
    foreign key(adminID) references Admin(adminID)
);
create table Student(
	studentID int not null auto_increment,
    name varchar(30),
    email varchar(30),
    password varchar(50),
    avatarPath varchar(100),
    balance int,
    primary key(studentID)
);
create table Bill(
	billID int not null auto_increment,
    timeCreated datetime,
    studentID int,
    sum int,
    primary key(billID),
    foreign key(studentID) references Student(studentID)
);
create table BillDetail(
	billDetailID int not null auto_increment,
    billID int,
    courseId int,
    price int,
    primary key(BillDetailID),
    foreign key(billID) references Bill(billID)
);
create table Course(
	courseID int not null auto_increment,
    name varchar(30),
    imagePath varchar(100),
    sortDescription varchar(500),
    description varchar(1000),
    NoStudents int,
    avarageStart float,
    price int,
    lastUpdated datetime,
    categoryID int,
    status varchar(30),
    teacherID int,
    primary key(courseID),
    foreign key(teacherID) references Teacher(teacherID),
    foreign key(categoryID) references Category(categoryID)
);
create table Sale(
	saleID int not null auto_increment,
    courseID int,
    percentDiscount float,
    postDiscountPrice int,
    description varchar(100),
    primary key(saleID),
    foreign key(courseID) references Course(courseID)
);

create table Chapter(
	chapterID int not null auto_increment primary key,
    chapterName varchar(30),
    courseID int,
    isOutline boolean,
    foreign key(courseID) references Course(courseID)
);

create table Lesson(
	lessonID int not null auto_increment,
    lessonName varchar(30),
    chapterID int,
    primary key(lessonID),
    foreign key(chapterID) references Chapter(chapterID)
);

create table WatchList(
	studentID int not null,
    courseID int not null,
    primary key(studentID,courseID),
    foreign key(studentID) references Student(studentID),
    foreign key(courseID) references Course(courseID)
);
create table Rate(
	studentID int not null,
    courseID int not null,
    NoStars int not null,
    comment varchar(100),
    primary key(studentID,courseID),
    foreign key(studentID) references Student(studentID),
    foreign key(courseID) references Course(courseID)
);
create table RegisteredCourse(
	studentID int not null,
    courseID int not null,
    primary key(studentId, courseID),
	foreign key(studentID) references Student(studentID),
    foreign key(courseID) references Course(courseID)
);