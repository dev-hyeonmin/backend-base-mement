# Custom Hospital CRM
병원 CRM 기본 베이스 설계 중입니다. 현재 Entity와 API 문서를 위한 Controller 및 DTO만 있는 형태입니다.

**issue**
1. npm i --save @nestjs/websockets @nestjs/platform-socket.io
    + peerDependencies issue -> downcrade ^8.0.0
2. class-validator, class-transformer 추가

.
.
.

## Entities
1. Products & Procedures
    + isDelete 컬럼으로 구분
    + N:M Relation
2. Reservation
    + 예약 상품 -> JSON 형태로 저장
3. Chart (=Client)
4. Timetable: 예약 날짜 및 시간 관리
    + CRM :: GET 요일&시간별 인원 제한 리스트 /reservations/limitcounts
    + CRM :: POST 요일&시간별 인원 제한 저장 /reservation/limitcounts
    + Client :: GET 해당 날짜 예약 가능 인원 /reservation/time/20230620
    + 휴무일 설정

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