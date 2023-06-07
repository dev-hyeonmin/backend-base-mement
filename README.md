# mement-communication
Custom communication site.

---

## Function
+ 카테고리 :: categories
+ 게시판 :: boards
    + 페이징 (pagination module)
    + 공지사항 작성 (Admin)
+ 댓글 :: comments
    + 대댓글
+ 알람 및 메일
+ S3 이미지 업로드


## Notice
1. npm i --save @nestjs/websockets @nestjs/platform-socket.io
    + peerDependencies issue -> downcrade ^8.0.0
2. class-validator, class-transformer 추가