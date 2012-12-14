from sqlalchemy import Column, Integer, String, ForeignKey, DateTime
from sqlalchemy.orm import relationship, backref
from datetime import datetime

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

class Note(Base):
    __tablename__ = "notes"

    idNote = Column(Integer, primary_key=True)
    title = Column(String(50))
    text = Column(String(50))

    user_id = Column(Integer, ForeignKey("users.idUser"))
    user = relationship("User", backref=backref("notes", order_by=idNote))

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

class NoteHistory(Base):
    __tablename__ = "notes_history"

    idNote = Column(Integer, primary_key=True)
    title = Column(String(50))
    text = Column(String(50))

    user_id = Column(Integer, ForeignKey("users.idUser"))
    user = relationship("User", primaryjoin="NoteHistory.user_id==User.idUser")

    user_id_history = Column(Integer, ForeignKey("users.idUser")) # korisnik koji je promijenio podatak
    user_history = relationship("User", primaryjoin="NoteHistory.user_id_history==User.idUser")

    datetime_change = Column(DateTime, default=datetime.now) # svaki puta kada se redak kreira, zapisuje se vrijeme u ovo polje po defaultu

    def __init__(self, title, text, user_id, user_id_history):
        self.title = title
        self.text = text
        self.user_id = user_id
        self.user_id_history = user_id_history

    def __repr__(self):
        return "<Note('%s','%s'.'%s')>" % (self.title, self.text, self.user_id, self.user_id_history)