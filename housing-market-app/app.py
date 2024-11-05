from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import numpy as np
import pandas as pd

# Load your cleaned dataset
data = pd.read_csv('src/components/Predict/cleaned_real_estate_data.csv')

# Initialize FastAPI app
app = FastAPI()

# Configure CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],  # React app URL
    allow_credentials=True,
    allow_methods=["*"],  # Allows all methods
    allow_headers=["*"],  # Allows all headers
)

# Define the root endpoint
@app.get("/")
async def read_root():
    return {"message": "Welcome to the Prediction API!"}

# Define the request body
class PredictionRequest(BaseModel):
    location: str
    size: float
    total_sqft: float
    bathrooms: int

@app.post("/predict")
async def predict(request: PredictionRequest):
    # Check for valid location
    if request.location not in data['location'].values:
        return {'error': 'Location not found'}, 404

    location_data = data[data['location'] == request.location]
    
    if not location_data.empty:
        predicted_price = location_data['price'].mean()
    else:
        predicted_price = np.random.randint(100, 500)  # Fallback if no data is available for the location
    
    return {'prediction': round(predicted_price, 2)}  # Round to 2 decimal places