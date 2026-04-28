import psutil
import os
import tempfile

def get_system_info():
    return {
        "cpu_usage": psutil.cpu_percent(),
        "ram_usage": psutil.virtual_memory().percent,
        "disk_usage": psutil.disk_usage('/').percent
    }

def clean_temp_files():
    temp_dir = tempfile.gettempdir()
    deleted = 0

    for file in os.listdir(temp_dir):
        try:
            path = os.path.join(temp_dir, file)
            if os.path.isfile(path):
                os.remove(path)
                deleted += 1
        except:
            pass

    return {"message": f"{deleted} temp files removed"}