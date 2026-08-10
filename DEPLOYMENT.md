# Deployment (Render)

This branch (auto/production-deploy) contains production-ready changes: Flask serves the frontend, Dockerfile, Procfile, updated requirements, OPTIMIZE_TOKEN support, and UI improvements.

## One-click deploy to Render (manual steps)

1. Sign in to Render (https://render.com) and create a new "Web Service".
2. Connect your GitHub repository: `alex2123-cell/Pangoni-Solution`.
3. For the Branch, select `auto/production-deploy`.
4. Choose "Docker" as the environment and use the provided `Dockerfile` at the repo root. Render will build the image using the Dockerfile.
5. Set environment variables in the Render dashboard:
   - `OPTIMIZE_TOKEN` — set this to a strong secret value (used to protect POST /optimize).
   - `PORT` — optional (Render will provide one automatically; the Dockerfile exposes 8080).
6. Start the service. Render will build and deploy from the branch.

## Quick test after deploy

- Visit the service URL shown by Render — it should serve the frontend at `/`.
- Call the API endpoints (replace `<URL>` with your Render URL):

```bash
curl -s https://<URL>/system | jq

# To call optimize (requires OPTIMIZE_TOKEN if set):
curl -X POST https://<URL>/optimize -H "Authorization: Bearer $OPTIMIZE_TOKEN" | jq
```

## Local testing

1. Create a virtualenv and install backend requirements:

```bash
python -m venv venv
source venv/bin/activate
pip install -r Backend/requirements.txt
```

2. Run locally with gunicorn (or Flask for development):

```bash
# Using gunicorn (recommended):
gunicorn Backend.app:app --bind 0.0.0.0:5000 --workers 2

# Or for development:
export FLASK_APP=Backend.app
export FLASK_ENV=development
flask run --host=0.0.0.0 --port=5000
```

3. Open http://localhost:5000

## Notes & security
- The `/optimize` endpoint is a POST and will require the `OPTIMIZE_TOKEN` header (if set). The server expects `Authorization: Bearer <token>`.
- The optimizer currently deletes files in the OS temp directory. Consider tightening this to an application-specific directory before running on shared hosts.
- Remove any large vendor directories (node_modules) from the repository history if you want a smaller repo.

## Optional: render.yaml

If you prefer to add a `render.yaml` for infrastructure-as-code, here's an example you can paste into `render.yaml` and customize in Render's dashboard:

```yaml
services:
  - type: web_service
    name: pangoni-solution
    env: docker
    repo: alex2123-cell/Pangoni-Solution
    branch: auto/production-deploy
    dockerfilePath: Dockerfile
    plan: starter
```

Replace `plan` or other fields as needed.
