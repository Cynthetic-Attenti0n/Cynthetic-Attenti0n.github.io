import { gsap } from 'gsap';
import WaveSurfer from 'wavesurfer';
import lottie from 'lottie';
import { formatTime, convertTimeToSeconds, parseFileName, extractMetadata } from './utils.js';
import { ThemeController } from './theme-controller.js';
import { AnimationEffects } from './animation-effects.js';
import { AppTitleEffects } from './app-title-effects.js';

class MusicPlayer {
    constructor() {
        this.isPlaying = false;
        this.currentSongIndex = 0;
        this.isPlaylistActive = false;
        this.isDarkMode = window.matchMedia('(prefers-color-scheme: dark)').matches;
        this.audioContext = null;
        this.audioElement = new Audio();
        this.songDuration = 0;
        this.wavesurfer = null;
        this.equalizerBars = [];
        this.playlist = [];

        // Initialize theme controller
        this.themeController = new ThemeController();

        // Initialize animation effects
        this.animationEffects = new AnimationEffects();
        
        // Initialize app title effects
        this.appTitleEffects = new AppTitleEffects();

        this.audioElement.addEventListener('timeupdate', () => this.updateProgress());
        this.audioElement.addEventListener('ended', () => this.nextTrack());

        this.initializeElements();
        this.setupEventListeners();
        this.initializeAudio();
        this.initializeWaveSurfer();
        this.setupEqualizer();
        this.setupSwipeGestures();
        this.setupProgressBarInteraction();
        this.setupLottieAnimations();
        this.scanForLocalMusic();

        // Initialize animation effects after everything is set up
        this.animationEffects.init();
    }

    initializeElements() {
        this.appContainer = document.querySelector('.app-container');
        this.nowPlayingView = document.querySelector('.now-playing-view');
        this.playlistView = document.querySelector('.playlist-view');

        this.playBtn = document.querySelector('.play-btn');
        this.prevBtn = document.querySelector('.prev-btn');
        this.nextBtn = document.querySelector('.next-btn');
        this.shuffleBtn = document.querySelector('.shuffle-btn');
        this.repeatBtn = document.querySelector('.repeat-btn');

        this.nowPlayingNavBtn = document.querySelector('.now-playing-btn');
        this.playlistNavBtn = document.querySelector('.playlist-btn');

        this.albumArt = document.querySelector('.album-art');
        this.trackTitle = document.querySelector('.track-title');
        this.artistName = document.querySelector('.artist-name');
        this.progressBar = document.querySelector('.progress-bar');
        this.progressFill = document.querySelector('.progress-fill');
        this.progressHandle = document.querySelector('.progress-handle');
        this.currentTimeEl = document.querySelector('.current-time');
        this.totalTimeEl = document.querySelector('.total-time');
        this.trackList = document.querySelector('.track-list');

        this.uploadBtn = document.querySelector('.upload-button');
        this.fileInput = document.getElementById('upload-input');
        this.scanButton = document.querySelector('.scan-button');
        this.loaderOverlay = document.querySelector('.loader-overlay');
        this.noTracksMessage = document.querySelector('.no-tracks-message');
        this.waveformContainer = document.getElementById('waveform');
        this.equalizerContainer = document.getElementById('equalizer-container');
    }

    setupEventListeners() {
        this.playBtn.addEventListener('click', () => this.togglePlay());
        this.prevBtn.addEventListener('click', () => this.prevTrack());
        this.nextBtn.addEventListener('click', () => this.nextTrack());

        this.nowPlayingNavBtn.addEventListener('click', () => this.showNowPlaying());
        this.playlistNavBtn.addEventListener('click', () => this.showPlaylist());

        this.uploadBtn.addEventListener('click', () => this.fileInput.click());
        this.fileInput.addEventListener('change', (e) => this.handleFileUpload(e));
        this.scanButton.addEventListener('click', () => this.scanForLocalMusic());

        this.audioElement.addEventListener('play', () => this.startEqualizer());
        this.audioElement.addEventListener('pause', () => this.stopEqualizer());
        this.audioElement.addEventListener('ended', () => this.stopEqualizer());
    }

