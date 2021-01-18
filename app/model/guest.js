const db = require('../utils/db');

module.exports = {
    top: async () => {
        const sql = `SELECT DISTINCT Course.courseID as id, Course.name as courseName, Category.categoryName as categoryName,
        Teacher.name as teacherName, Course.averageStar as stars, Course.NoStudentRates as NoRates,
        Course.imagePath as img, Sale.postDiscountPrice as price, Sale.percentDiscount as percent, Course.views as views, 
        Course.NoStudents as NoStudent, COUNT(RegisteredCourse.studentID) as NoReStudent
        FROM ((((Category
        INNER JOIN Course ON Category.categoryID = Course.categoryID)
        INNER JOIN Teacher ON Course.teacherID = Teacher.teacherID)
        INNER JOIN RegisteredCourse ON RegisteredCourse.courseID = Course.courseID)
        INNER JOIN Sale ON Sale.courseID = Course.courseID)
        GROUP BY Course.courseID
        ORDER BY NoStudents DESC
        LIMIT 3;` 
        const guest = await db.load(sql);
        return guest;
    },
    topview: async () => {
        const sql = `SELECT DISTINCT Course.courseID as id, Course.name as courseName, Category.categoryName as categoryName,
        Teacher.name as teacherName, Course.averageStar as stars, Course.NoStudentRates as NoRates,
        Course.imagePath as img, Sale.postDiscountPrice as price, Sale.percentDiscount as percent,
        Course.views as views, COUNT(RegisteredCourse.studentID) as NoReStudent
        FROM ((((Category
        INNER JOIN Course ON Category.categoryID = Course.categoryID)
        INNER JOIN Teacher ON Course.teacherID = Teacher.teacherID)
        INNER JOIN RegisteredCourse ON RegisteredCourse.courseID = Course.courseID)
        INNER JOIN Sale ON Sale.courseID = Course.courseID)
        GROUP BY Course.courseID
        ORDER BY views DESC
        LIMIT 10;`
        const guest = await db.load(sql);
        return guest;
    },
    newest: async () => {
        const sql = `SELECT DISTINCT Course.courseID as id, Course.name as courseName, Category.categoryName as categoryName,
        Teacher.name as teacherName, Course.averageStar as stars, Course.NoStudentRates as NoRates,
        Course.imagePath as img, Sale.postDiscountPrice as price, Sale.percentDiscount as percent, Course.views as views, 
        DATE_FORMAT(Course.created, "%d/%m/%Y") as created, COUNT(RegisteredCourse.studentID) as NoReStudent
        FROM ((((Category
        INNER JOIN Course ON Category.categoryID = Course.categoryID)
        INNER JOIN Teacher ON Course.teacherID = Teacher.teacherID)
        INNER JOIN RegisteredCourse ON RegisteredCourse.courseID = Course.courseID)
        INNER JOIN Sale ON Sale.courseID = Course.courseID)
        GROUP BY Course.courseID
        ORDER BY created DESC
        LIMIT 10;`
        const guest = await db.load(sql);
        return guest;
    },
    hot: async () => {
        const sql = `SELECT DISTINCT Category.categoryID as id, PostCategory.postCategoryName as postCategoryName,
        PostCategory.postCategoryID as postCategoryID , Category.categoryName as categoryName,
        COUNT(RegisteredCourse.studentID) as NoReStudent
       FROM (((Category
       INNER JOIN Course ON Category.categoryID = Course.categoryID)
       INNER JOIN RegisteredCourse ON RegisteredCourse.courseID = Course.courseID)
       INNER JOIN PostCategory ON PostCategory.PostCategoryID = Category.PostCategoryID)
       WHERE DATEDIFF(now(),RegisteredCourse.registerTime) <= 7
       GROUP BY Category.categoryID
       ORDER BY COUNT(RegisteredCourse.studentID) DESC
       LIMIT 5;`
        const guest = await db.load(sql);
        return guest;
    },
    category: async () => {
        const sql = `SELECT *
        FROM Category
        INNER JOIN PostCategory
        ON Category.postCategoryID = PostCategory.PostCategoryID;;`
        const guest = await db.load(sql);
        return guest;
    }
}; 