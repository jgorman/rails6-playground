console.log('>>>>> Loaded')

// Clean up Bootstrap modals.
// See https://www.honeybadger.io/blog/turbolinks/
document.addEventListener('turbolinks:before-cache', () => {
  // Manually tear down bootstrap modals before caching. If turbolinks
  // caches the modal then tries to restore it, it breaks bootstrap's JS.
  // We can't just use bootstrap's `modal('close')` method because it is async.
  // Turbolinks will cache the page before it finishes running.
  if (document.body.classList.contains('modal-open')) {
    $('.modal')
      .hide()
      .removeAttr('aria-modal')
      .attr('aria-hidden', 'true');
    $('.modal-backdrop').remove();
    $('body').removeClass('modal-open');
  }
});

