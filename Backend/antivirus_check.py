import subprocess

def check_antivirus():
    try:
        output = subprocess.check_output("wmic product get name", shell=True).decode()
        if "Kaspersky" in output:
            return {"status": "Installed"}
        else:
            return {"status": "Not Installed"}
    except:
        return {"status": "Unknown"}