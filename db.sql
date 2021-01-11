drop database if exists onlineCourse;
create database onlineCourse;
use onlineCourse;
ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY '123456yugi';
flush privileges;
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

/*Data*/

insert into Teacher (name,email,password,avatarPath)values('Nguyễn Văn An','vanan123@gmail.com','123456','/public/images/avatar/teacher1.jpg');
insert into Teacher (name,email,password,avatarPath)values('Hoàng Thu Trang','thutrang2412@gmail.com','123456','/public/images/avatar/default.jpg');
insert into Teacher (name,email,password,avatarPath)values('Trần Hoàng Hùng','hungtran124@gmail.com','123456','/public/images/avatar/default.jpg');
insert into Teacher (name,email,password,avatarPath)values('Hoàng Hiệu','hieuhoang1111@gmail.com','123456','/public/images/avatar/default.jpg');
insert into Teacher (name,email,password,avatarPath)values('Đỗ Thu Thủy','thuydo11122@gmail.com','123456','/public/images/avatar/default.jpg');
insert into Teacher (name,email,password,avatarPath)values('Nguyễn Viết Hạ','vietha@gmail.com','123456','/public/images/avatar/default.jpg');
insert into Teacher (name,email,password,avatarPath)values('Nguyễn Hoàng Anh','anhhoang156@gmail.com','123456','/public/images/avatar/default.jpg');
insert into Teacher (name,email,password,avatarPath)values('Hoàng Phan Hoài An','yendan123@gmail.com','123456','/public/images/avatar/default.jpg');
insert into Teacher (name,email,password,avatarPath)values('Trần Đình Trọng','trongtran@gmail.com','123456','/public/images/avatar/default.jpg');

insert into Category (categoryName) values('Lập trình web');
insert into Category (categoryName) values('Lập trình thiết bị di động');

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
values('Lập trình Android căn bản','/img/course/default.jpg','Khóa học làm quen với lập trình Android','Khóa học làm quen với lập trình Android Khóa học làm quen với lập trình Android',100,5,50000,now(),now(),2,'Đã hoàn tất',1,103);
insert into Course (name,imagePath,sortDescription,description,NoStudents,averageStar,price,created,lastUpdated,categoryID,status,teacherID,views) 
values('Lập trình Android nâng cao','/img/course/default.jpg','Lập trình Android nâng cao','Lập trình Android nâng cao Lập trình Android nâng cao',200,5,50000,now(),now(),2,'Đã hoàn tất',1,104);
insert into Course (name,imagePath,sortDescription,description,NoStudents,averageStar,price,created,lastUpdated,categoryID,status,teacherID,views) 
values('Lập trình IOS căn bản','/img/course/default.jpg','Làm quen với lập trình IOS','Giúp hiểu các khái niệm cơ bản về IOS',100,5,100000,now(),now(),2,'Đã hoàn tất',1,105);
insert into Course (name,imagePath,sortDescription,description,NoStudents,averageStar,price,created,lastUpdated,categoryID,status,teacherID,views) 
values('Lập trình IOS nâng cao','/img/course/default.jpg','Học về IOS nâng cao','Tiếp cận các khái niệm nâng cao về ios',100,5,100000,now(),now(),2,'Đã hoàn tất',1,236);
insert into Course (name,imagePath,sortDescription,description,NoStudents,averageStar,price,created,lastUpdated,categoryID,status,teacherID,views) 
values('Lập trình Nodejs cho người mới bắt đầu','/img/course/default.jpg','Khóa học làm quen với lập trình NodeJS','giúp hiểu các khái niệm cơ bản trong Nodejs',256,4.6,150000,now(),now(),1,'Đã hoàn tất',1,16);
insert into Course (name,imagePath,sortDescription,description,NoStudents,averageStar,price,created,lastUpdated,categoryID,status,teacherID,views) 
values('Lập trình Nodejs nâng cao','/img/course/default.jpg','Khóa học làm quen với lập trình Android','Khóa học làm quen với lập trình Android Khóa học làm quen với lập trình Android',512,3.8,150000,now(),now(),2,'Đã hoàn tất',1,921);
insert into Course (name,imagePath,sortDescription,description,NoStudents,averageStar,price,created,lastUpdated,categoryID,status,teacherID,views) 
values('Cùng học Python','/img/course/default.jpg','Khóa học làm quen với lập trình Python căn bản','Giúp hiểu rõ các khái niệm căn bản trong python',631,2.1,200000,now(),now(),2,'Đã hoàn tất',1,716);
insert into Course (name,imagePath,sortDescription,description,NoStudents,averageStar,price,created,lastUpdated,categoryID,status,teacherID,views) 
values('Python cho mọi người','/img/course/default.jpg','Lập trình python căn bản','Học cách lập trình python căn bản',521,4.8,200000,now(),now(),2,'Đã hoàn tất',1,908);
insert into Course (name,imagePath,sortDescription,description,NoStudents,averageStar,price,created,lastUpdated,categoryID,status,teacherID,views) 
values('Lập trình ASP.NET','/img/course/default.jpg','Làm quen với ASP.NET','Khóa học dnahf cho người mới bắt đầu',215,4.5,250000,now(),now(),2,'Đã hoàn tất',1,301);
insert into Course (name,imagePath,sortDescription,description,NoStudents,averageStar,price,created,lastUpdated,categoryID,status,teacherID,views) 
values('Lập trình Xamarin','/img/course/default.jpg','Giúp lập trình Xamarin','Khóa học ngắn hạn',5612,1.6,250000,now(),now(),1,'Đã hoàn tất',1, 207);

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

