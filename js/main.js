/* Brynlee Ko — portfolio interactions
   - theme switcher (remembers the visitor's choice)
   - turns on scroll-driven effects
   - letter wave on load, Access Pass tilt
   - image/video slots: drop files into assets/images/ and they appear */
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

  /* ---------- Image / video slots ----------
     Each placeholder has data-slot="name". Put assets/images/name.mp4 (or .webm, .gif, .webp,
     .png, .jpg, .jpeg) in the repo and it fills the placeholder automatically. Videos play muted
     on a loop while on screen; with reduced motion they don't autoplay and show controls. */
  var VIDEO_EXTENSIONS = ['mp4', 'webm'];
  var IMAGE_EXTENSIONS = ['gif', 'webp', 'png', 'jpg', 'jpeg'];
  var videoObserver = 'IntersectionObserver' in window && !reduceMotion
    ? new IntersectionObserver(function (entries) {
        entries.forEach(function (e) {
          if (e.isIntersecting) { var p = e.target.play(); if (p && p.catch) p.catch(function () {}); }
          else e.target.pause();
        });
      }, { threshold: 0.25 })
    : null;

  function tryImages(slot, name) {
    var i = 0;
    (function tryNext() {
      if (i >= IMAGE_EXTENSIONS.length) return;
      var img = new Image();
      img.alt = slot.getAttribute('data-alt') || '';
      img.decoding = 'async';
      img.onload = function () {
        slot.appendChild(img);
        slot.classList.add('has-img');
      };
      img.onerror = function () { i += 1; tryNext(); };
      img.src = 'assets/images/' + name + '.' + IMAGE_EXTENSIONS[i];
    })();
  }

  function tryVideos(slot, name) {
    var i = 0;
    (function tryNext() {
      if (i >= VIDEO_EXTENSIONS.length) { tryImages(slot, name); return; }
      var v = document.createElement('video');
      v.muted = true;
      v.loop = true;
      v.playsInline = true;
      v.preload = 'metadata';
      v.setAttribute('aria-label', slot.getAttribute('data-alt') || '');
      if (reduceMotion) v.controls = true;
      v.onloadedmetadata = function () {
        v.onerror = null;
        if (slot.getAttribute('data-frame') === 'phone') {
          // Phone-app recordings sit inside a drawn phone, centred in the slot
          var phone = document.createElement('div');
          phone.className = 'phone';
          v.style.aspectRatio = v.videoWidth + ' / ' + v.videoHeight;
          phone.appendChild(v);
          slot.appendChild(phone);
          slot.classList.add('has-phone');
        } else {
          // data-fit="cover" keeps the slot's own size and crops the video to fill it;
          // otherwise the slot takes the video's shape so nothing is cut off.
          if (slot.getAttribute('data-fit') !== 'cover') {
            slot.style.aspectRatio = v.videoWidth + ' / ' + v.videoHeight;
          }
          slot.appendChild(v);
        }
        slot.classList.add('has-img', 'has-video');
        v.currentTime = 0.01; // paint the first frame right away, even before (or without) playback
        if (videoObserver) videoObserver.observe(v);
      };
      v.onerror = function () { i += 1; tryNext(); };
      v.src = 'assets/images/' + name + '.' + VIDEO_EXTENSIONS[i];
    })();
  }

  document.querySelectorAll('.slot[data-slot]').forEach(function (slot) {
    tryVideos(slot, slot.getAttribute('data-slot'));
  });
})();
