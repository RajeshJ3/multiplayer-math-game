from typing import List, Optional
import uuid
from pydantic import BaseModel, Field


class PlayerModel(BaseModel):
    id: str = Field(default_factory=uuid.uuid4, alias="_id")
    name: str = Field(...)
    ready: int = False
    score: Optional[int] = None
    last_active: Optional[int]

    class Config:
        allow_population_by_field_name = True
        schema_extra = {
            "example": {
                "id": "00010203-0405-0607-0809-0a0b0c0d0e0f",
                "name": "John Doe",
                "ready": False,
                "score": None,
                "last_active": 1382173917,
            }
        }

class GameModel(BaseModel):
    id: str = Field(default_factory=uuid.uuid4, alias="_id")
    level: int = Field(default=1)
    status: int = Field(default=0)
    players: List[PlayerModel]
    question: Optional[dict]
    start_time: Optional[int] = Field(index=True)
    created_time: Optional[int] = Field(index=True)

    class Config:
        allow_population_by_field_name = True
        schema_extra = {
            "example": {
                "id": "00018123203-0405-0607-0809-0a0b0c0d0e0f",
                "level": 1,
                "status": 0,
                "players": [
                    {
                    "id": "9128300010203-0405-0607-8712-0a0b0c0d0e0f",
                    "name": "John Doe",
                    "ready": False,
                    "score": 0,
                    "last_active": 1382173917
                    }
                ],
                "question": [],
                "start_time": 1382173917,
                "created_time": 1382173817
            }
        }
