# roommate-app
to run:
- cd frontend -> npm start
- cd backend -> npm start

clearing server:
- pkill -f node

- used mongoDB compass to view database

bugs:
- unable to implement actual currentUser, uses dummy data
  - settings populates roomies from dummy data which could cause potential conflicts when database is updated
- RoommateFinder populates current roomies
