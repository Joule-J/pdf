// Tool definitions with Turkish names and descriptions
const tools = {
    merge: {
        title: 'PDF Birleştir',
        description: 'Birden fazla PDF dosyasını birleştirin',
        accepts: ['.pdf'],
        multiple: true
    },
    split: {
        title: 'PDF Böl',
        description: 'PDF dosyanızı sayfalara ayırın',
        accepts: ['.pdf'],
        multiple: false
    },
    compress: {
        title: 'PDF Sıkıştır',
        description: 'PDF dosya boyutunu küçültün',
        accepts: ['.pdf'],
        multiple: false
    },
    'pdf-to-word': {
        title: 'PDF\'den Word\'e Dönüştür',
        description: 'PDF dosyalarınızı Word belgelerine çevirin',
        accepts: ['.pdf'],
        multiple: false
    },
    'pdf-to-ppt': {
        title: 'PDF\'den PowerPoint\'e Dönüştür',
        description: 'PDF dosyalarınızı PowerPoint sunumlarına çevirin',
        accepts: ['.pdf'],
        multiple: false
    },
    'pdf-to-excel': {
        title: 'PDF\'den Excel\'e Dönüştür',
        description: 'PDF dosyalarınızı Excel tablolarına çevirin',
        accepts: ['.pdf'],
        multiple: false
    },
    'word-to-pdf': {
        title: 'Word\'den PDF\'e Dönüştür',
        description: 'Word belgelerinizi PDF formatına çevirin',
        accepts: ['.doc', '.docx'],
        multiple: true
    },
    'ppt-to-pdf': {
        title: 'PowerPoint\'ten PDF\'e Dönüştür',
        description: 'PowerPoint sunumlarınızı PDF formatına çevirin',
        accepts: ['.ppt', '.pptx'],
        multiple: true
    },
    'excel-to-pdf': {
        title: 'Excel\'den PDF\'e Dönüştür',
        description: 'Excel tablolarınızı PDF formatına çevirin',
        accepts: ['.xls', '.xlsx'],
        multiple: true
    },
    edit: {
        title: 'PDF Düzenle',
        description: 'PDF dosyanıza metin, resim ve şekiller ekleyin',
        accepts: ['.pdf'],
        multiple: false
    },
    'pdf-to-jpg': {
        title: 'PDF\'den JPG\'ye Dönüştür',
        description: 'PDF sayfalarınızı görsellere çevirin',
        accepts: ['.pdf'],
        multiple: false
    },
    'jpg-to-pdf': {
        title: 'JPG\'den PDF\'e Dönüştür',
        description: 'Görsellerinizi PDF dosyasına çevirin',
        accepts: ['.jpg', '.jpeg', '.png'],
        multiple: true
    },
    sign: {
        title: 'PDF İmzala',
        description: 'PDF dosyalarınızı dijital olarak imzalayın',
        accepts: ['.pdf'],
        multiple: false
    },
    watermark: {
        title: 'Filigran Ekle',
        description: 'PDF dosyanıza filigran ekleyin',
        accepts: ['.pdf'],
        multiple: false
    },
    rotate: {
        title: 'PDF Döndür',
        description: 'PDF sayfalarınızı döndürün',
        accepts: ['.pdf'],
        multiple: false
    },
    'html-to-pdf': {
        title: 'HTML\'den PDF\'e Dönüştür',
        description: 'Web sayfalarını veya HTML kodunu PDF\'e çevirin',
        accepts: ['.html', '.htm'],
        multiple: false
    },
    unlock: {
        title: 'PDF Kilidini Aç',
        description: 'Şifre korumalı PDF\'lerin kilidini açın',
        accepts: ['.pdf'],
        multiple: false
    },
    protect: {
        title: 'PDF Koruması',
        description: 'PDF dosyalarınızı şifre ile koruyun',
        accepts: ['.pdf'],
        multiple: false
    },
    organize: {
        title: 'PDF Düzenle',
        description: 'Sayfaları sıralayın, silin veya ekleyin',
        accepts: ['.pdf'],
        multiple: false
    },
    'pdf-to-pdfa': {
        title: 'PDF\'den PDF/A\'ya Dönüştür',
        description: 'PDF\'lerinizi arşivleme standardına dönüştürün',
        accepts: ['.pdf'],
        multiple: false
    },
    repair: {
        title: 'PDF Onar',
        description: 'Bozuk PDF dosyalarını onarın',
        accepts: ['.pdf'],
        multiple: false
    },
    'page-numbers': {
        title: 'Sayfa Numaraları Ekle',
        description: 'PDF dosyanıza sayfa numaraları ekleyin',
        accepts: ['.pdf'],
        multiple: false
    },
    scan: {
        title: 'Taramadan PDF\'e',
        description: 'Belgelerinizi tarayın ve PDF\'e dönüştürün',
        accepts: ['.jpg', '.jpeg', '.png'],
        multiple: true
    },
    ocr: {
        title: 'OCR PDF',
        description: 'Taranmış PDF\'leri arama yapılabilir hale getirin',
        accepts: ['.pdf'],
        multiple: false
    }
};

