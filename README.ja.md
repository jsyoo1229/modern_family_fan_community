# モダンファミリー ファンコミュニティ

## 目標と機能
### 目標 ###
アメリカのシットコム「モダンファミリー」のファンコミュニティサイトとして、ユーザーが投稿を作成し、コメントを投稿し、「いいね」や「スクラップ」機能を通じて自分だけのコミュニティ体験を提供します。

### 機能
- 会員登録およびログイン/ログアウト: ユーザーはメールアドレスとパスワードを使用してアカウントを作成し、ログインおよびログアウトできます。
- 投稿管理: ユーザーは投稿を作成、編集、削除できます。
- コメント管理: 投稿にコメントを追加、編集、削除できます。
- いいね機能: ユーザーは投稿に「いいね」を押して関心を示すことができます。
- スクラップ機能: ユーザーは投稿をスクラップし、お気に入りに追加できます。

## リポジトリ
https://github.com/jsyoo1229/modern_family_fan_community

## 使用技術
**フロントエンド**<br>
<img src="https://img.shields.io/badge/react-61DAFB?style=for-the-badge&logo=react&logoColor=white"> 
<img src="https://img.shields.io/badge/css-1572B6?style=for-the-badge&logo=css3&logoColor=white">
<img src="https://img.shields.io/badge/javascript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black">
<img src="https://img.shields.io/badge/bootstrap-7952B3?style=for-the-badge&logo=bootstrap&logoColor=white">

**バックエンド**<br>
<img src="https://img.shields.io/badge/python-3776AB?style=for-the-badge&logo=python&logoColor=white"> 
<img src="https://img.shields.io/badge/django--rest--framework-ff1709?style=for-the-badge&logo=django&logoColor=white">

**データベース**<br>
<img src="https://img.shields.io/badge/sqlite3-003B57?style=for-the-badge&logo=sqlite&logoColor=white">

**API**<br>
<img src="https://img.shields.io/badge/TMDb-01B4E4?style=for-the-badge&logo=tmdb&logoColor=white">
<img src="https://img.shields.io/badge/TVmaze-000000?style=for-the-badge&logo=tvmaze&logoColor=white">

