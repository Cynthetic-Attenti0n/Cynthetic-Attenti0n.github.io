import { config } from './config.js';

// Store PDF library references in variables to ensure they're loaded
const pdfjsLib = window.pdfjsLib;
const PDFLib = window.PDFLib;
const { PDFDocument } = PDFLib;

// Configure PDF.js worker
pdfjsLib.GlobalWorkerOptions.workerSrc = 'https://cdn.jsdelivr.net/npm/pdfjs-dist@3.4.120/build/pdf.worker.min.js';

// DOM Elements
const dropArea = document.getElementById('drop-area');
const fileInput = document.getElementById('pdf-upload');
const uploadBtn = document.getElementById('upload-btn');
const saveBtn = document.getElementById('save-btn');
const rotateLeftBtn = document.getElementById('rotate-left-btn');
const rotateRightBtn = document.getElementById('rotate-right-btn');
const deletePageBtn = document.getElementById('delete-page-btn');
const splitPdfBtn = document.getElementById('split-pdf-btn');
const pagesContainer = document.getElementById('pages-container');
const pdfEditor = document.getElementById('pdf-editor');
const pdfCanvas = document.getElementById('pdf-canvas');
const prevPageBtn = document.getElementById('prev-page');
const nextPageBtn = document.getElementById('next-page');
const currentPageSpan = document.getElementById('current-page');
const totalPagesSpan = document.getElementById('total-pages');
const pageNavigation = document.getElementById('page-navigation');
const editTools = document.getElementById('edit-tools');
const loadingOverlay = document.getElementById('loading-overlay');
const loadingText = document.getElementById('loading-text');
const splitModal = document.getElementById('split-modal');
const splitPageSelection = document.getElementById('split-page-selection');
const extractPagesBtn = document.getElementById('extract-pages-btn');
const cancelSplitBtn = document.getElementById('cancel-split-btn');
const closeSplitModalBtn = document.getElementById('close-split-modal');

// App state
let pdfState = {
    pdfDoc: null,
    pdfBytes: null,
    currentPage: 1,
    pdfPages: [],
    totalPages: 0,
    scale: config.defaultScale,
    filename: 'document.pdf',
    selectedPage: 1,
    pageRotations: {}, // Tracks rotation of each page: { pageNum: rotationDegrees }
};

// Event listeners
document.addEventListener('DOMContentLoaded', () => {
    // Upload button
    uploadBtn.addEventListener('click', () => fileInput.click());
    fileInput.addEventListener('change', handleFileInput);
    
    // Drag and drop
    dropArea.addEventListener('dragover', (e) => {
        e.preventDefault();
        dropArea.classList.add('drag-over');
    });
    
    dropArea.addEventListener('dragleave', () => {
        dropArea.classList.remove('drag-over');
    });
    
    dropArea.addEventListener('drop', handleFileDrop);
    dropArea.addEventListener('click', () => fileInput.click());
    
    // PDF operations
    saveBtn.addEventListener('click', savePDF);
    rotateLeftBtn.addEventListener('click', () => rotatePage(-config.rotationIncrement));
    rotateRightBtn.addEventListener('click', () => rotatePage(config.rotationIncrement));
    deletePageBtn.addEventListener('click', deletePage);
    splitPdfBtn.addEventListener('click', openSplitModal);
    
    // Navigation
    prevPageBtn.addEventListener('click', goToPreviousPage);
    nextPageBtn.addEventListener('click', goToNextPage);
    
    // Split modal
    extractPagesBtn.addEventListener('click', extractPages);
    cancelSplitBtn.addEventListener('click', closeSplitModal);
    closeSplitModalBtn.addEventListener('click', closeSplitModal);
});

// File handling functions
function handleFileInput(e) {
    const file = e.target.files[0];
    if (file && file.type === 'application/pdf') {
        loadPDF(file);
    }
}

function handleFileDrop(e) {
    e.preventDefault();
    dropArea.classList.remove('drag-over');
    
    const file = e.dataTransfer.files[0];
    if (file && file.type === 'application/pdf') {
        loadPDF(file);
    }
}

async function loadPDF(file) {
    showLoading('Loading PDF...');
    
    try {
        const arrayBuffer = await file.arrayBuffer();
        const pdfDoc = await pdfjsLib.getDocument({ data: arrayBuffer }).promise;
        
        pdfState.pdfDoc = pdfDoc;
        pdfState.pdfBytes = arrayBuffer;
        pdfState.totalPages = pdfDoc.numPages;
        pdfState.currentPage = 1;
        pdfState.filename = file.name;
        pdfState.pageRotations = {};
        
        totalPagesSpan.textContent = pdfState.totalPages;
        currentPageSpan.textContent = pdfState.currentPage;
        
        // Switch to editor view
        dropArea.classList.add('hidden');
        pdfEditor.classList.remove('hidden');
        pageNavigation.classList.remove('hidden');
        editTools.classList.remove('hidden');
        
        await renderThumbnails();
        renderPage(1);
    } catch (error) {
        console.error('Error loading PDF:', error);
        alert('Error loading PDF. Please try again with a valid PDF file.');
    } finally {
        hideLoading();
    }
}

