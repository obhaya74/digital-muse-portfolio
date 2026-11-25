# Digital Muse Creations: Portfolio Website

Static portfolio site (HTML, CSS, JS). No build step.

## Structure

```
digital-muse-portfolio/
├── index.html
├── css/style.css
├── js/main.js
├── assets/favicon.svg
└── README.md
```

## Add your welcome video

1. Copy your video into the `assets/` folder and name it `welcome.mp4` (H.264 MP4 plays everywhere).
2. Optional: add a cover image named `welcome-poster.jpg` in the same folder.
3. Keep the file small: under about 25 MB loads fast, and GitHub rejects files over 100 MB. If it is larger, compress it with HandBrake or CapCut's export settings (1080p or 720p).

Until the file is there, the page shows a "Welcome video coming soon" box.

## Deploy

**GitHub:** create a repo, upload the contents of this folder, then enable Pages under Settings > Pages (branch `main`, root).

**Vercel:** import the GitHub repo at vercel.com/new. Framework preset: Other. No build command, no output directory. You will get a free `*.vercel.app` domain.
