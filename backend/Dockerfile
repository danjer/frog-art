FROM python:3.12    

# to do: update path
COPY backend /backend
WORKDIR /backend

RUN pip install poetry &&\
    poetry install --no-root &&\
    poetry init

EXPOSE 8000

# --host 0.0.0.0 makes the app accessible from outside the container
CMD ["fastapi", "run", "api/main.py", "--port", "8000","--host", "0.0.0.0"]