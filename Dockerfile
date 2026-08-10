FROM python:3.11-slim

RUN apt-get update && apt-get install -y --no-install-recommends build-essential gcc \
    && rm -rf /var/lib/apt/lists/*

WORKDIR /app

# Copy Backend and Frontend
COPY Backend/ Backend/
COPY Frontend/ Frontend/

# Install python deps
COPY Backend/requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

ENV PORT 8080
EXPOSE 8080

CMD ["gunicorn", "Backend.app:app", "--bind", "0.0.0.0:8080", "--workers", "2", "--threads", "4"]
