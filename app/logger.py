import os
import datetime

# Ensure logs directory exists
LOG_DIR = "logs"
os.makedirs(LOG_DIR, exist_ok=True)

LOG_FILE = os.path.join(LOG_DIR, "trinetra_log.txt")

def log_event(action_type, person_id=None):
    """
    Logs the detected action with timestamp and optional person ID.
    """
    time = datetime.datetime.now().strftime("%Y-%m-%d %H:%M:%S")
    person_info = f" | Person ID: {person_id}" if person_id is not None else ""
    log = f"{time} | ALERT: {action_type.upper()}{person_info}"

    try:
        with open(LOG_FILE, "a") as file:
            file.write(log + "\n")
        print(f"[📁 Log] {log}")
    except Exception as e:
        print(f"[❌ Log Error] Failed to write to log: {e}")



