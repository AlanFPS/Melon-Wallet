<p align="center"><img src="/public/photos/kittenmelonREADME.png"></p>

# Melon Wallet

[Click here](https://alaanarg.github.io/Project2-WebApp-MelonWallet/) to use it!

You can use test user if you don't wanna register:
```
email: user1@example.com/user2@example.com
password: 12345678
```

## About

**Melon Wallet** is a cute expense & income app to keep your daily expenses and revenue on record. I've always used different tools to keep
track of my finances, but I could never find something attractive and functional at the same time.

The application was built with Express, Node.js & MongoDB database. It also incorporates an Exchange Rate API which renders based on user currency input into the database when they add a new transaction.

### Home

![overview](/public/photos/overview.gif)

### Authentication

User authentication built using Passport with Express. Uses encryption salts to hash user passwords for protection. The app also allows for social logins on both Facebook and Google. This allows the user an easiest and fastest way to log-in and use the app.

### Views

Once logged in, users are taken to the main application page where they will be able to input their own data (both expenses and income) and save it. Also, they are are able to update or remove as well as reorder the data.


**Enjoy!** :heart: