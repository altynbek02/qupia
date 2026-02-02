from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

import crypter

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],  # В продакшене укажите конкретный домен
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/crypter")
def greet():
    return {
        "result": crypter.result,
        "hints": crypter.hints,
        "quote": crypter.quote
    }


if __name__ == '__main__':
    import uvicorn
    uvicorn.run("main:app", reload=True)