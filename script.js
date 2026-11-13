(() => {
  const button = document.querySelector('.menu-toggle');
  const navigation = document.getElementById('main-navigation');
  const mobile = window.matchMedia('(width < 768px)');

  if (!button || !navigation) return;

  function setOpen(open) {
    button.setAttribute('aria-expanded', String(open));
    button.setAttribute('aria-label', open ? 'Закрыть навигацию' : 'Открыть навигацию');
    navigation.hidden = mobile.matches && !open;
  }

  function updateLayout() {
    // Move focus before hiding navigation or the toggle during resizing.
    if (mobile.matches && navigation.contains(document.activeElement)) {
      button.hidden = false;
      button.focus();
    } else if (!mobile.matches && document.activeElement === button) {
      navigation.hidden = false;
      navigation.querySelector('a').focus();
    }
    button.hidden = !mobile.matches;
    setOpen(false);
  }

  button.addEventListener('click', () => {
    setOpen(button.getAttribute('aria-expanded') !== 'true');
  });

  navigation.addEventListener('click', (event) => {
    const link = event.target.closest('a[href^="#"]');
    if (!link || !mobile.matches || event.ctrlKey || event.metaKey || event.shiftKey || event.altKey) return;

    const target = document.getElementById(link.hash.slice(1));
    if (!target) return;

    setOpen(false);
    // Keep native anchor navigation and URL history; focus the destination
    // without a second scroll, including when a link is activated by keyboard.
    target.focus({ preventScroll: true });
  });

  document.addEventListener('keydown', (event) => {
    if (event.key !== 'Escape' || !mobile.matches || button.getAttribute('aria-expanded') !== 'true') return;
    event.preventDefault();
    setOpen(false);
    button.focus();
  });

  mobile.addEventListener('change', updateLayout);
  document.documentElement.classList.add('menu-enhanced');
  updateLayout();
})();
