# 家庭記帳本

## 功能
- 使用者可以記錄生活開支：

  用途名稱、種類、支出金額、支出日期

- 使用者可以透過分類查詢該類總支出。
- 使用者可以新增一支出。
- 使用者可以修改一支出。
- 使用者可以刪除一支出。
- 使用者可以註冊帳號，註冊的資料包括：名字、密碼、確認密碼。
    如果使用者已經註冊過、沒填寫必填欄位、或是密碼輸入錯誤，就註冊失敗，並回應給使用者錯誤訊息
- 使用者必須登入才能使用餐廳清單
- 使用者登出、註冊失敗、或登入失敗時，使用者都會在畫面上看到正確而清楚的系統訊息

## 種子資料
- 執行 npm run seed，系統會建立兩位使用者並隨機從10項種子資料套用5項。
- 虛構種子用戶及密碼
  用戶1
    User name: Uesr1
    Password 1234
  用戶2
    User name: Uesr2
    Password 1234

## 需求
- bcryptjs: ^2.4.3
- body-parser: ^1.19.0
- connect-flash: ^0.1.1
- dotenv: ^10.0.0
- express: ^4.17.1
- express-handlebars: ^5.3.4
- express-session: ^1.17.2
- method-override: ^3.0.0
- mongoose: ^6.0.12
- passport: ^0.5.0
- passport-local: ^1.0.0

## 安裝
- 下載
```
  https://github.com/JimmyHuang3364/expense-tracker.git
```
- 執行
```
cd expense-tracker
npm i
npm run seed
npm run dev
```
- 伺服器位置
```
localhost:3000
```