    initializeAudio() {
        try {
            window.AudioContext = window.AudioContext || window.webkitAudioContext;
            this.audioContext = new AudioContext();

            this.audioSource = this.audioContext.createMediaElementSource(this.audioElement);
            this.analyser = this.audioContext.createAnalyser();
            this.analyser.fftSize = 256;

            this.audioSource.connect(this.analyser);
            this.analyser.connect(this.audioContext.destination);

            this.dataArray = new Uint8Array(this.analyser.frequencyBinCount);
        } catch (e) {
            console.error('Web Audio API is not supported in this browser');
        }
    }

    initializeWaveSurfer() {
        this.wavesurfer = WaveSurfer.create({
            container: this.waveformContainer,
            waveColor: 'var(--text-secondary)',
            progressColor: 'var(--primary-color)',
            cursorColor: 'transparent',
            barWidth: 2,
            barGap: 1,
            barRadius: 2,
            height: 64,
            normalize: true,
            interact: true
        });

        this.wavesurfer.on('ready', () => {
            this.songDuration = this.wavesurfer.getDuration();
            this.totalTimeEl.textContent = formatTime(Math.floor(this.songDuration));
        });

        this.wavesurfer.on('interaction', (position) => {
            this.audioElement.currentTime = position * this.songDuration;
            if (!this.isPlaying) {
                this.updateProgress();
            }
        });
    }

    setupEqualizer() {
        this.equalizerContainer.innerHTML = '';

        for (let i = 0; i < 12; i++) {
            const bar = document.createElement('div');
            bar.className = 'equalizer-bar';
            bar.style.height = '5px';
            this.equalizerContainer.appendChild(bar);
            this.equalizerBars.push(bar);
        }
    }

    startEqualizer() {
        this.equalizerContainer.classList.add('active');
        this.animateEqualizer();
    }

    stopEqualizer() {
        this.equalizerContainer.classList.remove('active');
        if (this.equalizerAnimation) {
            cancelAnimationFrame(this.equalizerAnimation);
            this.equalizerAnimation = null;
        }
    }

    animateEqualizer() {
        if (!this.analyser) return;

        this.analyser.getByteFrequencyData(this.dataArray);

        for (let i = 0; i < this.equalizerBars.length; i++) {
            const index = Math.floor(i * (this.dataArray.length / this.equalizerBars.length));
            const value = this.dataArray[index];

            const height = Math.max(5, value * 0.3);

            this.equalizerBars[i].style.height = `${height}px`;
        }

        this.equalizerAnimation = requestAnimationFrame(() => this.animateEqualizer());
    }

    togglePlay() {
        if (this.playlist.length === 0) {
            this.showMessage('No tracks available to play');
            return;
        }

        if (this.audioContext && this.audioContext.state === 'suspended') {
            this.audioContext.resume();
        }

        this.isPlaying = !this.isPlaying;

        if (this.isPlaying) {
            this.playBtn.classList.add('playing');
            this.audioElement.play();
            this.albumArt.classList.add('spin');
            this.wavesurfer.play();
        } else {
            this.playBtn.classList.remove('playing');
            this.audioElement.pause();
            this.albumArt.classList.remove('spin');
            this.wavesurfer.pause();
        }
    }

    prevTrack() {
        if (this.playlist.length === 0) return;

        this.currentSongIndex = (this.currentSongIndex - 1 + this.playlist.length) % this.playlist.length;
        this.loadTrack(this.currentSongIndex);

        if (this.isPlaying) {
            this.audioElement.play();
            this.wavesurfer.play();
        }
    }

    nextTrack() {
        if (this.playlist.length === 0) return;

        this.currentSongIndex = (this.currentSongIndex + 1) % this.playlist.length;
        this.loadTrack(this.currentSongIndex);

        if (this.isPlaying) {
            this.audioElement.play();
            this.wavesurfer.play();
        }
    }

