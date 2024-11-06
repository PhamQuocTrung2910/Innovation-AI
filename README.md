# Innovation-AI
COS30049-Computing Technology Innovation Project: Assignment 3</br>
House Prediction Market Full Stack. 

## Table of Contents 

1. [Overview](#overview)
2. [Tech Stack](#stack)
3. [Setup Instructions](#setup)
4. [Runnning the Application](#run)
5. [Troubleshooting](#troubleshoot)


<a name="overview"></a>
## Overview 
The increasingly growing population in Bengaluru in India which is in demand for more housing creates a competitive real estate issue. This website ensures that the price predictions given based of the User's data will provide a estimated price prediction alongside different locations in Bengaluru to help the user understand the current evolving housing market. 



<a name="stack"></a>
## Tech Stack 
The tech stack ensures for an efficient and easy application to create an interactive web application for house market predictions by combining both frontend and backend technologies. 
### Frontend
1. **React.js** for dynamic and responsive website for user interactions.
2. **Material-UI (MUI)** for pre-built components for stylish web pages.
3. **React Router** for smooth site and page navigation. 

### Backend
1. **FastAPI** for modern and high-performance API.
2. **Python** with **Pydantic, Numpy, Pandas** for Data management and capturing data pattens. 
3. **Uvicorn** for Python ASGI Server.

### Data Management
1. **Github and Git** for version control 


<a name="setup"></a>
## Setup Instructions 

### Prerequisites
- Node.js and npm 
- Python (any version above 3.6) 

### Step 1. Unzip project file 
Unzip the project file to directory of your choice. 

### Step 2. Install Python Dependencies 
Install the required python dependencies with the requirements.txt directly. 

    pip install -r requirements.txt

### Step 3. Starting the FastAPI Server: 
Start the FastAPI server. 

    unicorn app:app --reload 

or 

    python -m uvicorn app:app --reload 

To verify if the server is running, open a browser and navigate to http://localhost:8000. 

### Step 4. Navigate to the React App Directory 
Navigate to the React application directory in the unzipped folder 

    cd housing-market-app

### Step 5. Verify node and npm versions and installation
Confirm that Node.js and npm is avaliable on your machine to run the application 

    node -v 
    npm -v

### Step 6. Install React Dependencies 
Ensure that the dependencies for the different components for the React frontend is installed for the application to run. 

    npm install @mui/material @emotion/react @emotion/styled @mui/icons-material 
    npm install react-responsive 
    npm install react-router-dom 

### Step 7. Start the React Server 
Begin the frontend server locally for housing-market-app

    npm start 

### Step 8. Access the Frontend
Once the server is started, the website will automatically launch and redirect you to it in your browser. If it does not, you can navigate manually to http://localhost:3000 to view the application. 

<a name="run"></a>
## Running the Application 

#### Step 1. Start Backend
Ensure that the FastAPI server is running: 

    uvicorn app:app --reload 

#### Step 2. Start Frontend
Start the React app in another terminal while in the Housing-Market-App directory: 

    npm start

#### Step 3. Navigate between the different Pages 
Once the React server is running and you can access the application, you can navigate through the different pages to view the project, view about the project and use the Predict page to interact and gain insight on the Bengaluru housing market. 

<a name="troubleshoot"></a>
## Troubleshooting 
- Ensure all Backend and Python dependencies listed in requirements.txt are installed.
- Ensure Node.js and npm is installed with all React dependencies listed in the Setup Instructions. 
- API issues: Ensure frontend is running on port 3000 and backend server is on port 8000. 
- Uvicorn startup issues: The following command can be used instead if there's issues with running the Uvicorn server on another terminal.

        python -m uvicorn app:app --reload

