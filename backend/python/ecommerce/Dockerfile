# Use Python official image
FROM python:3.9

# Create and change to the app directory
WORKDIR /usr/src/app

# Install dependencies
COPY requirements.txt ./
RUN pip install --no-cache-dir -r requirements.txt

# Copy the rest of the application code
COPY . .

# Expose port
EXPOSE 8000

# Start the application
CMD ["gunicorn", "ecommerce.myproject.wsgi:application", "--bind", "0.0.0.0:8000"]
