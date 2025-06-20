# yolo_detector.py

from ultralytics import YOLO
import cv2
import os
import contextlib
import io

# Suppress ultralytics internal logs
os.environ["YOLO_VERBOSE"] = "False"

# Load YOLOv8 model (no internal print/logging)
model = YOLO("yolov8s.pt")

def detect_persons(frame):
    """
    Detects persons in a video frame using YOLOv8 and returns cropped person images.
    Suppresses all console output from the model.
    """
    # Suppress model inference prints
    with contextlib.redirect_stdout(io.StringIO()), contextlib.redirect_stderr(io.StringIO()):
        results = model(frame)[0]

    person_images = []

    for box in results.boxes:
        cls_id = int(box.cls[0])
        conf = float(box.conf[0])
        if model.names[cls_id] == "person" and conf > 0.5:
            x1, y1, x2, y2 = map(int, box.xyxy[0])
            x1, y1 = max(0, x1), max(0, y1)
            x2, y2 = min(frame.shape[1], x2), min(frame.shape[0], y2)
            cropped = frame[y1:y2, x1:x2]
            person_images.append(cropped)

    return person_images
def get_scene_summary(frame):
    """
    Runs YOLO detection and returns a string summary of visible objects.
    """
    results = model(frame)[0]
    counts = {}

    for box in results.boxes:
        cls_id = int(box.cls[0])
        label = model.names[cls_id]
        counts[label] = counts.get(label, 0) + 1

    if not counts:
        return "[👁️ Scene] Nothing detected"

    summary = ", ".join([f"{v} {k}" + ("s" if v > 1 else "") for k, v in counts.items()])
    return f"[👁️ Scene] {summary}"

