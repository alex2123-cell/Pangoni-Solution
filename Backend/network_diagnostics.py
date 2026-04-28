import subprocess

def check_network():
    try:
        output = subprocess.check_output("ping google.com -n 2", shell=True).decode()
        return {"status": "Connected", "details": output}
    except:
        return {"status": "Disconnected"}