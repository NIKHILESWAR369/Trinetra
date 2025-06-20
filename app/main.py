import sys
import os
import cv2

sys.path.append(os.path.abspath(os.path.join(os.path.dirname(__file__), '../yolov8')))

from stream_handler import get_video_stream
from yolo_detector import detect_persons, get_scene_summary
from action_classifier import classify_action
from alerts import trigger_alert
from logger import log_event

def main():
    print("[🔱 Trinetra] Starting surveillance... Press 'q' to quit.\n")

    previous_state = None  # "normal" or "suspicious"
    last_alerts = set()
    last_scene = ""

    for frame in get_video_stream():
        if frame is None:
            continue

        # Detect persons & scene summary
        persons = detect_persons(frame)
        current_scene = get_scene_summary(frame)

        # If scene changed (number of persons or objects)
        if current_scene != last_scene:
            print(f"[👁️ Scene] {current_scene}")
            last_scene = current_scene

        suspicious_detected = False
        current_alerts = set()

        for idx, person_img in enumerate(persons):
            action = classify_action(person_img)

            if action in ['smoking', 'harassment', 'theft']:
                suspicious_detected = True
                current_alerts.add((idx + 1, action))
                if (idx + 1, action) not in last_alerts:
                    print(f"[⚠️ Suspicious Activity] Person {idx + 1}: {action.upper()}")
                    trigger_alert(action)
                    log_event(action, person_id=idx + 1)

        # If previously suspicious but now normal, say it's normal
        if not suspicious_detected and previous_state != "normal":
            print("[✅ Everything is normal]")
            previous_state = "normal"
            last_alerts.clear()
        elif suspicious_detected:
            previous_state = "suspicious"
            last_alerts = current_alerts

        # Show live feed
        cv2.imshow("Trinetra Live Feed", frame)
        if cv2.waitKey(1) & 0xFF == ord('q'):
            print("\n[🛑 Exiting Trinetra] Surveillance stopped by user.")
            break

    cv2.destroyAllWindows()

if __name__ == "__main__":
    main()
