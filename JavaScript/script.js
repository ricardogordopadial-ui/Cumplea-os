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
    'Me gustas en todas mis versiones, pero más cuando estoy contigo.',
    'Tu risa es mi canción favorita y siempre quiero el estribillo.',
    'Contigo, la vida se siente más ligera, más bonita y más nuestra.',
    'Eres ese “sí” que le doy al mundo cada mañana.',
    'A tu lado, hasta lo cotidiano se vuelve especial.',
    'Tu abrazo tiene la calma que no sabía que necesitaba.',
    'Si me pierdo, que sea en tus ojos y que nadie me encuentre.',
    'Eres mi casualidad favorita y mi destino más querido.',
    'Te elijo sin prisa, pero con ganas, todos los días.',
    'Mi lugar favorito siempre termina siendo cerca de ti.',
    'Que nunca nos falten planes tontos y besos serios.',
    'Tus besos son mi manera favorita de olvidarme del reloj.',
    'Si el amor tuviera dirección, sería la tuya.',
    'Eres mi “quédate” incluso cuando no lo digo.',
    'Contigo, mi corazón aprendió a sonreír de verdad.',
    'Tu mirada me recuerda que lo bonito sí existe.',
    'Eres la mejor parte de mi historia y lo sabes.',
    'Te pienso y se me acomoda el día entero.',
    'Tu nombre suena a hogar en mi cabeza.',
    'No hay suerte más grande que haberte encontrado.',
    'Me encantan tus manías; ya son parte de mí.',
    'Eres mi persona favorita para hacer nada… y todo.',
    'Que la vida nos siga sorprendiendo juntos.',
    'Tu sonrisa me salva, siempre, sin pedir permiso.',
    'Eres mi paz y también mi aventura.',
    'Me enamoras con detalles que ni tú notas.',
    'Donde estés tú, ahí quiero mis domingos.',
    'Eres el “por fin” que no sabía que esperaba.',
    'Tu amor me queda perfecto.',
    'Me haces creer en lo bonito sin esfuerzo.',
    'En tus brazos caben mis miedos y se van quedando pequeños.',
    'Eres el motivo por el que me sale querer mejor.',
    'Me gusta cómo me miras: como si todo fuera posible.',
    'Gracias por ser mi lugar seguro y mi locura favorita.',
    'Contigo, cada mes tiene algo que celebrar.',
    'Si me dan a elegir, te elijo en todas las vidas.',
    'Tu amor tiene la medida exacta de lo que necesitaba.',
    'Eres mi mejor “qué tal si…” hecho realidad.',
    'Me haces feliz de una manera tranquila y eterna.',
    'Tus abrazos deberían recetarlos en las farmacias.',
    'Eres el mensaje que siempre quiero leer.',
    'A tu lado, hasta el silencio se siente bonito.',
    'Me encanta que seamos equipo.',
    'Tu existencia es mi suerte diaria.',
    'Eres mi chispa, mi calma y mi casa.',
    'Contigo, los días grises se pintan solos.',
    'No sé qué hice para merecerte, pero gracias.',
    'Tú y yo: mi combinación favorita.',
    'Eres el detalle más grande de mi vida.',
    'Que nunca nos falte amor… ni ganas.',
    'Mi corazón te reconoce incluso con los ojos cerrados.',
    'Tu amor me hace valiente.',
    'Eres el beso que siempre quiero repetir.',
    'Mi parte favorita del día es cuando apareces.',
    'Tu risa me cura el cansancio.',
    'Te amo en presente, en futuro y en cada plan.',
    'Eres mi sorpresa bonita.',
    'Te quiero así: sin medida y con intención.',
    'Contigo, mi vida tiene brillo.',
    'Eres la coincidencia más perfecta.',
    'A tu lado, el mundo se siente menos mundo y más nosotros.',
    'Que este amor crezca sin prisa, pero sin pausa.',
    'Tu mano en la mía y ya está todo bien.',
    'Eres mi mejor decisión repetida.',
    'Me gusta nuestra historia: sincera, loca y bonita.',
    'Eres mi descanso y mi fiesta.',
    'Te elijo hoy, y mañana también.',
    'Tenerte es mi lujo favorito.',
    'Eres mi alegría con nombre.',
    'Lo nuestro es mi parte favorita del calendario.',
    'Eres mi “qué suerte” hecho persona.',
    'Tu amor me hace sentir en casa en cualquier lugar.',
    'Eres ese milagro que llegó sin avisar.',
    'Qué bonito coincidir contigo en este mundo.',
    'Te quiero de esos quereres que se quedan.',
    'Eres mi razón bonita para sonreír.',
    'Si la vida se complica, te abrazo y ya.',
    'Eres mi plan favorito sin fecha.',
    'Gracias por ser tú y por elegirme también.'
];

