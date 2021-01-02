/*4 khoa hoc noi bat nhat tuan*/
use onlinecourse;

SELECT * FROM Course
ORDER BY RAND()
LIMIT 4;
/*10 Khoa hoc duoc xem nhieu nhat*/
SELECT * FROM Course
ORDER BY views DESC
LIMIT 10;
/*10 Khoa hoc moi nhat*/
SELECT * FROM Course
ORDER BY created DESC
LIMIT 10;
/*Danh sach linh vuc duoc dang ky nhieu nhat*/
(SELECT temp.categoryID, MAX(temp.totalviews) as totalviews, temp.categoryName as categoryName
FROM (SELECT SUM(c1.NoStudents) as totalviews, c2.categoryID, c2.categoryName
FROM Course as c1 JOIN Category as c2 ON c1.categoryID = c2.categoryID GROUP BY c2.categoryID) temp);