insert into Rate (studentID,courseID,NoStars,Comment) values(1,1,5,'Tốt');
insert into Rate (studentID,courseID,NoStars,Comment) values(1,2,5,'Tốt');
insert into Rate (studentID,courseID,NoStars,Comment) values(1,3,5,'Tốt');
insert into Rate (studentID,courseID,NoStars,Comment) values(1,4,5,'Tốt');
insert into Rate (studentID,courseID,NoStars,Comment) values(2,1,5,'Tốt');
insert into Rate (studentID,courseID,NoStars,Comment) values(2,2,5,'Tốt');
insert into Rate (studentID,courseID,NoStars,Comment) values(2,3,4,'Tốt');
insert into Rate (studentID,courseID,NoStars,Comment) values(3,1,5,'Tốt');
insert into Rate (studentID,courseID,NoStars,Comment) values(3,2,4,'Tốt');
insert into Rate (studentID,courseID,NoStars,Comment) values(3,3,5,'Tốt');
insert into Rate (studentID,courseID,NoStars,Comment) values(3,4,4,'Tốt');
insert into Rate (studentID,courseID,NoStars,Comment) values(4,1,3,'Tốt');
insert into Rate (studentID,courseID,NoStars,Comment) values(4,2,2,'Tốt');

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

insert into Chapter (chapterName,courseID,isOutline) values('Chương 1. Thiết lập môi trường',1,true);
insert into Chapter (chapterName,courseID,isOutline) values('Chương 2. Ôn tập Java',1,false);
insert into Chapter (chapterName,courseID,isOutline) values('Chương 3. Lập trình hướng đối tượng',1,false);
insert into Chapter (chapterName,courseID,isOutline) values('Chương 4. Xây dựng ứng dụng thực tế',1,false);

insert into Chapter (chapterName,courseID,isOutline) values('Chương 1. Các đối tượng căn bản',2,true);
insert into Chapter (chapterName,courseID,isOutline) values('Chương 2. Animation',2,false);

insert into Chapter (chapterName,courseID,isOutline) values('Chương 1. Các câu lệnh căn bản',3,true);
insert into Chapter (chapterName,courseID,isOutline) values('Chương 2. Frame',3,false);

