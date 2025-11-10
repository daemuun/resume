import { Localization } from "./localization.js";

const localization = new Localization();
localization.initSelector();
localization.updatePage();

const selector = document.getElementById('selector');
selector.addEventListener('change', (e) => {
    const key = e.target.value;
    localization.setLocale(key)
    localization.updatePage();
});


function getQRColors() {
    return {
        bgColor: getComputedStyle(document.documentElement)
            .getPropertyValue('--background-color').trim(),
        txtColor: getComputedStyle(document.documentElement)
            .getPropertyValue('--text-color').trim()
    };
}

function createQRCode() {
    const qrContainer = document.getElementById("qrcode");
    const colors = getQRColors();
    qrContainer.innerHTML = '';
    new QRCode(qrContainer, {
        text: window.location.origin,
        width: qrContainer.parentElement.offsetWidth,
        height: qrContainer.parentElement.offsetWidth,
        colorDark: colors.txtColor,
        colorLight: colors.bgColor,
        correctLevel: QRCode.CorrectLevel.H
    });
}

createQRCode();
lucide.createIcons();

const themeToggle = document.getElementById("theme-toggle");
const sunIcon = document.querySelector(".sun-icon");
const moonIcon = document.querySelector(".moon-icon");

if (localStorage.getItem('theme') === 'dark') {
    document.documentElement.classList.add('dark-theme');
    sunIcon.style.display = 'none';
    moonIcon.style.display = 'block';
    createQRCode();
} else {
    sunIcon.style.display = 'block';
    moonIcon.style.display = 'none';
    createQRCode();
}

themeToggle.addEventListener('click', () => {
    document.documentElement.classList.toggle('dark-theme');

    if (document.documentElement.classList.contains('dark-theme')) {
        localStorage.setItem('theme', 'dark');
        sunIcon.style.display = 'none';
        moonIcon.style.display = 'block';
    } else {
        localStorage.setItem('theme', 'light');
        sunIcon.style.display = 'block';
        moonIcon.style.display = 'none';
    }

    createQRCode();
});

window.addEventListener('resize',  () => {
    createQRCode();
});
