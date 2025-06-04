FROM python:3.9

ENV PYTHONUNBUFFERED=1

# Working directory for the application
WORKDIR /usr/src/app

# Install Python dependencies
COPY ../../backend/main_service/requirements.txt ./
RUN pip install --no-cache-dir -r requirements.txt

# Copy project files
COPY ../../backend/main_service .

# Expose application port
EXPOSE 8000

CMD ["python", "manage.py", "runserver", "0.0.0.0:8000"]
