FROM python:3.9

# to do: update path
WORKDIR /api

# to do: update path
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Copy the current directory contents into the container at /app
COPY . .

EXPOSE 8000

# --host 0.0.0.0 makes the app accessible from outside the container
CMD ["fastapi", "run", "api/main.py", "--port", "80"]