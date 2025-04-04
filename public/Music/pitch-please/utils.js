// New file for utility functions extracted from app.js
export function formatTime(seconds) {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
}

export function convertTimeToSeconds(timeString) {
    const [minutes, seconds] = timeString.split(':').map(Number);
    return minutes * 60 + seconds;
}

export function parseFileName(filename) {
    let name = filename.replace(/\.[^/.]+$/, "");

    const separators = [' - ', ' – ', '_-_', '–', '-'];
    for (const separator of separators) {
        if (name.includes(separator)) {
            const parts = name.split(separator);
            if (parts.length >= 2) {
                return parts[1].trim();
            }
        }
    }

    return name.trim();
}

export function extractMetadata(file) {
    return new Promise((resolve) => {
        const metadata = { title: '', artist: '' };

        const filename = file.name;

        const match = filename.match(/^(.*?)\s*[-–]\s*(.*?)\./);
        if (match) {
            metadata.artist = match[1].trim();
            metadata.title = match[2].trim();
        }

        resolve(metadata);
    });
}