// PDF rendering functions
async function renderThumbnails() {
    pagesContainer.innerHTML = '';
    
    const maxPages = Math.min(pdfState.totalPages, config.maxPagesToShow);
    
    for (let i = 1; i <= maxPages; i++) {
        const page = await pdfState.pdfDoc.getPage(i);
        const thumbnail = document.createElement('div');
        thumbnail.className = 'page-thumbnail';
        thumbnail.dataset.page = i;
        
        if (i === pdfState.selectedPage) {
            thumbnail.classList.add('selected');
        }
        
        const canvas = document.createElement('canvas');
        const viewport = page.getViewport({ scale: 0.2 });
        canvas.width = viewport.width;
        canvas.height = viewport.height;
        
        const context = canvas.getContext('2d');
        await page.render({
            canvasContext: context,
            viewport: viewport
        }).promise;
        
        const pageNum = document.createElement('div');
        pageNum.className = 'page-number';
        pageNum.textContent = i;
        
        thumbnail.appendChild(canvas);
        thumbnail.appendChild(pageNum);
        pagesContainer.appendChild(thumbnail);
        
        thumbnail.addEventListener('click', () => {
            pdfState.selectedPage = i;
            pdfState.currentPage = i;
            updatePageSelection();
            renderPage(i);
        });
    }
}

async function renderPage(pageNum) {
    try {
        const page = await pdfState.pdfDoc.getPage(pageNum);
        
        // Apply any saved rotation
        const rotation = pdfState.pageRotations[pageNum] || 0;
        
        // Get viewport with rotation
        const viewport = page.getViewport({ scale: pdfState.scale, rotation });
        
        // Set canvas dimensions
        pdfCanvas.width = viewport.width;
        pdfCanvas.height = viewport.height;
        
        // Render the page
        const renderContext = {
            canvasContext: pdfCanvas.getContext('2d'),
            viewport: viewport
        };
        
        await page.render(renderContext).promise;
        
        // Update navigation
        pdfState.currentPage = pageNum;
        currentPageSpan.textContent = pageNum;
        
        // Update selected thumbnail
        updatePageSelection();
    } catch (error) {
        console.error('Error rendering page:', error);
    }
}

function updatePageSelection() {
    const thumbnails = document.querySelectorAll('.page-thumbnail');
    thumbnails.forEach(thumb => {
        if (parseInt(thumb.dataset.page) === pdfState.selectedPage) {
            thumb.classList.add('selected');
        } else {
            thumb.classList.remove('selected');
        }
    });
}

// Navigation functions
function goToPreviousPage() {
    if (pdfState.currentPage > 1) {
        pdfState.currentPage--;
        pdfState.selectedPage = pdfState.currentPage;
        renderPage(pdfState.currentPage);
    }
}

function goToNextPage() {
    if (pdfState.currentPage < pdfState.totalPages) {
        pdfState.currentPage++;
        pdfState.selectedPage = pdfState.currentPage;
        renderPage(pdfState.currentPage);
    }
}

// PDF modification functions
async function rotatePage(degrees) {
    const pageNum = pdfState.selectedPage;
    
    // Update rotation state
    pdfState.pageRotations[pageNum] = (pdfState.pageRotations[pageNum] || 0) + degrees;
    // Normalize to 0, 90, 180, 270
    pdfState.pageRotations[pageNum] = ((pdfState.pageRotations[pageNum] % 360) + 360) % 360;
    
    // Re-render current page
    await renderPage(pageNum);
}

async function deletePage() {
    if (pdfState.totalPages <= 1) {
        alert("Cannot delete the only page in the document.");
        return;
    }
    
    const pageNum = pdfState.selectedPage;
    
    try {
        showLoading('Deleting page...');
        
        // Create a new PDF without the selected page
        const pdfDoc = await PDFDocument.load(pdfState.pdfBytes);
        pdfDoc.removePage(pageNum - 1); // PDFDocument is 0-indexed
        
        // Get the modified PDF bytes
        const modifiedPdfBytes = await pdfDoc.save();
        
        // Update state with the new PDF
        pdfState.pdfBytes = modifiedPdfBytes.buffer;
        
        // Reload the PDF with the updated bytes
        await reloadPDF();
        
        // Navigate to the previous page if the deleted page was the last one
        if (pageNum > pdfState.totalPages) {
            pdfState.selectedPage = pdfState.totalPages;
            pdfState.currentPage = pdfState.totalPages;
        }
    } catch (error) {
        console.error('Error deleting page:', error);
        alert('Failed to delete page. Please try again.');
    } finally {
        hideLoading();
    }
}