insert into Chapter (chapterName,courseID,isOutline) values('Chương 1. Button',4,true);
insert into Chapter (chapterName,courseID,isOutline) values('Chương 2. Segment Control',4,false);
insert into Chapter (chapterName,courseID,isOutline) values('Chương 3. Switch',4,false);
insert into Chapter (chapterName,courseID,isOutline) values('Chương 2. UIView',4,false);

insert into Chapter (chapterName,courseID,isOutline) values('Chương 1. Giới thiệu',5,true);
insert into Chapter (chapterName,courseID,isOutline) values('Chương 2. Javascript',5,false);
insert into Chapter (chapterName,courseID,isOutline) values('Chương 3. ES6',5,false);

insert into Chapter (chapterName,courseID,isOutline) values('Chương 1. HTTP',6,true);
insert into Chapter (chapterName,courseID,isOutline) values('Chương 2. Xây dựng Web server',6,true);
insert into Chapter (chapterName,courseID,isOutline) values('Chương 3. Quản lý package',6,false);

insert into Chapter (chapterName,courseID,isOutline) values('Chương 1. Giới thiệu và cài đặt môi trường',7,true);
insert into Chapter (chapterName,courseID,isOutline) values('Chương 2. Các kiểu dữ liệu trong python',7,false);
insert into Chapter (chapterName,courseID,isOutline) values('Chương 3. Các cấu trúc dữ liệu trong python',7,true);


insert into Chapter (chapterName,courseID,isOutline) values('Chương 1. Giới thiệu và cài đặt Python',8,true);
insert into Chapter (chapterName,courseID,isOutline) values('Chương 2. Lập trình hướng đối tượng',8,false);
insert into Chapter (chapterName,courseID,isOutline) values('Chương 3. Làm việc với file trong python',8,false);

insert into Chapter (chapterName,courseID,isOutline) values('Chương 1. Giới thiệu về ASP.NET',9,true);
insert into Chapter (chapterName,courseID,isOutline) values('Chương 2. Các khái niệm căn bản',9,false);
insert into Chapter (chapterName,courseID,isOutline) values('Chương 3. Tạo website với ASP.NET',9,false);

insert into Chapter (chapterName,courseID,isOutline) values('Chương 1. giới thiệu và cài đặt Xamarin',10,true);
insert into Chapter (chapterName,courseID,isOutline) values('Chương 2. Data Binding',10,false);
insert into Chapter (chapterName,courseID,isOutline) values('Chương 3. Xây dựng ứng dụng',10,false);


insert into Lesson (lessonName,videoPath,chapterID) values('Bài 1: Cài đặt môi trường','/public/video/test1.mp4',1);
insert into Lesson (lessonName,videoPath,chapterID) values('Bài 2: Tạo project','/public/video/test1.mp4',1);
insert into Lesson (lessonName,videoPath,chapterID) values('Bài 3: Giới thiệu android studio','/public/video/test1.mp4',1);
insert into Lesson (lessonName,videoPath,chapterID) values('Bài 4: Ôn tập Java phần 1','/public/video/test1.mp4',2);
insert into Lesson (lessonName,videoPath,chapterID) values('Bài 5: Ôn tập Java phần 2','/public/video/test1.mp4',2);
insert into Lesson (lessonName,videoPath,chapterID) values('Bài 6: Ôn tập Java phần 3','/public/video/test1.mp4',2);
insert into Lesson (lessonName,videoPath,chapterID) values('Bài 7: Lập trình hướng đối tượng - Giới thiệu','/public/video/test1.mp4',3);
insert into Lesson (lessonName,videoPath,chapterID) values('Bài 8: Lập trình hướng đối tượng - Public và Private','/public/video/test1.mp4',3);
insert into Lesson (lessonName,videoPath,chapterID) values('Bài 9: Lập trình hướng đối tượng - Constructor','/public/video/test1.mp4',3);
insert into Lesson (lessonName,videoPath,chapterID) values('Bài 10: Cuộc đua kì thú 1','/public/video/test1.mp4',4);
insert into Lesson (lessonName,videoPath,chapterID) values('Bài 11: Cuộc đua kì thú 2','/public/video/test1.mp4',4);
insert into Lesson (lessonName,videoPath,chapterID) values('Bài 12: Cuộc đua kì thú 3','/public/video/test1.mp4',4);