    loadTrack(index) {
        if (this.playlist.length === 0 || index >= this.playlist.length) return;

        const song = this.playlist[index];
        this.trackTitle.textContent = song.title || 'Unknown Title';
        this.artistName.textContent = song.artist || 'Unknown Artist';

        const previousSrc = this.audioElement.src;

        if (previousSrc !== song.url) {
            this.audioElement.src = song.url;

            this.audioElement.load();

            this.wavesurfer.load(song.url);
        }

        this.generateAlbumArt(song);

        this.updateProgress();

        const trackItems = document.querySelectorAll('.track-item');
        trackItems.forEach((item, i) => {
            if (i === index) {
                item.classList.add('active');
                this.scrollToTrack(item);
            } else {
                item.classList.remove('active');
            }
        });

        this.albumArt.classList.add('flip');
        setTimeout(() => {
            this.albumArt.classList.remove('flip');
        }, 600);

        // Use new animation system
        this.animationEffects.animateTrackChange();
    }

    scrollToTrack(trackElement) {
        if (!this.isPlaylistActive) return;

        const container = this.trackList;
        gsap.to(container, {
            scrollTo: { y: trackElement, offsetY: 100 },
            duration: 0.5,
            ease: "power3.out"
        });
    }

    generateAlbumArt(song) {
        let hash = 0;
        for (let i = 0; i < (song.title || '').length; i++) {
            hash = song.title.charCodeAt(i) + ((hash << 5) - hash);
        }

        const hue = hash % 360;
        const color = `hsl(${hue}, 70%, 60%)`;
        const secondaryColor = `hsl(${(hue + 40) % 360}, 70%, 50%)`;

        const svgContent = `
            <svg viewBox="0 0 200 200" width="100%" height="100%">
                <defs>
                    <linearGradient id="album-gradient-${this.currentSongIndex}" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stop-color="${color}" />
                        <stop offset="100%" stop-color="${secondaryColor}" />
                    </linearGradient>
                    <filter id="noise" x="0%" y="0%" width="100%" height="100%">
                        <feTurbulence type="fractalNoise" baseFrequency="0.65" numOctaves="3" stitchTiles="stitch"/>
                        <feBlend mode="overlay" in="SourceGraphic" />
                    </filter>
                    <pattern id="dotPattern-${this.currentSongIndex}" width="10" height="10" patternUnits="userSpaceOnUse">
                        <circle cx="2" cy="2" r="1" fill="#fff" opacity="0.3" />
                    </pattern>
                </defs>
                <rect width="200" height="200" fill="url(#album-gradient-${this.currentSongIndex})" />
                <rect width="200" height="200" fill="url(#album-gradient-${this.currentSongIndex})" filter="url(#noise)" opacity="0.4" />
                <rect width="200" height="200" fill="url(#dotPattern-${this.currentSongIndex})" opacity="0.2" />
                <circle cx="100" cy="100" r="30" fill="#fff" opacity="0.2" />
                <circle cx="100" cy="100" r="10" fill="#fff" opacity="0.3" />
                <text x="100" y="160" fill="#fff" opacity="0.7" font-size="14" text-anchor="middle" font-family="Inter, sans-serif">
                    ${song.artist || 'Unknown Artist'}
                </text>
            </svg>
        `;
        this.albumArt.innerHTML = svgContent;
    }

    updateProgress() {
        if (!this.audioElement || !this.audioElement.duration) return;

        const percent = this.audioElement.currentTime / this.audioElement.duration;
        const width = `${percent * 100}%`;

        this.progressFill.style.width = width;
        this.progressHandle.style.left = width;

        this.currentTimeEl.textContent = formatTime(Math.floor(this.audioElement.currentTime));
        this.totalTimeEl.textContent = formatTime(Math.floor(this.audioElement.duration));
    }

    startDrag(e) {
        this.isDragging = true;
        this.drag(e);
    }

    drag(e) {
        if (!this.isDragging || !this.audioElement.duration) return;

        const progressRect = this.progressBar.getBoundingClientRect();
        const clientX = e.clientX || (e.touches && e.touches[0].clientX) || 0;
        let percent = (clientX - progressRect.left) / progressRect.width;

        percent = Math.max(0, Math.min(1, percent));

        this.audioElement.currentTime = percent * this.audioElement.duration;
        this.wavesurfer.seekTo(percent);
    }

    handleFileUpload(e) {
        const files = e.target.files;
        if (!files || files.length === 0) return;

        this.showLoader('Processing your music...');

        const newTracks = Array.from(files).map(file => {
            const url = URL.createObjectURL(file);
            return {
                title: parseFileName(file.name),
                artist: 'Local Library',
                url: url,
                duration: '0:00',
                file: file
            };
        });

        this.processNewTracks(newTracks);

        this.fileInput.value = '';
    }

