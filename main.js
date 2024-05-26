function setMetadata(metadata) {
  const head = document.querySelector('head');

  const metaOgType = document.createElement('meta');
  metaOgType.setAttribute('property', 'og:type');
  metaOgType.setAttribute('content', metadata.ogType);
  head.appendChild(metaOgType);

  const metaOgUrl = document.createElement('meta');
  metaOgUrl.setAttribute('property', 'og:url');
  metaOgUrl.setAttribute('content', metadata.ogUrl);
  head.appendChild(metaOgUrl);

  const metaOgTitle = document.createElement('meta');
  metaOgTitle.setAttribute('property', 'og:title');
  metaOgTitle.setAttribute('content', metadata.ogTitle);
  head.appendChild(metaOgTitle);

  const metaOgDescription = document.createElement('meta');
  metaOgDescription.setAttribute('property', 'og:description');
  metaOgDescription.setAttribute('content', metadata.ogDescription);
  head.appendChild(metaOgDescription);

  const metaOgImage = document.createElement('meta');
  metaOgImage.setAttribute('property', 'og:image');
  metaOgImage.setAttribute('content', metadata.ogImage);
  head.appendChild(metaOgImage);

  const metaTwitterCard = document.createElement('meta');
  metaTwitterCard.setAttribute('name', 'twitter:card');
  metaTwitterCard.setAttribute('content', metadata.twitterCard);
  head.appendChild(metaTwitterCard);

  const metaTwitterTitle = document.createElement('meta');
  metaTwitterTitle.setAttribute('name', 'twitter:title');
  metaTwitterTitle.setAttribute('content', metadata.twitterTitle);
  head.appendChild(metaTwitterTitle);

  const metaTwitterDescription = document.createElement('meta');
  metaTwitterDescription.setAttribute('name', 'twitter:description');
  metaTwitterDescription.setAttribute('content', metadata.twitterDescription);
  head.appendChild(metaTwitterDescription);

  const metaTwitterImage = document.createElement('meta');
  metaTwitterImage.setAttribute('name', 'twitter:image');
  metaTwitterImage.setAttribute('content', metadata.twitterImage);
  head.appendChild(metaTwitterImage);
}

function createGallery(galleryImages) {
  const galleryContainer = document.getElementById('gallery');
  const thumbnailsContainer = document.getElementById('gallery-thumbnails');

  if (galleryContainer && thumbnailsContainer && !galleryContainer.hasChildNodes() && !thumbnailsContainer.hasChildNodes()) {
    galleryImages.forEach((image, index) => {
      const imgContainer = document.createElement('div');
      imgContainer.className = 'gallery-container';

      const img = document.createElement('img');
      img.src = image;
      img.alt = `Gallery Image ${index + 1}`;
      img.className = 'gallery-image';

      if (index === 0) { // Add overlay only to the first image for demonstration
        const clickOverlay = document.createElement('img');
        clickOverlay.src = 'gallery/click.webp';
        clickOverlay.alt = 'Click Overlay';
        clickOverlay.id = 'click-overlay';
        clickOverlay.style.width = '100%';
        clickOverlay.style.height = '100%';
        clickOverlay.onclick = () => clickOverlay.style.display = 'none';
        imgContainer.appendChild(clickOverlay);
      }

      imgContainer.appendChild(img);
      galleryContainer.appendChild(imgContainer);

      const thumbnail = document.createElement('img');
      thumbnail.src = image;
      thumbnail.alt = `Gallery Thumbnail ${index + 1}`;
      thumbnail.className = 'thumbnail';
      thumbnail.onclick = () => scrollToImage(index);
      thumbnailsContainer.appendChild(thumbnail);
    });

    document.addEventListener('keydown', (e) => {
      if (e.key === 'ArrowRight') {
        scrollToNextImage();
      } else if (e.key === 'ArrowLeft') {
        scrollToPreviousImage();
      }
    });
  }
}

function scrollToImage(index) {
  const gallery = document.getElementById('gallery');
  const images = document.querySelectorAll('.gallery-image');
  const imageWidth = images[0].clientWidth;
  gallery.scrollTo({
    left: imageWidth * index,
    behavior: 'smooth'
  });
}

function scrollToNextImage() {
  const gallery = document.getElementById('gallery');
  const images = document.querySelectorAll('.gallery-image');
  const imageWidth = images[0].clientWidth;
  const currentScrollPosition = gallery.scrollLeft;
  const nextScrollPosition = currentScrollPosition + imageWidth;

  if (nextScrollPosition < gallery.scrollWidth) {
    gallery.scrollTo({
      left: nextScrollPosition,
      behavior: 'smooth'
    });
  }
}

function scrollToPreviousImage() {
  const gallery = document.getElementById('gallery');
  const images = document.querySelectorAll('.gallery-image');
  const imageWidth = images[0].clientWidth;
  const currentScrollPosition = gallery.scrollLeft;
  const previousScrollPosition = currentScrollPosition - imageWidth;

  if (previousScrollPosition >= 0) {
    gallery.scrollTo({
      left: previousScrollPosition,
      behavior: 'smooth'
    });
  }
}

