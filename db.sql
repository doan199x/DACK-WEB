drop database if exists onlineCourse;
create database onlineCourse;
use onlineCourse;
ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY '123@';
flush privileges;
create table Teacher(
	teacherID int not null auto_increment,
    name varchar(30),
    email varchar(30),
    password varchar(100),
    avatarPath varchar(100),
    primary key(teacherID)
);
create table PostCategory(
	postCategoryID int not null auto_increment,
    postCategoryName varchar(30),
    primary key(postCategoryID)
);
create table Category(
	categoryID int not null auto_increment,
    categoryName varchar(30),
    postCategoryID int,
    primary key(categoryID),
    foreign key(postCategoryID) references PostCategory(postCategoryID)
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
    activity varchar(200),
    time datetime,
    primary key(logID),
    foreign key(adminID) references Admin(adminID)
);
create table Student(
	studentID int not null auto_increment,
    name varchar(30),
    phone varchar(30),
    dateOfBirth datetime,
    dateJoin datetime,
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
    status varchar(30),
    primary key(billID),
    foreign key(studentID) references Student(studentID)
);
create table Course(
	courseID int not null auto_increment,
    name varchar(100),
    imagePath varchar(100),
    sortDescription varchar(500),
    description varchar(1000),
    NoStudents int,
    averageStar float,
    price int,
    created datetime,
    lastUpdated datetime,
    categoryID int,
    status varchar(30),
    teacherID int,
    views int,
    primary key(courseID),
    foreign key(teacherID) references Teacher(teacherID),
    foreign key(categoryID) references Category(categoryID)
);

create table BillDetail(
	billDetailID int not null auto_increment,
    billID int,
    courseID int,
    price int,
    primary key(BillDetailID),
    foreign key(billID) references Bill(billID),
    foreign key(courseID) references Course(courseID)
);

create table Sale(
	saleID int not null auto_increment,
    courseID int,
    percentDiscount float,
    postDiscountPrice int,
    timeStart datetime,
    timeEnd datetime,
    description varchar(100),
    primary key(saleID),
    foreign key(courseID) references Course(courseID)
);

create table Chapter(
	chapterID int not null auto_increment primary key,
    chapterName varchar(200),
    courseID int,
    isOutline boolean,
    foreign key(courseID) references Course(courseID)
);