    processNewTracks(newTracks) {
        if (newTracks.length === 0) {
            this.hideLoader();
            return;
        }

        let loadedCount = 0;

        newTracks.forEach((track, index) => {
            const audio = new Audio(track.url);

            audio.addEventListener('loadedmetadata', () => {
                track.duration = formatTime(Math.floor(audio.duration));

                if (window.MediaMetadata && track.file) {
                    this.extractMetadata(track.file).then(metadata => {
                        if (metadata.title) track.title = metadata.title;
                        if (metadata.artist) track.artist = metadata.artist;

                        loadedCount++;
                        if (loadedCount === newTracks.length) {
                            this.finalizeTracksLoading(newTracks);
                        }
                    }).catch(() => {
                        loadedCount++;
                        if (loadedCount === newTracks.length) {
                            this.finalizeTracksLoading(newTracks);
                        }
                    });
                } else {
                    loadedCount++;
                    if (loadedCount === newTracks.length) {
                        this.finalizeTracksLoading(newTracks);
                    }
                }
            });

            audio.addEventListener('error', () => {
                loadedCount++;
                console.error(`Error loading track: ${track.title}`);

                if (loadedCount === newTracks.length) {
                    this.finalizeTracksLoading(newTracks.filter(t => t !== track));
                }
            });
        });
    }

    finalizeTracksLoading(newTracks) {
        if (newTracks.length === 0) {
            this.hideLoader();
            this.showMessage('No valid audio files found');
            return;
        }

        this.playlist = [...this.playlist, ...newTracks];

        this.loadPlaylist();
        this.hideLoader();

        if (this.playlist.length === newTracks.length) {
            this.currentSongIndex = 0;
            this.loadTrack(0);
        }

        const trackItems = document.querySelectorAll('.track-item');
        gsap.from(trackItems.slice(-newTracks.length), {
            y: 20,
            opacity: 0,
            duration: 0.5,
            stagger: 0.1,
            ease: "power3.out"
        });
    }

    loadPlaylist() {
        this.trackList.innerHTML = '';

        if (this.playlist.length === 0) {
            this.noTracksMessage.style.display = 'flex';
            return;
        }

        this.noTracksMessage.style.display = 'none';

        this.playlist.forEach((track, index) => {
            const li = document.createElement('li');
            li.className = `track-item ${index === this.currentSongIndex ? 'active' : ''}`;
            li.dataset.index = index;

            let hash = 0;
            for (let i = 0; i < (track.title || '').length; i++) {
                hash = track.title.charCodeAt(i) + ((hash << 5) - hash);
            }
            const hue = hash % 360;
            const color = `hsl(${hue}, 70%, 60%)`;

            const svgArt = `
                <svg viewBox="0 0 50 50" width="100%" height="100%">
                    <rect width="50" height="50" fill="${color}" />
                    <circle cx="25" cy="25" r="8" fill="#fff" opacity="0.2" />
                    <circle cx="25" cy="25" r="3" fill="#fff" opacity="0.3" />
                </svg>
            `;

            li.innerHTML = `
                <div class="track-item-artwork">${svgArt}</div>
                <div class="track-item-info">
                    <div class="track-item-title">${track.title}</div>
                    <div class="track-item-artist">${track.artist}</div>
                </div>
                <div class="track-item-duration">${track.duration}</div>
            `;

            li.addEventListener('click', () => {
                this.currentSongIndex = index;
                this.loadTrack(index);
                this.showNowPlaying();

                gsap.to(this.albumArt, {
                    rotationY: 180,
                    duration: 0.6,
                    ease: "power2.inOut",
                    onComplete: () => {
                        gsap.set(this.albumArt, { rotationY: 0 });
                    }
                });

                if (!this.isPlaying) {
                    this.togglePlay();
                }
            });

            this.trackList.appendChild(li);
        });
    }

    showLoader(message = 'Loading...') {
        const loaderText = this.loaderOverlay.querySelector('p');
        loaderText.textContent = message;
        this.loaderOverlay.classList.add('active');
    }