insert into Lesson (lessonName,videoPath,chapterID) values('Bài 1: Popup Menu','/public/video/test1.mp4',5);
insert into Lesson (lessonName,videoPath,chapterID) values('Bài 2: Context Menu','/public/video/test1.mp4',5);
insert into Lesson (lessonName,videoPath,chapterID) values('Bài 3: Alert Dialog','/public/video/test1.mp4',5);
insert into Lesson (lessonName,videoPath,chapterID) values('Bài 4: Animation Alpha','/public/video/test1.mp4',6);
insert into Lesson (lessonName,videoPath,chapterID) values('Bài 5: Animation Rotate','/public/video/test1.mp4',6);
insert into Lesson (lessonName,videoPath,chapterID) values('Bài 6: Animation Scale','/public/video/test1.mp4',6);

insert into Lesson (lessonName,videoPath,chapterID) values('Bài 1: Câu lệnh if','/public/video/test1.mp4',7);
insert into Lesson (lessonName,videoPath,chapterID) values('Bài 2: Vòng lặp for','/public/video/test1.mp4',7);
insert into Lesson (lessonName,videoPath,chapterID) values('Bài 3: Tạo animation','/public/video/test1.mp4',7);
insert into Lesson (lessonName,videoPath,chapterID) values('Bài 4: UIImage','/public/video/test1.mp4',7);
insert into Lesson (lessonName,videoPath,chapterID) values('Bài 5: UITable','/public/video/test1.mp4',8);
insert into Lesson (lessonName,videoPath,chapterID) values('Bài 6: Play Mp3','/public/video/test1.mp4',8);
insert into Lesson (lessonName,videoPath,chapterID) values('Bài 6: Viết ứng dụng hoàn chỉnh','/public/video/test1.mp4',8);

insert into Lesson (lessonName,videoPath,chapterID) values('Bài 1: Giới thiệu cơ bản về button','/public/video/test1.mp4',9);
insert into Lesson (lessonName,videoPath,chapterID) values('Bài 2: Tạo button','/public/video/test1.mp4',9);
insert into Lesson (lessonName,videoPath,chapterID) values('Bài 3: Kết hợp lable và button','/public/video/test1.mp4',9);
insert into Lesson (lessonName,videoPath,chapterID) values('Bài 4: Giới thiệu cơ bản về Segment control','/public/video/test1.mp4',10);
insert into Lesson (lessonName,videoPath,chapterID) values('Bài 5: Hướng dẫn tạo Segment Control bằng code','/public/video/test1.mp4',10);
insert into Lesson (lessonName,videoPath,chapterID) values('Bài 6: Demo tạo mạch điện 3 pha làm xoay quạt','/public/video/test1.mp4',10);
insert into Lesson (lessonName,videoPath,chapterID) values('Bài 7: Giới thiệu về Date Picker','/public/video/test1.mp4',11);
insert into Lesson (lessonName,videoPath,chapterID) values('Bài 8: Default Style Date picker','/public/video/test1.mp4',11);
insert into Lesson (lessonName,videoPath,chapterID) values('Bài 9: Custome style date picker','/public/video/test1.mp4',11);
insert into Lesson (lessonName,videoPath,chapterID) values('Bài 10: Giới thiệu core data','/public/video/test1.mp4',12);
insert into Lesson (lessonName,videoPath,chapterID) values('Bài 11: Insert trong core data','/public/video/test1.mp4',12);
insert into Lesson (lessonName,videoPath,chapterID) values('Bài 12: Select trong core data','/public/video/test1.mp4',12);

