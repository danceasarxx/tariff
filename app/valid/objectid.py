from bson import ObjectId
from bson.errors import InvalidId
from marshmallow.fields import Field


class ObjectID(Field):
    """Serializes and deserializes ObjectId strs from mongodb"""
    default_error_messages = {
        'invalid': 'Not a valid ObjectId.',
        'format': '"{input}" cannot be formatted as an ObjectId.',
    }

    def _serialize(self, value, attr, obj):
        if value is None:
            return None
        elif isinstance(value, ObjectId):
            return str(value)
        else:
            self.fail('format', input=value)

    def _deserialize(self, value, attr, obj):
        if not value:
            self.fail('invalid')
        try:
            return ObjectId(value)
        except InvalidId:
            self.fail('invalid')
