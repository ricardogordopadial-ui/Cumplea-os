let currentMonth = 0;
let months = [];

const BOOK_STORAGE_KEY = 'bookMonths';
const COVER_STORAGE_KEY = 'bookCoverPhoto';
const SPECIAL_PLACE_COORDS = [40.447022, -3.666234];
const SPECIAL_PLACES = {
    january2023: {
        coords: [40.447022, -3.666234],
        markerEmoji: '💘',
        note: 'Este es el lugar donde nos conocimos 💘',
        buttonText: 'Te voy a llevar a un lugar mágico',
        title: 'Nuestro lugar especial'
    },
    august2023: {
        coords: [40.407311, -3.710293],
        markerEmoji: '💍',
        note: 'Aqui empezo nuestra relacion 💍',
        buttonText: 'El comienzo de algo bonito',
        title: 'Camino donde comenzó nuestro para siempre 💍'
    }
};
let touchStartX = 0;
let touchStartY = 0;
let touchTracking = false;

const LOVE_PHRASES = [
    'Desde el primer momento, supe que eras especial.',
    'Cada día contigo es un regalo que atesoro.',
    'Tu sonrisa ilumina mi mundo entero.',
    'Eres mi mayor bendición y mi razón de ser.',
    'Contigo, cada momento es una aventura mágica.',
    'Mi corazón te pertenece completamente.',
    'Eres la razón de mis sonrisas más bonitas.',
    'Te amo más con cada amanecer.',
    'Eres mi mejor decisión en la vida.',
    'Juntos formamos el cuento de hadas perfecto.'
];
const PHRASE_EMOJIS = ['💖', '💕', '💘', '💞', '💓', '🥰', '😍', '💗', '💝', '🧡', '🌹', '✨'];

function createDefaultMonth(referenceDate = new Date()) {
    const monthNames = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];

    return {
        id: Date.now() + Math.floor(Math.random() * 10000),
        month: monthNames[referenceDate.getMonth()],
        year: referenceDate.getFullYear(),
        phrase: LOVE_PHRASES[Math.floor(Math.random() * LOVE_PHRASES.length)],
        images: ['', '', '', ''],
        text: '',
        coordinates: [...SPECIAL_PLACE_COORDS],
        songUrl: '',
        videoUrl: '',
        showPhotos: true,
        showText: true,
        showMusic: false,
        showVideo: false
    };
}

function initializeMonths() {
    const startDate = new Date(2023, 0, 1);
    const endDate = new Date(2026, 5, 1);

    months = [];
    const monthNames = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];

    let currentDate = new Date(startDate);
    let phraseIndex = 0;

    while (currentDate <= endDate) {
        months.push({
            id: months.length,
            month: monthNames[currentDate.getMonth()],
            year: currentDate.getFullYear(),
            phrase: LOVE_PHRASES[phraseIndex % LOVE_PHRASES.length],
            images: ['', '', '', ''],
            text: '',
            coordinates: [...SPECIAL_PLACE_COORDS],
            songUrl: '',
            videoUrl: '',
            showPhotos: true,
            showText: true,
            showMusic: false,
            showVideo: false
        });

        currentDate.setMonth(currentDate.getMonth() + 1);
        phraseIndex += 1;
    }

    persistMonths();
}

function persistMonths() {
    localStorage.setItem(BOOK_STORAGE_KEY, JSON.stringify(months));
}

function saveMonthData(index) {
    const textArea = document.getElementById(`text-${index}`);
    if (textArea) {
        months[index].text = textArea.value;
    }
    persistMonths();
}

function normalizeMonthData(monthData) {
    return {
        ...monthData,
        images: Array.isArray(monthData.images) ? monthData.images : ['', '', '', ''],
        text: monthData.text || '',
        coordinates: Array.isArray(monthData.coordinates) && monthData.coordinates.length === 2
            ? monthData.coordinates
            : [...SPECIAL_PLACE_COORDS],
        songUrl: monthData.songUrl || '',
        videoUrl: monthData.videoUrl || '',
        showPhotos: monthData.showPhotos !== false,
        showText: monthData.showText !== false,
        showMusic: monthData.showMusic === true,
        showVideo: monthData.showVideo === true
    };
}

