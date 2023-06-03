thông tin api
- title: nếu có chữ thì đổ ra search theo title còn k có thì search all
- genres : search như là title
- minRate 
- maxRate
- minChapterNumber
- page

chức năng
- sort type: 
+ 1: sort theo chapterNumber từ lớn > bé
+ 2: sort theo chapterNumber từ bé > lớn
+ 3: sort theo numberOfViews từ lớn > bé
+ 4: //                      từ bé > lớn
+ 5: sort theo numberOfReviews từ lớn > bé
+ 6: //                        từ bé > lớn
+ 7: sort theo rating từ lớn > bé

- Code này nhận thông tin kiểu post

{
    "title": "",
    "genres": [],
    "minRate": 1,
    "maxRate": 5,
    "minChapterNumber": 200,
    "page": 1,
    "sortType": 7
}