const PHRASE_EMOJIS = [
    '💖', '💘', '💝', '💞', '💕', '💗', '💓', '🫶', '🥰', '😍', '😘', '💌',
    '🌹', '🌸', '🌷', '🌺', '🌻', '🍓', '🍯', '🍫', '🧁', '🍰', '🎂', '🎈',
    '🎀', '🎁', '🎉', '🎊', '✨', '🌟', '⭐', '💫', '🌙', '☀️', '🌈', '🫧',
    '🦋', '🐻', '🧸', '🐣', '🐰', '🦊', '🐼', '🐶', '🐱', '🕊️', '🪻', '🍀',
    '🧡', '💛', '💚', '💙', '💜', '🤍', '❤️', '🩷', '🩵', '🩶', '🖤', '❤️‍🔥',
    '🎶', '🎧', '📸', '📖', '🗓️', '🧭', '🧿', '🪄', '🧨', '🎆', '🎇', '🥳',
    '☕', '🍵', '🫠', '😌', '😊', '🤭', '🫰', '🤝', '🫂', '🏡', '🛋️', '🧩'
];

function pickFirstUnused(list, used) {
    return list.find(item => !used.has(item)) || '';
}

function generateFallbackPhrase(usedPhrases, referenceDate) {
    const monthNames = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];
    const label = referenceDate instanceof Date
        ? `${monthNames[referenceDate.getMonth()]} ${referenceDate.getFullYear()}`
        : 'este mes';

    let counter = 1;
    let candidate = `Un capítulo nuevo de lo nuestro en ${label}.`;
    while (usedPhrases.has(candidate)) {
        counter += 1;
        candidate = `Un capítulo nuevo de lo nuestro en ${label} (${counter}).`;
    }
    return candidate;
}

function generateFallbackEmoji(usedEmojis) {
    const fallbacks = ['🧡', '💙', '💜', '🤍', '🖤', '💛', '💚', '🩷', '🩵', '🩶', '💫', '⭐', '🌟', '✨'];
    return pickFirstUnused(fallbacks, usedEmojis) || '✨';
}

function pickUniquePhraseAndEmoji(existingMonths = [], referenceDate = null) {
    const usedPhrases = new Set();
    const usedEmojis = new Set();

    if (Array.isArray(existingMonths)) {
        existingMonths.forEach((m) => {
            const phrase = m && typeof m.phrase === 'string' ? m.phrase.trim() : '';
            const emoji = m && typeof m.phraseEmoji === 'string' ? m.phraseEmoji.trim() : '';
            if (phrase) usedPhrases.add(phrase);
            if (emoji) usedEmojis.add(emoji);
        });
    }

    return pickUniquePhraseAndEmojiFromSets(usedPhrases, usedEmojis, referenceDate);
}

function pickUniquePhraseAndEmojiFromSets(usedPhrases, usedEmojis, referenceDate = null) {
    const phrase = pickFirstUnused(LOVE_PHRASES, usedPhrases) || generateFallbackPhrase(usedPhrases, referenceDate);
    usedPhrases.add(phrase);

    const emoji = pickFirstUnused(PHRASE_EMOJIS, usedEmojis) || generateFallbackEmoji(usedEmojis);
    usedEmojis.add(emoji);

    return { phrase, emoji };
}

function ensureAllMonthsHaveUniquePhraseAndEmoji() {
    const usedPhrases = new Set();
    const usedEmojis = new Set();

    for (let i = 0; i < months.length; i += 1) {
        const m = normalizeMonthData(months[i]);
        const referenceDate = new Date(m.year, monthNameToIndex(m.month), 1);

        let phrase = typeof m.phrase === 'string' ? m.phrase.trim() : '';
        if (!phrase || usedPhrases.has(phrase)) {
            phrase = pickFirstUnused(LOVE_PHRASES, usedPhrases) || generateFallbackPhrase(usedPhrases, referenceDate);
        }
        usedPhrases.add(phrase);

        let emoji = typeof m.phraseEmoji === 'string' ? m.phraseEmoji.trim() : '';
        if (!emoji || usedEmojis.has(emoji)) {
            emoji = pickFirstUnused(PHRASE_EMOJIS, usedEmojis) || generateFallbackEmoji(usedEmojis);
        }
        usedEmojis.add(emoji);

        months[i] = {
            ...m,
            phrase,
            phraseEmoji: emoji
        };
    }
}

