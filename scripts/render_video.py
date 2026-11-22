import os
import subprocess
import numpy as np
from PIL import Image

def load_img(path, size=(1080, 1920)):
    im = Image.open(path).convert('RGB')
    if im.size != size:
        im = im.resize(size, Image.Resampling.LANCZOS)
    return np.array(im, dtype=np.float32)

def main():
    frames_dir = os.path.join(os.path.dirname(__file__), '..', 'scratch', 'stopmotion_frames')
    out_dir = os.path.join(os.path.dirname(__file__), '..', 'public', 'video')
    os.makedirs(out_dir, exist_ok=True)
    out_video = os.path.join(out_dir, 'rakesh_pooja_wedding.mp4')
    audio_path = os.path.join(os.path.dirname(__file__), '..', 'public', 'audio', 'shehnai.mp3')

    fps = 30
    total_seconds = 88.0 # Strictly 1:28
    total_frames = int(total_seconds * fps) # 2640 frames

    print(f"Rendering {total_frames} frames ({total_seconds}s @ {fps}fps) to {out_video}...")

    # Load stop-motion door frames
    door_frames = []
    for i in range(10):
        p = os.path.join(frames_dir, f'door_{i:02d}.png')
        door_frames.append(load_img(p))
    print(f"Loaded {len(door_frames)} door opening frames.")

    white_img = load_img(os.path.join(frames_dir, 'white_transition.png'))
    couple_img = load_img(os.path.join(frames_dir, 'scene_02_couple.png'))
    tilak_img = load_img(os.path.join(frames_dir, 'scene_03_tilak.png'))
    sangeet_img = load_img(os.path.join(frames_dir, 'scene_04_sangeet.png'))
    haldi_img = load_img(os.path.join(frames_dir, 'scene_05_haldi.png'))
    wedding_img = load_img(os.path.join(frames_dir, 'scene_06_wedding.png'))
    rsvp_img = load_img(os.path.join(frames_dir, 'scene_07_rsvp.png'))

    # FFmpeg process setup
    # We loop the shehnai audio seamlessly across the 88 seconds (-stream_loop -1)
    # and pipe raw 1080x1920 rgb24 frames into ffmpeg
    cmd = [
        'ffmpeg',
        '-y',
        '-f', 'rawvideo',
        '-vcodec', 'rawvideo',
        '-s', '1080x1920',
        '-pix_fmt', 'rgb24',
        '-r', str(fps),
        '-i', '-',
        '-stream_loop', '-1',
        '-i', audio_path,
        '-t', str(total_seconds),
        '-c:v', 'libx264',
        '-pix_fmt', 'yuv420p',
        '-preset', 'medium',
        '-crf', '18',
        '-c:a', 'aac',
        '-b:a', '192k',
        '-filter_complex', '[1:a]afade=t=in:ss=0:d=0.5,afade=t=out:st=86.0:d=2.0[a]',
        '-map', '0:v',
        '-map', '[a]',
        out_video
    ]

    proc = subprocess.Popen(cmd, stdin=subprocess.PIPE)

    # Pre-render petal particle coordinates for subtle celebration on wedding scene
    np.random.seed(42)
    n_petals = 45
    petals_x = np.random.uniform(50, 1030, n_petals)
    petals_y = np.random.uniform(-100, 1920, n_petals)
    petals_speed = np.random.uniform(2.5, 5.0, n_petals)
    petals_wobble = np.random.uniform(0.02, 0.05, n_petals)

    # Timeline layout (in seconds):
    # 0.0 - 1.8s: Door closed (54 frames)
    # 1.8 - 4.8s: 10 door stopmotion frames (each 9 frames = 0.3s)
    # 4.8 - 6.2s: White transition hold (42 frames)
    # 6.2 - 20.0s: Couple on Heavenly Terrace (crossfading from white at 6.2-7.2s)
    # 20.0 - 34.0s: Tilak & Shagun (crossfade at 20.0-21.0s)
    # 34.0 - 48.0s: Sangeet (crossfade at 34.0-35.0s)
    # 48.0 - 62.0s: Haldi (crossfade at 48.0-49.0s)
    # 62.0 - 76.0s: Wedding (crossfade at 62.0-63.0s)
    # 76.0 - 88.0s: RSVP & Family (crossfade at 76.0-77.0s, fade out to black at 87.0-88.0s)

    fade_len = int(1.0 * fps) # 30 frames

    def get_ken_burns(base_img, progress, max_zoom=1.03):
        # Subtle slow zoom for cinematic motion
        zoom = 1.0 + (max_zoom - 1.0) * progress
        h, w, _ = base_img.shape
        new_w, new_h = int(w * zoom), int(h * zoom)
        # We can crop center
        x1 = (new_w - w) // 2
        y1 = (new_h - h) // 2
        # Use PIL for zoom if needed, or simple array slice when zoom is small
        if zoom == 1.0:
            return base_img
        # Resize with PIL
        pil_im = Image.fromarray(base_img.astype(np.uint8))
        pil_resized = pil_im.resize((new_w, new_h), Image.Resampling.BILINEAR)
        cropped = pil_resized.crop((x1, y1, x1 + w, y1 + h))
        return np.array(cropped, dtype=np.float32)

    for f in range(total_frames):
        t = f / fps

        if t < 1.8:
            # Door closed
            p = t / 1.8
            cur = door_frames[0]
        elif t < 4.8:
            # Door stop-motion sequence
            door_idx = min(9, int((t - 1.8) / 0.3))
            cur = door_frames[door_idx]
        elif t < 6.2:
            # White heavenly transition hold
            cur = white_img
        elif t < 20.0:
            # Couple reveal (heavenly terrace)
            prog = (t - 6.2) / (20.0 - 6.2)
            cur = couple_img
            # Crossfade from white
            if t < 7.2:
                alpha = (t - 6.2) / 1.0
                cur = (1.0 - alpha) * white_img + alpha * cur
        elif t < 34.0:
            # Tilak
            prog = (t - 20.0) / (34.0 - 20.0)
            cur = tilak_img
            if t < 21.0:
                alpha = (t - 20.0) / 1.0
                cur = (1.0 - alpha) * couple_img + alpha * cur
        elif t < 48.0:
            # Sangeet
            prog = (t - 34.0) / (48.0 - 34.0)
            cur = sangeet_img
            if t < 35.0:
                alpha = (t - 34.0) / 1.0
                cur = (1.0 - alpha) * tilak_img + alpha * cur
        elif t < 62.0:
            # Haldi
            prog = (t - 48.0) / (62.0 - 48.0)
            cur = haldi_img
            if t < 49.0:
                alpha = (t - 48.0) / 1.0
                cur = (1.0 - alpha) * sangeet_img + alpha * cur
        elif t < 76.0:
            # Wedding
            prog = (t - 62.0) / (76.0 - 62.0)
            cur = wedding_img
            if t < 63.0:
                alpha = (t - 62.0) / 1.0
                cur = (1.0 - alpha) * haldi_img + alpha * cur
        else:
            # RSVP & Family
            prog = (t - 76.0) / (88.0 - 76.0)
            cur = rsvp_img
            if t < 77.0:
                alpha = (t - 76.0) / 1.0
                cur = (1.0 - alpha) * wedding_img + alpha * cur
            # Fade out to black in the final 1.5s
            if t > 86.5:
                alpha = (88.0 - t) / 1.5
                cur = cur * max(0.0, alpha)

        frame_bytes = np.clip(cur, 0, 255).astype(np.uint8).tobytes()
        proc.stdin.write(frame_bytes)

        if f % 300 == 0 or f == total_frames - 1:
            print(f"Processed frame {f}/{total_frames} ({t:.1f}s / {total_seconds}s)")

    proc.stdin.close()
    proc.wait()
    print("Video rendered successfully!")

if __name__ == '__main__':
    main()
