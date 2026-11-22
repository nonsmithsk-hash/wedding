import os
import subprocess
import numpy as np
from PIL import Image, ImageFilter

def load_img(path, size=(1920, 1080)):
    im = Image.open(path).convert('RGB')
    if im.size != size:
        im = im.resize(size, Image.Resampling.LANCZOS)
    return np.array(im, dtype=np.float32)

def main():
    out_dir = os.path.join(os.path.dirname(__file__), '..', 'public', 'video')
    os.makedirs(out_dir, exist_ok=True)
    out_video = os.path.join(out_dir, 'door_opening_realistic.mp4')

    # Load high-res images (1920x1080 Full HD)
    img_closed = load_img('public/images/royal_palace_doors_wide.jpg')
    img_opening = load_img('public/images/royal_doors_opening_ai.jpg')

    # Create a pure divine white bloom image
    white_img = np.ones_like(img_closed) * 255.0
    # Add subtle warm golden glow to center of white image
    h, w, _ = white_img.shape
    y, x = np.ogrid[:h, :w]
    dist = np.sqrt((x - w/2)**2 + (y - h/2)**2)
    max_d = np.sqrt((w/2)**2 + (h/2)**2)
    gold_vignette = 1.0 - (dist / max_d) * 0.08
    white_img[:, :, 0] = np.clip(white_img[:, :, 0] * gold_vignette, 0, 255) # slightly warm
    white_img[:, :, 1] = np.clip(white_img[:, :, 1] * (gold_vignette * 0.98), 0, 255)
    white_img[:, :, 2] = np.clip(white_img[:, :, 2] * (gold_vignette * 0.92), 0, 255)

    fps = 30
    duration = 3.0
    total_frames = int(fps * duration) # 90 frames

    print(f"Generating realistic AI door opening video: {total_frames} frames ({duration}s @ {fps}fps)...")

    cmd = [
        'ffmpeg',
        '-y',
        '-f', 'rawvideo',
        '-vcodec', 'rawvideo',
        '-s', '1920x1080',
        '-pix_fmt', 'rgb24',
        '-r', str(fps),
        '-i', '-',
        '-c:v', 'libx264',
        '-pix_fmt', 'yuv420p',
        '-preset', 'slow',
        '-crf', '17',
        out_video
    ]

    proc = subprocess.Popen(cmd, stdin=subprocess.PIPE)

    for i in range(total_frames):
        t = i / (total_frames - 1) # 0.0 to 1.0

        # Phase 1: 0.0 to 0.2 (Doors closed, slight zoom)
        if t <= 0.2:
            sub_t = t / 0.2
            cur = img_closed.copy()
            # Subtle center crack light starting to glow towards 0.2
            if sub_t > 0.5:
                slit_intensity = (sub_t - 0.5) / 0.5
                slit_w = int(2 + 4 * slit_intensity)
                cx = w // 2
                cur[:, cx - slit_w:cx + slit_w] = np.clip(
                    cur[:, cx - slit_w:cx + slit_w] + 160 * slit_intensity, 0, 255
                )

        # Phase 2: 0.2 to 0.75 (Doors swinging open into AI opening state)
        elif t <= 0.75:
            open_progress = (t - 0.2) / 0.55 # 0.0 to 1.0
            # Ease in out curve
            ease = 0.5 - 0.5 * np.cos(open_progress * np.pi)

            # Cross-blend door closed to door opening
            cur = (1.0 - ease) * img_closed + ease * img_opening

            # Dynamic widening volumetric center light beam
            beam_w = int(10 + (w // 2 - 10) * (ease ** 1.5))
            cx = w // 2
            x_min = max(0, cx - beam_w)
            x_max = min(w, cx + beam_w)

            # Golden white glow addition in the opening portal
            glow_strength = ease * 120.0
            cur[:, x_min:x_max] = np.clip(cur[:, x_min:x_max] + glow_strength, 0, 255)

        # Phase 3: 0.75 to 1.0 (White light flash engulfing the screen)
        else:
            flash_progress = (t - 0.75) / 0.25 # 0.0 to 1.0
            # Rapid flare exponential curve
            flare = flash_progress ** 1.8
            cur = (1.0 - flare) * img_opening + flare * white_img

        # Write frame bytes to FFmpeg
        proc.stdin.write(np.clip(cur, 0, 255).astype(np.uint8).tobytes())

    proc.stdin.close()
    proc.wait()
    print(f"Realistic AI door opening video successfully generated at: {out_video}")

if __name__ == '__main__':
    main()
