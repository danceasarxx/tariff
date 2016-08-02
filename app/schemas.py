from app.valid import BaseSchema
from marshmallow.fields import Str, Float, Nested, Int


class Balance(BaseSchema):
    main = Float()
    bonus = Float()


class User(BaseSchema):
    name = Str()
    number = Str()
    current_plan = Str()
    account = Nested(Balance)
    data = Nested(Balance)


class Migration(BaseSchema):
    name = Str()
    code = Int()
