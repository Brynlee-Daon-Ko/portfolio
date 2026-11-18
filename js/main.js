/* Brynlee Ko — portfolio interactions
   - theme switcher (remembers the visitor's choice)
   - turns on scroll-driven effects
   - letter wave on load, Access Pass tilt
   - image slots: drop files into assets/images/ and they appear */
(function () {
  'use strict';

  var root = document.documentElement;
  var reduceMotion = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ---------- Theme switcher ---------- */
  var THEMES = ['cherry-soda', 'night-garden', 'persimmon-studio', 'sakura-cafe'];
  var buttons = document.querySelectorAll('[data-theme-pick]');
  var metaTheme = document.querySelector('meta[name="theme-color"]');

  function applyTheme(slug, save) {
    if (THEMES.indexOf(slug) === -1) slug = THEMES[0];
    root.setAttribute('data-theme', slug);
    buttons.forEach(function (b) {
      var on = b.getAttribute('data-theme-pick') === slug;
      b.setAttribute('aria-pressed', on ? 'true' : 'false');
      b.firstElementChild.style.boxShadow = on ? '0 0 0 2px var(--deep)' : 'none';
    });
    if (metaTheme) metaTheme.setAttribute('content', getComputedStyle(root).getPropertyValue('--deep').trim());
    if (save) {
      try { localStorage.setItem('bk-theme', slug); } catch (e) { /* private mode */ }
    }
  }

  buttons.forEach(function (b) {
    b.addEventListener('click', function () { applyTheme(b.getAttribute('data-theme-pick'), true); });
  });
  applyTheme(root.getAttribute('data-theme'), false);

  /* ---------- Scroll-driven effects ---------- */
  var page = document.querySelector('.page');
  if (page && !reduceMotion) page.classList.add('fx');

  /* ---------- Letter wave when the page loads ---------- */
  if (!reduceMotion && Element.prototype.animate) {
    document.querySelectorAll('h1 .ltr').forEach(function (el, i) {
      el.animate(
        [{ scale: '1' }, { scale: '1.22' }, { scale: '0.94' }, { scale: '1' }],
        { duration: 620, delay: 250 + i * 70, easing: 'cubic-bezier(.3,1.6,.5,1)' }
      );
    });
  }

  /* ---------- Access Pass leans toward the pointer ---------- */
  var hero = document.getElementById('top');
  var badge = document.querySelector('.sway');
  var finePointer = window.matchMedia && window.matchMedia('(pointer: fine)').matches;
  if (hero && badge && finePointer && !reduceMotion) {
    hero.addEventListener('pointermove', function (e) {
      var r = hero.getBoundingClientRect();
      var x = (e.clientX - r.left) / r.width - 0.5;
      var y = (e.clientY - r.top) / r.height - 0.5;
      badge.style.setProperty('--tilt-y', (x * 16).toFixed(2) + 'deg');
      badge.style.setProperty('--tilt-x', (-y * 10).toFixed(2) + 'deg');
    });
    hero.addEventListener('pointerleave', function () {
      badge.style.setProperty('--tilt-y', '0deg');
      badge.style.setProperty('--tilt-x', '0deg');
    });
  }

  /* ---------- Image slots ----------
     Each placeholder has data-slot="name". Put assets/images/name.gif (or .webp, .png, .jpg, .jpeg)
     in the repo and it fills the placeholder automatically. */
  var EXTENSIONS = ['gif', 'webp', 'png', 'jpg', 'jpeg'];
  document.querySelectorAll('.slot[data-slot]').forEach(function (slot) {
    var name = slot.getAttribute('data-slot');
    var i = 0;
    (function tryNext() {
      if (i >= EXTENSIONS.length) return;
      var img = new Image();
      img.alt = slot.getAttribute('data-alt') || '';
      img.decoding = 'async';
      img.onload = function () {
        slot.appendChild(img);
        slot.classList.add('has-img');
      };
      img.onerror = function () { i += 1; tryNext(); };
      img.src = 'assets/images/' + name + '.' + EXTENSIONS[i];
    })();
  });
})();
