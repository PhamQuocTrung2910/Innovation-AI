from fastapi import FastAPI, HTTPException, Request
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
from pydantic import BaseModel
import numpy as np
import pandas as pd
#import AI model too

# Load your cleaned dataset
data = pd.read_csv('src/components/Predict/cleaned_real_estate_data.csv')

# Initialize FastAPI app
app = FastAPI()

#initalise AI model here too 
#model = SimpleModel()

# Configure CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],  # React app URL
    allow_credentials=True,
    allow_methods=["*"],  # Allows all methods
    allow_headers=["*"],  # Allows all headers
)

#logs how long it takes for request
@app.middleware("http")
async def log_requests(request: Request, call_next):
    start_time = time.time()
    response = await call_next(request)
    process_time = time.time() - start_time
    print(f"Request: {request.url} - Duration: {process_time} seconds")
    return response

#error handler 
async def http_exception_handler(request: Request, exc: HTTPException):
    return JSONResponse(
        status_code=exc.status_code,
        content={"detail": exc.detail, "error": "An error occurred"}
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

#uvicorn server
if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
    