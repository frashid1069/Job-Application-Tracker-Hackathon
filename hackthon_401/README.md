# CMPUT401-Hack-a-thon

# Backend set up
## Backend dependency install:
```
pip3 install -r requirements.txt
python3 -m venv venv
source venv/bin/activate
```

## Django:
### How to set up database
```
python3 manage.py makemigrations
python3 manage.py migrate
```
### How to run the server
```
python3 manage.py runserver
```