function escapeAttribute(value) {
    return String(value || '')
        .replace(/&/g, '&amp;')
        .replace(/"/g, '&quot;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;');
}

function getYouTubeEmbedUrl(url) {
    if (!url) return '';
    const trimmed = url.trim();
    const shortMatch = trimmed.match(/youtu\.be\/([^?&/]+)/i);
    if (shortMatch) return `https://www.youtube.com/embed/${shortMatch[1]}`;
    const fullMatch = trimmed.match(/[?&]v=([^&]+)/i);
    if (fullMatch) return `https://www.youtube.com/embed/${fullMatch[1]}`;
    const embedMatch = trimmed.match(/youtube\.com\/embed\/([^?&/]+)/i);
    if (embedMatch) return `https://www.youtube.com/embed/${embedMatch[1]}`;
    return '';
}

function renderMediaPreview(url, type) {
    if (!url) return '';
    if (type === 'video') {
        const ytEmbed = getYouTubeEmbedUrl(url);
        if (ytEmbed) {
            return `<iframe class="media-embed video-embed" src="${ytEmbed}" loading="lazy" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>`;
        }
        return `<a class="media-link" href="${escapeAttribute(url)}" target="_blank" rel="noopener noreferrer">Abrir video</a>`;
    }
    return `<a class="media-link" href="${escapeAttribute(url)}" target="_blank" rel="noopener noreferrer">Abrir música</a>`;
}

function rerenderCurrentMonth(direction = 'forward') {
    renderMonths();
    showMonth(currentMonth, direction);
}

function addMultimediaOption(index) {
    const select = document.getElementById(`addType-${index}`);
    if (!select) return;
    const option = select.value;
    if (!option) return;

    if (option === 'fotos') months[index].showPhotos = true;
    if (option === 'texto') months[index].showText = true;
    if (option === 'musica') months[index].showMusic = true;
    if (option === 'video') months[index].showVideo = true;

    persistMonths();
    rerenderCurrentMonth();
}

function removeMultimediaOption(index) {
    const select = document.getElementById(`removeType-${index}`);
    if (!select) return;
    const option = select.value;
    if (!option) return;

    if (option === 'fotos') {
        months[index].images = ['', '', '', ''];
        months[index].showPhotos = false;
    }
    if (option === 'texto') {
        months[index].text = '';
        months[index].showText = false;
    }
    if (option === 'musica') {
        months[index].songUrl = '';
        months[index].showMusic = false;
    }
    if (option === 'video') {
        months[index].videoUrl = '';
        months[index].showVideo = false;
    }

    persistMonths();
    rerenderCurrentMonth();
}

function saveSong(index) {
    const input = document.getElementById(`songUrl-${index}`);
    if (!input) return;
    months[index].songUrl = input.value.trim();
    persistMonths();
    rerenderCurrentMonth();
}

function saveVideo(index) {
    const input = document.getElementById(`videoUrl-${index}`);
    if (!input) return;
    months[index].videoUrl = input.value.trim();
    persistMonths();
    rerenderCurrentMonth();
}

function clearSong(index) {
    months[index].songUrl = '';
    persistMonths();
    rerenderCurrentMonth();
}

function clearVideo(index) {
    months[index].videoUrl = '';
    persistMonths();
    rerenderCurrentMonth();
}

function saveCurrentMonth() {
    saveMonthData(currentMonth);
    alert('Mes guardado correctamente.');
}

function getPhraseWithEmoji(phrase, index) {
    const emoji = PHRASE_EMOJIS[index % PHRASE_EMOJIS.length];
    return `${phrase} ${emoji}`;
}

function renderMonths() {
    const container = document.getElementById('monthsContainer');
    container.innerHTML = '';

    months.forEach((monthData, index) => {
        const safeMonth = normalizeMonthData(monthData);
        months[index] = safeMonth;
        const isFirst = index === 0;
        const isLast = index === months.length - 1;

        const monthPage = document.createElement('div');
        monthPage.className = `month-page ${index === currentMonth ? 'active' : ''}`;
        monthPage.id = `month-${index}`;

        monthPage.innerHTML = `
            <div class="heart-pulse-bg" aria-hidden="true">
                ${Array.from({ length: 12 }, (_, heartIndex) => `<span class="pulse-heart pulse-heart-${heartIndex + 1}">💖</span>`).join('')}
            </div>
            <div class="month-header">
                <h2 class="month-title">${monthData.month} ${monthData.year}</h2>
                <p class="love-quote">"${getPhraseWithEmoji(safeMonth.phrase, index)}"</p>
                ${(safeMonth.month === 'Enero' && safeMonth.year === 2023) ? `
                <button class="special-button title-map-btn" onclick="openSpecialPlace('january2023')">
                    <i class="fas fa-map-location-dot"></i> ${SPECIAL_PLACES.january2023.buttonText}
                </button>` : ''}
                ${(safeMonth.month === 'Agosto' && safeMonth.year === 2023) ? `
                <button class="special-button title-map-btn" onclick="openSpecialPlace('august2023')">
                    <i class="fas fa-map-location-dot"></i> ${SPECIAL_PLACES.august2023.buttonText}
                </button>` : ''}
            </div>

            <div class="month-content">
                ${safeMonth.showPhotos ? `
                <div class="content-section photos-section">
                    <h3 class="section-title">📷 Nuestros momentos</h3>
                    <div class="image-gallery">
                        ${[0, 1, 2, 3].map((i) => `
                            <div class="image-placeholder" onclick="triggerImageUpload(${index}, ${i})">
                                ${safeMonth.images[i] ? `<img src="${safeMonth.images[i]}" alt="Imagen ${i + 1}">` : '<i class="fas fa-plus" style="font-size:2rem;color:#FF6B35;"></i>'}
                            </div>
                        `).join('')}
                    </div>
                    <input type="file" class="image-input" id="imageInput-${index}" accept="image/*">
                </div>` : ''}

                ${safeMonth.showText ? `
                <div class="content-section text-section">
                    <h3 class="section-title">💬 Mi historia contigo este mes</h3>
                    <textarea class="text-area" id="text-${index}" placeholder="Cuéntame qué pasó este mes...">${safeMonth.text || ''}</textarea>
                </div>` : ''}

                ${(safeMonth.showMusic || safeMonth.showVideo) ? `
                <div class="content-section media-content">
                    <h3 class="section-title">🎵 Música y 🎬 Video</h3>
                    ${safeMonth.showMusic ? `
                    <div class="media-row">
                        <input type="url" class="media-input" id="songUrl-${index}" placeholder="Enlace de música" value="${escapeAttribute(safeMonth.songUrl)}">
                        <button class="mini-btn" onclick="saveSong(${index})">Guardar</button>
                        <button class="mini-btn danger" onclick="clearSong(${index})">Quitar</button>
                    </div>
                    ${safeMonth.songUrl ? `<div class="media-preview">${renderMediaPreview(safeMonth.songUrl, 'song')}</div>` : ''}` : ''}
                    ${safeMonth.showVideo ? `
                    <div class="media-row">
                        <input type="url" class="media-input" id="videoUrl-${index}" placeholder="Enlace de video" value="${escapeAttribute(safeMonth.videoUrl)}">
                        <button class="mini-btn" onclick="saveVideo(${index})">Guardar</button>
                        <button class="mini-btn danger" onclick="clearVideo(${index})">Quitar</button>
                    </div>
                    ${safeMonth.videoUrl ? `<div class="media-preview">${renderMediaPreview(safeMonth.videoUrl, 'video')}</div>` : ''}` : ''}
                </div>` : ''}

                ${(!safeMonth.showPhotos && !safeMonth.showText && !safeMonth.showMusic && !safeMonth.showVideo) ? `
                <div class="content-section empty-month-note">
                    <p class="empty-note-text">Este mes no tiene recuerdos añadidos todavía.</p>
                </div>` : ''}
            </div>

            ${isLast ? '<p class="continuara-corner">Continuará...</p>' : ''}

            <div class="controls">
                <div class="nav-buttons">
                    <button class="nav-btn" onclick="previousMonth()">← Anterior</button>
                    <button class="nav-btn" onclick="nextMonth()" ${isLast ? 'disabled' : ''}>Siguiente →</button>
                </div>
                <div class="month-counter">${index + 1} de ${months.length}</div>
                <div class="action-buttons">
                    <button class="action-btn cover" onclick="goToCover()"><i class="fas fa-book-open"></i> Ir a portada</button>
                    <button class="action-btn save" onclick="saveCurrentMonth()"><i class="fas fa-floppy-disk"></i> Guardar</button>
                    <div class="multi-tool">
                        <button class="action-btn media" onclick="addMultimediaOption(${index})"><i class="fas fa-plus"></i> Añadir multimedia</button>
                        <select class="media-select" id="addType-${index}">
                            <option value="musica">musica</option>
                            <option value="texto">texto</option>
                            <option value="video">videos</option>
                            <option value="fotos">fotos</option>
                        </select>
                    </div>
                    <div class="multi-tool">
                        <button class="action-btn neutral" onclick="removeMultimediaOption(${index})"><i class="fas fa-minus"></i> Quitar multimedia</button>
                        <select class="media-select" id="removeType-${index}">
                            <option value="fotos">fotos</option>
                            <option value="texto">texto</option>
                            <option value="video">video</option>
                            <option value="musica">musica</option>
                        </select>
                    </div>
                    <button class="action-btn" onclick="addMonth()"><i class="fas fa-plus"></i> Añadir mes</button>
                    <button class="action-btn delete" onclick="deleteMonth(${index})" ${months.length <= 1 ? 'disabled' : ''}><i class="fas fa-trash"></i> Eliminar</button>
                </div>
            </div>
        `;

        container.appendChild(monthPage);

        const textArea = monthPage.querySelector(`#text-${index}`);
        if (textArea) {
            textArea.addEventListener('change', () => saveMonthData(index));
            textArea.addEventListener('blur', () => saveMonthData(index));
        }

        const imageInput = monthPage.querySelector(`#imageInput-${index}`);
        if (imageInput) {
            imageInput.addEventListener('change', (e) => handleImageUpload(e, index));
        }
    });
}

function triggerImageUpload(monthIndex, imageIndex) {
    const input = document.getElementById(`imageInput-${monthIndex}`);
    input.dataset.imageIndex = imageIndex;
    input.click();
}

function handleImageUpload(e, monthIndex) {
    const file = e.target.files[0];
    const imageIndex = Number(e.target.dataset.imageIndex);

    if (!file || Number.isNaN(imageIndex)) {
        return;
    }

    const reader = new FileReader();
    reader.onload = (event) => {
        months[monthIndex].images[imageIndex] = event.target.result;
        persistMonths();
        const animation = monthIndex > currentMonth ? 'forward' : 'backward';
        renderMonths();
        showMonth(monthIndex, animation);
    };
    reader.readAsDataURL(file);
}

function showMonth(index, direction = 'forward') {
    const incomingPage = document.getElementById(`month-${index}`);
    if (!incomingPage) return;

    const currentActive = document.querySelector('.month-page.active');
    const isBackward = direction === 'backward';

    if (currentActive && currentActive !== incomingPage) {
        currentActive.classList.add('animating', isBackward ? 'page-out-backward' : 'page-out-forward');
        currentActive.classList.remove('active');

        currentActive.addEventListener('animationend', () => {
            currentActive.classList.remove('animating', 'page-out-forward', 'page-out-backward');
        }, { once: true });
    }

    incomingPage.classList.add('active', 'animating', isBackward ? 'page-in-backward' : 'page-in-forward');
    incomingPage.addEventListener('animationend', () => {
        incomingPage.classList.remove('animating', 'page-in-forward', 'page-in-backward');
    }, { once: true });
}

function previousMonth() {
    if (currentMonth > 0) {
        currentMonth -= 1;
        showMonth(currentMonth, 'backward');
        return;
    }
    goToCover();
}

function nextMonth() {
    if (currentMonth < months.length - 1) {
        currentMonth += 1;
        showMonth(currentMonth, 'forward');
    }
}

function addMonth() {
    const base = months[months.length - 1] || createDefaultMonth();
    const refDate = new Date(base.year, monthNameToIndex(base.month), 1);
    refDate.setMonth(refDate.getMonth() + 1);

    const newMonth = createDefaultMonth(refDate);

    months.push(newMonth);
    persistMonths();

    currentMonth = months.length - 1;
    renderMonths();
    showMonth(currentMonth, 'forward');
}

function deleteMonth(index) {
    if (months.length <= 1) return;

    months.splice(index, 1);
    if (currentMonth >= months.length) {
        currentMonth = months.length - 1;
    }

    persistMonths();
    renderMonths();
    showMonth(currentMonth, 'backward');
}

function monthNameToIndex(monthName) {
    const monthNames = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];
    const idx = monthNames.indexOf(monthName);
    return idx >= 0 ? idx : 0;
}