function createSocialLinks(socialLinks) {
  const socialIconsContainer = document.getElementById('social-icons');

  if (socialIconsContainer && !socialIconsContainer.hasChildNodes()) {
    socialLinks.forEach(link => {
      if (link.visible) {
        const a = document.createElement('a');
        a.href = link.url;
        a.target = '_blank';
        const img = document.createElement('img');
        img.src = link.icon;
        img.setAttribute('data-light', link.icon.replace('.webp', '_l.webp')); // Assuming light mode icons follow this naming convention
        img.alt = link.name;
        a.appendChild(img);
        socialIconsContainer.appendChild(a);
      }
    });
  }
}

function switchIconsToLightMode() {
  const icons = document.querySelectorAll('#social-icons img, .download-icon');
  icons.forEach(icon => {
    icon.src = icon.getAttribute('data-light');
  });
}

function switchIconsToDarkMode() {
  const icons = document.querySelectorAll('#social-icons img, .download-icon');
  icons.forEach(icon => {
    icon.src = icon.src.replace('_l.webp', '.webp');
  });
}

function createDownloadLinks(downloads) {
  const downloadLinksContainer = document.getElementById('download-links').querySelector('ul');

  if (downloadLinksContainer && !downloadLinksContainer.hasChildNodes()) {
    downloads.forEach(download => {
      if (download.visible) {
        const li = document.createElement('li');
        li.className = 'download-item';

        const a = document.createElement('a');
        a.href = download.url;
        a.target = '_blank';
        a.innerHTML = `
          <img src="icons/${download.os.toLowerCase()}.webp" alt="${download.os} Download" class="download-icon" data-light="icons/${download.os.toLowerCase()}_l.webp">
          <span class="os-text">${download.os}</span>
          <img src="icons/download.webp" alt="Download Icon" class="download-icon" data-light="icons/download_l.webp">
        `;
        li.appendChild(a);

        const p = document.createElement('p');
        p.className = 'checksum-text';
        p.textContent = `MD5: `;
        const span = document.createElement('span');
        span.id = `${download.os.toLowerCase()}-checksum`;
        p.appendChild(span);
        li.appendChild(p);

        downloadLinksContainer.appendChild(li);
      }
    });
  }
}

function insertChecksums() {
  config.downloads.forEach(download => {
    if (download.visible) {
      const checksumElement = document.getElementById(`${download.os.toLowerCase()}-checksum`);
      if (checksumElement) {
        checksumElement.textContent = download.checksum;
      }
    }
  });
}

function enableDragScroll(container) {
  let isDown = false;
  let startX;
  let scrollLeft;

  container.addEventListener('mousedown', (e) => {
    isDown = true;
    container.classList.add('active');
    startX = e.pageX - container.offsetLeft;
    scrollLeft = container.scrollLeft;
  });

  container.addEventListener('mouseleave', () => {
    isDown = false;
    container.classList.remove('active');
  });

  container.addEventListener('mouseup', () => {
    isDown = false;
    container.classList.remove('active');
  });

  container.addEventListener('mousemove', (e) => {
    if (!isDown) return;
    e.preventDefault();
    const x = e.pageX - container.offsetLeft;
    const walk = (x - startX) * 3; //scroll-fast
    container.scrollLeft = scrollLeft - walk;
  });
}

function setToggleIconPaths() {
  const toggleIcon = document.getElementById('toggle-icon');
  if (toggleIcon) {
    const basePath = window.location.origin + window.location.pathname.substring(0, window.location.pathname.lastIndexOf('/') + 1);

    const darkModeSrc = basePath + 'icons/toggle.webp';
    const lightModeSrc = basePath + 'icons/toggle_l.webp';

    toggleIcon.src = darkModeSrc;
    toggleIcon.setAttribute('data-light', lightModeSrc);
  }
}

function adjustContainerWidth() {
  const container = document.querySelector('.container');
  if (window.innerWidth <= 600) { // Mobile devices
    container.style.width = '100%';
    container.style.padding = '0';
  } else {
    container.style.width = '100%';
    container.style.maxWidth = '800px';
    container.style.padding = '0 20px';
  }
}

document.addEventListener('DOMContentLoaded', function() {
  detectTheme();
  initialize();
  adjustContainerWidth();
});

window.addEventListener('resize', adjustContainerWidth);

function initialize() {
  if (document.getElementById('social-icons') && !document.getElementById('social-icons').hasChildNodes()) {
    createSocialLinks(config.socialLinks);
  }
  if (document.getElementById('download-links') && !document.getElementById('download-links').querySelector('ul').hasChildNodes()) {
    createDownloadLinks(config.downloads);
  }
  const galleryContainer = document.getElementById('gallery');
  if (galleryContainer && !galleryContainer.hasChildNodes()) {
    createGallery(config.galleryImages);
    enableDragScroll(galleryContainer);
  }
  insertChecksums();
  setToggleIconPaths();
}

