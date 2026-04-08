async function initHeader() {
  const placeholder = document.getElementById('site-header');
  if (!placeholder) return;

  try {
    const res = await fetch('header.html');
    if (!res.ok) return;
    placeholder.innerHTML = await res.text();

    // Ensure FontAwesome is present
    if (!document.querySelector('script[src*="fontawesome.com"]')) {
      const fa = document.createElement('script');
      fa.src = 'https://kit.fontawesome.com/f8e1a90484.js';
      fa.crossOrigin = 'anonymous';
      document.head.appendChild(fa);
    }

    // Robust hamburger / close handlers scoped to the injected header
    const headerRoot = placeholder;
    const navLinks = headerRoot.querySelector('#navLinks') || document.getElementById('navLinks');

    // initialize aria state
    if (navLinks && !navLinks.hasAttribute('aria-hidden')) {
      navLinks.setAttribute('aria-hidden', 'true');
      navLinks.style.right = navLinks.style.right || '-200px';
    }

    function openMenu() {
      if (!navLinks) return;
      navLinks.classList.add('active');
      navLinks.style.right = '0';
      navLinks.setAttribute('aria-hidden', 'false');
    }

    function closeMenu() {
      if (!navLinks) return;
      navLinks.classList.remove('active');
      navLinks.style.right = '-200px';
      navLinks.setAttribute('aria-hidden', 'true');
    }

    // Expose for inline onclick fallbacks
    window.showMenu = openMenu;
    window.hideMenu = closeMenu;

    // Attach to hamburger icons inside header (id or class or font icon)
    const openBtns = headerRoot.querySelectorAll('#hamburger, .hamburger');
    openBtns.forEach(b => b.addEventListener('click', (e) => { e.stopPropagation(); openMenu(); }));

    // Also attach to any fontawesome bars inside header
    headerRoot.querySelectorAll('.fa-bars').forEach(b => b.addEventListener('click', (e) => { e.stopPropagation(); openMenu(); }));

    // Attach to close icons
    const closeBtns = headerRoot.querySelectorAll('.fa-times');
    closeBtns.forEach(b => b.addEventListener('click', (e) => { e.stopPropagation(); closeMenu(); }));

    // Close when clicking outside the nav on small screens
    document.addEventListener('click', (e) => {
      if (!navLinks) return;
      if (!navLinks.classList.contains('active')) return;
      if (!headerRoot.contains(e.target) && !navLinks.contains(e.target)) closeMenu();
    });
  } catch (e) {
    console.error('Failed to load header:', e);
  }
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initHeader);
} else {
  initHeader();
}