    hideLoader() {
        this.loaderOverlay.classList.remove('active');
    }

    showMessage(message) {
        const messageEl = this.noTracksMessage.querySelector('p');
        messageEl.textContent = message;
        this.noTracksMessage.style.display = 'flex';

        gsap.from(this.noTracksMessage, {
            y: 20,
            opacity: 0,
            duration: 0.5,
            ease: "power3.out"
        });
    }

    setupLottieAnimations() {
        lottie.loadAnimation({
            container: document.getElementById('upload-animation'),
            renderer: 'svg',
            loop: true,
            autoplay: true,
            path: 'https://assets8.lottiefiles.com/packages/lf20_ymbcagkj.json'
        });
    }

    setupSwipeGestures() {
        let startX, startY, moveX, moveY;
        const threshold = 50;

        const handleTouchStart = (e) => {
            startX = e.touches[0].clientX;
            startY = e.touches[0].clientY;
        };

        const handleTouchMove = (e) => {
            if (!startX || !startY) return;

            moveX = e.touches[0].clientX;
            moveY = e.touches[0].clientY;
        };

        const handleTouchEnd = () => {
            if (!startX || !startY || !moveX || !moveY) {
                resetValues();
                return;
            }

            const diffX = startX - moveX;
            const diffY = startY - moveY;

            if (Math.abs(diffX) > Math.abs(diffY) && Math.abs(diffX) > threshold) {
                if (diffX > 0) {
                    this.showPlaylist();
                } else {
                    this.showNowPlaying();
                }
            }

            resetValues();
        };

        const resetValues = () => {
            startX = startY = moveX = moveY = null;
        };

        this.appContainer.addEventListener('touchstart', handleTouchStart, { passive: true });
        this.appContainer.addEventListener('touchmove', handleTouchMove, { passive: true });
        this.appContainer.addEventListener('touchend', handleTouchEnd);
    }

    setupProgressBarInteraction() {
        let isDragging = false;

        this.progressBar.addEventListener('mousedown', (e) => this.startDrag(e));
        this.progressBar.addEventListener('touchstart', (e) => this.startDrag(e), { passive: true });

        document.addEventListener('mousemove', (e) => {
            if (isDragging) this.drag(e);
        });
        document.addEventListener('touchmove', (e) => {
            if (isDragging) this.drag(e);
        }, { passive: true });

        document.addEventListener('mouseup', () => {
            isDragging = false;
        });
        document.addEventListener('touchend', () => {
            isDragging = false;
        });
    }

    showNowPlaying() {
        this.isPlaylistActive = false;
        this.appContainer.classList.remove('playlist-active');
        this.nowPlayingNavBtn.classList.add('active');
        this.playlistNavBtn.classList.remove('active');

        // Use new animation system
        this.animationEffects.animateViewChange(false);
    }

    showPlaylist() {
        this.isPlaylistActive = true;
        this.appContainer.classList.add('playlist-active');
        this.nowPlayingNavBtn.classList.remove('active');
        this.playlistNavBtn.classList.add('active');

        // Use new animation system
        this.animationEffects.animateViewChange(true);
    }

    extractMetadata(file) {
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

    scanForLocalMusic() {
        this.showLoader('Scanning for local music...');

        const defaultTrack = {
            title: 'Never Gonna Give You Up',
            artist: 'Rick Astley',
            url: 'Rick Astley - Never Gonna Give You Up (Official Music Video) [ ezmp3.cc ].mp3',
            duration: '0:00'
        };

        const testAudio = new Audio(defaultTrack.url);
        testAudio.addEventListener('loadedmetadata', () => {
            defaultTrack.duration = formatTime(Math.floor(testAudio.duration));
            this.playlist = [defaultTrack];
            this.loadPlaylist();
            this.hideLoader();
            this.currentSongIndex = 0;
            this.loadTrack(0);
        });

        testAudio.addEventListener('error', () => {
            console.error('Could not load default track');
            this.hideLoader();
            this.showMessage('No local music found. Try uploading some music files.');
        });

        testAudio.load();
    }
}

document.addEventListener('DOMContentLoaded', () => {
    const player = new MusicPlayer();
});