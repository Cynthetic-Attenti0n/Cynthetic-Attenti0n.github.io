import { marked } from 'marked';
import DOMPurify from 'dompurify';
import hljs from 'highlight.js';
import { SAMPLE_MD_FILES } from './config.js';

// Set up marked with highlight.js
marked.setOptions({
    highlight: function(code, lang) {
        if (lang && hljs.getLanguage(lang)) {
            return hljs.highlight(code, { language: lang }).value;
        }
        return hljs.highlightAuto(code).value;
    },
    breaks: true
});

// State management
const state = {
    files: [],
    currentFile: null,
    viewMode: 'grid'
};

// DOM Elements
const uploadBtn = document.getElementById('upload-btn');
const fileUpload = document.getElementById('file-upload');
const library = document.getElementById('library');
const mdViewer = document.getElementById('md-viewer');
const mdContent = document.getElementById('md-content');
const viewerTitle = document.getElementById('viewer-title');
const backBtn = document.getElementById('back-btn');
const gridViewBtn = document.getElementById('grid-view-btn');
const listViewBtn = document.getElementById('list-view-btn');
const toast = document.getElementById('toast');
const toastMessage = document.getElementById('toast-message');

// Event Listeners
uploadBtn.addEventListener('click', () => fileUpload.click());
fileUpload.addEventListener('change', handleFileUpload);
backBtn.addEventListener('click', closeViewer);
gridViewBtn.addEventListener('click', () => setViewMode('grid'));
listViewBtn.addEventListener('click', () => setViewMode('list'));

// Function to handle file upload
async function handleFileUpload(e) {
    const files = Array.from(e.target.files);
    
    if (files.length === 0) return;
    
    const newFiles = [];
    
    for (const file of files) {
        if (file.type === 'text/markdown' || file.name.endsWith('.md')) {
            try {
                const content = await readFileAsText(file);
                const title = extractTitle(content) || file.name.replace('.md', '');
                
                newFiles.push({
                    id: generateId(),
                    name: file.name,
                    title,
                    content,
                    size: formatFileSize(file.size),
                    date: new Date().toISOString()
                });
            } catch (err) {
                showToast(`Error reading ${file.name}`);
            }
        } else {
            showToast(`${file.name} is not a markdown file`);
        }
    }
    
    if (newFiles.length > 0) {
        state.files = [...state.files, ...newFiles];
        renderLibrary();
        showToast(`Added ${newFiles.length} file${newFiles.length > 1 ? 's' : ''}`);
    }
    
    // Reset file input
    fileUpload.value = '';
}

// Function to read file as text
function readFileAsText(file) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => resolve(reader.result);
        reader.onerror = () => reject(reader.error);
        reader.readAsText(file);
    });
}

