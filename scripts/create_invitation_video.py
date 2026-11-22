import os
import subprocess

def main():
    slides_dir = os.path.join(os.path.dirname(__file__), '..', 'scratch', 'video_slides')
    audio_path = os.path.join(os.path.dirname(__file__), '..', 'public', 'audio', 'shehnai.mp3')
    out_dir = os.path.join(os.path.dirname(__file__), '..', 'public', 'video')
    os.makedirs(out_dir, exist_ok=True)
    out_video = os.path.join(out_dir, 'rakesh_pooja_wedding_invitation.mp4')

    slides = [
        ('scene_01_door_closed.png', 4.0),
        ('scene_02_couple.png', 11.0),
        ('scene_03_tilak.png', 11.0),
        ('scene_04_sangeet.png', 11.0),
        ('scene_05_haldi.png', 10.0),
        ('scene_06_wedding.png', 12.0),
        ('scene_07_rsvp.png', 12.0),
    ]

    # Verify all files exist
    for fname, _ in slides:
        p = os.path.join(slides_dir, fname)
        if not os.path.exists(p):
            raise FileNotFoundError(f"Missing slide: {p}")

    fps = 30
    xfade_dur = 1.0

    # Build input args
    cmd = ['ffmpeg', '-y']
    for fname, dur in slides:
        p = os.path.join(slides_dir, fname)
        cmd.extend(['-loop', '1', '-t', str(dur), '-i', p])

    # Audio input
    cmd.extend(['-stream_loop', '-1', '-i', audio_path])

    # Build filter_complex
    # Format each video stream to 1080x1920 @ 30fps
    filter_parts = []
    for i in range(len(slides)):
        filter_parts.append(
            f"[{i}:v]scale=1080:1920:force_original_aspect_ratio=decrease,pad=1080:1920:(ow-iw)/2:(oh-ih)/2,format=yuva420p,fps={fps}[v{i}];"
        )

    # Chain xfade
    # v0 + v1 -> x1
    # x1 + v2 -> x2 ...
    current_time = slides[0][1] - xfade_dur # 4.0 - 1.0 = 3.0
    last_v = "v0"

    for i in range(1, len(slides)):
        next_v = f"v{i}"
        out_v = f"x{i}" if i < len(slides) - 1 else "v_raw"
        transition = 'fade'
        filter_parts.append(
            f"[{last_v}][{next_v}]xfade=transition={transition}:duration={xfade_dur}:offset={current_time:.2f}[{out_v}];"
        )
        last_v = out_v
        if i < len(slides) - 1:
            current_time += slides[i][1] - xfade_dur

    total_duration = current_time + slides[-1][1] # total timeline length
    print(f"Total video duration: {total_duration:.2f} seconds")

    # Final fade out to black in last 1.5s
    fadeout_start = total_duration - 1.5
    filter_parts.append(
        f"[v_raw]fade=type=out:start_time={fadeout_start:.2f}:duration=1.5,format=yuv420p[v_final];"
    )

    # Audio fade in and fade out
    audio_idx = len(slides)
    filter_parts.append(
        f"[{audio_idx}:a]afade=type=in:start_time=0:duration=1.0,afade=type=out:start_time={fadeout_start:.2f}:duration=1.5[a_final]"
    )

    cmd.extend([
        '-filter_complex', ''.join(filter_parts),
        '-map', '[v_final]',
        '-map', '[a_final]',
        '-t', str(total_duration),
        '-c:v', 'libx264',
        '-pix_fmt', 'yuv420p',
        '-preset', 'medium',
        '-crf', '18',
        '-c:a', 'aac',
        '-b:a', '192k',
        out_video
    ])

    print("Executing FFmpeg...")
    res = subprocess.run(cmd, stdout=subprocess.PIPE, stderr=subprocess.PIPE, text=True)
    if res.returncode != 0:
        print("FFmpeg error:")
        print(res.stderr[-2000:])
        raise RuntimeError("FFmpeg rendering failed")

    print(f"Video generated successfully at: {out_video}")
    size_mb = os.path.getsize(out_video) / (1024 * 1024)
    print(f"Output file size: {size_mb:.2f} MB")

if __name__ == '__main__':
    main()
