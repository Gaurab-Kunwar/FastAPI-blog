# FastAPI Blog API

A REST API for a blog built with FastAPI, PostgreSQL, and JWT authentication.

## Features
- User registration and login
- JWT protected routes
- Create, read, delete posts
- Auto-generated API docs

## Setup

1. Clone the repo
2. Create a virtual environment and install dependencies
   pip install -r requirements.txt
3. Create a .env file
   DATABASE_URL=postgresql://user:password@localhost:5432/blog_db
   SECRET_KEY=yoursecretkey
4. Run the app
   uvicorn main:app --reload

## Docs
Visit http://localhost:8000/docs to explore the API interactively.

## Stack
- FastAPI
- PostgreSQL
- SQLAlchemy
- JWT (python-jose)
- Pydantic