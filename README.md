# mement-communication
Custom communication site.

---

## Function CRM
+ 상품 (=이벤트)
    + 상품 Entity / 이벤트 플래그로 구분
    + 삭제 : del 컬럼으로 구분
    + 대분류 (서브 대분류 X)
    + 시술?
+ 예약
    + 시간별 인원수 지정
    + 휴무일 지정
    + 영업 시간 설정
    + 예약 완료 알림
+ 고객
    + 기본 정보
    + 예약 정보
+ 통계


---

### Function communication
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