function createDefaultMonth(referenceDate = new Date()) {
    const monthNames = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];
    const { phrase, emoji } = pickUniquePhraseAndEmoji(months, referenceDate);

    return {
        id: Date.now() + Math.floor(Math.random() * 10000),
        month: monthNames[referenceDate.getMonth()],
        year: referenceDate.getFullYear(),
        phrase,
        phraseEmoji: emoji,
        images: ['', '', '', ''],
        texts: [''],
        coordinates: [...SPECIAL_PLACE_COORDS],
        songUrls: [],
        videoUrls: [],
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
    const usedPhrases = new Set();
    const usedEmojis = new Set();

    while (currentDate <= endDate) {
        const { phrase, emoji } = pickUniquePhraseAndEmojiFromSets(usedPhrases, usedEmojis, currentDate);
        const monthData = {
            id: months.length,
            month: monthNames[currentDate.getMonth()],
            year: currentDate.getFullYear(),
            phrase,
            phraseEmoji: emoji,
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

        // Para Enero 2023: usar solo 1 foto y agregar el texto especial
        if (monthNames[currentDate.getMonth()] === 'Enero' && currentDate.getFullYear() === 2023) {
            monthData.images = ['https://copilot.microsoft.com/th/id/BCO.64f99663-9588-43ca-af5e-899e744303c0.png'];
            monthData.text = 'Amor mío, ese mes fue el que cambió mi vida para siempre 💘. El día 28 entré por la puerta de ese pub sin saber que mi destino estaba esperándome allí. Y entonces te vi, reina mía, y me quedé sin palabras, sin aire, sin poder pensar en nada más que en ti 😍. Recuerdo que al irme solo tenía una cosa en la mente: volverte loca, conquistarte y hacerte mi novia, bb, porque fue un flechazo a primera vista 💕. Mi corazón se entregó completamente en ese instante ❤️✨. Eres lo mejor que me ha pasado, amor 🥰.';
        }

        months.push(monthData);
        currentDate.setMonth(currentDate.getMonth() + 1);
    }

    persistMonths();
}

function persistMonths() {
    localStorage.setItem(BOOK_STORAGE_KEY, JSON.stringify(months));
}

function saveMonthData(index) {
    // Guarda todas las textareas del mes
    const textAreas = document.querySelectorAll(`#month-${index} .text-area`);
    if (textAreas && textAreas.length) {
        months[index].texts = Array.from(textAreas).map(t => t.value);
    }
    persistMonths();
}

function normalizeMonthData(monthData) {
    return {
        ...monthData,
        images: Array.isArray(monthData.images) ? monthData.images : ['', '', '', ''],
        texts: Array.isArray(monthData.texts) ? monthData.texts : (monthData.text ? [monthData.text] : ['']),
        phrase: typeof monthData.phrase === 'string' ? monthData.phrase : '',
        phraseEmoji: typeof monthData.phraseEmoji === 'string' ? monthData.phraseEmoji : '',
        coordinates: Array.isArray(monthData.coordinates) && monthData.coordinates.length === 2
            ? monthData.coordinates
            : [...SPECIAL_PLACE_COORDS],
        songUrls: Array.isArray(monthData.songUrls) ? monthData.songUrls : (monthData.songUrl ? [monthData.songUrl] : []),
        videoUrls: Array.isArray(monthData.videoUrls) ? monthData.videoUrls : (monthData.videoUrl ? [monthData.videoUrl] : []),
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

function closeAllMediaMenus() {
    document.querySelectorAll('.media-dropdown.open').forEach((dropdown) => {
        dropdown.classList.remove('open');
    });
}

function toggleMediaMenu(index, action) {
    const dropdown = document.getElementById(`mediaMenu-${action}-${index}`);
    if (!dropdown) return;

    const willOpen = !dropdown.classList.contains('open');
    closeAllMediaMenus();

    if (willOpen) {
        dropdown.classList.add('open');
    }
}

function performMediaAction(index, action, type, target = 'all') {
    const month = months[index];
    if (!month) return;

    if (action === 'add') {
        if (type === 'fotos') {
            month.showPhotos = true;
            persistMonths();
            rerenderCurrentMonth();

            if (target !== 'all') {
                requestAnimationFrame(() => triggerImageUpload(index, Number(target)));
            }
            return;
        }

        if (type === 'texto') month.showText = true;
        if (type === 'musica') month.showMusic = true;
        if (type === 'video') month.showVideo = true;

        persistMonths();
        rerenderCurrentMonth();
        return;
    }

    if (type === 'fotos') {
        month.showPhotos = true;
        if (target === 'all') {
            month.images = ['', '', '', ''];
            month.showPhotos = false;
        } else {
            month.images[Number(target)] = '';
            if (month.images.every((image) => !image)) {
                month.showPhotos = false;
            }
        }
    }

    if (type === 'texto') {
        month.text = '';
        month.showText = false;
    }

    if (type === 'musica') {
        month.songUrl = '';
        month.showMusic = false;
    }

    if (type === 'video') {
        month.videoUrl = '';
        month.showVideo = false;
    }

    persistMonths();
    rerenderCurrentMonth();
}

function renderPhotoMenuItems(index, action) {
    const actionLabel = action === 'add' ? 'Añadir' : 'Quitar';

    return `
        <div class="media-menu-group">
            <div class="media-menu-label">Fotos</div>
            <button class="media-menu-item" onclick="performMediaAction(${index}, '${action}', 'fotos', '0')">${actionLabel} foto 1</button>
            <button class="media-menu-item" onclick="performMediaAction(${index}, '${action}', 'fotos', '1')">${actionLabel} foto 2</button>
            <button class="media-menu-item" onclick="performMediaAction(${index}, '${action}', 'fotos', '2')">${actionLabel} foto 3</button>
            <button class="media-menu-item" onclick="performMediaAction(${index}, '${action}', 'fotos', '3')">${actionLabel} foto 4</button>
            <button class="media-menu-item strong" onclick="performMediaAction(${index}, '${action}', 'fotos', 'all')">${actionLabel} todas</button>
        </div>
    `;
}

function renderMediaDropdown(index, action, icon, label, buttonClass) {
    const isAdd = action === 'add';
    // Nueva función para mostrar input de cantidad
    function renderMediaInput(tipo) {
        return `<div class=\"media-input-group\" id=\"mediaInputGroup-${action}-${index}-${tipo}\" style=\"margin-top:8px;\">\n<input type=\"number\" min=\"0\" value=\"0\" class=\"media-amount-input\" id=\"mediaAmountInput-${action}-${index}-${tipo}\" style=\"width:60px;\"> \n<button class=\"mini-btn accept-btn\" onclick=\"acceptMediaAmount(${index}, '${action}', '${tipo}')\">Aceptar<\/button>\n<\/div>`;
    }
    // Menú con handlers para mostrar el input
    return `
        <div class=\"media-dropdown\" id=\"mediaMenu-${action}-${index}\">\n            <button class=\"action-btn ${buttonClass}\" onclick=\"toggleMediaMenu(${index}, '${action}')\">\n                <i class=\"fas fa-${icon}\"></i> ${label}\n            </button>\n            <div class=\"media-menu\">\n                <div class=\"media-menu-group\">\n                    <div class=\"media-menu-label\">Fotos<\/div>\n                    <button class=\"media-menu-item\" onclick=\"showMediaInput(${index}, '${action}', 'fotos')\">${isAdd ? 'Añadir' : 'Quitar'} fotos<\/button>\n                <\/div>\n                <div class=\"media-menu-group\">\n                    <div class=\"media-menu-label\">Otros<\/div>\n                    <button class=\"media-menu-item\" onclick=\"showMediaInput(${index}, '${action}', 'texto')\">${isAdd ? 'Añadir' : 'Quitar'} texto<\/button>\n                    <button class=\"media-menu-item\" onclick=\"showMediaInput(${index}, '${action}', 'musica')\">${isAdd ? 'Añadir' : 'Quitar'} música<\/button>\n                    <button class=\"media-menu-item\" onclick=\"showMediaInput(${index}, '${action}', 'video')\">${isAdd ? 'Añadir' : 'Quitar'} vídeo<\/button>\n                <\/div>\n                <div id=\"mediaInputContainer-${action}-${index}\"><\/div>\n            <\/div>\n        <\/div>\n    `;
}

// Mostrar input de cantidad
function showMediaInput(index, action, tipo) {
    // Oculta otros inputs
    document.querySelectorAll('.media-input-group').forEach(e => e.remove());
    const container = document.getElementById(`mediaInputContainer-${action}-${index}`);
    if (container) {
        container.innerHTML = `<div class=\"media-input-group\" id=\"mediaInputGroup-${action}-${index}-${tipo}\" style=\"margin-top:8px;\">\n<input type=\"number\" min=\"0\" value=\"0\" class=\"media-amount-input\" id=\"mediaAmountInput-${action}-${index}-${tipo}\" style=\"width:60px;\"> \n<button class=\"mini-btn accept-btn\" onclick=\"acceptMediaAmount(${index}, '${action}', '${tipo}')\">Aceptar<\/button>\n<\/div>`;
    }
}

// Acción al aceptar cantidad
function acceptMediaAmount(index, action, tipo) {
    const input = document.getElementById(`mediaAmountInput-${action}-${index}-${tipo}`);
    let cantidad = 0;
    if (input) cantidad = Math.max(0, parseInt(input.value, 10) || 0);
    // Ejecuta la acción según tipo y cantidad
    if (tipo === 'fotos') {
        if (action === 'add') {
            months[index].images = Array(Math.max(0, cantidad)).fill('');
            months[index].showPhotos = cantidad > 0;
        } else {
            const actual = months[index].images.length;
            const nuevo = Math.max(0, actual - cantidad);
            months[index].images = Array(nuevo).fill('');
            months[index].showPhotos = nuevo > 0;
        }
    } else if (tipo === 'texto') {
        if (action === 'add') {
            months[index].texts = Array(Math.max(0, cantidad)).fill('');
            months[index].showText = cantidad > 0;
        } else {
            const actual = Array.isArray(months[index].texts) ? months[index].texts.length : 0;
            const nuevo = Math.max(0, actual - cantidad);
            months[index].texts = Array(nuevo).fill('');
            months[index].showText = nuevo > 0;
            if (!months[index].showText) months[index].texts = [''];
        }
    } else if (tipo === 'musica') {
        if (action === 'add') {
            months[index].songUrls = Array(Math.max(0, cantidad)).fill('');
            months[index].showMusic = cantidad > 0;
        } else {
            const actual = Array.isArray(months[index].songUrls) ? months[index].songUrls.length : 0;
            const nuevo = Math.max(0, actual - cantidad);
            months[index].songUrls = Array(nuevo).fill('');
            months[index].showMusic = nuevo > 0;
        }
    } else if (tipo === 'video') {
        if (action === 'add') {
            months[index].videoUrls = Array(Math.max(0, cantidad)).fill('');
            months[index].showVideo = cantidad > 0;
        } else {
            const actual = Array.isArray(months[index].videoUrls) ? months[index].videoUrls.length : 0;
            const nuevo = Math.max(0, actual - cantidad);
            months[index].videoUrls = Array(nuevo).fill('');
            months[index].showVideo = nuevo > 0;
        }
    }
    persistMonths();
    rerenderCurrentMonth();
}


function saveSong(index) {
    // Guarda todos los inputs de canción para el mes
    const inputs = Array.from(document.querySelectorAll(`#month-${index} .song-input`));
    if (inputs.length) {
        months[index].songUrls = inputs.map(i => i.value.trim());
        persistMonths();
        rerenderCurrentMonth();
    }
}

function saveVideo(index) {
    const inputs = Array.from(document.querySelectorAll(`#month-${index} .video-input`));
    if (inputs.length) {
        months[index].videoUrls = inputs.map(i => i.value.trim());
        persistMonths();
        rerenderCurrentMonth();
    }
}

function clearSong(index) {
    months[index].songUrls = [];
    months[index].showMusic = false;
    persistMonths();
    rerenderCurrentMonth();
}

function clearVideo(index) {
    months[index].videoUrls = [];
    months[index].showVideo = false;
    persistMonths();
    rerenderCurrentMonth();
}

function saveCurrentMonth() {
    saveMonthData(currentMonth);
    alert('Mes guardado correctamente.');
}

function getPhraseWithEmoji(phrase, emoji) {
    const safePhrase = (typeof phrase === 'string' ? phrase : '').trim();
    const safeEmoji = (typeof emoji === 'string' ? emoji : '').trim();
    return `${safePhrase} ${safeEmoji}`.trim();
}

function renderMonths() {
    const container = document.getElementById('monthsContainer');
    container.innerHTML = '';

    months.forEach((monthData, index) => {
        const safeMonth = normalizeMonthData(monthData);
        months[index] = safeMonth;
        const isFirst = index === 0;
        const isLast = index === months.length - 1;

        // Verificar si es enero 2023 para layout especial
        const isJanuary2023 = safeMonth.month === 'Enero' && safeMonth.year === 2023;

        const monthPage = document.createElement('div');
        monthPage.className = `month-page ${index === currentMonth ? 'active' : ''}`;
        monthPage.id = `month-${index}`;

        // Para enero 2023: usar grid de dos columnas normales
        const gridClass = '';
        const galleryClass = isJanuary2023 ? 'single-image' : '';

        monthPage.innerHTML = `
            <div class="heart-pulse-bg" aria-hidden="true">
                ${Array.from({ length: 12 }, (_, heartIndex) => `<span class="pulse-heart pulse-heart-${heartIndex + 1}">💖</span>`).join('')}
            </div>
            <div class="month-header">
                <h2 class="month-title">${monthData.month} ${monthData.year}</h2>
                <p class="love-quote">"${getPhraseWithEmoji(safeMonth.phrase, safeMonth.phraseEmoji || PHRASE_EMOJIS[index % PHRASE_EMOJIS.length])}"</p>
                ${(safeMonth.month === 'Enero' && safeMonth.year === 2023) ? `
                <button class="special-button title-map-btn" onclick="openSpecialPlace('january2023')">
                    <i class="fas fa-map-location-dot"></i> ${SPECIAL_PLACES.january2023.buttonText}
                </button>` : ''}
                ${(safeMonth.month === 'Agosto' && safeMonth.year === 2023) ? `
                <button class="special-button title-map-btn" onclick="openSpecialPlace('august2023')">
                    <i class="fas fa-map-location-dot"></i> ${SPECIAL_PLACES.august2023.buttonText}
                </button>` : ''}
            </div>

            <div class="month-content ${gridClass}">
                ${safeMonth.showPhotos ? `
                <div class="content-section photos-section">
                    <h3 class="section-title">📷 Nuestros momentos</h3>
                    <div class="image-gallery ${galleryClass}">
                        ${Array.isArray(safeMonth.images) ? safeMonth.images.map((img, i) => {
                            // Para Enero 2023: solo mostrar imágenes que existan o la primera posición vacía
                            if (isJanuary2023) {
                                if (img) {
                                    return `<div class="image-placeholder" onclick="triggerImageUpload(${index}, ${i})"><img src="${img}" alt="Imagen ${i + 1}"></div>`;
                                } else if (i === 0) {
                                    return `<div class="image-placeholder" onclick="triggerImageUpload(${index}, ${i})"><i class="fas fa-plus" style="font-size:2rem;color:#FF6B35;"></i></div>`;
                                }
                                return '';
                            } else {
                                return `<div class="image-placeholder" onclick="triggerImageUpload(${index}, ${i})">
                                    ${img ? `<img src="${img}" alt="Imagen ${i + 1}">` : '<i class="fas fa-plus" style="font-size:2rem;color:#FF6B35;"></i>'}
                                </div>`;
                            }
                        }).join('') : ''}
                    </div>
                    <input type="file" class="image-input" id="imageInput-${index}" accept="image/*">
                </div>` : ''}

                ${safeMonth.showText ? `
                <div class="content-section text-section">
                    <h3 class="section-title">💬 Mi historia contigo este mes</h3>
                    ${Array.isArray(safeMonth.texts) ? safeMonth.texts.map((t, ti) => {
                        const defaultText = isJanuary2023 ? 'Amor mío, ese mes fue el que cambió mi vida para siempre 💘. El día 28 entré por la puerta de ese pub sin saber que mi destino estaba esperándome allí. Y entonces te vi, reina mía, y me quedé sin palabras, sin aire, sin poder pensar en nada más que en ti 😍. Recuerdo que al irme solo tenía una cosa en la mente: volverte loca, conquistarte y hacerte mi novia, bb, porque fue un flechazo a primera vista 💕. Mi corazón se entregó completamente en ese instante ❤️✨. Eres lo mejor que me ha pasado, amor 🥰.' : '';
                        const textContent = t || defaultText;
                        return `<textarea class="text-area" id="text-${index}-${ti}" placeholder="Cuéntame qué pasó este mes...">${textContent}</textarea>`;
                    }).join('') : `<textarea class="text-area" id="text-${index}-0" placeholder="Cuéntame qué pasó este mes...">${safeMonth.text || (isJanuary2023 ? 'Amor mío, ese mes fue el que cambió mi vida para siempre 💘. El día 28 entré por la puerta de ese pub sin saber que mi destino estaba esperándome allí. Y entonces te vi, reina mía, y me quedé sin palabras, sin aire, sin poder pensar en nada más que en ti 😍. Recuerdo que al irme solo tenía una cosa en la mente: volverte loca, conquistarte y hacerte mi novia, bb, porque fue un flechazo a primera vista 💕. Mi corazón se entregó completamente en ese instante ❤️✨. Eres lo mejor que me ha pasado, amor 🥰.' : '')}</textarea>`}
                </div>` : ''}

                ${(safeMonth.showMusic || safeMonth.showVideo) ? `
                <div class="content-section media-content">
                    <h3 class="section-title">🎵 Música y 🎬 Video</h3>
                    ${safeMonth.showMusic ? `
                        ${Array.isArray(safeMonth.songUrls) ? safeMonth.songUrls.map((s, si) => `
                            <div class="media-row">
                                <input type="url" class="media-input song-input" id="songUrl-${index}-${si}" placeholder="Enlace de música" value="${escapeAttribute(s)}">
                                ${s ? `<div class="media-preview">${renderMediaPreview(s, 'song')}</div>` : ''}
                            </div>
                        `).join('') : `<div class="media-row"><input type="url" class="media-input song-input" id="songUrl-${index}-0" value="${escapeAttribute(safeMonth.songUrl)}"></div>`}
                    ` : ''}
                    ${safeMonth.showVideo ? `
                        ${Array.isArray(safeMonth.videoUrls) ? safeMonth.videoUrls.map((v, vi) => `
                            <div class="media-row">
                                <input type="url" class="media-input video-input" id="videoUrl-${index}-${vi}" placeholder="Enlace de video" value="${escapeAttribute(v)}">
                                ${v ? `<div class="media-preview">${renderMediaPreview(v, 'video')}</div>` : ''}
                            </div>
                        `).join('') : `<div class="media-row"><input type="url" class="media-input video-input" id="videoUrl-${index}-0" value="${escapeAttribute(safeMonth.videoUrl)}"></div>`}
                    ` : ''}
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
                    ${renderMediaDropdown(index, 'add', 'plus', 'Añadir multimedia', 'media')}
                    ${renderMediaDropdown(index, 'remove', 'minus', 'Quitar multimedia', 'neutral')}
                    <button class="action-btn" onclick="addMonth()"><i class="fas fa-plus"></i> Añadir mes</button>
                    <button class="action-btn delete" onclick="deleteMonth(${index})" ${months.length <= 1 ? 'disabled' : ''}><i class="fas fa-trash"></i> Eliminar</button>
                </div>
            </div>
        `;

        container.appendChild(monthPage);

        // textareas: guardar cada una
        const textAreas = monthPage.querySelectorAll('.text-area');
        if (textAreas && textAreas.length) {
            textAreas.forEach((ta) => {
                ta.addEventListener('change', () => saveMonthData(index));
                ta.addEventListener('blur', () => saveMonthData(index));
            });
        }

        // image input handler
        const imageInput = monthPage.querySelector(`#imageInput-${index}`);
        if (imageInput) {
            imageInput.addEventListener('change', (e) => handleImageUpload(e, index));
        }

        // song inputs
        const songInputs = monthPage.querySelectorAll('.song-input');
        if (songInputs && songInputs.length) {
            songInputs.forEach((inp) => {
                inp.addEventListener('change', () => {
                    const parts = inp.id.split('-');
                    const si = Number(parts[2]);
                    months[index].songUrls[si] = inp.value.trim();
                    persistMonths();
                    rerenderCurrentMonth();
                });
                inp.addEventListener('blur', () => {
                    const parts = inp.id.split('-');
                    const si = Number(parts[2]);
                    months[index].songUrls[si] = inp.value.trim();
                    persistMonths();
                    rerenderCurrentMonth();
                });
            });
        }

        // video inputs
        const videoInputs = monthPage.querySelectorAll('.video-input');
        if (videoInputs && videoInputs.length) {
            videoInputs.forEach((inp) => {
                inp.addEventListener('change', () => {
                    const parts = inp.id.split('-');
                    const vi = Number(parts[2]);
                    months[index].videoUrls[vi] = inp.value.trim();
                    persistMonths();
                    rerenderCurrentMonth();
                });
                inp.addEventListener('blur', () => {
                    const parts = inp.id.split('-');
                    const vi = Number(parts[2]);
                    months[index].videoUrls[vi] = inp.value.trim();
                    persistMonths();
                    rerenderCurrentMonth();
                });
            });
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
    ensureAllMonthsHaveUniquePhraseAndEmoji();
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
    stopCoverEffects();
    document.getElementById('coverPage').style.display = 'none';
    document.getElementById('bookContainer').classList.add('active');
    currentMonth = Math.min(currentMonth, months.length - 1);
    showMonth(currentMonth, 'forward');
}

function goToCover() {
    document.getElementById('bookContainer').classList.remove('active');
    document.getElementById('coverPage').style.display = 'flex';
    startCoverEffects();
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

    // Actualizar Enero 2023 siempre con el nuevo texto romántico
    const enero2023Index = months.findIndex(m => m.month === 'Enero' && m.year === 2023);
    if (enero2023Index !== -1) {
        const romanticText = 'Amor mío, ese mes fue el que cambió mi vida para siempre 💘. El día 28 entré por la puerta de ese pub sin saber que mi destino estaba esperándome allí. Y entonces te vi, reina mía, y me quedé sin palabras, sin aire, sin poder pensar en nada más que en ti 😍. Recuerdo que al irme solo tenía una cosa en la mente: volverte loca, conquistarte y hacerte mi novia, bb, porque fue un flechazo a primera vista 💕. Mi corazón se entregó completamente en ese instante ❤️✨. Eres lo mejor que me ha pasado, amor 🥰.';
        months[enero2023Index].text = romanticText;
        months[enero2023Index].texts = [romanticText];
        months[enero2023Index].images = ['https://copilot.microsoft.com/th/id/BCO.64f99663-9588-43ca-af5e-899e744303c0.png'];
        persistMonths();
    }

    months = months.map((monthData) => normalizeMonthData(monthData));
    ensureAllMonthsHaveUniquePhraseAndEmoji();
    persistMonths();

    renderMonths();
}

function generateCoverEmojis() {
    const layer = document.getElementById('coverEmojiLayer');
    const emojis = [
        '🎆', '🎇', '🎉', '🎊', '🎈', '🎁', '🎂', '🧁', '🍰', '🥳', '🕯️',
        '💍', '💏', '💘', '💖', '💞', '💕', '😍', '🥰', '💌', '🌹', '✨', '🧸', '❤️', '🌟', '💝', '🐻', '💗', '🌸'
    ];

    layer.innerHTML = '';

    const count = window.innerWidth <= 640 ? 44 : 72;

    for (let i = 0; i < count; i += 1) {
        const span = document.createElement('span');
        span.className = 'emoji-animation';
        span.textContent = emojis[Math.floor(Math.random() * emojis.length)];

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

let coverFireworksController = null;
let coverTypedTimeoutId = null;
let coverTypedLoopTimeoutId = null;
let coverTypedRunning = false;

function clearCoverTypedTimers() {
    if (coverTypedTimeoutId) {
        clearTimeout(coverTypedTimeoutId);
        coverTypedTimeoutId = null;
    }
    if (coverTypedLoopTimeoutId) {
        clearTimeout(coverTypedLoopTimeoutId);
        coverTypedLoopTimeoutId = null;
    }
}

function startTypedBirthdayMessage() {
    const target = document.getElementById('birthdayTyped');
    if (!target) return;
    const queen = document.querySelector('.birthday-queen');

    const text = 'Feliz cumpleaños amor';
    clearCoverTypedTimers();
    coverTypedRunning = true;
    target.textContent = '';
    if (queen) queen.style.opacity = '0';

    let index = 0;
    const step = () => {
        if (!coverTypedRunning) return;
        index += 1;
        target.textContent = text.slice(0, index);

        if (index < text.length) {
            coverTypedTimeoutId = setTimeout(step, 55 + Math.random() * 55);
            return;
        }

        if (queen) queen.style.opacity = '1';
        coverTypedLoopTimeoutId = setTimeout(() => {
            if (!coverTypedRunning) return;
            index = 0;
            target.textContent = '';
            if (queen) queen.style.opacity = '0';
            coverTypedTimeoutId = setTimeout(step, 500);
        }, 2600);
    };

    coverTypedTimeoutId = setTimeout(step, 450);
}

function stopTypedBirthdayMessage() {
    coverTypedRunning = false;
    clearCoverTypedTimers();
}

function createCoverFireworksController() {
    const canvas = document.getElementById('fireworksCanvas');
    const cover = document.getElementById('coverPage');
    if (!canvas || !cover) return null;

    const ctx = canvas.getContext('2d', { alpha: true });
    if (!ctx) return null;

    const state = {
        running: false,
        rafId: 0,
        lastTs: 0,
        nextBurstMs: 900,
        burstElapsedMs: 0,
        width: 1,
        height: 1,
        dpr: 1,
        particles: []
    };

    const prefersReducedMotion = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const resize = () => {
        const rect = canvas.getBoundingClientRect();
        const dpr = Math.min(2, window.devicePixelRatio || 1);
        state.dpr = dpr;
        state.width = Math.max(1, rect.width);
        state.height = Math.max(1, rect.height);

        canvas.width = Math.max(1, Math.floor(rect.width * dpr));
        canvas.height = Math.max(1, Math.floor(rect.height * dpr));
        ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
        ctx.clearRect(0, 0, state.width, state.height);
    };

    const addBurst = (x, y, intensity = 1) => {
        const baseHue = Math.random() * 360;
        const isSmall = state.width < 520;
        const count = Math.floor((isSmall ? 48 : 82) * intensity);
        const power = (isSmall ? 165 : 230) * intensity;

        for (let i = 0; i < count; i += 1) {
            const angle = Math.random() * Math.PI * 2;
            const speed = power * (0.35 + Math.random() * 0.75);
            const hue = (baseHue + (Math.random() * 60 - 30) + 360) % 360;
            const life = 0.95 + Math.random() * 0.65;

            state.particles.push({
                x,
                y,
                vx: Math.cos(angle) * speed,
                vy: Math.sin(angle) * speed,
                hue,
                life,
                maxLife: life,
                size: 1.2 + Math.random() * 1.9
            });
        }
    };

    const tick = (ts) => {
        if (!state.running) return;

        const dt = state.lastTs ? Math.min(0.034, (ts - state.lastTs) / 1000) : 0.016;
        state.lastTs = ts;

        ctx.clearRect(0, 0, state.width, state.height);

        const gravity = 240;
        const drag = 0.985;

        for (let i = state.particles.length - 1; i >= 0; i -= 1) {
            const p = state.particles[i];
            p.life -= dt;
            if (p.life <= 0) {
                state.particles.splice(i, 1);
                continue;
            }

            p.vx *= drag;
            p.vy = p.vy * drag + gravity * dt;
            p.x += p.vx * dt;
            p.y += p.vy * dt;

            const alpha = Math.max(0, Math.min(1, p.life / p.maxLife));
            ctx.fillStyle = `hsla(${p.hue}, 100%, 65%, ${alpha})`;
            ctx.beginPath();
            ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
            ctx.fill();
        }

        state.burstElapsedMs += dt * 1000;
        if (state.burstElapsedMs >= state.nextBurstMs) {
            state.burstElapsedMs = 0;
            state.nextBurstMs = 650 + Math.random() * 900;

            const x = state.width * (0.16 + Math.random() * 0.68);
            const y = state.height * (0.12 + Math.random() * 0.36);
            addBurst(x, y, 1);
        }

        state.rafId = requestAnimationFrame(tick);
    };

    const onPointerDown = (event) => {
        if (!state.running) return;
        const rect = cover.getBoundingClientRect();
        const x = event.clientX - rect.left;
        const y = event.clientY - rect.top;
        addBurst(x, y, 1.05);
    };

    const start = () => {
        if (prefersReducedMotion) return;
        if (state.running) return;
        state.running = true;
        state.lastTs = 0;
        state.burstElapsedMs = 0;
        state.nextBurstMs = 700 + Math.random() * 750;
        resize();
        window.addEventListener('resize', resize, { passive: true });
        cover.addEventListener('pointerdown', onPointerDown, { passive: true });
        state.rafId = requestAnimationFrame(tick);
    };

    const stop = () => {
        if (!state.running) return;
        state.running = false;
        if (state.rafId) cancelAnimationFrame(state.rafId);
        state.rafId = 0;
        window.removeEventListener('resize', resize);
        cover.removeEventListener('pointerdown', onPointerDown);
        ctx.clearRect(0, 0, state.width, state.height);
        state.particles = [];
    };

    return { start, stop };
}

function startCoverEffects() {
    startTypedBirthdayMessage();

    if (!coverFireworksController) {
        coverFireworksController = createCoverFireworksController();
    }
    if (coverFireworksController) {
        coverFireworksController.start();
    }
}

function stopCoverEffects() {
    stopTypedBirthdayMessage();
    if (coverFireworksController) {
        coverFireworksController.stop();
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

document.addEventListener('click', (event) => {
    if (!event.target.closest('.media-dropdown')) {
        closeAllMediaMenus();
    }
});

loadBook();
generateCoverEmojis();
startCoverEffects();
loadCoverPhoto();
registerPageNavigationInputs();