insert into Lesson (lessonName,videoPath,chapterID) values('Bài 1: Giới thiệu cơ bản về Nodejs','/public/video/test1.mp4',13);
insert into Lesson (lessonName,videoPath,chapterID) values('Bài 2: Những rào cản của việc học nodejs','/public/video/test1.mp4',13);
insert into Lesson (lessonName,videoPath,chapterID) values('Bài 3: Giao điện CLI','/public/video/test1.mp4',13);
insert into Lesson (lessonName,videoPath,chapterID) values('Bài 4: Giới thiệu javascript','/public/video/test1.mp4',14);
insert into Lesson (lessonName,videoPath,chapterID) values('Bài 5: Các khái niệm căn bản trong javascript','/public/video/test1.mp4',14);
insert into Lesson (lessonName,videoPath,chapterID) values('Bài 6: Khai báo sử dụng hàm trong javascript','/public/video/test1.mp4',14);
insert into Lesson (lessonName,videoPath,chapterID) values('Bài 7: ES6 Template literals','/public/video/test1.mp4',15);
insert into Lesson (lessonName,videoPath,chapterID) values('Bài 8: ES6 Class','/public/video/test1.mp4',15);
insert into Lesson (lessonName,videoPath,chapterID) values('Bài 9: Tương lại ES6','/public/video/test1.mp4',15);

insert into Lesson (lessonName,videoPath,chapterID) values('Bài 1: Khái niệm HTTP','/public/video/test1.mp4',16);
insert into Lesson (lessonName,videoPath,chapterID) values('Bài 2: HTTP Parser','/public/video/test1.mp4',16);
insert into Lesson (lessonName,videoPath,chapterID) values('Bài 3: HTTP request','/public/video/test1.mp4',16);
insert into Lesson (lessonName,videoPath,chapterID) values('Bài 4: API endpoint','/public/video/test1.mp4',17);
insert into Lesson (lessonName,videoPath,chapterID) values('Bài 5: Web server và checklist','/public/video/test1.mp4',17);
insert into Lesson (lessonName,videoPath,chapterID) values('Bài 6: Ý nghĩa các phiên bản Semantic','/public/video/test1.mp4',17);
insert into Lesson (lessonName,videoPath,chapterID) values('Bài 7: int, nodemon và package.json','/public/video/test1.mp4',18);
insert into Lesson (lessonName,videoPath,chapterID) values('Bài 8: npm global installation','/public/video/test1.mp4',18);
insert into Lesson (lessonName,videoPath,chapterID) values('Bài 9: express và xây dựng một web server hoàn chỉnh','/public/video/test1.mp4',18);

insert into Lesson (lessonName,videoPath,chapterID) values('Bài 1: Giới thiệu ngôn ngữ lập trình python','/public/video/test1.mp4',19);
insert into Lesson (lessonName,videoPath,chapterID) values('Bài 2: Cài đặt môi trường python','/public/video/test1.mp4',19);
insert into Lesson (lessonName,videoPath,chapterID) values('Bài 3: Chạy file Python','/public/video/test1.mp4',19);
insert into Lesson (lessonName,videoPath,chapterID) values('Bài 4: Biến trong python','/public/video/test1.mp4',20);
insert into Lesson (lessonName,videoPath,chapterID) values('Bài 5: Kiểu số tỏng python','/public/video/test1.mp4',20);
insert into Lesson (lessonName,videoPath,chapterID) values('Bài 6: Kiểu chuỗi trong python phần 1','/public/video/test1.mp4',20);
insert into Lesson (lessonName,videoPath,chapterID) values('Bài 7: Kiểu chuỗi trong python phần 2','/public/video/test1.mp4',20);
insert into Lesson (lessonName,videoPath,chapterID) values('Bài 8: List trong python','/public/video/test1.mp4',20);
insert into Lesson (lessonName,videoPath,chapterID) values('Bài 9: Cấu trúc rẽ nhánh trong python','/public/video/test1.mp4',21);
insert into Lesson (lessonName,videoPath,chapterID) values('Bài 10: While loop trong python','/public/video/test1.mp4',21);
insert into Lesson (lessonName,videoPath,chapterID) values('Bài 11: For loop trong python','/public/video/test1.mp4',21);

