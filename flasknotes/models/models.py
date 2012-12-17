from sqlalchemy import Column, Integer, String, ForeignKey, DateTime
from sqlalchemy.orm import relationship, backref
from datetime import datetime
from sqlalchemy.ext.declarative import declared_attr

from flasknotes import Base

class User(Base):
    __tablename__ = "users"

    idUser = Column(Integer, primary_key=True)
    username = Column(String(50))
    password = Column(String(50))

    def __init__(self, username, password):
        self.username = username
        self.password = password

    def toJSON(self):
        return {
            'id': self.idUser,
            'username': self.username,
            'password': self.password
            }

    def __repr__(self):
        return "<User('%s','%s')>" % (self.username, self.password)

# Class for storing common attributes of multiple tables
class NoteMix(object):
    idNote = Column(Integer, primary_key=True)
    title = Column(String(50))
    text = Column(String(50))

    # if you are using a relationship or foreign key , you must use @declared_attr
    # and you must use the syntax below to return that relationship or foreign key
    @declared_attr
    def user_id(cls):
        return Column(Integer, ForeignKey("users.idUser"))

    # cls.__name__ = inherited table name
    @declared_attr
    def user(cls):
        return relationship("User", backref=backref(cls.__name__), primaryjoin="%s.user_id==User.idUser"%cls.__name__)

class Note(NoteMix, Base):
    __tablename__ = "notes"

    def __init__(self, title, text, user_id):
        self.title = title
        self.text = text
        self.user_id = user_id

    def __repr__(self):
        return "<Note('%s','%s'.'%s')>" % (self.title, self.text, self.user_id)

    def toJSON(self):
        return {
            'id': self.idNote,
            'title': self.title,
            'text': self.text
            }

class NoteHistory(NoteMix, Base):
    __tablename__ = "notes_history"

    user_id_history = Column(Integer, ForeignKey("users.idUser"))
    user_history = relationship("User", primaryjoin="NoteHistory.user_id_history==User.idUser")

    datetime_change = Column(DateTime, default=datetime.now)

    def __init__(self, title, text, user_id, user_id_history):
        self.title = title
        self.text = text
        self.user_id = user_id
        self.user_id_history = user_id_history

    def __repr__(self):
        return "<Note('%s','%s'.'%s')>" % (self.title, self.text, self.user_id, self.user_id_history)