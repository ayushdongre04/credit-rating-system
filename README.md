# Residential Mortgage Securities (RMBS) Credit Rating
## Prerequisites
Ensure you have the following installed:
- **Python** (3.13)
- **Node.js** (22.14.0 recommended)
- **pip** (Python package manager)
- **Virtualenv** (optional but recommended)

## Installation
### Backend Setup (Django)
1. Navigate to the backend directory:
    ```
    cd backend
    ```

2. Create virtual Environment:
    ```
    python -m venv .venv
    # On Windows, use venv\Scripts\activate
    source venv/bin/activate
    ```

3. Install the requirements:
    ```
    pip install -r requirements.txt
    ```

### Frontend Setup (React JS)
1. Navigate to the frontend directory:
    ```
    cd frontend
    ```

2. install dependencies:
    ```
    npm install
    ```


## Running the Application
1. Navigate to the backend directory:
    ```
    cd backend
    ```

2. Run Django Migrations

    ```
    python manage.py makemigrations
    python manage.py migrate
    ```

3. Start Django Server

    ```
    python manage.py runserver

    The backend will be running at http://127.0.0.1:8000/.
    ```

3. Start React Development Server

    ```
    cd frontend
    npm start

    The frontend will be running at http://localhost:3000/.
    ```