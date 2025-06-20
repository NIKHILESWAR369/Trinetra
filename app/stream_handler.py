import cv2

def get_video_stream(source=0):
    cap = cv2.VideoCapture(source)
    if not cap.isOpened():
        print("❌ Cannot open camera or stream.")
        return

    while True:
        ret, frame = cap.read()
        if not ret:
            break
        yield frame

    cap.release()
    cv2.destroyAllWindows()
