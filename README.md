# 모던 패밀리 팬 커뮤니티

## 목표와 기능
### 목표 ###
이 프로젝트는 미국 시트콤 모던 패밀리의 팬 커뮤니티 사이트를 구축하는 것을 목표로 합니다. 사용자가 게시글을 작성하고, 댓글을 달며, 좋아요와 스크랩 기능을 통해 자신만의 커뮤니티 경험을 제공하는 것을 목표로 합니다.

### 기능
- 회원가입 및 로그인/로그아웃: 사용자는 이메일과 비밀번호를 사용해 계정을 생성하고 로그인 및 로그아웃할 수 있습니다.
- 게시글 관리: 사용자는 게시글을 생성하고, 수정 및 삭제할 수 있습니다.
- 댓글 관리: 게시글에 댓글을 작성하고, 수정 및 삭제할 수 있습니다.
- 좋아요 기능: 사용자는 게시글에 좋아요를 눌러 관심을 표현할 수 있습니다.
- 스크랩 기능: 사용자는 게시글을 스크랩하여 즐겨찾기에 추가할 수 있습니다.

## 레포지토리
https://github.com/jsyoo1229/modern_family_fan_community

## 사용 기술
**Front-end**<br>
<img src="https://img.shields.io/badge/react-61DAFB?style=for-the-badge&logo=react&logoColor=white"> 
<img src="https://img.shields.io/badge/css-1572B6?style=for-the-badge&logo=css3&logoColor=white">
<img src="https://img.shields.io/badge/javascript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black">
<img src="https://img.shields.io/badge/bootstrap-7952B3?style=for-the-badge&logo=bootstrap&logoColor=white">

**Back-end**<br>
<img src="https://img.shields.io/badge/python-3776AB?style=for-the-badge&logo=python&logoColor=white"> 
<img src="https://img.shields.io/badge/django--rest--framework-ff1709?style=for-the-badge&logo=django&logoColor=white">

**Database**<br>
<img src="https://img.shields.io/badge/sqlite3-003B57?style=for-the-badge&logo=sqlite&logoColor=white">

**API**<br>
<img src="https://img.shields.io/badge/TMDb-01B4E4?style=for-the-badge&logo=tmdb&logoColor=white">
<img src="https://img.shields.io/badge/TVmaze-000000?style=for-the-badge&logo=tvmaze&logoColor=white">