// Function to extract title from markdown content
function extractTitle(content) {
    const match = content.match(/^#\s+(.+)$/m);
    return match ? match[1].trim() : null;
}

// Function to format file size
function formatFileSize(bytes) {
    if (bytes < 1024) return bytes + ' B';
    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB';
    return (bytes / (1024 * 1024)).toFixed(1) + ' MB';
}

// Function to generate unique ID
function generateId() {
    return Date.now().toString(36) + Math.random().toString(36).substring(2);
}

// Function to render the library
function renderLibrary() {
    library.innerHTML = '';
    
    if (state.files.length === 0) {
        library.innerHTML = `
            <div class="empty-state">
                <svg viewBox="0 0 24 24" width="64" height="64">
                    <path fill="currentColor" d="M13,9H18.5L13,3.5V9M6,2H14L20,8V20A2,2 0 0,1 18,22H6C4.89,22 4,21.1 4,20V4C4,2.89 4.89,2 6,2M15,18V16H6V18H15M18,14V12H6V14H18Z" />
                </svg>
                <p>No files yet. Upload your first Markdown file!</p>
            </div>
        `;
        return;
    }
    
    state.files.forEach((file, index) => {
        const card = document.createElement('div');
        card.className = 'md-card';
        card.style.animationDelay = `${index * 0.05}s`;
        
        card.innerHTML = `
            <div class="card-header">
                <h3>${file.title}</h3>
                <div class="card-meta">
                    <span>${file.name}</span>
                    <span>${file.size}</span>
                </div>
            </div>
            <div class="card-content">
                ${getPreviewContent(file.content)}
            </div>
        `;
        
        card.addEventListener('click', () => openViewer(file));
        library.appendChild(card);
    });
}

// Function to get preview content
function getPreviewContent(content) {
    // Remove markdown syntax for preview
    return content
        .replace(/^#.+$/gm, '') // Remove headers
        .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1') // Remove links but keep text
        .replace(/\*\*([^*]+)\*\*/g, '$1') // Remove bold
        .replace(/\*([^*]+)\*/g, '$1') // Remove italic
        .replace(/```[\s\S]+?```/g, '') // Remove code blocks
        .replace(/`([^`]+)`/g, '$1') // Remove inline code
        .trim()
        .substring(0, 200) + '...';
}

// Function to open the viewer
function openViewer(file) {
    state.currentFile = file;
    viewerTitle.textContent = file.title;
    
    // Render markdown content
    const sanitizedHtml = DOMPurify.sanitize(marked.parse(file.content));
    mdContent.innerHTML = sanitizedHtml;
    
    // Show the viewer with animation
    mdViewer.classList.remove('hidden');
    setTimeout(() => {
        mdViewer.classList.add('active');
        mdContent.scrollTop = 0; // Scroll to top when opening viewer
    }, 10);
    
    // Apply syntax highlighting
    document.querySelectorAll('pre code').forEach((block) => {
        hljs.highlightElement(block);
    });
    
    // Add animation to paragraphs
    document.querySelectorAll('#md-content p, #md-content li').forEach((element, index) => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(20px)';
        element.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
        element.style.transitionDelay = `${0.1 + index * 0.05}s`;
        
        setTimeout(() => {
            element.style.opacity = '1';
            element.style.transform = 'translateY(0)';
        }, 50);
    });
}

// Function to close the viewer
function closeViewer() {
    mdViewer.classList.remove('active');
    setTimeout(() => {
        mdViewer.classList.add('hidden');
        state.currentFile = null;
    }, 300);
}

// Function to set the view mode
function setViewMode(mode) {
    state.viewMode = mode;
    library.className = mode === 'grid' ? 'grid-view' : 'list-view';
    
    gridViewBtn.classList.toggle('active', mode === 'grid');
    listViewBtn.classList.toggle('active', mode === 'list');
    
    renderLibrary();
}

// Function to show toast message
function showToast(message) {
    toastMessage.textContent = message;
    toast.classList.remove('hidden');
    toast.classList.add('active');
    
    setTimeout(() => {
        toast.classList.remove('active');
        setTimeout(() => {
            toast.classList.add('hidden');
        }, 300);
    }, 3000);
}

// Function to load a markdown file
async function loadMdFile(filePath) {
    try {
        const response = await fetch(filePath);
        if (!response.ok) throw new Error(`Failed to load ${filePath}`);
        
        const content = await response.text();
        const title = extractTitle(content) || filePath.split('/').pop().replace('.md', '');
        
        // Check if file already exists in state
        if (!state.files.some(file => file.name === filePath.split('/').pop())) {
            state.files.push({
                id: generateId(),
                name: filePath.split('/').pop(),
                title,
                content,
                size: formatFileSize(content.length),
                date: new Date().toISOString()
            });
            return true;
        }
        return false;
    } catch (error) {
        console.error(`Error loading file ${filePath}:`, error);
        return false;
    }
}

// Function to scan for markdown files
async function scanForMdFiles() {
    let newFilesAdded = false;
    
    try {
        const response = await fetch('/api/files');
        if (response.ok) {
            const files = await response.json();
            const mdFiles = files.filter(f => f.toLowerCase().endsWith('.md'));
            
            for (const file of mdFiles) {
                const added = await loadMdFile(file);
                if (added) newFilesAdded = true;
            }
        } else {
            throw new Error('API request failed');
        }
    } catch (error) {
        console.log('API for directory listing not available, falling back to config files');
        // Load sample files from config if API fails
        for (const sampleFile of SAMPLE_MD_FILES) {
            const added = await loadMdFile(sampleFile);
            if (added) newFilesAdded = true;
        }
    }
    
    return newFilesAdded;
}

// Initialize the application
async function init() {
    // First scan for MD files
    await scanForMdFiles();
    
    // Render initial library
    renderLibrary();
    
    // Second scan after a delay to catch any missed files
    setTimeout(async () => {
        const newFilesAdded = await scanForMdFiles();
        if (newFilesAdded) {
            renderLibrary();
            showToast('Additional markdown files detected and loaded');
        }
    }, 2000);
}

// Start the app
init();