create table Lesson(
	lessonID int not null auto_increment,
    lessonName varchar(200),
    chapterID int,
    videoPath varchar(100),
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
create table Rating(
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
create table account(
	accountID int not null auto_increment primary key,
    email varchar(30),
    password varchar(50) not null,
    position int
);



/*Data*/
insert into account(email,password,position) values ('admin@admin.com','123',1);
insert into account(email,password,position) values ('teacher@teacher.com','123',2);
insert into account(email,password,position) values ('student@student.com','123',3);

insert into Teacher (name,email,password,avatarPath)values('Nguyễn Văn An','vanan123@gmail.com','123456','/public/images/avatar/teacher1.jpg');
insert into Teacher (name,email,password,avatarPath)values('Hoàng Thu Trang','thutrang2412@gmail.com','123456','/public/images/avatar/default.jpg');
insert into Teacher (name,email,password,avatarPath)values('Trần Hoàng Hùng','hungtran124@gmail.com','123456','/public/images/avatar/default.jpg');
insert into Teacher (name,email,password,avatarPath)values('Hoàng Hiệu','hieuhoang1111@gmail.com','123456','/public/images/avatar/default.jpg');
insert into Teacher (name,email,password,avatarPath)values('Đỗ Thu Thủy','thuydo11122@gmail.com','123456','/public/images/avatar/default.jpg');
insert into Teacher (name,email,password,avatarPath)values('Nguyễn Viết Hạ','vietha@gmail.com','123456','/public/images/avatar/default.jpg');
insert into Teacher (name,email,password,avatarPath)values('Nguyễn Hoàng Anh','anhhoang156@gmail.com','123456','/public/images/avatar/default.jpg');
insert into Teacher (name,email,password,avatarPath)values('Hoàng Phan Hoài An','yendan123@gmail.com','123456','/public/images/avatar/default.jpg');
insert into Teacher (name,email,password,avatarPath)values('Trần Đình Trọng','trongtran@gmail.com','123456','/public/images/avatar/default.jpg');

/*post-category*/
insert into PostCategory (postCategoryName) values('IT');
insert into PostCategory (postCategoryName) values('Nấu ăn');


insert into Category (categoryName,postCategoryID) values('Lập trình web',1);
insert into Category (categoryName,postCategoryID) values('Lập trình thiết bị di động',1);

insert into Category (categoryName,postCategoryID) values('Nấu ăn căn bản',2);
insert into Category (categoryName,postCategoryID) values('Nấu ăn chuyên nghiệp',2);


insert into Admin (name,email,password) values('Nguyễn Hồng Anh','anhnguyen115@gmail.com','123456');
insert into Admin (name,email,password) values('Hà Văn Quản','quanha11234@gmail.com','123456');

insert into Log (adminID,activity,time) values(1,'Đăng nhập','2021-01-01');
insert into Log (adminID,activity,time) values(2,'Xóa thành viên vanan123@gmail.com','2021-01-01');

insert into Student (name,phone,dateOfBirth,dateJoin,email,password,avatarPath,balance) values('Trần Hoàng Cường','0858343803','1999-01-01',now(),'cuonghoang1213@gmail.com','123456','/img/avatar/default.jpg',100000);
insert into Student (name,phone,dateOfBirth,dateJoin,email,password,avatarPath,balance) values('Nguyễn Thị Hạ','0858343804','1999-01-02',now(),'hanguyen45451@gmail.com','123456','/img/avatar/default.jpg',100000);
insert into Student (name,phone,dateOfBirth,dateJoin,email,password,avatarPath,balance) values('Hoàng Công Ẩn','0858343853','1999-01-03',now(),'anhoang11235@gmail.com','123456','/img/avatar/default.jpg',100000);
insert into Student (name,phone,dateOfBirth,dateJoin,email,password,avatarPath,balance) values('Đỗ Thị Liễu','0858343806','1999-01-04',now(),'nguyenlieu55151@gmail.com','123456','/img/avatar/default.jpg',100000);
insert into Student (name,phone,dateOfBirth,dateJoin,email,password,avatarPath,balance) values('Lý Thị Mai','0858343873','1999-01-05',now(),'maily2545151@gmail.com','123456','/img/avatar/default.jpg',100000);
insert into Student (name,phone,dateOfBirth,dateJoin,email,password,avatarPath,balance) values('Nguyễn Công Hưởng','0858343883','1999-01-06',now(),'huongcongnguyen@gmail.com','123456','/img/avatar/default.jpg',100000);
insert into Student (name,phone,dateOfBirth,dateJoin,email,password,avatarPath,balance) values('Nguyễn Nhật Nam','0858343810','1999-01-07',now(),'namnhat124566@gmail.com','123456','/img/avatar/default.jpg',100000);
insert into Student (name,phone,dateOfBirth,dateJoin,email,password,avatarPath,balance) values('Đào Bá Quang','0858343811','1999-01-08',now(),'quangba54545@gmail.com','123456','/img/avatar/default.jpg',100000);
insert into Student (name,phone,dateOfBirth,dateJoin,email,password,avatarPath,balance) values('Hà Huy Lợi','0858343812','1999-01-09',now(),'loaihuy124510@gmail.com','123456','/img/avatar/default.jpg',100000);
insert into Student (name,phone,dateOfBirth,dateJoin,email,password,avatarPath,balance) values('Nguyễn Hoàng Tín','0858343813','1999-01-10',now(),'hoangtin1508@gmail.com','123456','/img/avatar/default.jpg',100000);
insert into Student (name,phone,dateOfBirth,dateJoin,email,password,avatarPath,balance) values('Phạn Huy Ích','0858343814','1999-01-11',now(),'huyich@gmail.com','123456','/img/avatar/default.jpg',100000);
insert into Student (name,phone,dateOfBirth,dateJoin,email,password,avatarPath,balance) values('Lý Thị Thủy','0858343815','1999-01-12',now(),'thuylty111213@gmail.com','123456','/img/avatar/default.jpg',100000);
insert into Student (name,phone,dateOfBirth,dateJoin,email,password,avatarPath,balance) values('Đào Bá Nhật','0858343816','1999-01-13',now(),'banhat1678@gmail.com','123456','/img/avatar/default.jpg',100000);
insert into Student (name,phone,dateOfBirth,dateJoin,email,password,avatarPath,balance) values('Đinh Lan Hương','0858343817','1999-01-14',now(),'huonglan@gmail.com','123456','/img/avatar/default.jpg',100000);
insert into Student (name,phone,dateOfBirth,dateJoin,email,password,avatarPath,balance) values('Nguyễn Đình Cảnh','0858343818','1999-01-15',now(),'canhdinh55689@gmail.com','123456','/img/avatar/default.jpg',100000);
insert into Student (name,phone,dateOfBirth,dateJoin,email,password,avatarPath,balance) values('Lã Văn Cà','0858343819','1999-01-16',now(),'cala121551@gmail.com','123456','/img/avatar/default.jpg',100000);
insert into Student (name,phone,dateOfBirth,dateJoin,email,password,avatarPath,balance) values('Đương Văn Hoàng','0858343820','1999-01-17',now(),'hoangduong5415151@gmail.com','123456','/img/avatar/default.jpg',100000);

insert into Bill (timeCreated,studentID,sum,status) values(now(),1,100000,'Đã xử lí');
insert into Bill (timeCreated,studentID,sum,status) values(now(),2,200000,'Đã xử lí');
insert into Bill (timeCreated,studentID,sum,status) values(now(),3,300000,'Chờ xử lí');
insert into Bill (timeCreated,studentID,sum,status) values(now(),4,400000,'Chờ xử lí');

insert into Course (name,imagePath,sortDescription,description,NoStudents,averageStar,price,created,lastUpdated,categoryID,status,teacherID,views) 
values('Lập trình Android căn bản','/img/course/course1.jpg','Khóa học làm quen với lập trình Android','Khóa học làm quen với lập trình Android Khóa học làm quen với lập trình Android',100,3.6,50000,now(),now(),2,'Đã hoàn tất',1,103);
insert into Course (name,imagePath,sortDescription,description,NoStudents,averageStar,price,created,lastUpdated,categoryID,status,teacherID,views) 
values('Lập trình Android nâng cao','/img/course/course2.jpg','Lập trình Android nâng cao','Lập trình Android nâng cao Lập trình Android nâng cao',200,4.5,50000,now(),now(),2,'Đã hoàn tất',1,104);
insert into Course (name,imagePath,sortDescription,description,NoStudents,averageStar,price,created,lastUpdated,categoryID,status,teacherID,views) 
values('Lập trình IOS căn bản','/img/course/course3.jpg','Làm quen với lập trình IOS','Giúp hiểu các khái niệm cơ bản về IOS',100,3.6,100000,now(),now(),2,'Đã hoàn tất',1,105);
insert into Course (name,imagePath,sortDescription,description,NoStudents,averageStar,price,created,lastUpdated,categoryID,status,teacherID,views) 
values('Lập trình IOS nâng cao','/img/course/course4.jpg','Học về IOS nâng cao','Tiếp cận các khái niệm nâng cao về ios',100,5,100000,now(),now(),2,'Đã hoàn tất',1,236);
insert into Course (name,imagePath,sortDescription,description,NoStudents,averageStar,price,created,lastUpdated,categoryID,status,teacherID,views) 
values('Lập trình Nodejs cho người mới bắt đầu','/img/course/course5.jpg','Khóa học làm quen với lập trình NodeJS','giúp hiểu các khái niệm cơ bản trong Nodejs',256,4.6,150000,now(),now(),1,'Đã hoàn tất',1,16);
insert into Course (name,imagePath,sortDescription,description,NoStudents,averageStar,price,created,lastUpdated,categoryID,status,teacherID,views) 
values('Lập trình Nodejs nâng cao','/img/course/course6.jpg','Khóa học làm quen với lập trình Android','Khóa học làm quen với lập trình Android Khóa học làm quen với lập trình Android',512,3.8,150000,now(),now(),2,'Đã hoàn tất',1,921);
insert into Course (name,imagePath,sortDescription,description,NoStudents,averageStar,price,created,lastUpdated,categoryID,status,teacherID,views) 
values('Cùng học Python','/img/course/course7.jpg','Khóa học làm quen với lập trình Python căn bản','Giúp hiểu rõ các khái niệm căn bản trong python',631,2.1,200000,now(),now(),2,'Đã hoàn tất',1,716);
insert into Course (name,imagePath,sortDescription,description,NoStudents,averageStar,price,created,lastUpdated,categoryID,status,teacherID,views) 
values('Python cho mọi người','/img/course/course8.jpg','Lập trình python căn bản','Học cách lập trình python căn bản',521,4.8,200000,now(),now(),2,'Đã hoàn tất',1,908);
insert into Course (name,imagePath,sortDescription,description,NoStudents,averageStar,price,created,lastUpdated,categoryID,status,teacherID,views) 
values('Lập trình ASP.NET','/img/course/course9.jpg','Làm quen với ASP.NET','Khóa học dnahf cho người mới bắt đầu',215,4.5,250000,now(),now(),2,'Đã hoàn tất',1,301);
insert into Course (name,imagePath,sortDescription,description,NoStudents,averageStar,price,created,lastUpdated,categoryID,status,teacherID,views) 
values('Lập trình Xamarin','/img/course/course10.jpg','Giúp lập trình Xamarin','Khóa học ngắn hạn',5612,1.6,250000,now(),now(),1,'Đã hoàn tất',1, 1050);
insert into Course (name,imagePath,sortDescription,description,NoStudents,averageStar,price,created,lastUpdated,categoryID,status,teacherID,views) 
values('Lập trình Java căn bản','/img/course/course11.jpg','Java căn bản','Khóa học ngắn hạn',5612,3.5,300000,now(),now(),1,'Đã hoàn tất',2, 1253);
insert into Course (name,imagePath,sortDescription,description,NoStudents,averageStar,price,created,lastUpdated,categoryID,status,teacherID,views) 
values('Java và OOP','/img/course/course12.jpg','OOP trong Java','Tìm hiểu OOP trong Java',5612,4.6,300000,now(),now(),1,'Đã hoàn tất',3, 1011);
insert into Course (name,imagePath,sortDescription,description,NoStudents,averageStar,price,created,lastUpdated,categoryID,status,teacherID,views) 
values('Java nâng cao','/img/course/course13.jpg','Các khái niệm nâng cao trong java','Bổ sung kiến thức nâng cao trong Java',5612,4.7,300000,now(),now(),1,'Đã hoàn tất',3, 2500);
insert into Course (name,imagePath,sortDescription,description,NoStudents,averageStar,price,created,lastUpdated,categoryID,status,teacherID,views) 
values('Java spring','/img/course/course14.jpg','Lập trinh Java với Framework Spring','Khóa học giúp làm quen với Framework spring',5612,2.1,300000,now(),now(),1,'Đã hoàn tất',2, 2530);

insert into Course (name,imagePath,sortDescription,description,NoStudents,averageStar,price,created,lastUpdated,categoryID,status,teacherID,views) 
values('Nhập môn nấu ăn','/img/course/course14.jpg','Làm quen với việc nấu nướng','Khóa học giúp làm quen với việc nấu nướng',1982,4.9,300000,now(),now(),2,'Đã hoàn tất',2, 3333);
insert into Course (name,imagePath,sortDescription,description,NoStudents,averageStar,price,created,lastUpdated,categoryID,status,teacherID,views) 
values('Kĩ thuật nấu ăn','/img/course/course14.jpg','Nâng cao kĩ thuật nấu nước','Giới thiệu nâng cao về nấu nướng',324,4.5,300000,now(),now(),2,'Đã hoàn tất',2, 130);
insert into Course (name,imagePath,sortDescription,description,NoStudents,averageStar,price,created,lastUpdated,categoryID,status,teacherID,views) 
values('Thế giới nấu ăn','/img/course/course14.jpg','Làm quen các món ăn trên thế giới','Giới thiệu về các món ăn trên thế giới',3224,5.0,300000,now(),now(),2,'Đã hoàn tất',2, 8728);

insert into BillDetail (billID, courseID,price) values(1,1,50000);
insert into BillDetail (billID, courseID,price) values(1,2,50000);
insert into BillDetail (billID, courseID,price) values(2,3,100000);
insert into BillDetail (billID, courseID,price) values(2,4,100000);
insert into BillDetail (billID, courseID,price) values(3,5,150000);
insert into BillDetail (billID, courseID,price) values(3,6,150000);
insert into BillDetail (billID, courseID,price) values(4,7,200000);
insert into BillDetail (billID, courseID,price) values(4,8,200000);

insert into WatchList (studentID,courseID) values(1,1);
insert into WatchList (studentID,courseID) values(1,2);
insert into WatchList (studentID,courseID) values(1,3);
insert into WatchList (studentID,courseID) values(1,4);
insert into WatchList (studentID,courseID) values(1,5);
insert into WatchList (studentID,courseID) values(1,6);
insert into WatchList (studentID,courseID) values(2,1);
insert into WatchList (studentID,courseID) values(2,2);
insert into WatchList (studentID,courseID) values(2,3);
insert into WatchList (studentID,courseID) values(3,2);
insert into WatchList (studentID,courseID) values(3,5);
insert into WatchList (studentID,courseID) values(3,7);
insert into WatchList (studentID,courseID) values(3,1);
insert into WatchList (studentID,courseID) values(4,1);
insert into WatchList (studentID,courseID) values(4,2);
insert into WatchList (studentID,courseID) values(4,3);
insert into WatchList (studentID,courseID) values(4,4);
insert into WatchList (studentID,courseID) values(5,1);

insert into Rating (studentID,courseID,NoStars,Comment) values(1,4,5,'Tốt');
insert into Rating (studentID,courseID,NoStars,Comment) values(2,1,5,'Tốt');
insert into Rating (studentID,courseID,NoStars,Comment) values(2,2,5,'Tốt');
insert into Rating (studentID,courseID,NoStars,Comment) values(2,3,4,'Tốt');
insert into Rating (studentID,courseID,NoStars,Comment) values(3,1,5,'Tốt');
insert into Rating (studentID,courseID,NoStars,Comment) values(3,2,4,'Tốt');
insert into Rating (studentID,courseID,NoStars,Comment) values(3,3,5,'Tốt');
insert into Rating (studentID,courseID,NoStars,Comment) values(3,4,4,'Tốt');
insert into Rating (studentID,courseID,NoStars,Comment) values(4,1,3,'Tốt');
insert into Rating (studentID,courseID,NoStars,Comment) values(4,2,2,'Tốt');

insert into RegisteredCourse (studentID, courseID) values(1,1);
insert into RegisteredCourse (studentID, courseID) values(1,2);
insert into RegisteredCourse (studentID, courseID) values(1,3);
insert into RegisteredCourse (studentID, courseID) values(1,4);
insert into RegisteredCourse (studentID, courseID) values(2,1);
insert into RegisteredCourse (studentID, courseID) values(2,2);
insert into RegisteredCourse (studentID, courseID) values(2,3);
insert into RegisteredCourse (studentID, courseID) values(3,1);
insert into RegisteredCourse (studentID, courseID) values(3,2);
insert into RegisteredCourse (studentID, courseID) values(3,3);
insert into RegisteredCourse (studentID, courseID) values(3,4);
insert into RegisteredCourse (studentID, courseID) values(4,1);
insert into RegisteredCourse (studentID, courseID) values(4,2);

insert into Sale (courseID,percentDiscount,postDiscountPrice,timeStart,timeEnd,description) values(1,20,40000,'2021-01-01','2021-05-05','Giảm giá hè');
insert into Sale (courseID,percentDiscount,postDiscountPrice,timeStart,timeEnd,description) values(2,20,40000,'2021-01-01','2021-05-05','Giảm giá hè');
insert into Sale (courseID,percentDiscount,postDiscountPrice,timeStart,timeEnd,description) values(3,50,50000,'2021-01-01','2021-08-05','Khai giảng năm học mới');

insert into Chapter (chapterID,chapterName,courseID,isOutline) values(1,'Chương 1. Thiết lập môi trường',1,true);
insert into Chapter (chapterID,chapterName,courseID,isOutline) values(2,'Chương 2. Ôn tập Java',1,false);
insert into Chapter (chapterID,chapterName,courseID,isOutline) values(3,'Chương 3. Lập trình hướng đối tượng',1,true);
insert into Chapter (chapterID,chapterName,courseID,isOutline) values(4,'Chương 4. Xây dựng ứng dụng thực tế',1,false);

insert into Chapter (chapterID,chapterName,courseID,isOutline) values(5,'Chương 1. Các đối tượng căn bản',2,true);
insert into Chapter (chapterID,chapterName,courseID,isOutline) values(6,'Chương 2. Animation',2,false);

insert into Chapter (chapterID,chapterName,courseID,isOutline) values(7,'Chương 1. Các câu lệnh căn bản',3,true);
insert into Chapter (chapterID,chapterName,courseID,isOutline) values(8,'Chương 2. Frame',3,false);

insert into Chapter (chapterID,chapterName,courseID,isOutline) values(9,'Chương 1. Button',4,true);
insert into Chapter (chapterID,chapterName,courseID,isOutline) values(10,'Chương 2. Segment Control',4,false);
insert into Chapter (chapterID,chapterName,courseID,isOutline) values(11,'Chương 3. Switch',4,true);
insert into Chapter (chapterID,chapterName,courseID,isOutline) values(12,'Chương 2. UIView',4,false);

insert into Chapter (chapterID,chapterName,courseID,isOutline) values(13,'Chương 1. Giới thiệu',5,true);
insert into Chapter (chapterID,chapterName,courseID,isOutline) values(14,'Chương 2. Javascript',5,false);
insert into Chapter (chapterID,chapterName,courseID,isOutline) values(15,'Chương 3. ES6',5,false);

insert into Chapter (chapterID,chapterName,courseID,isOutline) values(16,'Chương 1. HTTP',6,true);
insert into Chapter (chapterID,chapterName,courseID,isOutline) values(17,'Chương 2. Xây dựng Web server',6,true);
insert into Chapter (chapterID,chapterName,courseID,isOutline) values(18,'Chương 3. Quản lý package',6,false);

insert into Chapter (chapterID,chapterName,courseID,isOutline) values(19,'Chương 1. Giới thiệu và cài đặt môi trường',7,true);
insert into Chapter (chapterID,chapterName,courseID,isOutline) values(20,'Chương 2. Các kiểu dữ liệu trong python',7,false);
insert into Chapter (chapterID,chapterName,courseID,isOutline) values(21,'Chương 3. Các cấu trúc dữ liệu trong python',7,true);


insert into Chapter (chapterID,chapterName,courseID,isOutline) values(22,'Chương 1. Giới thiệu và cài đặt Python',8,true);
insert into Chapter (chapterID,chapterName,courseID,isOutline) values(23,'Chương 2. Lập trình hướng đối tượng',8,false);
insert into Chapter (chapterID,chapterName,courseID,isOutline) values(24,'Chương 3. Làm việc với file trong python',8,false);

insert into Chapter (chapterID,chapterName,courseID,isOutline) values(25,'Chương 1. Giới thiệu về ASP.NET',9,true);
insert into Chapter (chapterID,chapterName,courseID,isOutline) values(26,'Chương 2. Các khái niệm căn bản',9,false);
insert into Chapter (chapterID,chapterName,courseID,isOutline) values(27,'Chương 3. Tạo website với ASP.NET',9,true);

insert into Chapter (chapterID,chapterName,courseID,isOutline) values(28,'Chương 1. giới thiệu và cài đặt Xamarin',10,true);
insert into Chapter (chapterID,chapterName,courseID,isOutline) values(29,'Chương 2. Data Binding',10,false);
insert into Chapter (chapterID,chapterName,courseID,isOutline) values(30,'Chương 3. Xây dựng ứng dụng',10,false);

insert into Chapter (chapterID,chapterName,courseID,isOutline) values(31,'Chương 1. Tổng quan lập trình Java',11,false);
insert into Chapter (chapterID,chapterName,courseID,isOutline) values(32,'Chương 2. Các khái niệm cơ bản trong Java ',11,true);
insert into Chapter (chapterID,chapterName,courseID,isOutline) values(33,'Chương 3. Vòng lặp trong Java ',11,true);
insert into Chapter (chapterID,chapterName,courseID,isOutline) values(34,'Chương 4. Xây dựng ứng dụng Java ',11,false);

insert into Chapter (chapterID,chapterName,courseID,isOutline) values(35,'Chương 1. Các khái niệm cơ bản',12,false);
insert into Chapter (chapterID,chapterName,courseID,isOutline) values(36,'Chương 2. OOP trong Java ',12,true);

insert into Chapter (chapterID,chapterName,courseID,isOutline) values(37,'Chương 1. Ôn tập Java căn bản',13,false);
insert into Chapter (chapterID,chapterName,courseID,isOutline) values(38,'Chương 2. Các khái niệm nâng cao trong Java ',13,true);
insert into Chapter (chapterID,chapterName,courseID,isOutline) values(39,'Chương 3. Xây dựng ứng dụng minh họa ',13,true);

insert into Chapter (chapterID,chapterName,courseID,isOutline) values(40,'Chương 1. Làm quen với Java Spring',14,false);
insert into Chapter (chapterID,chapterName,courseID,isOutline) values(41,'Chương 2. Java Spring MVC ',14,true);

insert into Chapter (chapterID,chapterName,courseID,isOutline) values(42,'Chương 1. Các dụng cụ nấu nướng',15,false);
insert into Chapter (chapterID,chapterName,courseID,isOutline) values(43,'Chương 2. Các nguyên liệu cơ bản',15,true);

insert into Chapter (chapterID,chapterName,courseID,isOutline) values(44,'Chương 1. Các món ăn thông dụng',16,false);
insert into Chapter (chapterID,chapterName,courseID,isOutline) values(45,'Chương 2. Các món ăn hảo hạng',16,true);

insert into Chapter (chapterID,chapterName,courseID,isOutline) values(46,'Chương 1. Châu Á',17,false);
insert into Chapter (chapterID,chapterName,courseID,isOutline) values(47,'Chương 2. Châu Âu',17,true);
insert into Chapter (chapterID,chapterName,courseID,isOutline) values(48,'Chương 3. Châu Mỹ',17,false);

insert into Lesson (lessonID,lessonName,videoPath,chapterID) values(1,'Bài 1: Cài đặt môi trường','/uploads/video/lesson1.mp4',1);
insert into Lesson (lessonID,lessonName,videoPath,chapterID) values(2,'Bài 2: Tạo project','/uploads/video/lesson2.mp4',1);
insert into Lesson (lessonID,lessonName,videoPath,chapterID) values(3,'Bài 3: Giới thiệu android studio','/uploads/video/lesson3.mp4',1);
insert into Lesson (lessonID,lessonName,videoPath,chapterID) values(4,'Bài 4: Ôn tập Java phần 1','/uploads/video/lesson4.mp4',2);
insert into Lesson (lessonID,lessonName,videoPath,chapterID) values(5,'Bài 5: Ôn tập Java phần 2','/uploads/video/lesson5.mp4',2);
insert into Lesson (lessonID,lessonName,videoPath,chapterID) values(6,'Bài 6: Ôn tập Java phần 3','/uploads/video/lesson6.mp4',2);
insert into Lesson (lessonID,lessonName,videoPath,chapterID) values(7,'Bài 7: Lập trình hướng đối tượng - Giới thiệu','/uploads/video/lesson7.mp4',3);
insert into Lesson (lessonID,lessonName,videoPath,chapterID) values(8,'Bài 8: Lập trình hướng đối tượng - Public và Private','/uploads/video/lesson8.mp4',3);
insert into Lesson (lessonID,lessonName,videoPath,chapterID) values(9,'Bài 9: Lập trình hướng đối tượng - Constructor','/uploads/video/lesson9.mp4',3);
insert into Lesson (lessonID,lessonName,videoPath,chapterID) values(10,'Bài 10: Cuộc đua kì thú 1','/uploads/video/lesson10.mp4',4);
insert into Lesson (lessonID,lessonName,videoPath,chapterID) values(11,'Bài 11: Cuộc đua kì thú 2','/uploads/video/lesson11.mp4',4);
insert into Lesson (lessonID,lessonName,videoPath,chapterID) values(12,'Bài 12: Cuộc đua kì thú 3','/uploads/video/lesson12.mp4',4);

insert into Lesson (lessonID,lessonName,videoPath,chapterID) values(13,'Bài 1: Popup Menu','/uploads/video/default.mp4',5);
insert into Lesson (lessonID,lessonName,videoPath,chapterID) values(14,'Bài 2: Context Menu','/uploads/video/default.mp4',5);
insert into Lesson (lessonID,lessonName,videoPath,chapterID) values(15,'Bài 3: Alert Dialog','/uploads/video/default.mp4',5);
insert into Lesson (lessonID,lessonName,videoPath,chapterID) values(16,'Bài 4: Animation Alpha','/uploads/video/default.mp4',6);
insert into Lesson (lessonID,lessonName,videoPath,chapterID) values(17,'Bài 5: Animation Rotate','/uploads/video/default.mp4',6);
insert into Lesson (lessonID,lessonName,videoPath,chapterID) values(18,'Bài 6: Animation Scale','/uploads/video/default.mp4',6);

insert into Lesson (lessonID,lessonName,videoPath,chapterID) values(19,'Bài 1: Câu lệnh if','/uploads/video/default.mp4',7);
insert into Lesson (lessonID,lessonName,videoPath,chapterID) values(20,'Bài 2: Vòng lặp for','/uploads/video/default.mp4',7);
insert into Lesson (lessonID,lessonName,videoPath,chapterID) values(21,'Bài 3: Tạo animation','/uploads/video/default.mp4',7);
insert into Lesson (lessonID,lessonName,videoPath,chapterID) values(22,'Bài 4: UIImage','/uploads/video/default.mp4',7);
insert into Lesson (lessonID,lessonName,videoPath,chapterID) values(23,'Bài 5: UITable','/uploads/video/default.mp4',8);
insert into Lesson (lessonID,lessonName,videoPath,chapterID) values(24,'Bài 6: Play Mp3','/uploads/video/default.mp4',8);
insert into Lesson (lessonID,lessonName,videoPath,chapterID) values(25,'Bài 6: Viết ứng dụng hoàn chỉnh','/uploads/video/default.mp4',8);

insert into Lesson (lessonID,lessonName,videoPath,chapterID) values(26,'Bài 1: Giới thiệu cơ bản về button','/uploads/video/default.mp4',9);
insert into Lesson (lessonID,lessonName,videoPath,chapterID) values(27,'Bài 2: Tạo button','/uploads/video/default.mp4',9);
insert into Lesson (lessonID,lessonName,videoPath,chapterID) values(28,'Bài 3: Kết hợp lable và button','/uploads/video/default.mp4',9);
insert into Lesson (lessonID,lessonName,videoPath,chapterID) values(29,'Bài 4: Giới thiệu cơ bản về Segment control','/uploads/video/default.mp4',10);
insert into Lesson (lessonID,lessonName,videoPath,chapterID) values(30,'Bài 5: Hướng dẫn tạo Segment Control bằng code','/uploads/video/default.mp4',10);
insert into Lesson (lessonID,lessonName,videoPath,chapterID) values(31,'Bài 6: Demo tạo mạch điện 3 pha làm xoay quạt','/uploads/video/default.mp4',10);
insert into Lesson (lessonID,lessonName,videoPath,chapterID) values(32,'Bài 7: Giới thiệu về Date Picker','/uploads/video/default.mp4',11);
insert into Lesson (lessonID,lessonName,videoPath,chapterID) values(33,'Bài 8: Default Style Date picker','/uploads/video/default.mp4',11);
insert into Lesson (lessonID,lessonName,videoPath,chapterID) values(34,'Bài 9: Custome style date picker','/uploads/video/default.mp4',11);
insert into Lesson (lessonID,lessonName,videoPath,chapterID) values(35,'Bài 10: Giới thiệu core data','/uploads/video/default.mp4',12);
insert into Lesson (lessonID,lessonName,videoPath,chapterID) values(36,'Bài 11: Insert trong core data','/uploads/video/default.mp4',12);
insert into Lesson (lessonID,lessonName,videoPath,chapterID) values(37,'Bài 12: Select trong core data','/uploads/video/default.mp4',12);

insert into Lesson (lessonID,lessonName,videoPath,chapterID) values(38,'Bài 1: Giới thiệu cơ bản về Nodejs','/uploads/video/default.mp4',13);
insert into Lesson (lessonID,lessonName,videoPath,chapterID) values(39,'Bài 2: Những rào cản của việc học nodejs','/uploads/video/default.mp4',13);
insert into Lesson (lessonID,lessonName,videoPath,chapterID) values(40,'Bài 3: Giao điện CLI','/uploads/video/default.mp4',13);
insert into Lesson (lessonID,lessonName,videoPath,chapterID) values(41,'Bài 4: Giới thiệu javascript','/uploads/video/default.mp4',14);
insert into Lesson (lessonID,lessonName,videoPath,chapterID) values(42,'Bài 5: Các khái niệm căn bản trong javascript','/uploads/video/default.mp4',14);
insert into Lesson (lessonID,lessonName,videoPath,chapterID) values(43,'Bài 6: Khai báo sử dụng hàm trong javascript','/uploads/video/default.mp4',14);
insert into Lesson (lessonID,lessonName,videoPath,chapterID) values(44,'Bài 7: ES6 Template literals','/uploads/video/default.mp4',15);
insert into Lesson (lessonID,lessonName,videoPath,chapterID) values(45,'Bài 8: ES6 Class','/uploads/video/default.mp4',15);
insert into Lesson (lessonID,lessonName,videoPath,chapterID) values(46,'Bài 9: Tương lại ES6','/uploads/video/default.mp4',15);

insert into Lesson (lessonID,lessonName,videoPath,chapterID) values(47,'Bài 1: Khái niệm HTTP','/uploads/video/lesson47.mp4',16);
insert into Lesson (lessonID,lessonName,videoPath,chapterID) values(48,'Bài 2: HTTP Parser','/uploads/video/lesson48.mp4',16);
insert into Lesson (lessonID,lessonName,videoPath,chapterID) values(49,'Bài 3: HTTP request','/uploads/video/lesson49.mp4',16);
insert into Lesson (lessonID,lessonName,videoPath,chapterID) values(50,'Bài 4: API endpoint','/uploads/video/lesson50.mp4',17);
insert into Lesson (lessonID,lessonName,videoPath,chapterID) values(51,'Bài 5: Web server và checklist','/uploads/video/lesson51.mp4',17);
insert into Lesson (lessonID,lessonName,videoPath,chapterID) values(52,'Bài 6: Ý nghĩa các phiên bản Semantic','/uploads/video/lesson52.mp4',17);
insert into Lesson (lessonID,lessonName,videoPath,chapterID) values(53,'Bài 7: int, nodemon và package.json','/uploads/video/lesson53.mp4',18);
insert into Lesson (lessonID,lessonName,videoPath,chapterID) values(54,'Bài 8: npm global installation','/uploads/video/lesson54.mp4',18);
insert into Lesson (lessonID,lessonName,videoPath,chapterID) values(55,'Bài 9: express và xây dựng một web server hoàn chỉnh','/uploads/video/lesson55.mp4',18);

insert into Lesson (lessonID,lessonName,videoPath,chapterID) values(56,'Bài 1: Giới thiệu ngôn ngữ lập trình python','/uploads/video/default.mp4',19);
insert into Lesson (lessonID,lessonName,videoPath,chapterID) values(57,'Bài 2: Cài đặt môi trường python','/uploads/video/default.mp4',19);
insert into Lesson (lessonID,lessonName,videoPath,chapterID) values(58,'Bài 3: Chạy file Python','/uploads/video/default.mp4',19);
insert into Lesson (lessonID,lessonName,videoPath,chapterID) values(59,'Bài 4: Biến trong python','/uploads/video/default.mp4',20);
insert into Lesson (lessonID,lessonName,videoPath,chapterID) values(60,'Bài 5: Kiểu số tỏng python','/uploads/video/default.mp4',20);
insert into Lesson (lessonID,lessonName,videoPath,chapterID) values(61,'Bài 6: Kiểu chuỗi trong python phần 1','/uploads/video/default.mp4',20);
insert into Lesson (lessonID,lessonName,videoPath,chapterID) values(62,'Bài 7: Kiểu chuỗi trong python phần 2','/uploads/video/default.mp4',20);
insert into Lesson (lessonID,lessonName,videoPath,chapterID) values(63,'Bài 8: List trong python','/uploads/video/default.mp4',20);
insert into Lesson (lessonID,lessonName,videoPath,chapterID) values(64,'Bài 9: Cấu trúc rẽ nhánh trong python','/uploads/video/default.mp4',21);
insert into Lesson (lessonID,lessonName,videoPath,chapterID) values(65,'Bài 10: While loop trong python','/uploads/video/default.mp4',21);
insert into Lesson (lessonID,lessonName,videoPath,chapterID) values(66,'Bài 11: For loop trong python','/uploads/video/default.mp4',21);

insert into Lesson (lessonID,lessonName,videoPath,chapterID) values(67,'Bài 1: Cách cài đặt môi trường python','/uploads/video/default.mp4',22);
insert into Lesson (lessonID,lessonName,videoPath,chapterID) values(68,'Bài 2: Tạo ứng dụng hello world','/uploads/video/default.mp4',22);
insert into Lesson (lessonID,lessonName,videoPath,chapterID) values(69,'Bài 3: Toán tử trong python','/uploads/video/default.mp4',22);
insert into Lesson (lessonID,lessonName,videoPath,chapterID) values(70,'Bài 4: Lớp và đối tượng','/uploads/video/default.mp4',23);
insert into Lesson (lessonID,lessonName,videoPath,chapterID) values(71,'Bài 5: Thuộc tính','/uploads/video/default.mp4',23);
insert into Lesson (lessonID,lessonName,videoPath,chapterID) values(72,'Bài 6: Phương thức','/uploads/video/default.mp4',23);
insert into Lesson (lessonID,lessonName,videoPath,chapterID) values(73,'Bài 7: Kế thừa','/uploads/video/default.mp4',23);
insert into Lesson (lessonID,lessonName,videoPath,chapterID) values(74,'Bài 8: Đọc file','/uploads/video/default.mp4',24);
insert into Lesson (lessonID,lessonName,videoPath,chapterID) values(75,'Bài 9: Ghi file','/uploads/video/default.mp4',24);

insert into Lesson (lessonID,lessonName,videoPath,chapterID) values(76,'Bài 1: Giới thiệu ASP.NET MVC','/uploads/video/lesson76.mp4',25);
insert into Lesson (lessonID,lessonName,videoPath,chapterID) values(77,'Bài 2: Thiết lập môi trường VS','/uploads/video/lesson77.mp4',25);
insert into Lesson (lessonID,lessonName,videoPath,chapterID) values(78,'Bài 3: Tạo tương tác giữa View-Controller-Model','/uploads/video/lesson78.mp4',25);
insert into Lesson (lessonID,lessonName,videoPath,chapterID) values(79,'Bài 4: Tạo layouts và template cho view','/uploads/video/lesson79.mp4',26);
insert into Lesson (lessonID,lessonName,videoPath,chapterID) values(80,'Bài 5: Tạo trang đăng nhập qua store procudre','/uploads/video/lesson80.mp4',26);
insert into Lesson (lessonID,lessonName,videoPath,chapterID) values(81,'Bài 6: Cách đăng nhập với Custom Membership provider','/uploads/video/lesson81.mp4',26);
insert into Lesson (lessonID,lessonName,videoPath,chapterID) values(82,'Bài 7: Hiển thị danh sách dữ liệu bằng razor','/uploads/video/lesson82.mp4',26);
insert into Lesson (lessonID,lessonName,videoPath,chapterID) values(83,'Bài 8: Validate form trong ASP NET','/uploads/video/lesson83.mp4',26);
insert into Lesson (lessonID,lessonName,videoPath,chapterID) values(84,'Bài 9: Lập trình website bán hàng','/uploads/video/lesson84.mp4',27);

insert into Lesson (lessonID,lessonName,videoPath,chapterID) values(85,'Bài 1: Hướng dẫn cài đặt Xamarin và VS Studio 2019','/uploads/video/default.mp4',28);
insert into Lesson (lessonID,lessonName,videoPath,chapterID) values(86,'Bài 2: Xamarin là gì','/uploads/video/default.mp4',28);
insert into Lesson (lessonID,lessonName,videoPath,chapterID) values(87,'Bài 3: Xamarin form là gì','/uploads/video/default.mp4',28);
insert into Lesson (lessonID,lessonName,videoPath,chapterID) values(88,'Bài 4: Xử lí ứng dụng đa màn hình','/uploads/video/default.mp4',29);
insert into Lesson (lessonID,lessonName,videoPath,chapterID) values(89,'Bài 5: Data binding phần 1','/uploads/video/default.mp4',29);
insert into Lesson (lessonID,lessonName,videoPath,chapterID) values(90,'Bài 6: Data binding phần 2','/uploads/video/default.mp4',29);
insert into Lesson (lessonID,lessonName,videoPath,chapterID) values(91,'Bài 7: Xây dựng ứng dụng chat với xamarin','/uploads/video/default.mp4',30);
insert into Lesson (lessonID,lessonName,videoPath,chapterID) values(92,'Bài 8: MVVM','/uploads/video/default.mp4',30);

insert into Lesson (lessonID,lessonName,videoPath,chapterID) values(93,'Bài 1: Setup môi trường phát triển Java','/uploads/video/default.mp4',31);
insert into Lesson (lessonID,lessonName,videoPath,chapterID) values(94,'Bài 2: Các kiểu dữ liệu trong java','/uploads/video/default.mp4',32);
insert into Lesson (lessonID,lessonName,videoPath,chapterID) values(95,'Bài 3: Các kiểu toán tử trong java','/uploads/video/default.mp4',32);
insert into Lesson (lessonID,lessonName,videoPath,chapterID) values(96,'Bài 4: Vòng lặp for','/uploads/video/default.mp4',33);
insert into Lesson (lessonID,lessonName,videoPath,chapterID) values(97,'Bài 5: Vòng lặp while','/uploads/video/default.mp4',33);
insert into Lesson (lessonID,lessonName,videoPath,chapterID) values(98,'Bài 6: Xây dựng ứng dụng java bài 1','/uploads/video/default.mp4',34);
insert into Lesson (lessonID,lessonName,videoPath,chapterID) values(99,'Bài 7: Xây dựng ứng dụng java bài 2','/uploads/video/default.mp4',34);
insert into Lesson (lessonID,lessonName,videoPath,chapterID) values(100,'Bài 8: Xây dựng ứng dụng java bài 3','/uploads/video/default.mp4',34);

insert into Lesson (lessonID,lessonName,videoPath,chapterID) values(101,'Bài 1: Các loại biến trong Java','/uploads/video/default.mp4',35);
insert into Lesson (lessonID,lessonName,videoPath,chapterID) values(102,'Bài 2: Hằng trong Java','/uploads/video/default.mp4',35);
insert into Lesson (lessonID,lessonName,videoPath,chapterID) values(103,'Bài 3: Các vòng lặp trong Java','/uploads/video/default.mp4',35);
insert into Lesson (lessonID,lessonName,videoPath,chapterID) values(104,'Bài 4: public và private trong Java','/uploads/video/default.mp4',36);
insert into Lesson (lessonID,lessonName,videoPath,chapterID) values(105,'Bài 5: Kế thừa trong Java','/uploads/video/default.mp4',36);
insert into Lesson (lessonID,lessonName,videoPath,chapterID) values(106,'Bài 6: Tính Đa hình trong Java','/uploads/video/default.mp4',36);
insert into Lesson (lessonID,lessonName,videoPath,chapterID) values(107,'Bài 7: Kết thúc khóa học Java','/uploads/video/default.mp4',36);

insert into Lesson (lessonID,lessonName,videoPath,chapterID) values(108,'Bài 1: Các khái niệm trong java','/uploads/video/default.mp4',37);
insert into Lesson (lessonID,lessonName,videoPath,chapterID) values(109,'Bài 2: Quản lí project với Maven','/uploads/video/default.mp4',37);
insert into Lesson (lessonID,lessonName,videoPath,chapterID) values(110,'Bài 3: Đánh dấu bean với annontaiton','/uploads/video/default.mp4',37);
insert into Lesson (lessonID,lessonName,videoPath,chapterID) values(111,'Bài 4: Component Scan','/uploads/video/default.mp4',38);
insert into Lesson (lessonID,lessonName,videoPath,chapterID) values(112,'Bài 5: Kiến trúc 3 layer','/uploads/video/default.mp4',38);
insert into Lesson (lessonID,lessonName,videoPath,chapterID) values(113,'Bài 6: Tạo resfulAPI','/uploads/video/default.mp4',38);
insert into Lesson (lessonID,lessonName,videoPath,chapterID) values(114,'Bài 7: Xây dựng một ứng dụng hoàn chỉnh','/uploads/video/default.mp4',39);

insert into Lesson (lessonID,lessonName,videoPath,chapterID) values(115,'Bài 1: Giới thiệu thầy và khóa học','/uploads/video/lesson115.mp4',40);
insert into Lesson (lessonID,lessonName,videoPath,chapterID) values(116,'Bài 2: Giới thiệu và cài đặt maven project','/uploads/video/lesson116.mp4',40);
insert into Lesson (lessonID,lessonName,videoPath,chapterID) values(117,'Bài 3: Tìm hiểu workflow về Spring MVC Framework','/uploads/video/lesson117.mp4',41);
insert into Lesson (lessonID,lessonName,videoPath,chapterID) values(118,'Bài 4: Thực hành tạo project Spring MVC Hello World - XML Config','/uploads/video/lesson118.mp4',41);
insert into Lesson (lessonID,lessonName,videoPath,chapterID) values(119,'Bài 5: Cách tạo và sử dụng Bean trong Spring MVC','/uploads/video/lesson119.mp4',41);
insert into Lesson (lessonID,lessonName,videoPath,chapterID) values(120,'Bài 6: @RequestMapping và Cách viết hàm trong Controller','/uploads/video/lesson120.mp4',41);
insert into Lesson (lessonID,lessonName,videoPath,chapterID) values(121,'Bài 7: Sử dụng các static resources trong Spring MVC','/uploads/video/lesson121.mp4',41);
insert into Lesson (lessonID,lessonName,videoPath,chapterID) values(122,'Bài 8: @RequestParam trong Spring MVC','/uploads/video/lesson122.mp4',41);
insert into Lesson (lessonID,lessonName,videoPath,chapterID) values(123,'Bài 9: @PathVariable trong Spring MVC','/uploads/video/lesson123.mp4',41);
insert into Lesson (lessonID,lessonName,videoPath,chapterID) values(124,'Bài 10: Download files trong Spring MVC','/uploads/video/lesson124.mp4',41);

insert into Lesson (lessonID,lessonName,videoPath,chapterID) values(125,'Bài 1: Cách dùng vá','/uploads/video/default.mp4',42);
insert into Lesson (lessonID,lessonName,videoPath,chapterID) values(126,'Bài 2: Cách dùng đũa','/uploads/video/default.mp4',42);
insert into Lesson (lessonID,lessonName,videoPath,chapterID) values(127,'Bài 3: Cách dùng tô, chén','/uploads/video/default.mp4',42);
insert into Lesson (lessonID,lessonName,videoPath,chapterID) values(128,'Bài 4: Các món ăn cần dùng dầu ăn','/uploads/video/default.mp4',43);
insert into Lesson (lessonID,lessonName,videoPath,chapterID) values(129,'Bài 5: Các món ăn cần dùng muối','/uploads/video/default.mp4',43);
insert into Lesson (lessonID,lessonName,videoPath,chapterID) values(130,'Bài 6: Các món ăn cần dùng ớt/tiêu','/uploads/video/default.mp4',43);
insert into Lesson (lessonID,lessonName,videoPath,chapterID) values(131,'Bài 7: Các món ăn cần dùng bột ngọt/mì chính','/uploads/video/default.mp4',43);
insert into Lesson (lessonID,lessonName,videoPath,chapterID) values(132,'Bài 8: Các món ăn cần dùng đường','/uploads/video/default.mp4',43);
insert into Lesson (lessonID,lessonName,videoPath,chapterID) values(133,'Bài 9: Các món ăn không cần gia vị','/uploads/video/default.mp4',43);

insert into Lesson (lessonID,lessonName,videoPath,chapterID) values(134,'Bài 1: Trứng luộc','/uploads/video/default.mp4',44);
insert into Lesson (lessonID,lessonName,videoPath,chapterID) values(135,'Bài 2: Rau luộc','/uploads/video/default.mp4',44);
insert into Lesson (lessonID,lessonName,videoPath,chapterID) values(136,'Bài 3: Thịt luộc','/uploads/video/default.mp4',44);
insert into Lesson (lessonID,lessonName,videoPath,chapterID) values(137,'Bài 4: Cơm chiên','/uploads/video/default.mp4',44);
insert into Lesson (lessonID,lessonName,videoPath,chapterID) values(138,'Bài 5: Rau xào','/uploads/video/default.mp4',44);
insert into Lesson (lessonID,lessonName,videoPath,chapterID) values(139,'Bài 6: Đậu hũ lướt ván','/uploads/video/default.mp4',45);
insert into Lesson (lessonID,lessonName,videoPath,chapterID) values(140,'Bài 7: Cơm gà trùm mền','/uploads/video/default.mp4',45);
insert into Lesson (lessonID,lessonName,videoPath,chapterID) values(141,'Bài 8: Phô mai sữa cừu lên men','/uploads/video/default.mp4',45);
insert into Lesson (lessonID,lessonName,videoPath,chapterID) values(142,'Bài 9: Tiểu hắc cầu ẩn vũ trụ (chè đỗ đen)','/uploads/video/default.mp4',45);
insert into Lesson (lessonID,lessonName,videoPath,chapterID) values(143,'Bài 10: Tổng kết môn học','/uploads/video/default.mp4',45); 

insert into Lesson (lessonID,lessonName,videoPath,chapterID) values(144,'Bài 1: Các món ăn Việt Nam','/uploads/video/default.mp4',46);
insert into Lesson (lessonID,lessonName,videoPath,chapterID) values(145,'Bài 2: Các món ăn Nhật Bản','/uploads/video/default.mp4',46);
insert into Lesson (lessonID,lessonName,videoPath,chapterID) values(146,'Bài 3: Các món ăn Lào','/uploads/video/default.mp4',46);
insert into Lesson (lessonID,lessonName,videoPath,chapterID) values(147,'Bài 4: Các món ăn Campuchia','/uploads/video/default.mp4',46);
insert into Lesson (lessonID,lessonName,videoPath,chapterID) values(148,'Bài 5: Các món ăn Bhutan','/uploads/video/default.mp4',46);
insert into Lesson (lessonID,lessonName,videoPath,chapterID) values(149,'Bài 6: Các món ăn Pháp','/uploads/video/default.mp4',47);
insert into Lesson (lessonID,lessonName,videoPath,chapterID) values(150,'Bài 7: Các món ăn Đức','/uploads/video/default.mp4',47);
insert into Lesson (lessonID,lessonName,videoPath,chapterID) values(151,'Bài 8: Các món ăn Italia','/uploads/video/default.mp4',47);
insert into Lesson (lessonID,lessonName,videoPath,chapterID) values(152,'Bài 9: Các món ăn Tây Ban Nha','/uploads/video/default.mp4',47);
insert into Lesson (lessonID,lessonName,videoPath,chapterID) values(153,'Bài 10: Các món ăn Mỹ','/uploads/video/default.mp4',48); 
insert into Lesson (lessonID,lessonName,videoPath,chapterID) values(154,'Bài 11: Các món ăn Canada','/uploads/video/default.mp4',48);
insert into Lesson (lessonID,lessonName,videoPath,chapterID) values(155,'Bài 12: Các món ăn Brazil','/uploads/video/default.mp4',48);
insert into Lesson (lessonID,lessonName,videoPath,chapterID) values(156,'Bài 13: Các món ăn Argentina','/uploads/video/default.mp4',48); 
insert into Lesson (lessonID,lessonName,videoPath,chapterID) values(157,'Bài 14: Các món ăn Chile','/uploads/video/default.mp4',48); 