// State
let selectedTool = null;
let uploadedFiles = [];

// DOM Elements
const modal = document.getElementById('toolModal');
const modalTitle = document.getElementById('modalTitle');
const modalBody = document.getElementById('modalBody');
const fileUploadArea = document.getElementById('fileUploadArea');
const fileInput = document.getElementById('fileInput');
const selectFileBtn = document.getElementById('selectFileBtn');
const fileList = document.getElementById('fileList');
const toolOptions = document.getElementById('toolOptions');
const processBtn = document.getElementById('processBtn');
const closeBtn = document.querySelector('.close');

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    initializeHeaderAnimation();
    initializeToolCards();
    initializeModal();
    initializeFileUpload();
});

// Header Canvas Animation
function initializeHeaderAnimation() {
    const canvas = document.getElementById('headerCanvas');
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    const header = document.querySelector('.header');
    
    let mouseX = 0;
    let mouseY = 0;
    let particles = [];
    const particleCount = 30;
    
    // Set canvas size
    function resizeCanvas() {
        canvas.width = header.offsetWidth;
        canvas.height = header.offsetHeight;
    }
    
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);
    
    // Particle class
    class Particle {
        constructor() {
            this.reset();
            this.y = Math.random() * canvas.height;
        }
        
        reset() {
            this.x = Math.random() * canvas.width;
            this.y = Math.random() * canvas.height;
            this.size = Math.random() * 3 + 1;
            this.speedX = Math.random() * 0.5 - 0.25;
            this.speedY = Math.random() * 0.5 - 0.25;
            this.opacity = Math.random() * 0.5 + 0.2;
        }
        
        update() {
            // Mouse interaction
            const dx = mouseX - this.x;
            const dy = mouseY - this.y;
            const distance = Math.sqrt(dx * dx + dy * dy);
            const maxDistance = 100;
            
            if (distance < maxDistance) {
                const force = (maxDistance - distance) / maxDistance;
                const angle = Math.atan2(dy, dx);
                this.x -= Math.cos(angle) * force * 2;
                this.y -= Math.sin(angle) * force * 2;
            }
            
            // Normal movement
            this.x += this.speedX;
            this.y += this.speedY;
            
            // Boundary check
            if (this.x < 0 || this.x > canvas.width) this.speedX *= -1;
            if (this.y < 0 || this.y > canvas.height) this.speedY *= -1;
            
            this.x = Math.max(0, Math.min(canvas.width, this.x));
            this.y = Math.max(0, Math.min(canvas.height, this.y));
        }
        
        draw() {
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(230, 57, 70, ${this.opacity})`;
            ctx.fill();
        }
    }
    
    // Create particles
    for (let i = 0; i < particleCount; i++) {
        particles.push(new Particle());
    }
    
    // Mouse move handler
    header.addEventListener('mousemove', (e) => {
        const rect = header.getBoundingClientRect();
        mouseX = e.clientX - rect.left;
        mouseY = e.clientY - rect.top;
    });
    
    header.addEventListener('mouseleave', () => {
        mouseX = -1000;
        mouseY = -1000;
    });
    
    // Animation loop
    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        // Update and draw particles
        particles.forEach(particle => {
            particle.update();
            particle.draw();
        });
        
        // Draw connections
        particles.forEach((particle, i) => {
            particles.slice(i + 1).forEach(otherParticle => {
                const dx = particle.x - otherParticle.x;
                const dy = particle.y - otherParticle.y;
                const distance = Math.sqrt(dx * dx + dy * dy);
                
                if (distance < 120) {
                    ctx.beginPath();
                    ctx.moveTo(particle.x, particle.y);
                    ctx.lineTo(otherParticle.x, otherParticle.y);
                    ctx.strokeStyle = `rgba(230, 57, 70, ${0.2 * (1 - distance / 120)})`;
                    ctx.lineWidth = 1;
                    ctx.stroke();
                }
            });
        });
        
        requestAnimationFrame(animate);
    }
    
    animate();
}

// Initialize tool cards
function initializeToolCards() {
    const toolCards = document.querySelectorAll('.tool-card');
    toolCards.forEach(card => {
        card.addEventListener('click', () => {
            // Don't open modal for coming soon tools
            if (card.classList.contains('coming-soon')) {
                return;
            }
            
            const toolId = card.getAttribute('data-tool');
            openToolModal(toolId);
        });
    });
}

// Initialize modal
function initializeModal() {
    closeBtn.addEventListener('click', closeModal);
    window.addEventListener('click', (e) => {
        if (e.target === modal) {
            closeModal();
        }
    });
}

// Open tool modal
function openToolModal(toolId) {
    selectedTool = toolId;
    const tool = tools[toolId];
    
    if (!tool) return;
    
    modalTitle.textContent = tool.title;
    uploadedFiles = [];
    
    // Reset UI
    fileList.innerHTML = '';
    toolOptions.innerHTML = '';
    processBtn.style.display = 'none';
    
    // Update file input
    const acceptAttr = tool.accepts.join(',');
    fileInput.setAttribute('accept', acceptAttr);
    if (tool.multiple) {
        fileInput.setAttribute('multiple', 'multiple');
    } else {
        fileInput.removeAttribute('multiple');
    }
    
    // Show tool-specific options
    showToolOptions(toolId);
    
    // Show modal and disable body scroll
    modal.classList.add('show');
    document.body.style.overflow = 'hidden';
}

// Close modal
function closeModal() {
    modal.classList.remove('show');
    document.body.style.overflow = '';
    selectedTool = null;
    uploadedFiles = [];
}

// Show tool-specific options
function showToolOptions(toolId) {
    let optionsHTML = '';
    
    switch(toolId) {
        case 'compress':
            optionsHTML = `
                <div class="option-group">
                    <label>Kalite Seviyesi</label>
                    <select id="qualityLevel">
                        <option value="high">Yüksek Kalite</option>
                        <option value="medium" selected>Orta Kalite</option>
                        <option value="low">Düşük Kalite (Daha Küçük Dosya)</option>
                    </select>
                </div>
            `;
            break;
            
        case 'split':
            optionsHTML = `
                <div class="option-group">
                    <label>Bölme Yöntemi</label>
                    <select id="splitMethod">
                        <option value="pages">Belirli Sayfalar</option>
                        <option value="range">Sayfa Aralığı</option>
                        <option value="all">Her Sayfayı Ayrı Dosya</option>
                    </select>
                </div>
                <div class="option-group" id="splitPagesGroup" style="display: none;">
                    <label>Sayfa Numaraları (örn: 1,3,5-10)</label>
                    <input type="text" id="splitPages" placeholder="1,3,5-10">
                </div>
            `;
            break;
            
        case 'rotate':
            optionsHTML = `
                <div class="option-group">
                    <label>Döndürme Açısı</label>
                    <select id="rotateAngle">
                        <option value="90">90° Saat Yönünde</option>
                        <option value="180">180°</option>
                        <option value="270">90° Saat Yönünün Tersi</option>
                    </select>
                </div>
                <div class="option-group">
                    <label>Sayfa Seçimi</label>
                    <select id="rotatePages">
                        <option value="all">Tüm Sayfalar</option>
                        <option value="odd">Tek Sayfalar</option>
                        <option value="even">Çift Sayfalar</option>
                        <option value="custom">Özel</option>
                    </select>
                </div>
            `;
            break;
            
        case 'watermark':
            optionsHTML = `
                <div class="option-group">
                    <label>Filigran Türü</label>
                    <select id="watermarkType">
                        <option value="text">Metin</option>
                        <option value="image">Resim</option>
                    </select>
                </div>
                <div class="option-group" id="watermarkTextGroup">
                    <label>Filigran Metni</label>
                    <input type="text" id="watermarkText" placeholder="Örnek: Gizli">
                </div>
                <div class="option-group">
                    <label>Pozisyon</label>
                    <select id="watermarkPosition">
                        <option value="center">Orta</option>
                        <option value="top-left">Sol Üst</option>
                        <option value="top-right">Sağ Üst</option>
                        <option value="bottom-left">Sol Alt</option>
                        <option value="bottom-right">Sağ Alt</option>
                    </select>
                </div>
                <div class="option-group">
                    <label>Şeffaflık</label>
                    <input type="range" id="watermarkOpacity" min="0" max="100" value="50">
                    <span id="opacityValue">50%</span>
                </div>
            `;
            break;
            
        case 'protect':
            optionsHTML = `
                <div class="option-group">
                    <label>Şifre</label>
                    <input type="password" id="pdfPassword" placeholder="Şifre girin">
                </div>
                <div class="option-group">
                    <label>Şifreyi Tekrar Girin</label>
                    <input type="password" id="pdfPasswordConfirm" placeholder="Şifreyi tekrar girin">
                </div>
            `;
            break;
            
        case 'unlock':
            optionsHTML = `
                <div class="option-group">
                    <label>PDF Şifresi</label>
                    <input type="password" id="unlockPassword" placeholder="PDF şifresini girin">
                </div>
            `;
            break;
            
        case 'page-numbers':
            optionsHTML = `
                <div class="option-group">
                    <label>Pozisyon</label>
                    <select id="pageNumberPosition">
                        <option value="bottom-center">Alt Orta</option>
                        <option value="bottom-left">Alt Sol</option>
                        <option value="bottom-right">Alt Sağ</option>
                        <option value="top-center">Üst Orta</option>
                        <option value="top-left">Üst Sol</option>
                        <option value="top-right">Üst Sağ</option>
                    </select>
                </div>
                <div class="option-group">
                    <label>Başlangıç Numarası</label>
                    <input type="number" id="startNumber" value="1" min="1">
                </div>
            `;
            break;
            
        case 'html-to-pdf':
            optionsHTML = `
                <div class="option-group">
                    <label>URL veya HTML Kodu</label>
                    <input type="text" id="htmlInput" placeholder="https://example.com veya HTML kodu">
                </div>
            `;
            break;
    }
    
    if (optionsHTML) {
        toolOptions.innerHTML = optionsHTML;
        
        // Add event listeners for dynamic options
        if (toolId === 'split') {
            const splitMethod = document.getElementById('splitMethod');
            const splitPagesGroup = document.getElementById('splitPagesGroup');
            splitMethod.addEventListener('change', (e) => {
                if (e.target.value === 'pages' || e.target.value === 'range') {
                    splitPagesGroup.style.display = 'block';
                } else {
                    splitPagesGroup.style.display = 'none';
                }
            });
        }
        
        if (toolId === 'watermark') {
            const watermarkType = document.getElementById('watermarkType');
            const watermarkTextGroup = document.getElementById('watermarkTextGroup');
            watermarkType.addEventListener('change', (e) => {
                if (e.target.value === 'text') {
                    watermarkTextGroup.style.display = 'block';
                } else {
                    watermarkTextGroup.style.display = 'none';
                }
            });
            
            const opacitySlider = document.getElementById('watermarkOpacity');
            const opacityValue = document.getElementById('opacityValue');
            if (opacitySlider && opacityValue) {
                opacitySlider.addEventListener('input', (e) => {
                    opacityValue.textContent = e.target.value + '%';
                });
            }
        }
    }
}

// Initialize file upload
function initializeFileUpload() {
    const dropdownToggle = document.getElementById('dropdownToggle');
    const fileSelectDropdown = document.getElementById('fileSelectDropdown');
    const dropdownItems = document.querySelectorAll('.dropdown-item');
    
    // Click to select file (main button)
    selectFileBtn.addEventListener('click', () => {
        fileInput.click();
    });
    
    // Toggle dropdown
    if (dropdownToggle) {
        dropdownToggle.addEventListener('click', (e) => {
            e.stopPropagation();
            const isOpen = fileSelectDropdown.classList.contains('show');
            
            if (!isOpen) {
                // Calculate position relative to button (fixed positioning)
                const wrapperRect = document.querySelector('.file-select-wrapper').getBoundingClientRect();
                fileSelectDropdown.style.top = (wrapperRect.bottom + 8) + 'px';
                fileSelectDropdown.style.left = wrapperRect.left + 'px';
                fileSelectDropdown.style.minWidth = wrapperRect.width + 'px';
            }
            
            fileSelectDropdown.classList.toggle('show');
        });
    }
    
    // Close dropdown when clicking outside
    document.addEventListener('click', (e) => {
        if (fileSelectDropdown && !fileSelectDropdown.contains(e.target) && 
            !dropdownToggle.contains(e.target) && !selectFileBtn.contains(e.target)) {
            fileSelectDropdown.classList.remove('show');
        }
    });
    
    // Handle dropdown item clicks
    dropdownItems.forEach(item => {
        item.addEventListener('click', (e) => {
            e.stopPropagation();
            
            // Don't allow clicks on coming soon items
            if (item.classList.contains('coming-soon')) {
                return;
            }
            
            const source = item.getAttribute('data-source');
            fileSelectDropdown.classList.remove('show');
            
            switch(source) {
                case 'device':
                    fileInput.click();
                    break;
                case 'google-drive':
                    handleCloudSource('Google Drive');
                    break;
                case 'dropbox':
                    handleCloudSource('Dropbox');
                    break;
                case 'onedrive':
                    handleCloudSource('OneDrive');
                    break;
            }
        });
    });
    
    // File input change
    fileInput.addEventListener('change', handleFileSelect);
    
    // Drag and drop
    fileUploadArea.addEventListener('dragover', (e) => {
        e.preventDefault();
        fileUploadArea.style.borderColor = 'var(--primary-color)';
        fileUploadArea.style.background = '#fff5f5';
    });
    
    fileUploadArea.addEventListener('dragleave', () => {
        fileUploadArea.style.borderColor = 'var(--border-color)';
        fileUploadArea.style.background = 'var(--bg-light)';
    });
    
    fileUploadArea.addEventListener('drop', (e) => {
        e.preventDefault();
        fileUploadArea.style.borderColor = 'var(--border-color)';
        fileUploadArea.style.background = 'var(--bg-light)';
        
        const files = Array.from(e.dataTransfer.files);
        handleFiles(files);
    });
}

// Handle cloud source selection
function handleCloudSource(source) {
    // Note: This is a demo implementation
    // Real implementation would require OAuth authentication and API integration
    alert(`${source} entegrasyonu için OAuth kimlik doğrulama gereklidir.\n\nBu özellik için backend API entegrasyonu yapılmalıdır.`);
    
    // For demo purposes, you could open a file picker dialog
    // In a real implementation, this would redirect to OAuth flow
    // Example: window.location.href = `/auth/${source.toLowerCase().replace(' ', '-')}`;
}

// Handle file select
function handleFileSelect(e) {
    const files = Array.from(e.target.files);
    handleFiles(files);
}

// Security: File size limits (in bytes)
const MAX_FILE_SIZE = 100 * 1024 * 1024; // 100 MB
const MAX_TOTAL_SIZE = 500 * 1024 * 1024; // 500 MB total

// Security: Allowed MIME types
const ALLOWED_MIME_TYPES = {
    '.pdf': ['application/pdf'],
    '.doc': ['application/msword'],
    '.docx': ['application/vnd.openxmlformats-officedocument.wordprocessingml.document'],
    '.ppt': ['application/vnd.ms-powerpoint'],
    '.pptx': ['application/vnd.openxmlformats-officedocument.presentationml.presentation'],
    '.xls': ['application/vnd.ms-excel'],
    '.xlsx': ['application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'],
    '.jpg': ['image/jpeg'],
    '.jpeg': ['image/jpeg'],
    '.png': ['image/png'],
    '.html': ['text/html'],
    '.htm': ['text/html']
};

// Security: Validate file type by extension and MIME type
function validateFileType(file, allowedExtensions) {
    const ext = '.' + file.name.split('.').pop().toLowerCase();
    
    // Check extension
    if (!allowedExtensions.includes(ext)) {
        return { valid: false, error: `İzin verilmeyen dosya tipi: ${ext}` };
    }
    
    // Check MIME type
    const allowedMimes = ALLOWED_MIME_TYPES[ext];
    if (allowedMimes && !allowedMimes.includes(file.type)) {
        return { valid: false, error: `Dosya tipi uyuşmazlığı: ${file.type}` };
    }
    
    return { valid: true };
}

// Security: Validate file size
function validateFileSize(file) {
    if (file.size > MAX_FILE_SIZE) {
        return { valid: false, error: `Dosya boyutu çok büyük. Maksimum: ${MAX_FILE_SIZE / (1024 * 1024)} MB` };
    }
    
    const totalSize = uploadedFiles.reduce((sum, f) => sum + f.size, 0) + file.size;
    if (totalSize > MAX_TOTAL_SIZE) {
        return { valid: false, error: `Toplam dosya boyutu çok büyük. Maksimum: ${MAX_TOTAL_SIZE / (1024 * 1024)} MB` };
    }
    
    return { valid: true };
}

// Security: Sanitize filename (remove path and special characters)
function sanitizeFilename(filename) {
    // Remove path components
    const name = filename.split('/').pop().split('\\').pop();
    // Remove potentially dangerous characters
    return name.replace(/[^a-zA-Z0-9._-]/g, '_');
}

// Handle files
function handleFiles(files) {
    const tool = tools[selectedTool];
    if (!tool) return;
    
    const validFiles = [];
    
    for (const file of files) {
        // Security: Validate file type
        const typeValidation = validateFileType(file, tool.accepts);
        if (!typeValidation.valid) {
            console.warn(`Security: ${typeValidation.error} - ${file.name}`);
            alert(`Güvenlik: ${typeValidation.error}`);
            continue;
        }
        
        // Security: Validate file size
        const sizeValidation = validateFileSize(file);
        if (!sizeValidation.valid) {
            console.warn(`Security: ${sizeValidation.error} - ${file.name}`);
            alert(`Güvenlik: ${sizeValidation.error}`);
            continue;
        }
        
        // Security: Sanitize filename
        file.sanitizedName = sanitizeFilename(file.name);
        
        validFiles.push(file);
    }
    
    if (validFiles.length === 0) {
        alert(`Lütfen geçerli dosya formatı seçin: ${tool.accepts.join(', ')}`);
        return;
    }
    
    if (!tool.multiple && validFiles.length > 1) {
        alert('Bu araç için sadece bir dosya seçebilirsiniz.');
        uploadedFiles = [validFiles[0]];
    } else {
        uploadedFiles = [...uploadedFiles, ...validFiles];
    }
    
    updateFileList();
    updateProcessButton();
}

// Update file list
function updateFileList() {
    fileList.innerHTML = '';
    
    uploadedFiles.forEach((file, index) => {
        const fileItem = document.createElement('div');
        fileItem.className = 'file-item';
        fileItem.innerHTML = `
            <div class="file-item-info">
                <div class="file-item-name">${file.name}</div>
                <div class="file-item-size">${formatFileSize(file.size)}</div>
            </div>
            <button class="file-item-remove" onclick="removeFile(${index})">Kaldır</button>
        `;
        fileList.appendChild(fileItem);
    });
}

// Remove file
function removeFile(index) {
    uploadedFiles.splice(index, 1);
    updateFileList();
    updateProcessButton();
}

// Update process button
function updateProcessButton() {
    const tool = tools[selectedTool];
    if (!tool) return;
    
    if (uploadedFiles.length > 0) {
        processBtn.style.display = 'block';
    } else {
        processBtn.style.display = 'none';
    }
}

// Format file size
function formatFileSize(bytes) {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return Math.round(bytes / Math.pow(k, i) * 100) / 100 + ' ' + sizes[i];
}

// Process button click
processBtn.addEventListener('click', () => {
    if (uploadedFiles.length === 0) {
        alert('Lütfen en az bir dosya seçin.');
        return;
    }
    
    processFiles();
});

// Process files
async function processFiles() {
    const tool = tools[selectedTool];
    if (!tool) return;
    
    // Show loading state
    processBtn.innerHTML = '<span class="loading"></span> İşleniyor...';
    processBtn.disabled = true;
    
    try {
        let resultBlob;
        
        switch(selectedTool) {
            case 'merge':
                resultBlob = await mergePDFs();
                break;
            case 'split':
                resultBlob = await splitPDF();
                break;
            case 'rotate':
                resultBlob = await rotatePDF();
                break;
            case 'organize':
                resultBlob = await organizePDF();
                break;
            case 'compress':
                resultBlob = await compressPDF();
                break;
            case 'protect':
                resultBlob = await protectPDF();
                break;
            case 'watermark':
                resultBlob = await addWatermark();
                break;
            case 'page-numbers':
                resultBlob = await addPageNumbers();
                break;
            case 'jpg-to-pdf':
                resultBlob = await jpgToPDF();
                break;
            default:
                // For tools that require backend (conversions, OCR, etc.)
                showBackendRequiredMessage(tool.title);
                processBtn.innerHTML = 'İşle';
                processBtn.disabled = false;
                return;
        }
        
        if (resultBlob) {
            downloadFile(resultBlob, getOutputFileName());
            processBtn.innerHTML = 'İşle';
            processBtn.disabled = false;
        }
    } catch (error) {
        console.error('Error processing PDF:', error);
        alert('Bir hata oluştu: ' + error.message);
        processBtn.innerHTML = 'İşle';
        processBtn.disabled = false;
    }
}

// Merge PDFs
async function mergePDFs() {
    const { PDFDocument } = PDFLib;
    const mergedPdf = await PDFDocument.create();
    
    for (const file of uploadedFiles) {
        const arrayBuffer = await file.arrayBuffer();
        const pdf = await PDFDocument.load(arrayBuffer);
        const pages = await mergedPdf.copyPages(pdf, pdf.getPageIndices());
        pages.forEach((page) => mergedPdf.addPage(page));
    }
    
    const pdfBytes = await mergedPdf.save();
    return new Blob([pdfBytes], { type: 'application/pdf' });
}

// Split PDF
async function splitPDF() {
    const file = uploadedFiles[0];
    const arrayBuffer = await file.arrayBuffer();
    const { PDFDocument } = PDFLib;
    const sourcePdf = await PDFDocument.load(arrayBuffer);
    const totalPages = sourcePdf.getPageCount();
    
    const splitMethod = document.getElementById('splitMethod')?.value || 'all';
    
    if (splitMethod === 'all') {
        // Split into individual pages
        const pdfs = [];
        for (let i = 0; i < totalPages; i++) {
            const newPdf = await PDFDocument.create();
            const [page] = await newPdf.copyPages(sourcePdf, [i]);
            newPdf.addPage(page);
            const pdfBytes = await newPdf.save();
            pdfs.push(new Blob([pdfBytes], { type: 'application/pdf' }));
        }
        // Download all as zip (simplified: download first page)
        return pdfs[0];
    } else {
        // Split by pages or range
        const pagesInput = document.getElementById('splitPages')?.value || '';
        const pages = parsePageRange(pagesInput, totalPages);
        
        const newPdf = await PDFDocument.create();
        const copiedPages = await newPdf.copyPages(sourcePdf, pages);
        copiedPages.forEach((page) => newPdf.addPage(page));
        
        const pdfBytes = await newPdf.save();
        return new Blob([pdfBytes], { type: 'application/pdf' });
    }
}

// Rotate PDF
async function rotatePDF() {
    const file = uploadedFiles[0];
    const arrayBuffer = await file.arrayBuffer();
    const { PDFDocument, degrees } = PDFLib;
    const pdfDoc = await PDFDocument.load(arrayBuffer);
    
    const angle = parseInt(document.getElementById('rotateAngle')?.value || '90');
    const pagesOption = document.getElementById('rotatePages')?.value || 'all';
    const totalPages = pdfDoc.getPageCount();
    
    let pagesToRotate = [];
    if (pagesOption === 'all') {
        pagesToRotate = Array.from({ length: totalPages }, (_, i) => i);
    } else if (pagesOption === 'odd') {
        pagesToRotate = Array.from({ length: totalPages }, (_, i) => i).filter(i => i % 2 === 0);
    } else if (pagesOption === 'even') {
        pagesToRotate = Array.from({ length: totalPages }, (_, i) => i).filter(i => i % 2 === 1);
    }
    
    pagesToRotate.forEach((pageIndex) => {
        const page = pdfDoc.getPage(pageIndex);
        page.setRotation(degrees(angle));
    });
    
    const pdfBytes = await pdfDoc.save();
    return new Blob([pdfBytes], { type: 'application/pdf' });
}

// Organize PDF (reorder, delete pages)
async function organizePDF() {
    // For now, just return the original PDF
    // Full implementation would require UI for page reordering
    const file = uploadedFiles[0];
    return file;
}

// Compress PDF (simplified - actual compression requires backend)
async function compressPDF() {
    const file = uploadedFiles[0];
    const arrayBuffer = await file.arrayBuffer();
    const { PDFDocument } = PDFLib;
    const pdfDoc = await PDFDocument.load(arrayBuffer);
    
    // Re-save to potentially reduce size (basic optimization)
    const pdfBytes = await pdfDoc.save({ useObjectStreams: false });
    return new Blob([pdfBytes], { type: 'application/pdf' });
}

// Protect PDF with password
async function protectPDF() {
    const password = document.getElementById('pdfPassword')?.value;
    const passwordConfirm = document.getElementById('pdfPasswordConfirm')?.value;
    
    if (!password || password !== passwordConfirm) {
        throw new Error('Şifreler eşleşmiyor!');
    }
    
    // Note: pdf-lib doesn't support password protection directly
    // This would require backend or different library
    alert('PDF şifreleme özelliği için backend API gereklidir. pdf-lib bu özelliği desteklemiyor.');
    return null;
}

// Add watermark
async function addWatermark() {
    const file = uploadedFiles[0];
    const arrayBuffer = await file.arrayBuffer();
    const { PDFDocument, rgb } = PDFLib;
    const pdfDoc = await PDFDocument.load(arrayBuffer);
    
    const watermarkType = document.getElementById('watermarkType')?.value || 'text';
    const watermarkText = document.getElementById('watermarkText')?.value || 'Gizli';
    const position = document.getElementById('watermarkPosition')?.value || 'center';
    const opacity = parseInt(document.getElementById('watermarkOpacity')?.value || '50') / 100;
    
    const pages = pdfDoc.getPages();
    const font = await pdfDoc.embedFont(PDFLib.StandardFonts.Helvetica);
    
    pages.forEach((page) => {
        const { width, height } = page.getSize();
        let x, y;
        
        switch(position) {
            case 'center':
                x = width / 2;
                y = height / 2;
                break;
            case 'top-left':
                x = 50;
                y = height - 50;
                break;
            case 'top-right':
                x = width - 50;
                y = height - 50;
                break;
            case 'bottom-left':
                x = 50;
                y = 50;
                break;
            case 'bottom-right':
                x = width - 50;
                y = 50;
                break;
        }
        
        page.drawText(watermarkText, {
            x: x - 50,
            y: y,
            size: 50,
            font: font,
            color: rgb(0.7, 0.7, 0.7),
            opacity: opacity,
            rotate: PDFLib.degrees(-45),
        });
    });
    
    const pdfBytes = await pdfDoc.save();
    return new Blob([pdfBytes], { type: 'application/pdf' });
}

// Add page numbers
async function addPageNumbers() {
    const file = uploadedFiles[0];
    const arrayBuffer = await file.arrayBuffer();
    const { PDFDocument, rgb } = PDFLib;
    const pdfDoc = await PDFDocument.load(arrayBuffer);
    
    const position = document.getElementById('pageNumberPosition')?.value || 'bottom-center';
    const startNumber = parseInt(document.getElementById('startNumber')?.value || '1');
    
    const pages = pdfDoc.getPages();
    const font = await pdfDoc.embedFont(PDFLib.StandardFonts.Helvetica);
    
    pages.forEach((page, index) => {
        const { width, height } = page.getSize();
        const pageNumber = startNumber + index;
        let x, y;
        
        switch(position) {
            case 'bottom-center':
                x = width / 2;
                y = 30;
                break;
            case 'bottom-left':
                x = 30;
                y = 30;
                break;
            case 'bottom-right':
                x = width - 30;
                y = 30;
                break;
            case 'top-center':
                x = width / 2;
                y = height - 30;
                break;
            case 'top-left':
                x = 30;
                y = height - 30;
                break;
            case 'top-right':
                x = width - 30;
                y = height - 30;
                break;
        }
        
        page.drawText(pageNumber.toString(), {
            x: x - 10,
            y: y - 5,
            size: 12,
            font: font,
            color: rgb(0, 0, 0),
        });
    });
    
    const pdfBytes = await pdfDoc.save();
    return new Blob([pdfBytes], { type: 'application/pdf' });
}

// Convert JPG to PDF
async function jpgToPDF() {
    const { PDFDocument } = PDFLib;
    const pdfDoc = await PDFDocument.create();
    
    for (const file of uploadedFiles) {
        const arrayBuffer = await file.arrayBuffer();
        let image;
        
        if (file.type === 'image/png') {
            image = await pdfDoc.embedPng(arrayBuffer);
        } else {
            image = await pdfDoc.embedJpg(arrayBuffer);
        }
        
        const page = pdfDoc.addPage();
        const { width, height } = image.scale(1);
        page.setSize(width, height);
        page.drawImage(image, {
            x: 0,
            y: 0,
            width: width,
            height: height,
        });
    }
    
    const pdfBytes = await pdfDoc.save();
    return new Blob([pdfBytes], { type: 'application/pdf' });
}

// Helper function to parse page ranges
function parsePageRange(input, maxPages) {
    const pages = [];
    const parts = input.split(',');
    
    parts.forEach(part => {
        part = part.trim();
        if (part.includes('-')) {
            const [start, end] = part.split('-').map(n => parseInt(n.trim()) - 1);
            for (let i = start; i <= end && i < maxPages; i++) {
                if (i >= 0) pages.push(i);
            }
        } else {
            const page = parseInt(part) - 1;
            if (page >= 0 && page < maxPages) pages.push(page);
        }
    });
    
    return pages.length > 0 ? pages : [0];
}

// Get output file name
function getOutputFileName() {
    const tool = tools[selectedTool];
    const baseName = uploadedFiles[0]?.name.split('.')[0] || 'output';
    const timestamp = new Date().getTime();
    return `${baseName}_${tool.title.replace(/\s+/g, '_')}_${timestamp}.pdf`;
}

// Download file
function downloadFile(blob, filename) {
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    
    alert('Dosya başarıyla indirildi!');
}

// Show message for tools requiring backend
function showBackendRequiredMessage(toolName) {
    alert(`${toolName} özelliği için backend API entegrasyonu gereklidir.\n\nŞu anda çalışan özellikler:\n- PDF Birleştirme\n- PDF Bölme\n- PDF Döndürme\n- Filigran Ekleme\n- Sayfa Numaraları\n- JPG'den PDF'e\n- PDF Sıkıştırma (temel)`);
}

// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