function buildEmbedMapUrl(coords) {
    return `https://maps.google.com/maps?q=${coords[0]},${coords[1]}&z=16&output=embed`;
}

function openSpecialPlace(placeKey) {
    const place = SPECIAL_PLACES[placeKey];
    if (!place) return;

    const modal = document.getElementById('mapModal');
    modal.classList.add('active');

    const coordsLabel = document.querySelector('.special-coords');
    if (coordsLabel) {
        const latDir = place.coords[0] >= 0 ? 'N' : 'S';
        const lngDir = place.coords[1] >= 0 ? 'E' : 'O';
        coordsLabel.textContent = `Latitud: ${Math.abs(place.coords[0]).toFixed(6)}° ${latDir} | Longitud: ${Math.abs(place.coords[1]).toFixed(6)}° ${lngDir}`;
    }

    const placeMapFrame = document.getElementById('placeMapFrame');
    if (placeMapFrame) {
        placeMapFrame.src = buildEmbedMapUrl(place.coords);
    }

    const modalTitle = document.querySelector('.modal-title');
    if (modalTitle) {
        modalTitle.innerHTML = `<i class="fas fa-map-marker-alt"></i> ${place.title}`;
    }

    const marker = document.querySelector('.map-heart-pointer');
    if (marker) {
        marker.textContent = place.markerEmoji;
    }

    const note = document.querySelector('.special-place-note');
    if (note) {
        note.textContent = place.note;
    }
}

