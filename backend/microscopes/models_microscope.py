from pydantic import BaseModel
from sqlmodel import Field, SQLModel
class Offer(BaseModel):
    sdp: str
    type: str
class Webcam_Config(SQLModel, table=True):
    id: int | None = Field(primary_key=True)
    is_streaming: bool = Field(default=False)

