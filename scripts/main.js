// small helpers: set current year and track download clicks (replace with real analytics)
document.getElementById('year').textContent = new Date().getFullYear();

document.getElementById('downloadPrimary')?.addEventListener('click', function (e) {
  // If linking to external stores, remove preventDefault.
  // Example: send event to analytics
  console.log('Primary download clicked'); // replace with analytics call

(function () {
  var btn = document.querySelector('[data-coming-soon]');
  var modal = document.getElementById('comingSoonModal');
  if (!btn || !modal) return;

  var closeBtn = modal.querySelector('.modal-close');
  var okBtn = modal.querySelector('.modal-ok');
  var backdrop = modal.querySelector('.modal-backdrop');

  function openModal() {
    modal.setAttribute('aria-hidden', 'false');
    // prevent page scroll while modal open
    document.body.style.overflow = 'hidden';
    // focus management
    okBtn.focus();
  }

  function closeModal() {
    modal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
    btn.focus();
  }

  // Intercept the click to show the modal instead of navigating
  btn.addEventListener('click', function (e) {
    e.preventDefault();
    openModal();
  });

  // Keyboard activation (Enter or Space)
  btn.addEventListener('keydown', function (e) {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      openModal();
    }
  });

  closeBtn.addEventListener('click', closeModal);
  okBtn.addEventListener('click', closeModal);

  // close when clicking backdrop
  backdrop.addEventListener('click', closeModal);

  // ESC to close
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && modal.getAttribute('aria-hidden') === 'false') {
      closeModal();
    }
  });
})();
});
