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
<img src="https://img.shields.io/badge/django-092E20?style=for-the-badge&logo=django&logoColor=white">

**Database**<br>
<img src="https://img.shields.io/badge/sqlite3-003B57?style=for-the-badge&logo=sqlite&logoColor=white">

**API**<br>
<img src="https://img.shields.io/badge/TMDb-01B4E4?style=for-the-badge&logo=tmdb&logoColor=white">
<img src="https://img.shields.io/badge/TVmaze-000000?style=for-the-badge&logo=tvmaze&logoColor=white">



**Project management**<br>
[![Git](https://img.shields.io/badge/Git-black?style=for-the-badge&logo=Git)](https://git-scm.com/)
[![GitHub](https://img.shields.io/badge/GitHub-black?style=for-the-badge&logo=GitHub)](https://github.com/)

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