**Project management**<br>
[![Git](https://img.shields.io/badge/Git-black?style=for-the-badge&logo=Git)](https://git-scm.com/)
[![GitHub](https://img.shields.io/badge/GitHub-black?style=for-the-badge&logo=GitHub)](https://github.com/)


## 프로젝트 폴더 구조
📂modern_family_fan_community <br>
┣ 📂config <br>
┣ 📂frontend <br>
┃ ┣ 📂migrations <br>
┃ ┣ 📂node_modules <br>
┃ ┣ 📂public <br>
┃ ┣ 📂src <br>
┃ ┃ ┣ 📂assets <br>
┃ ┃ ┣ 📂components <br>
┃ ┃ ┣ 📂pages <br>
┃ ┃ ┣ 📜 App.css <br>
┃ ┃ ┣ 📜 App.js <br>
┃ ┃ ┣ 📜 index.js <br>
┃ ┣ 📂static <br>
┃ ┣ 📜 _init_.py <br>
┃ ┣ 📜 admin.py <br>
┃ ┣ 📜 apps.py <br>
┃ ┣ 📜 babel.config.json <br>
┃ ┣ 📜 models.py <br>
┃ ┣ 📜 package-lock.json <br>
┃ ┣ 📜 package.json <br>
┃ ┣ 📜 tests.py <br>
┃ ┣ 📜 views.py <br>
┃ ┣ 📜 webpack.config.js <br>
┣ 📂media <br>
┃ ┣ 📂post_images <br>
┣ 📂node_modules <br>
┣ 📂posts <br>
┃ ┣ 📜 models.py <br>
┃ ┣ 📜 serializers.py <br>
┃ ┣ 📜 tests.py <br>
┃ ┣ 📜 urls.py <br>
┃ ┣ 📜 views.py <br>
┣ 📂users <br>
┃ ┣ 📜 models.py <br>
┃ ┣ 📜 serializers.py <br>
┃ ┣ 📜 tests.py <br>
┃ ┣ 📜 urls.py <br>
┃ ┣ 📜 views.py <br>
┣ 📂shows <br>
┃ ┣ 📜 models.py <br>
┃ ┣ 📜 serializers.py <br>
┃ ┣ 📜 tests.py <br>
┃ ┣ 📜 urls.py <br>
┃ ┣ 📜 views.py <br>
┣ 📂static <br>
┣ 📂staticfiles <br>
┣ 📂venv <br>
┣ 📜 manage.py <br>
┣ 📜 requirements.txt <br>
┣ 📜 .gitignore <br>
┣ 📜 db.sqlite3 <br>
┣ 📜 package-lock.json <br>
┣ 📜 package.json <br>


## URL 구조 ##

* **config**

| App    | URL                        | 설명                           |
|--------|----------------------------|--------------------------------|
| config | /login/                    | 사용자 로그인 (JWT 토큰 발급)    |
| config | /admin/                    | Django 관리자 페이지            |
| config | /api/schema/               | API 스키마                      |
| config | /api/schema/swagger-ui/    | Swagger UI                     |
| config | /api/schema/redoc/         | Redoc UI                       |

* **posts**

| App   | URL                         | HTTP METHOD | 설명                                       |
|-------|-----------------------------| ------------|-------------------------------------------|
| posts | /posts/                     | GET         | 게시물 목록 조회 (리스트)                    |
| posts | /posts/                     | POST        | 게시물 생성                                 |
| posts | /posts/{id}/                | GET         | 특정 게시물 조회                            |
| posts | /posts/{id}/                | PUT         | 특정 게시물 수정                            |
| posts | /posts/{id}/                | DELETE      | 특정 게시물 삭제                            |
| posts | /posts/{post_id}/comments/  | GET         | 특정 게시물의 댓글 목록 조회                 |
| posts | /posts/{post_id}/comments/  | POST        | 특정 게시물에 댓글 생성                      |
| posts | /posts/{post_id}/like/      | POST        | 게시물에 좋아요를 추가                       |
| posts | /posts/{post_id}/like/      | DELETE      | 게시물의 좋아요 취소                         |
| posts | /posts/{post_id}/like/      | GET         | 사용자가 게시물에 좋아요를 눌렀는지 여부 확인  |
| posts | /posts/{post_id}/scrap/     | POST        | 게시물을 스크랩                             |
| posts | /posts/{post_id}/scrap/     | GET         | 사용자가 게시물을 스크랩했는지 여부 확인      |
| posts | /posts/top_liked/           | GET         | 좋아요가 많은 상위 7개의 게시물 조회          |
| posts | /posts/top_viewed/          | GET         | 조회수가 높은 상위 5개의 게시물 조회          |

* **users**

| App   | URL                      | HTTP METHOD | 설명                                      |
|-------|--------------------------|-------------|-------------------------------------------|
| users | /users/signup/           | POST        | 회원가입                                   |
| users | /users/profile/<int:pk>/ | GET         | 프로필 조회                                |
| users | /users/scraps/           | GET         | 현재 사용자의 스크랩한 게시물 목록을 조회    |

## 기능 명세 ##
```mermaid
    graph TD
    A[사용자 계정 관리] --> B[회원가입]
    A --> C[로그인]
    A --> D[로그아웃]
    
    E[게시글 관리] --> F[게시글 작성]
    E --> G[게시글 수정]
    E --> H[게시글 삭제]
    E --> I[게시글 조회]
    
    J[댓글 관리] --> K[댓글 작성]
    J --> L[댓글 수정]
    J --> M[댓글 삭제]

    N[좋아요 및 스크랩 기능] --> O[좋아요]
    N --> P[스크랩]
```

## 데이터베이스 모델링(ERD)
```mermaid
erDiagram
    User ||--o{ Post : writes
    User ||--o{ Comment : writes
    User ||--o{ Like : gives
    User ||--o{ Scrap : creates
    Post ||--o{ Comment : has
    Post ||--o{ Like : receives
    Post ||--o{ Scrap : is_scrapped

    User {
        int id PK
        string email UK
        string password
        string bio
        string profile_picture
    }

    Post {
        int id PK
        int author FK
        string title
        text content
        string image
        datetime created_at
        datetime updated_at
        int views
    }

    Comment {
        int id PK
        int post FK
        int author FK
        text content
        datetime created_at
        datetime updated_at
    }

    Like {
        int id PK
        int post FK
        int user FK
        datetime created_at
    }

    Scrap {
        int id PK
        int post FK
        int user FK
        datetime created_at
    }
```


## 와이어프레임
* Home
![모던패밀리  Home](https://github.com/user-attachments/assets/d434240d-6c30-4362-8208-45c7d4c0f00e)

* Write a Post
![모던패밀리  Write a Post](https://github.com/user-attachments/assets/04e1cf44-d2f8-4278-9915-c917d3efc346)

* Single Post
![모던패밀리  Single Post](https://github.com/user-attachments/assets/bcc1f193-8a8f-4239-a970-83510e347f25)

* Posts
![모던패밀리  Posts](https://github.com/user-attachments/assets/c1d63d91-d4d3-4fe5-a461-92698321cf32)

* Scrapped Posts
![모던패밀리  Scrapped Posts](https://github.com/user-attachments/assets/c76c4818-28b8-47e6-9ccc-866821b0858a)


## 화면 설계  
* Home
![홈_로그인전](https://github.com/user-attachments/assets/914a7305-42ab-4d3d-9fe4-3bc302d22751)

* 회원가입
![회원가입](https://github.com/user-attachments/assets/5c6fbf5b-5f3f-4a05-88f8-1f11e8a86681)

* 로그인
![로그인](https://github.com/user-attachments/assets/2ab96ea3-e5bd-49cc-8fc2-ad5399ed3f55)

* 홈 조회수 상위 5개 게시글
![홈_조회수순](https://github.com/user-attachments/assets/30bc27fd-7033-4517-9539-d75f3df3f967)

* 홈 좋아요 상위 7개 게시글
![홈_좋아요순](https://github.com/user-attachments/assets/ea336699-7672-487b-a059-0be9eddbe581)

* 글쓰기
![글쓰기](https://github.com/user-attachments/assets/f9c2abb7-5168-44e9-b488-f761db60d3d5)

* 게시글 목록
![게시글_목록](https://github.com/user-attachments/assets/c388713b-117e-43b1-ae72-63341bacb91d)

* 글 읽기
![글읽기](https://github.com/user-attachments/assets/39b4f610-5631-4462-9843-def5b45df483)

* 댓글
![댓글](https://github.com/user-attachments/assets/314e4378-b877-476f-959c-8cba821a68c1)

* 스크랩한 글 목록
![스크랩](https://github.com/user-attachments/assets/956a2747-a069-4892-8452-e88a0f21e651)


## 트러블 슈팅
* 토큰 인증 오류
가장 큰 난관은 토큰 관련 오류였습니다. 회원가입과 로그인은 물론, CRUD 기능에서도 토큰

## 느낀점
* 프론트엔드 코드에 대한 기본적인 이해 필요
* 모델링과 인증 기능















