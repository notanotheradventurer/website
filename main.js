// main.js
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
  
    galleryImages.forEach((image, index) => {
      const img = document.createElement('img');
      img.src = image;
      img.alt = `Gallery Image ${index + 1}`;
      img.className = 'gallery-image';
      galleryContainer.appendChild(img);
  
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
  
    socialLinks.forEach(link => {
      if (link.visible) {
        const a = document.createElement('a');
        a.href = link.url;
        a.target = '_blank';
        const img = document.createElement('img');
        img.src = link.icon;
        img.alt = link.name;
        a.appendChild(img);
        socialIconsContainer.appendChild(a);
      }
    });
  }
  
  function createDownloadLinks(downloads) {
    const downloadLinksContainer = document.getElementById('download-links').querySelector('ul');
  
    downloads.forEach(download => {
      if (download.visible) {
        const li = document.createElement('li');
        li.className = 'download-item';
        
        const a = document.createElement('a');
        a.href = download.url;
        a.target = '_blank';
        a.innerHTML = `
          <img src="icons/${download.os.toLowerCase()}.webp" alt="${download.os} Download" class="download-icon">
          <span class="os-text">${download.os}</span>
          <img src="icons/download.webp" alt="Download Icon" class="download-icon">
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
  
  function initialize() {
    setMetadata(config.metadata);
    createGallery(config.galleryImages);
    createSocialLinks(config.socialLinks);
    createDownloadLinks(config.downloads);
    insertChecksums();
  
    const galleryContainer = document.getElementById('gallery');
    enableDragScroll(galleryContainer);
  
    const toggleContainer = document.createElement('div');
    toggleContainer.className = 'toggle-container';
    
    const toggleLabel = document.createElement('label');
    toggleLabel.className = 'switch';
    
    const toggleInput = document.createElement('input');
    toggleInput.type = 'checkbox';
    toggleInput.onclick = toggleMode;
    
    const toggleSpan = document.createElement('span');
    toggleSpan.className = 'slider round';
    
    toggleLabel.appendChild(toggleInput);
    toggleLabel.appendChild(toggleSpan);
    
    toggleContainer.appendChild(toggleLabel);
    document.body.appendChild(toggleContainer);
  
    checkAge();
  }
  
  function toggleMode() {
    const body = document.body;
    body.classList.toggle('light-mode');
  }
  
  function detectOSMode() {
    const darkModeQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const lightModeQuery = window.matchMedia('(prefers-color-scheme: light)');
    
    if (darkModeQuery.matches) {
      document.body.classList.remove('light-mode');
    } else if (lightModeQuery.matches) {
      document.body.classList.add('light-mode');
    } else {
      if (config.defaultMode === 'dark') {
        document.body.classList.remove('light-mode');
      } else {
        document.body.classList.add('light-mode');
      }
    }
  }
  
  document.addEventListener('DOMContentLoaded', () => {
    initialize();
    detectOSMode();
  });
  