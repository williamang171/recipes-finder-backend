from pydantic import BaseModel, constr, validator, EmailStr


class UserBase(BaseModel):
    email: EmailStr
    name: constr(min_length=2, max_length=100)


special_character = "!@#$%^&*"


class UserCreate(UserBase):
    @validator('password')
    def validate_password(cls, v):
        if len(v) < 8:
            raise ValueError(
                'Password length must be more than or equal to 8 characters')
        if len(v) > 100:
            raise ValueError(
                'Password length must be less than or equal to 100 characters')
        if not any(char.isdigit() for char in v):
            raise ValueError(
                'Password must contain at least 1 number')
        if not any(char.isupper() for char in v):
            raise ValueError(
                'Password must contain at least 1 uppercase letter'
            )
        if not any(char.islower() for char in v):
            raise ValueError(
                'Password must contain at least 1 lowercase letter'
            )
        if not any(char in special_character for char in v):
            raise ValueError(
                f'Password must contain at least one of the special characters {special_character}'
            )
        return v

    password: str


class User(UserBase):
    id: int
    is_active: bool

    class Config:
        orm_mode = True


class Token(BaseModel):
    access_token: str
    token_type: str


class TokenData(BaseModel):
    username: str | None = None
