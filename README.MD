#Node.js News API Project
This is a Node.js project that implements a RESTful API for fetching news articles based on user preferences. It includes user registration, login, and preferences management using Express.js, bcrypt, and JWT for authentication and authorization.

#Features
User registration and login with password hashing and token-based authentication.
In-memory data store to manage user information and news preferences.
Fetch news articles from various sources based on user preferences.
Proper error handling and input validation.

#Run the server: npm start
Access the API using Postman, Curl, or any other HTTP client.

##Endpoints
#Register a New User
lcoalhost:4000/register

#Log in a User
lcoalhost:4000/login

#Retrieve User Preferences
lcoalhost:4000/newsInfo/preferences
Retrieve the news preferences for the logged-in user.

#Update User Preferences
lcoalhost:4000/newsInfo/preferences
Update the news preferences for the logged-in user.

#Fetch News Articles
lcoalhost:4000/newsInfo/news
Fetch news articles based on the logged-in user's preferences.

#External APIs
This project uses external news APIs to fetch news articles from various sources. Incorporating ensures smooth fetching and filtering of news data based on user preferences.
https://newsapi.org/v2/top-headlines/sources?apiKey=API_KEY

#Contributors
Sai Surya Charan Bharathula
Feel free to contribute to this project by submitting pull requests or issues.
