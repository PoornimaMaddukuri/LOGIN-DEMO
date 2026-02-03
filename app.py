from flask import Flask, render_template, request
import mysql.connector

app = Flask(__name__)

db = mysql.connector.connect(
    host="localhost",
    user="root",
    password="Poornima",
    database="login_project"
)

cursor = db.cursor()

@app.route("/")
def home():
    return render_template("login.html")

@app.route("/register", methods=["GET", "POST"])
def register():
    if request.method == "POST":
        username = request.form["username"]
        email = request.form["email"]
        password = request.form["password"]

        sql = "INSERT INTO users (username, email, password) VALUES (%s, %s, %s)"
        cursor.execute(sql, (username, email, password))
        db.commit()

        return "Registration Successful"

    return render_template("register.html")

@app.route("/login", methods=["POST"])
def login():
    email = request.form["email"]
    password = request.form["password"]

    sql = "SELECT * FROM users WHERE email=%s AND password=%s"
    cursor.execute(sql, (email, password))
    user = cursor.fetchone()

    if user:
        return "Login Successful"
    else:
        return "Invalid Credentials"

if __name__ == "__main__":
    app.run(debug=True)