# Use a Python base image
FROM python:3.9

# Set environment variables
ENV PYTHONUNBUFFERED=1

# Create and change to the app directory
WORKDIR /usr/src/app

# Copy requirements.txt and install dependencies
COPY requirements.txt ./
RUN pip install -r requirements.txt

# Copy the rest of the application code
COPY . .

# Expose the port
EXPOSE 8000

# Command to run the application
CMD ["python", "manage.py", "runserver", "0.0.0.0:8000"]
