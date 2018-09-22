# CalculerX #
#### About:
Exploring django-rest-framework and frontend - vue-js
This is my basic math learning app:
- there is main panel where user answer math quiz, proper result
- there is options panel where user define workbooks, can modify equations, add and delete equations, create and delete workbooks, can select workbook for quiz
- in main panel user guess quiz, user can turn on proper answer preview if his answer is wrong

# How to run

1. Create python virtualenv
2. install requirements

```bash
pip install -r requirements.txt
cd djangobackend
./manage.py migrate
./manage.py runserver

```

3. Install node and live server

```bash
cd vue_version
live-server

```

4. Try app.