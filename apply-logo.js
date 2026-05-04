const fs = require('fs');
const { JSDOM } = require('jsdom');

try {
    const html = fs.readFileSync('index.html', 'utf8');
    const dom = new JSDOM(html);
    const document = dom.window.document;

    const logoUrl = 'https://images.dualite.app/d52f60de-2692-4885-8c36-cb03ccdd56d7/D2_-_300X90_-_CHECKOUT_-_BRANCO-ca7a9d10-fed8-47be-aa87-321f27fedf6e.webp';
    
    const imgTagHeader = `<img src="${logoUrl}" alt="D2CHATPRO Logo" style="height: 40px; width: auto; object-fit: contain;">`;
    const imgTagFooter = `<img src="${logoUrl}" alt="D2CHATPRO Logo" style="height: 55px; width: auto; object-fit: contain; margin: 0 auto;">`;

    // 1. Find and replace text-based logos
    // We look for elements that only contain the word "D2CHATPRO"
    const allElements = document.querySelectorAll('a, h1, h2, h3, div, span');
    allElements.forEach(el => {
        const text = el.textContent.trim().toUpperCase().replace(/\s+/g, '');
        // Only replace if the element strictly contains just the logo text (prevents replacing paragraph text)
        if (text === 'D2CHATPRO' && el.children.length <= 3) {
            const inFooter = el.closest('footer') !== null;
            el.innerHTML = inFooter ? imgTagFooter : imgTagHeader;
        }
    });

    // 2. Find and replace any broken image logos
    const images = document.querySelectorAll('img');
    images.forEach(img => {
        const src = (img.getAttribute('src') || '').toLowerCase();
        const alt = (img.getAttribute('alt') || '').toLowerCase();
        
        // If it's an empty source, or contains 'logo', or 'd2chat'
        if (src === '' || src.includes('logo') || alt.includes('d2chat') || src.includes('d2_')) {
            const inFooter = img.closest('footer') !== null;
            img.setAttribute('src', logoUrl);
            img.setAttribute('style', inFooter ? 'height: 55px; width: auto; margin: 0 auto;' : 'height: 40px; width: auto;');
        }
    });

    fs.writeFileSync('index.html', dom.serialize());
    console.log('Logo applied successfully!');
} catch (err) {
    console.error('Error applying logo:', err);
}