insert into Lesson (lessonName,videoPath,chapterID) values('Bài 1: Cách cài đặt môi trường python','/public/video/test1.mp4',22);
insert into Lesson (lessonName,videoPath,chapterID) values('Bài 2: Tạo ứng dụng hello world','/public/video/test1.mp4',22);
insert into Lesson (lessonName,videoPath,chapterID) values('Bài 3: Toán tử trong python','/public/video/test1.mp4',22);
insert into Lesson (lessonName,videoPath,chapterID) values('Bài 4: Lớp và đối tượng','/public/video/test1.mp4',23);
insert into Lesson (lessonName,videoPath,chapterID) values('Bài 5: Thuộc tính','/public/video/test1.mp4',23);
insert into Lesson (lessonName,videoPath,chapterID) values('Bài 6: Phương thức','/public/video/test1.mp4',23);
insert into Lesson (lessonName,videoPath,chapterID) values('Bài 7: Kế thừa','/public/video/test1.mp4',23);
insert into Lesson (lessonName,videoPath,chapterID) values('Bài 8: Đọc file','/public/video/test1.mp4',24);
insert into Lesson (lessonName,videoPath,chapterID) values('Bài 9: Ghi file','/public/video/test1.mp4',24);

insert into Lesson (lessonName,videoPath,chapterID) values('Bài 1: Giới thiệu ASP.NET MVC','/public/video/test1.mp4',25);
insert into Lesson (lessonName,videoPath,chapterID) values('Bài 2: Thiết lập môi trường VS','/public/video/test1.mp4',25);
insert into Lesson (lessonName,videoPath,chapterID) values('Bài 3: Tạo tương tác giữa View-Controller-Model','/public/video/test1.mp4',25);
insert into Lesson (lessonName,videoPath,chapterID) values('Bài 4: Tạo layouts và template cho view','/public/video/test1.mp4',26);
insert into Lesson (lessonName,videoPath,chapterID) values('Bài 5: Tạo trang đăng nhập qua store procudre','/public/video/test1.mp4',26);
insert into Lesson (lessonName,videoPath,chapterID) values('Bài 6: Các đăng nhập với Custom Membership provider','/public/video/test1.mp4',26);
insert into Lesson (lessonName,videoPath,chapterID) values('Bài 7: Hiển thị danh sách dữ liệu bằng razor','/public/video/test1.mp4',26);
insert into Lesson (lessonName,videoPath,chapterID) values('Bài 8: Validate form trong ASP NET','/public/video/test1.mp4',26);
insert into Lesson (lessonName,videoPath,chapterID) values('Bài 9: Lập trình website bán hàng','/public/video/test1.mp4',27);

insert into Lesson (lessonName,videoPath,chapterID) values('Bài 1: Hướng dẫn cài đặt Xamatin và VS Studio 2019','/public/video/test1.mp4',28);
insert into Lesson (lessonName,videoPath,chapterID) values('Bài 2: Xamarin là gì','/public/video/test1.mp4',28);
insert into Lesson (lessonName,videoPath,chapterID) values('Bài 3: Xamarin form là gì','/public/video/test1.mp4',28);
insert into Lesson (lessonName,videoPath,chapterID) values('Bài 4: Xử lí ứng dụng đa màn hình','/public/video/test1.mp4',29);
insert into Lesson (lessonName,videoPath,chapterID) values('Bài 5: Data binding phần 1','/public/video/test1.mp4',29);
insert into Lesson (lessonName,videoPath,chapterID) values('Bài 6: Data binding phần 2','/public/video/test1.mp4',29);
insert into Lesson (lessonName,videoPath,chapterID) values('Bài 7: Xây dựng ứng dụng chat với xamarin','/public/video/test1.mp4',30);
insert into Lesson (lessonName,videoPath,chapterID) values('Bài 8: MVVM','/public/video/test1.mp4',30);