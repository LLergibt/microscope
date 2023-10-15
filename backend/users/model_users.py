from sqlmodel import Field, Relationship, SQLModel

class User_Table(SQLModel, table=True):
    id: int | None = Field(primary_key=True)
    login: str = Field(index=True)
    password: str = Field()
