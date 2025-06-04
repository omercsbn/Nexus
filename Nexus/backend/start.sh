#!/bin/sh
# Start both the Django main_service and the Node auth service

# Start Django service in background
cd /usr/src/app/main_service
python manage.py runserver 0.0.0.0:8000 &

# Start Node authentication service
cd /usr/src/app/auth
node app.js