async function reloadPDF() {
    // Load the modified PDF
    const pdfDoc = await pdfjsLib.getDocument({ data: pdfState.pdfBytes }).promise;
    
    pdfState.pdfDoc = pdfDoc;
    pdfState.totalPages = pdfDoc.numPages;
    pdfState.pageRotations = {}; // Reset rotations
    
    totalPagesSpan.textContent = pdfState.totalPages;
    
    // Re-render thumbnails and current page
    await renderThumbnails();
    renderPage(pdfState.currentPage);
}

async function savePDF() {
    showLoading('Preparing PDF...');
    
    try {
        // Create a new PDF document
        const pdfDoc = await PDFDocument.load(pdfState.pdfBytes);
        
        // Apply rotations if needed
        for (const [pageNumStr, rotation] of Object.entries(pdfState.pageRotations)) {
            const pageNum = parseInt(pageNumStr) - 1; // Convert to 0-based index
            if (rotation !== 0 && pageNum >= 0 && pageNum < pdfDoc.getPageCount()) {
                const page = pdfDoc.getPage(pageNum);
                page.setRotation({ angle: rotation });
            }
        }
        
        // Save the document
        const modifiedPdfBytes = await pdfDoc.save();
        
        // Create download link
        const blob = new Blob([modifiedPdfBytes], { type: 'application/pdf' });
        const url = URL.createObjectURL(blob);
        
        const link = document.createElement('a');
        link.href = url;
        link.download = `edited_${pdfState.filename}`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        
        // Clean up
        URL.revokeObjectURL(url);
    } catch (error) {
        console.error('Error saving PDF:', error);
        alert('Failed to save PDF. Please try again.');
    } finally {
        hideLoading();
    }
}

// Split PDF functions
function openSplitModal() {
    splitPageSelection.innerHTML = '';
    
    // Create thumbnails with checkboxes for all pages
    for (let i = 1; i <= pdfState.totalPages; i++) {
        const checkboxContainer = document.createElement('div');
        checkboxContainer.className = 'page-checkbox';
        
        const canvas = document.createElement('canvas');
        canvas.width = 100;
        canvas.height = 140;
        
        // Clone the thumbnail
        const thumbnailCanvas = document.querySelector(`.page-thumbnail[data-page="${i}"] canvas`);
        if (thumbnailCanvas) {
            const ctx = canvas.getContext('2d');
            ctx.drawImage(thumbnailCanvas, 0, 0, canvas.width, canvas.height);
        }
        
        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.id = `page-${i}`;
        checkbox.value = i;
        
        const label = document.createElement('label');
        label.htmlFor = `page-${i}`;
        label.textContent = `Page ${i}`;
        
        checkboxContainer.appendChild(canvas);
        checkboxContainer.appendChild(checkbox);
        checkboxContainer.appendChild(label);
        
        splitPageSelection.appendChild(checkboxContainer);
    }
    
    splitModal.classList.remove('hidden');
}

function closeSplitModal() {
    splitModal.classList.add('hidden');
}

async function extractPages() {
    const checkboxes = splitPageSelection.querySelectorAll('input[type="checkbox"]:checked');
    
    if (checkboxes.length === 0) {
        alert('Please select at least one page to extract.');
        return;
    }
    
    showLoading('Extracting pages...');
    
    try {
        // Get selected page numbers (1-based)
        const pageNumbers = Array.from(checkboxes).map(cb => parseInt(cb.value));
        
        // Create a new PDF with selected pages
        const srcPdfDoc = await PDFDocument.load(pdfState.pdfBytes);
        const newPdfDoc = await PDFDocument.create();
        
        // Copy each selected page to the new document
        for (const pageNum of pageNumbers) {
            const [copiedPage] = await newPdfDoc.copyPages(srcPdfDoc, [pageNum - 1]);
            newPdfDoc.addPage(copiedPage);
        }
        
        // Save the new document
        const newPdfBytes = await newPdfDoc.save();
        
        // Create download link
        const blob = new Blob([newPdfBytes], { type: 'application/pdf' });
        const url = URL.createObjectURL(blob);
        
        const link = document.createElement('a');
        link.href = url;
        link.download = `extracted_${pdfState.filename}`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        
        // Clean up
        URL.revokeObjectURL(url);
        closeSplitModal();
    } catch (error) {
        console.error('Error extracting pages:', error);
        alert('Failed to extract pages. Please try again.');
    } finally {
        hideLoading();
    }
}

// Helper functions
function showLoading(message) {
    loadingText.textContent = message || 'Processing...';
    loadingOverlay.classList.remove('hidden');
}

function hideLoading() {
    loadingOverlay.classList.add('hidden');
}