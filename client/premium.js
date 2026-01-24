import { modalDevenirPremium } from './components/misc/modals.js'

document.addEventListener('DOMContentLoaded', () => {
    const ctaPremium = document.querySelector('.cta-premium');
    if (ctaPremium) {
        ctaPremium.addEventListener('click', () => {
            modalDevenirPremium();
        });
    }
});
