const db = require("../utils/db");

module.exports = {
  all: async () => {
    const sql = `SELECT DISTINCT Course.courseID as id, Course.name as courseName, Category.categoryName as categoryName,
        Teacher.name as teacherName, Course.averageStar as stars, Course.NoStudentRates as NoRates,
        Course.imagePath as img, Sale.postDiscountPrice as price, Sale.percentDiscount as percent,
        Course.views as views, DATE_FORMAT(Course.created, "%d/%m/%Y") as created, Course.views as views, 
        COUNT(RegisteredCourse.studentID) as NoReStudent
        FROM ((((Category
        INNER JOIN Course ON Category.categoryID = Course.categoryID)
        INNER JOIN Teacher ON Course.teacherID = Teacher.teacherID)
        INNER JOIN RegisteredCourse ON RegisteredCourse.courseID = Course.courseID)
        INNER JOIN Sale ON Sale.courseID = Course.courseID)
        GROUP BY Course.courseID;`;
    const result = await db.load(sql);
    return result;
  },
  all1: async () => {
    const sql = `SELECT DISTINCT Course.courseID as id, Course.name as courseName, Category.categoryName as categoryName,
        Teacher.name as teacherName, Course.averageStar as stars, Course.NoStudentRates as NoRates,
        Course.imagePath as img, Sale.postDiscountPrice as price, Sale.percentDiscount as percent,
        Course.views as views, DATE_FORMAT(Course.created, "%d/%m/%Y") as created, Course.views as views, 
        COUNT(RegisteredCourse.studentID) as NoReStudent
        FROM ((((Category
        INNER JOIN Course ON Category.categoryID = Course.categoryID)
        INNER JOIN Teacher ON Course.teacherID = Teacher.teacherID)
        INNER JOIN RegisteredCourse ON RegisteredCourse.courseID = Course.courseID)
        INNER JOIN Sale ON Sale.courseID = Course.courseID)
        GROUP BY Course.courseID
        ORDER BY Course.averageStar DESC, (Sale.postDiscountPrice - Sale.postDiscountPrice*Sale.percentDiscount/100) ASC;`;
    const result = await db.load(sql);
    return result;
  },
  all2: async () => {
    const sql = `SELECT DISTINCT Course.courseID as id, Course.name as courseName, Category.categoryName as categoryName,
        Teacher.name as teacherName, Course.averageStar as stars, Course.NoStudentRates as NoRates,
        Course.imagePath as img, Sale.postDiscountPrice as price, Sale.percentDiscount as percent,
        Course.views as views, DATE_FORMAT(Course.created, "%d/%m/%Y") as created, Course.views as views, 
        COUNT(RegisteredCourse.studentID) as NoReStudent
        FROM ((((Category
        INNER JOIN Course ON Category.categoryID = Course.categoryID)
        INNER JOIN Teacher ON Course.teacherID = Teacher.teacherID)
        INNER JOIN RegisteredCourse ON RegisteredCourse.courseID = Course.courseID)
        INNER JOIN Sale ON Sale.courseID = Course.courseID)
        GROUP BY Course.courseID
        ORDER BY Course.averageStar DESC`;
    const result = await db.load(sql);
    return result;
  },
  all3: async () => {
    const sql = `SELECT DISTINCT Course.courseID as id, Course.name as courseName, Category.categoryName as categoryName,
        Teacher.name as teacherName, Course.averageStar as stars, Course.NoStudentRates as NoRates,
        Course.imagePath as img, Sale.postDiscountPrice as price, Sale.percentDiscount as percent,
        Course.views as views, DATE_FORMAT(Course.created, "%d/%m/%Y") as created, Course.views as views, 
        COUNT(RegisteredCourse.studentID) as NoReStudent
        FROM ((((Category
        INNER JOIN Course ON Category.categoryID = Course.categoryID)
        INNER JOIN Teacher ON Course.teacherID = Teacher.teacherID)
        INNER JOIN RegisteredCourse ON RegisteredCourse.courseID = Course.courseID)
        INNER JOIN Sale ON Sale.courseID = Course.courseID)
        GROUP BY Course.courseID
        ORDER BY (Sale.postDiscountPrice - Sale.postDiscountPrice*Sale.percentDiscount/100) ASC;`;
    const result = await db.load(sql);
    return result;
  },
  getRegisteredCourseByStudentID: async (studentID) => {
    const sql = `SELECT a.*, b.curLesson FROM Course as a, RegisteredCourse as b, student as c where  c.studentID = ${studentID} and c.studentID = b.studentID and b.courseID = a.courseID;`;
    const result = await db.load(sql);
    return result;
  },
  getWatchListbyStudentID: async (studentID) => {
    const sql = `SELECT a.* FROM Course as a, WatchList as b, student as c where  c.studentID = ${studentID} and c.studentID = b.studentID and b.courseID = a.courseID;`;
    const result = await db.load(sql);
    return result;
  },
  getCourseByID: async (courseID) => {
    const sql = `SELECT * from Course where courseID = ${courseID}`;
    const result = await db.load(sql);
    return result;
  },
  updateAverageStar: async (courseID, stars) => {
    const sql = `UPDATE Course set averageStar = ${stars} where courseID = ${courseID}`;
    const result = await db.load(sql);
    return result;
  },
  getCourseByCategoryID: async (categoryID) => {
    const sql = `SELECT* from Course where categoryID = ${categoryID}`;
    const result = await db.load(sql);
    return result;
  },
  getAll: async () => {
    const sql = `SELECT* from Course`;
    const result = await db.load(sql);
    return result;
  },
  fulltext: async (search) => {
    const sql = `SELECT DISTINCT Course.courseID as id, Course.name as courseName, Category.categoryName as categoryName,
        Teacher.name as teacherName, Course.averageStar as stars, Course.NoStudentRates as NoRates,
        Course.imagePath as img, Sale.postDiscountPrice as price, Sale.percentDiscount as percent,
        Course.views as views, DATE_FORMAT(Course.created, "%d/%m/%Y") as created, Course.views as views, 
        COUNT(RegisteredCourse.studentID) as NoReStudent,  MATCH (Course.name) AGAINST ("${search}") AS score,
        MATCH (Category.categoryName) AGAINST ("${search}") as score2, MATCH (PostCategory.postCategoryName) AGAINST ("${search}}") as score3
        FROM (((((Category INNER JOIN Course ON Category.categoryID = Course.categoryID) INNER JOIN Teacher ON Course.teacherID = Teacher.teacherID)
        INNER JOIN RegisteredCourse ON RegisteredCourse.courseID = Course.courseID) INNER JOIN Sale ON Sale.courseID = Course.courseID)
        INNER JOIN PostCategory ON PostCategory.postCategoryID = Category.categoryID)
        WHERE (MATCH (Course.name) AGAINST ("${search}") > 0 || MATCH (Category.categoryName) AGAINST ("${search}") > 0 
        || MATCH (PostCategory.postCategoryName) AGAINST ("${search}") > 0)
        GROUP BY Course.courseID
        ORDER BY (score+score2+score3) DESC;`;
    const result = await db.load(sql);
    return result;
  },
  fulltext2: async (search) => {
    const sql = `SELECT DISTINCT Course.courseID as id, Course.name as courseName, Category.categoryName as categoryName,
      Teacher.name as teacherName, Course.averageStar as stars, Course.NoStudentRates as NoRates,
      Course.imagePath as img, Sale.postDiscountPrice as price, Sale.percentDiscount as percent,
      Course.views as views, DATE_FORMAT(Course.created, "%d/%m/%Y") as created, Course.views as views, 
      COUNT(RegisteredCourse.studentID) as NoReStudent,  MATCH (Course.name) AGAINST ("${search}") AS score,
      MATCH (Category.categoryName) AGAINST ("${search}") as score2, MATCH (PostCategory.postCategoryName) AGAINST ("${search}}") as score3
      FROM (((((Category INNER JOIN Course ON Category.categoryID = Course.categoryID) INNER JOIN Teacher ON Course.teacherID = Teacher.teacherID)
      INNER JOIN RegisteredCourse ON RegisteredCourse.courseID = Course.courseID) INNER JOIN Sale ON Sale.courseID = Course.courseID)
      INNER JOIN PostCategory ON PostCategory.postCategoryID = Category.categoryID)
      WHERE (MATCH (Course.name) AGAINST ("${search}") > 0 || MATCH (Category.categoryName) AGAINST ("${search}") > 0 
      || MATCH (PostCategory.postCategoryName) AGAINST ("${search}") > 0)
      GROUP BY Course.courseID
      ORDER BY Course.averageStar DESC;`;
    const result = await db.load(sql);
    return result;
  },
  fulltext3: async (search) => {
    const sql = `SELECT DISTINCT Course.courseID as id, Course.name as courseName, Category.categoryName as categoryName,
      Teacher.name as teacherName, Course.averageStar as stars, Course.NoStudentRates as NoRates,
      Course.imagePath as img, Sale.postDiscountPrice as price, Sale.percentDiscount as percent,
      Course.views as views, DATE_FORMAT(Course.created, "%d/%m/%Y") as created, Course.views as views, 
      COUNT(RegisteredCourse.studentID) as NoReStudent,  MATCH (Course.name) AGAINST ("${search}") AS score,
      MATCH (Category.categoryName) AGAINST ("${search}") as score2, MATCH (PostCategory.postCategoryName) AGAINST ("${search}}") as score3
      FROM (((((Category INNER JOIN Course ON Category.categoryID = Course.categoryID) INNER JOIN Teacher ON Course.teacherID = Teacher.teacherID)
      INNER JOIN RegisteredCourse ON RegisteredCourse.courseID = Course.courseID) INNER JOIN Sale ON Sale.courseID = Course.courseID)
      INNER JOIN PostCategory ON PostCategory.postCategoryID = Category.categoryID)
      WHERE (MATCH (Course.name) AGAINST ("${search}") > 0 || MATCH (Category.categoryName) AGAINST ("${search}") > 0 
      || MATCH (PostCategory.postCategoryName) AGAINST ("${search}") > 0) 
      GROUP BY Course.courseID
      ORDER BY (Sale.postDiscountPrice - Sale.postDiscountPrice*Sale.percentDiscount/100) ASC;`;
    const result = await db.load(sql);
    return result;
  },
  fulltext1: async (search) => {
    const sql = `SELECT DISTINCT Course.courseID as id, Course.name as courseName, Category.categoryName as categoryName,
      Teacher.name as teacherName, Course.averageStar as stars, Course.NoStudentRates as NoRates,
      Course.imagePath as img, Sale.postDiscountPrice as price, Sale.percentDiscount as percent,
      Course.views as views, DATE_FORMAT(Course.created, "%d/%m/%Y") as created, Course.views as views, 
      COUNT(RegisteredCourse.studentID) as NoReStudent,  MATCH (Course.name) AGAINST ("${search}") AS score,
      MATCH (Category.categoryName) AGAINST ("${search}") as score2, MATCH (PostCategory.postCategoryName) AGAINST ("${search}}") as score3
      FROM (((((Category INNER JOIN Course ON Category.categoryID = Course.categoryID) INNER JOIN Teacher ON Course.teacherID = Teacher.teacherID)
      INNER JOIN RegisteredCourse ON RegisteredCourse.courseID = Course.courseID) INNER JOIN Sale ON Sale.courseID = Course.courseID)
      INNER JOIN PostCategory ON PostCategory.postCategoryID = Category.categoryID)
      WHERE (MATCH (Course.name) AGAINST ("${search}") > 0 || MATCH (Category.categoryName) AGAINST ("${search}") > 0 
      || MATCH (PostCategory.postCategoryName) AGAINST ("${search}") > 0)
      GROUP BY Course.courseID
      ORDER BY Course.averageStar DESC, (Sale.postDiscountPrice - Sale.postDiscountPrice*Sale.percentDiscount/100) ASC;`;
    const result = await db.load(sql);
    return result;
  },
  getCourseByTeacherID: async (teacherID) => {
    const sql = `SELECT* from Course where teacherID = ${teacherID}`;
    const result = await db.load(sql);
    return result;
  },
  findLikeNameByTeacherID: async (input, teacherID) => {
    const sql = `select* from Course where name like '%${input}%' and teacherID = teacherID`;
    const result = await db.load(sql);
    return result;
  },
  findLikeName: async (input) => {
    const sql = `select* from Course where name like '%${input}%';`;
    const result = await db.load(sql);
    return result;
  },
  buy: async (studentID, courseID,curLesson) => {
    const sql = `INSERT into RegisteredCourse (studentID,courseID,curLesson) values(${studentID},${courseID},${curLesson})`;
    const result = await db.load(sql);
    return result;
  },
  ban: async (courseID) => {
    const sql = `UPDATE Course set ban=true where courseID = ${courseID}`;
    const result = await db.load(sql);
    return result;
  },
  unban: async (courseID) => {
    const sql = `UPDATE Course set ban=false where courseID = ${courseID}`;
    const result = await db.load(sql);
    return result;
  },
  create: async (teacherID, courseInfo) => {
    //courseName,courseSortDes,courseDes,coursePrice,postCategory,category
    const sql = `INSERT into Course (name,imagePath,sortDescription,description,NoStudents,averageStar, NoStudentRates,price,created,lastUpdated,categoryID,status,teacherID,views,htmlDescription,htmlSortDescription)
        values('${courseInfo.courseName}','${courseInfo.courseImagePath}','${courseInfo.courseSortDes}','${courseInfo.courseDes}',0,0,0,'${courseInfo.coursePrice}',now(),now(),${courseInfo.category},'Chưa hoàn tất',${teacherID},0,
        '${courseInfo.htmlCourseSortDes}','${courseInfo.htmlCourseDes}')`;
    const result = await db.load(sql);
    return result;
  },
  detail: async (courseID) => {
    const sql = `SELECT Course.courseID as id, Course.name as courseName, Course.description as courseDes,
    Course.sortDescription as CourseSortDes, Course.categoryID as categoryID, Category.categoryName as categoryName,
        Teacher.name as teacherName, Course.averageStar as stars, Course.NoStudentRates as NoRates,
        Course.imagePath as img, Sale.postDiscountPrice as price, Sale.percentDiscount as percent,
        Course.views as views, DATE_FORMAT(Course.created, "%d/%m/%Y") as created,
        DATE_FORMAT(Course.lastUpdated, "%d/%m/%Y") as updated, Course.views as views, 
        COUNT(RegisteredCourse.studentID) as NoReStudent
        FROM ((((Category
        INNER JOIN Course ON Category.categoryID = Course.categoryID)
        INNER JOIN Teacher ON Course.teacherID = Teacher.teacherID)
        INNER JOIN RegisteredCourse ON RegisteredCourse.courseID = Course.courseID)
        INNER JOIN Sale ON Sale.courseID = Course.courseID)
        WHERE Course.courseID = ${courseID};`;
    const result = await db.load(sql);
    return result;
  },
  feedback: async (courseID) => {
    const sql = ` SELECT *
    FROM Rating
    INNER JOIN Student
    ON Rating.studentID = Student.studentID    
    WHERE CourseID = ${courseID};`;
    const result = await db.load(sql);
    return result;
  },
  related: async (categoryID) => {
    const sql = `SELECT DISTINCT Course.courseID as id, Course.name as courseName, Category.categoryName as categoryName,
    Teacher.name as teacherName, Course.averageStar as stars, Course.NoStudentRates as NoRates,
    Course.imagePath as img, Sale.postDiscountPrice as price, Sale.percentDiscount as percent,
    Course.views as views, DATE_FORMAT(Course.created, "%d/%m/%Y") as created, Course.views as views, 
    COUNT(RegisteredCourse.studentID) as NoReStudent
    FROM ((((Category
    INNER JOIN Course ON Category.categoryID = Course.categoryID)
    INNER JOIN Teacher ON Course.teacherID = Teacher.teacherID)
    INNER JOIN RegisteredCourse ON RegisteredCourse.courseID = Course.courseID)
    INNER JOIN Sale ON Sale.courseID = Course.courseID)
    WHERE Course.categoryID = ${categoryID}
    GROUP BY Course.courseID
    ORDER BY NoStudents DESC
    LIMIT 5;`;
    const result = await db.load(sql);
    return result;
  },
  relatedcatName: async (categoryName) => {
    const sql = `SELECT DISTINCT Course.courseID as id, Course.name as courseName, Category.categoryName as categoryName,
    Teacher.name as teacherName, Course.averageStar as stars, Course.NoStudentRates as NoRates,
    Course.imagePath as img, Sale.postDiscountPrice as price, Sale.percentDiscount as percent,
    Course.views as views, DATE_FORMAT(Course.created, "%d/%m/%Y") as created, Course.views as views, 
    COUNT(RegisteredCourse.studentID) as NoReStudent
    FROM (((((Category
    INNER JOIN Course ON Category.categoryID = Course.categoryID)
    INNER JOIN Teacher ON Course.teacherID = Teacher.teacherID)
    INNER JOIN RegisteredCourse ON RegisteredCourse.courseID = Course.courseID)
    INNER JOIN Sale ON Sale.courseID = Course.courseID)
    INNER JOIN PostCategory ON PostCategory.PostCategoryID = Category.postCategoryID)
    WHERE Category.categoryName = "${categoryName}" || PostCategory.postCategoryName = "${categoryName}"
    GROUP BY Course.courseID
    ORDER BY NoStudents DESC`;
    const result = await db.load(sql);
    return result;
  },
};
