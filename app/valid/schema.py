from bson import ObjectID
from datetime import datetime
from marshmallow import Schema
from marshmallow.fields import DateTime


def __time_now():
    return datetime.now().strftime('%Y-%m-%d %H:%M:%S')


class BaseSchema(Schema):
    id = ObjectID(dump_only=True)
    _id = ObjectID(dump_to='id', dump_only=True)
    createdat = DateTime(read_only=True, missing=__time_now)