function toggleMode() {
  const body = document.body;
  body.classList.toggle('light-mode');
  const toggleImage = document.querySelector('.toggle-container img');
  const theme = body.classList.contains('light-mode') ? 'light' : 'dark';

  if (theme === 'light') {
    switchIconsToLightMode();
    toggleImage.src = toggleImage.getAttribute('data-light');
  } else {
    switchIconsToDarkMode();
    toggleImage.src = toggleImage.src.replace('_l.webp', '.webp');
  }

  setCookie('theme', theme, 365);
  localStorage.setItem('theme', theme);
  updateTheme();
}

function detectTheme() {
  let theme = getCookie('theme') || localStorage.getItem('theme');

  if (!theme) {
    const darkModeQuery = window.matchMedia('(prefers-color-scheme: dark)');
    theme = darkModeQuery.matches ? 'dark' : 'light';
  }

  document.body.classList.add(theme === 'light' ? 'light-mode' : 'dark-mode');
  const toggleIcon = document.querySelector('.toggle-container img');
  const themeToggle = document.querySelector('.switch input');

  if (theme === 'light') {
    switchIconsToLightMode();
    toggleIcon.src = toggleIcon.getAttribute('data-light');
    themeToggle.checked = true; // Ensures the checkbox reflects the current theme
  } else {
    switchIconsToDarkMode();
    toggleIcon.src = toggleIcon.src.replace('_l.webp', '.webp');
    themeToggle.checked = false; // Ensures the checkbox reflects the current theme
  }
  updateTheme();
}

function updateTheme() {
  const theme = document.body.classList.contains('light-mode') ? 'light' : 'dark';
  const headerImg = document.querySelector('#header img');
  const playButton = document.querySelector('.play_button');
  const container = document.getElementById('container');
  const h1Elements = document.querySelectorAll('h1');
  const h2Elements = document.querySelectorAll('h2');
  const pElements = document.querySelectorAll('p');
  const aElements = document.querySelectorAll('a');
  const ulElements = document.querySelectorAll('ul');
  const downloadItems = document.querySelectorAll('.download-item');
  const toggleContainer = document.querySelector('.toggle-container');
  const toggleSlider = document.querySelector('.slider');
  const header = document.getElementById('header');

  const absolutePath = '/';

  if (theme === 'light') {
    if (headerImg) headerImg.src = absolutePath + 'header_l.webp'; // Updated path for the header image
    if (playButton) {
      playButton.style.color = '#232325';
      playButton.style.borderColor = '#232325';
    }
    document.body.style.backgroundColor = '#f0f0f0'; // Update body background color
    if (container) container.style.backgroundColor = '#f0f0f0';
    h1Elements.forEach(el => el.style.color = '#232325');
    h2Elements.forEach(el => el.style.color = '#232325');
    pElements.forEach(el => el.style.color = '#232325');
    aElements.forEach(el => el.style.color = '#232325');
    ulElements.forEach(el => el.style.color = '#232325');
    if (header) header.style.borderBottomColor = '#232325'; // Update header border color
    downloadItems.forEach(el => {
      el.style.backgroundColor = '#d4d4d4';
      el.style.color = '#232325';
    });
    if (toggleContainer) toggleContainer.style.backgroundColor = '#d4d4d4';
    if (toggleSlider) toggleSlider.style.backgroundColor = '#2b2e4a';
  } else {
    if (headerImg) headerImg.src = absolutePath + 'header.webp'; // Updated path for the header image
    if (playButton) {
      playButton.style.color = '#f0f0f0';
      playButton.style.borderColor = '#f0f0f0';
    }
    document.body.style.backgroundColor = '#27272a'; // Update body background color
    if (container) container.style.backgroundColor = '#27272a';
    h1Elements.forEach(el => el.style.color = '#f0f0f0');
    h2Elements.forEach(el => el.style.color = '#f0f0f0');
    pElements.forEach(el => el.style.color = '#f0f0f0');
    aElements.forEach(el => el.style.color = '#f0f0f0');
    ulElements.forEach(el => el.style.color = '#f0f0f0');
    if (header) header.style.borderBottomColor = '#f0f0f0'; // Update header border color
    downloadItems.forEach(el => {
      el.style.backgroundColor = '#444';
      el.style.color = '#f0f0f0';
    });
    if (toggleContainer) toggleContainer.style.backgroundColor = '#444';
    if (toggleSlider) toggleSlider.style.backgroundColor = '#ccc';
  }
}

function setCookie(name, value, days) {
  const d = new Date();
  d.setTime(d.getTime() + (days * 24 * 60 * 60 * 1000));
  const expires = "expires=" + d.toUTCString();
  document.cookie = name + "=" + value + ";" + expires + ";path=/";
}

function getCookie(name) {
  const cname = name + "=";
  const decodedCookie = decodeURIComponent(document.cookie);
  const ca = decodedCookie.split(';');
  for (let i = 0; i < ca.length; i++) {
    let c = ca[i];
    while (c.charAt(0) == ' ') {
      c = c.substring(1);
    }
    if (c.indexOf(cname) == 0) {
      return c.substring(cname.length, c.length);
    }
  }
  return "";
}

document.addEventListener('DOMContentLoaded', () => {
  detectTheme();
  initialize();
});