function closeMapModal() {
    document.getElementById('mapModal').classList.remove('active');
}

function startBook() {
    document.getElementById('coverPage').style.display = 'none';
    document.getElementById('bookContainer').classList.add('active');
    currentMonth = Math.min(currentMonth, months.length - 1);
    showMonth(currentMonth, 'forward');
}

function goToCover() {
    document.getElementById('bookContainer').classList.remove('active');
    document.getElementById('coverPage').style.display = 'flex';
}

function isBookActive() {
    const bookContainer = document.getElementById('bookContainer');
    return bookContainer && bookContainer.classList.contains('active');
}

function registerPageNavigationInputs() {
    document.addEventListener('keydown', (event) => {
        const modalOpen = document.getElementById('mapModal').classList.contains('active');

        if (!isBookActive()) return;
        if (modalOpen) return;

        const target = event.target;
        const isTypingTarget = target && (
            target.tagName === 'TEXTAREA' ||
            target.tagName === 'INPUT' ||
            target.isContentEditable
        );
        if (isTypingTarget) return;

        if (event.key === 'ArrowLeft') {
            event.preventDefault();
            previousMonth();
        } else if (event.key === 'ArrowRight') {
            event.preventDefault();
            nextMonth();
        }
    });

    const monthsContainer = document.getElementById('monthsContainer');
    if (!monthsContainer) return;

    monthsContainer.addEventListener('touchstart', (event) => {
        if (!isBookActive()) return;
        if (document.getElementById('mapModal').classList.contains('active')) return;
        if (!event.touches || event.touches.length === 0) return;

        const touch = event.touches[0];
        touchStartX = touch.clientX;
        touchStartY = touch.clientY;
        touchTracking = true;
    }, { passive: true });

    monthsContainer.addEventListener('touchend', (event) => {
        if (!touchTracking || !isBookActive()) return;
        touchTracking = false;
        if (document.getElementById('mapModal').classList.contains('active')) return;
        if (!event.changedTouches || event.changedTouches.length === 0) return;

        const touch = event.changedTouches[0];
        const deltaX = touch.clientX - touchStartX;
        const deltaY = touch.clientY - touchStartY;

        const horizontalThreshold = 55;
        const verticalTolerance = 80;
        if (Math.abs(deltaX) < horizontalThreshold) return;
        if (Math.abs(deltaY) > verticalTolerance) return;

        if (deltaX < 0) {
            nextMonth();
        } else {
            previousMonth();
        }
    }, { passive: true });

}

