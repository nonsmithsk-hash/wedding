import os
import subprocess

def main():
    slides_dir = os.path.join(os.path.dirname(__file__), '..', 'scratch', 'video_slides_v2')
    audio_path = os.path.join(os.path.dirname(__file__), '..', 'public', 'audio', 'wedding_theme.mp3')
    out_dir = os.path.join(os.path.dirname(__file__), '..', 'public', 'video')
    os.makedirs(out_dir, exist_ok=True)
    out_video = os.path.join(out_dir, 'rakesh_pooja_wedding_invitation.mp4')
    out_video_alt = os.path.join(out_dir, 'rakesh_pooja_wedding.mp4')

    slides = [
        ('01_book_cover.png', 4.5),
        ('02_couple_arch.png', 6.5),
        ('03_royal_scroll.png', 5.5),
        ('04_tilak.png', 5.0),
        ('05_sangeet.png', 5.5),
        ('06_haldi.png', 5.0),
        ('07_shubh_vivah.png', 6.5),
        ('08_family_blessings.png', 6.0),
        ('09_designer_credits.png', 5.0),
    ]

    # Verify all slide images exist
    for fname, dur in slides:
        p = os.path.join(slides_dir, fname)
        if not os.path.exists(p):
            raise FileNotFoundError(f"Missing slide: {p}")
        print(f"Verified {fname}: {os.path.getsize(p)} bytes, duration: {dur}s")

    fps = 30
    xfade_dur = 1.0

    # Build input args
    cmd = ['ffmpeg', '-y']
    for fname, dur in slides:
        p = os.path.join(slides_dir, fname)
        cmd.extend(['-loop', '1', '-t', str(dur), '-i', p])

    # Audio input
    cmd.extend(['-i', audio_path])

    # Format each video stream to 1080x1920 @ 30fps
    filter_parts = []
    for i in range(len(slides)):
        filter_parts.append(
            f"[{i}:v]scale=1080:1920:force_original_aspect_ratio=decrease,pad=1080:1920:(ow-iw)/2:(oh-ih)/2,format=yuva420p,fps={fps}[v{i}];"
        )

    # Chain xfade transitions
    current_time = slides[0][1] - xfade_dur
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

    total_duration = current_time + slides[-1][1]
    print(f"Total video duration: {total_duration:.2f} seconds")

    # Final fade out to black in last 1.5s
    fadeout_start = total_duration - 1.5
    filter_parts.append(
        f"[v_raw]fade=type=out:start_time={fadeout_start:.2f}:duration=1.5,format=yuv420p[v_final];"
    )

    # Audio fade in (1.0s) and fade out (1.5s)
    audio_idx = len(slides)
    filter_parts.append(
        f"[{audio_idx}:a]afade=type=in:start_time=0:duration=1.0,afade=type=out:start_time={fadeout_start:.2f}:duration=1.5[a_final]"
    )

    cmd.extend([
        '-filter_complex', ''.join(filter_parts),
        '-map', '[v_final]',
        '-map', '[a_final]',
        '-t', f"{total_duration:.2f}",
        '-c:v', 'libx264',
        '-pix_fmt', 'yuv420p',
        '-preset', 'medium',
        '-crf', '18',
        '-c:a', 'aac',
        '-b:a', '256k',
        out_video
    ])

    print("Rendering trending luxury invitation video with FFmpeg...")
    res = subprocess.run(cmd, stdout=subprocess.PIPE, stderr=subprocess.PIPE, text=True)
    if res.returncode != 0:
        print("FFmpeg error:", res.stderr[-2000:])
        raise RuntimeError("FFmpeg rendering failed")

    # Also duplicate to out_video_alt for consistency
    import shutil
    shutil.copyfile(out_video, out_video_alt)

    # Also copy to out/video/ if out/ exists
    out_static = os.path.join(os.path.dirname(__file__), '..', 'out', 'video')
    if os.path.exists(out_static):
        shutil.copyfile(out_video, os.path.join(out_static, 'rakesh_pooja_wedding_invitation.mp4'))
        shutil.copyfile(out_video, os.path.join(out_static, 'rakesh_pooja_wedding.mp4'))

    print(f"SUCCESS: Video rendered at {out_video} ({os.path.getsize(out_video)} bytes)")

if __name__ == '__main__':
    main()
