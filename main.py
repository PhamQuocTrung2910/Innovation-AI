from fastapi import FastAPI, HTTPException, Request
from fastapi.responses import JSONResponse
from fastapi.middleware.cors import CORSMiddleware
import time
#from model import SimpleModel
#import AI model here too 

app = FastAPI()

# Add CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"], # URL of React application
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Initialize the  AI model here
#model = SimpleModel()

@app.get("/")
async def root():
    return {"message": "Welcome to the House Price Prediction API"}

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

#obtain predicted data from AI Model file and return it here 
#react calls the "" item which runs here and returns the value to the user 
@app.get("/predict/{square_footage}/{bedrooms}")
async def predict_price(square_footage: int, bedrooms: int):
    price = model.predict(square_footage, bedrooms)[0]
    return {"predicted_price": round(price, 2)}


#uvicorn server
if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
    