function loadBook() {
    const saved = localStorage.getItem(BOOK_STORAGE_KEY);
    if (saved) {
        try {
            months = JSON.parse(saved);
        } catch {
            months = [];
        }
    }

    if (!Array.isArray(months) || months.length === 0) {
        initializeMonths();
    }
    months = months.map((monthData) => normalizeMonthData(monthData));

    renderMonths();
}

function generateCoverEmojis() {
    const layer = document.getElementById('coverEmojiLayer');
    const emojis = ['💍', '💏', '💘', '💖', '💞', '💕', '😍', '🥰', '💌', '🌹', '✨', '🧸', '❤️', '🌟', '💝', '🐻', '💗', '🌸'];

    layer.innerHTML = '';

    for (let i = 0; i < 54; i += 1) {
        const span = document.createElement('span');
        span.className = 'emoji-animation';
        span.textContent = emojis[i % emojis.length];

        let left = Math.random() * 92 + 4;
        let top = Math.random() * 86 + 4;
        let tries = 0;
        while (left > 26 && left < 74 && top > 20 && top < 84 && tries < 12) {
            left = Math.random() * 92 + 4;
            top = Math.random() * 86 + 4;
            tries += 1;
        }

        span.style.left = `${left}%`;
        span.style.top = `${top}%`;
        span.style.animationDelay = `${Math.random() * 4}s`;
        span.style.animationDuration = `${3 + Math.random() * 2.2}s`;
        span.style.fontSize = `${1.2 + Math.random() * 2.2}rem`;
        layer.appendChild(span);
    }
}

function applyCoverPhoto(photoData) {
    const img = document.getElementById('coverPhoto');
    const placeholder = document.getElementById('coverPhotoPlaceholder');

    if (photoData) {
        img.src = photoData;
        img.classList.add('show');
        placeholder.classList.add('hide');
    } else {
        img.removeAttribute('src');
        img.classList.remove('show');
        placeholder.classList.remove('hide');
    }
}

function loadCoverPhoto() {
    const savedPhoto = localStorage.getItem(COVER_STORAGE_KEY);
    applyCoverPhoto(savedPhoto);

    const coverInput = document.getElementById('coverPhotoInput');
    coverInput.addEventListener('change', (event) => {
        const file = event.target.files[0];
        if (!file) return;

        const reader = new FileReader();
        reader.onload = (e) => {
            const photoData = e.target.result;
            localStorage.setItem(COVER_STORAGE_KEY, photoData);
            applyCoverPhoto(photoData);
        };
        reader.readAsDataURL(file);
    });
}

loadBook();
generateCoverEmojis();
loadCoverPhoto();
registerPageNavigationInputs();