**プロジェクト管理**<br>
[![Git](https://img.shields.io/badge/Git-black?style=for-the-badge&logo=Git)](https://git-scm.com/)
[![GitHub](https://img.shields.io/badge/GitHub-black?style=for-the-badge&logo=GitHub)](https://github.com/)


## プロジェクトフォルダ構造
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


## URL構造 ##

* **config**

| App    | URL                        | 説明                           |
|--------|----------------------------|--------------------------------|
| config | /login/                    | ユーザーログイン (JWTトークン発行) |
| config | /admin/                    | Django管理ページ               |
| config | /api/schema/               | APIスキーマ                     |
| config | /api/schema/swagger-ui/    | Swagger UI                     |
| config | /api/schema/redoc/         | Redoc UI                       |

* **posts**

| App   | URL                         | HTTP METHOD | 説明                                       |
|-------|-----------------------------| ------------|-------------------------------------------|
| posts | /posts/                     | GET         | 投稿リストを取得                           |
| posts | /posts/                     | POST        | 投稿作成                                   |
| posts | /posts/{id}/                | GET         | 特定の投稿を取得                           |
| posts | /posts/{id}/                | PUT         | 特定の投稿を更新                           |
| posts | /posts/{id}/                | DELETE      | 特定の投稿を削除                           |
| posts | /posts/{post_id}/comments/  | GET         | 特定の投稿のコメントリストを取得             |
| posts | /posts/{post_id}/comments/  | POST        | 特定の投稿にコメントを追加                  |
| posts | /posts/{post_id}/like/      | POST        | 投稿にいいねを追加                          |
| posts | /posts/{post_id}/like/      | DELETE      | 投稿のいいねを解除                          |
| posts | /posts/{post_id}/like/      | GET         | ユーザーが投稿にいいねを押したか確認         |
| posts | /posts/{post_id}/scrap/     | POST        | 投稿をスクラップ                            |
| posts | /posts/{post_id}/scrap/     | GET         | ユーザーが投稿をスクラップしたか確認         |
| posts | /posts/top_liked/           | GET         | いいねが多い上位7つの投稿を取得              |
| posts | /posts/top_viewed/          | GET         | 閲覧数が多い上位5つの投稿を取得              |

* **users**

| App   | URL                      | HTTP METHOD | 説明                                      |
|-------|--------------------------|-------------|-------------------------------------------|
| users | /users/signup/           | POST        | ユーザー登録                               |
| users | /users/profile/<int:pk>/ | GET         | プロフィール取得                           |
| users | /users/scraps/           | GET         | 現在のユーザーがスクラップした投稿リストを取得 |


## 機能仕様
```mermaid
    graph TD
    A[ユーザーアカウント管理] --> B[ユーザー登録]
    A --> C[ログイン]
    A --> D[ログアウト]
    
    E[投稿管理] --> F[投稿作成]
    E --> G[投稿編集]
    E --> H[投稿削除]
    E --> I[投稿閲覧]
    
    J[コメント管理] --> K[コメント作成]
    J --> L[コメント編集]
    J --> M[コメント削除]

    N[いいねとスクラップ機能] --> O[いいね]
    N --> P[スクラップ]
```

## データベースモデリング（ERD）
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


## ワイヤーフレーム
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


## 画面設計  
* Home
![홈_로그인전](https://github.com/user-attachments/assets/914a7305-42ab-4d3d-9fe4-3bc302d22751)

* ユーザー登録
![회원가입](https://github.com/user-attachments/assets/5c6fbf5b-5f3f-4a05-88f8-1f11e8a86681)

* ログイン
![로그인](https://github.com/user-attachments/assets/2ab96ea3-e5bd-49cc-8fc2-ad5399ed3f55)

* 閲覧数上位5つの投稿
![홈_조회수순](https://github.com/user-attachments/assets/30bc27fd-7033-4517-9539-d75f3df3f967)

* いいねが多い上位7つの投稿
![홈_좋아요순](https://github.com/user-attachments/assets/ea336699-7672-487b-a059-0be9eddbe581)

* 投稿作成
![글쓰기](https://github.com/user-attachments/assets/f9c2abb7-5168-44e9-b488-f761db60d3d5)

* 投稿リスト
![게시글_목록](https://github.com/user-attachments/assets/c388713b-117e-43b1-ae72-63341bacb91d)

* 投稿閲覧
![글읽기](https://github.com/user-attachments/assets/39b4f610-5631-4462-9843-def5b45df483)

* コメント
![댓글](https://github.com/user-attachments/assets/314e4378-b877-476f-959c-8cba821a68c1)

* スクラップした投稿
![스크랩](https://github.com/user-attachments/assets/956a2747-a069-4892-8452-e88a0f21e651)


## トラブルシューティング
* トークン認証エラー
最初はフロントエンドをバニラJavaScriptで実装しようとしましたが、認証プロセスでエラーが発生し、
デバッグが難しかったため、この機会にReactを学び、Reactでフロントエンドコードを実装することにしました。
そのため、制作期間は長くなりましたが、最終的にフロントエンドコードがうまく動作したので、正しい選択だったと思います。

## 感想
* 基本に対する理解
いいねやスクラップ機能を実装する際、DRFのビューとモデルに対する基本的な理解が不可欠でした。
継承されたクラスに内蔵されている関数を利用してカスタマイズするコードが多かったため、
どのような内蔵関数が存在するのか、モデルのどのフィールドを引数に渡すべきかなど、
基本を理解していなければ実装は難しかったです。

* CICDの失敗
プロジェクト完了後、GitHub ActionsとAWS EC2インスタンスを使用してデプロイにも挑戦しましたが、
SSH認証プロセスでエラーが発生し、デプロイに失敗しました。非常に残念でしたが、デプロイに挑戦する中で、
仮想化、Docker、コンテナといった概念について学ぶ良いきっかけとなり、Linuxのコマンドも実際に経験することができて良かったです。


  
















