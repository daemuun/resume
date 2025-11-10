import ru from "./locales/ru.js"
import en from "./locales/en.js"

export class Localization {
    #locales = {
        'ru': ru,
        'en': en,
    }
    #lang = localStorage.getItem('lang') || 'ru';

    t(key) {
        let value = this.#locales[this.#lang];
        for (const part of key.split('.')) {
            if (value[part] === undefined) {
                return part;
            }
            value = value[part];
        }
        return value;
    }

    getLocales() {
        return {
            'ru': 'Русский',
            'en': 'English',
        }
    }

    setLocale(lang) {
        localStorage.setItem('lang', lang);
        this.#lang = lang;
    }

    initSelector() {
        const selector = document.getElementById("selector");
        const locales = this.getLocales();
        
        for (const locale in locales) {
            const option = document.createElement('option');
            option.value = locale;
            option.textContent = locales[locale];
            option.selected = locale == this.#lang;

            selector.appendChild(option);
        }
    }

    updatePage() {
        document.querySelectorAll('[data-locale]').forEach(el => {
            const key = el.dataset.locale;
            el.textContent = this.t(key);
        });
        document.title = this.t('title');
    }
}

