document.addEventListener('DOMContentLoaded', function() {
  // Set current year in footer
  document.getElementById('currentYear').textContent = new Date().getFullYear();

  // Initialize theme
  initTheme();
  
  // Initialize products
  initProducts();
  
  // Initialize navigation
  initNavigation();
});

// Product Data
const products = [
  {
    title: 'Sign',
    images: [
      'Assets/Pictures/El_Zoz_Sign.jpeg',
      'Assets/Pictures/Sign1.jpeg',
      'Assets/Pictures/Sign2.jpeg',
      'Assets/Pictures/Sign3.jpeg',
    ],
    videos: [],
    description: 'Beautiful sign for your front door or bedroom. Customizable with any name or design to match your personal style.',
    price: 'Price varies based on size and design',
    category: ['Decoration', 'Gift', 'Customizable'],
    colors: ["green","silver","gold","red","yellow","blue"]
  },
  {
    title: 'Heart Keychain',
    images: [
      'Assets/Pictures/HeartKeychain4.jpeg',
      'Assets/Pictures/HeartKeychain5.jpeg',
      'Assets/Pictures/HeartKeychain.jpeg',
      'Assets/Pictures/HeartKeychain2.jpeg',
      'Assets/Pictures/HeartKeychain3.jpeg',
    ],
    videos: [],
    description: 'Show your bond with this customizable heart keychain. Perfect for couples, friends, or family members. Available in multiple colors.',
    price: 'Price varies based on size and design',
    category: ['Accessories', 'Gift', 'Customizable'],
    colors: ["green","silver","gold","red","yellow","blue"]
  },
  {
    title: 'Keychain',
    images: [
      'Assets/Pictures/Keychain1.jpeg',
      'Assets/Pictures/Keychain2.jpeg',
      'Assets/Pictures/Keychain3.jpeg',
      'Assets/Pictures/Keychain4.jpeg',
    ],
    videos: [
      'Assets/Videos/Keychain.mp4',
      'Assets/Videos/Keychain2.mp4',
    ],
    description: 'Wanna add some personality to your keys? Well use this customizable keychain to spice it up🔥! ',
    price: 'Price varies based on size and design',
    category: ['Accessories', 'Gift', 'Customizable'],
    colors: ["green","silver","gold","red","yellow","blue"]
  },
  {
    title: 'Dual Name Sign',
    images: [
      'Assets/Pictures/DualNameSign.png'
    ],
    videos: [
      'Assets/Videos/DualNameSign.mp4',
      'Assets/Videos/DualNameSign2.mp4',
      'Assets/Videos/DualNameSign3.mp4',
    ],
    description: 'Wanna add some personality to your keys? Well use this customizable keychain to spice it up🔥! ',
    price: 'Price varies based on size and design',
    category: ['Decoration', 'Gift', 'Customizable'],
    colors: ["green","silver","gold","red","yellow","blue"]
  },
  {
    
    title: 'Drain Cleaner',
    images: [
      'Assets/Pictures/DrainCleaner.jpeg',
    ],
    videos: [
      'Assets/Videos/DrainCleaner.mp4',
    ],
    description: 'This tool right here is so useful you can remove hair and other objects from drains.',
    price: '25 EGP',
    category: ['Utility'],
    colors: ["green"]
  },
  {
    title: 'Crocodile bag Clip',
    images: [
      'Assets/Pictures/CrocodileClip.jpeg',
      'Assets/Pictures/CrocodileClip2.jpeg',
      'Assets/Pictures/CrocodileClip3.jpeg',
      'Assets/Pictures/CrocodileClip4.jpeg',
    ],
    videos: [
      'Assets/Videos/Crocodile clip.mp4',
    ],
    description: 'Got opend bags that wont close? And you dont want them to go stale? Well just usse this bag clip!',
    price: '35 EGP',
    category: ['Utility'],
    colors: ["green"]
  },
   {
    title: 'Bookmark',
    images: [
      'Assets/Pictures/Bookmark.jpeg',
      'Assets/Pictures/Bookmark2.jpeg',
      'Assets/Pictures/Bookmark3.jpeg',
    ],
    videos: [
    ],
    description: 'If you like reading you will want to save where you stopped reading.So this bookmark makrs the page for you! you can also use it to turn pages without touching the book!',
    price: '20 EGP',
    category: ['Utility'],
    colors: ["green"]
  },
  {
    title: 'Car Vent Phone Holder',
    images: [
      'Assets/Pictures/CarVentPhoneHolder.png',
    ],
    videos: [
      'Assets/Videos/Car vent Phone Holder.mp4',
    ],
    description: 'Ever wanted to have a hands free way to use your phone in the car?Well now you can!With this phone holder that holds onto the air vents in your car! ',
    price: '180 EGP',
    category: ['Utility'],
    colors: ["green"]
  },
  {
    title: 'Foldable phone stand keychain',
    images: [
      'Assets/Pictures/Foldable phone stand keychain1.jpeg',
        'Assets/Pictures/Foldable phone stand keychain2.jpeg',
          'Assets/Pictures/Foldable phone stand keychain3.jpeg',
            'Assets/Pictures/Foldable phone stand keychain4.jpeg',
              'Assets/Pictures/Foldable phone stand keychain5.jpeg',
    ],
    videos: [
      'Assets/Videos/Foldable phone stand keychain.mp4',
    ],
    description: 'Ever wanted to have a hands free way to use your phone on the go? Well now you can with this portable and foldable phone stand keychain! And i is customizable to put your name!',
    price: 'Price varies based on the text',
    category: ['Accessories', 'Gift', 'Customizable','Utility'],
    colors: ["green"]
  },
  
];

// Theme Management
function initTheme() {
  const themeToggle = document.getElementById('themeToggle');
  const storedTheme = localStorage.getItem('theme') || 
                     (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
  
  document.body.setAttribute('data-theme', storedTheme);
  themeToggle.checked = storedTheme === 'dark';
  
  themeToggle.addEventListener('change', function() {
    const theme = this.checked ? 'dark' : 'light';
    document.body.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
  });
}

// Product Management
function initProducts() {
  renderProducts();
  
  // Filter button event delegation
  document.querySelector('.filter-buttons').addEventListener('click', function(e) {
    if (e.target.classList.contains('filter-btn')) {
      document.querySelectorAll('.filter-btn').forEach(btn => btn.classList.remove('active'));
      e.target.classList.add('active');
      const filter = e.target.dataset.filter;
      const searchTerm = document.getElementById('searchBar').value;
      renderProducts(filter, searchTerm);
    }
  });
  
  // Search functionality with debounce
  const searchBar = document.getElementById('searchBar');
  let searchTimeout;
  
  searchBar.addEventListener('input', function() {
    clearTimeout(searchTimeout);
    searchTimeout = setTimeout(() => {
      const activeFilter = document.querySelector('.filter-btn.active').dataset.filter;
      renderProducts(activeFilter, this.value);
    }, 300);
  });
}

function renderProducts(filter = 'all', searchTerm = '') {
  const productGrid = document.getElementById('productGrid');
  productGrid.innerHTML = '';
  
  const filteredProducts = products.filter(product => {
  const matchesFilter = filter === 'all' || (Array.isArray(product.category) ? product.category.includes(filter) : product.category === filter);

    const matchesSearch = product.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         product.description.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesFilter && matchesSearch;
  });
  
  if (filteredProducts.length === 0) {
    productGrid.innerHTML = '<p class="no-products">No products found matching your criteria.</p>';
    return;
  }
  
  filteredProducts.forEach((product, index) => {
    const productCard = document.createElement('div');
    productCard.className = 'product-card';
    productCard.style.animationDelay = `${index * 0.1}s`;
    productCard.innerHTML = `
      <div class="product-image-container">
        <img src="${product.images[0]}" alt="${product.title}" loading="lazy">
        ${product.videos.length > 0 ? '<span class="video-indicator">▶</span>' : ''}
      </div>
      <div class="product-info">
        <h3>${product.title}</h3>
        <span class="product-category">
       ${Array.isArray(product.category) ? product.category.join(', ') : product.category}
        </span>
      </div>
    `;
    productCard.addEventListener('click', () => openProductPopup(product));
    productGrid.appendChild(productCard);
  });
}

// Popup Management
let currentMediaIndex = 0;

function openProductPopup(product) {
  const popup = document.getElementById('productPopup');
  const popupTitle = document.getElementById('popupTitle');
  const popupDesc = document.getElementById('popupDesc');
  const popupPrice = document.getElementById('popupPrice');
  const mediaContainer = document.getElementById('popupImagesContainer');

  // Set product info
  popupTitle.textContent = product.title;
  popupDesc.textContent = product.description;
  popupPrice.textContent = product.price;

  // Clear previous media
  mediaContainer.innerHTML = '';
  currentMediaIndex = 0;

  // Combine images and videos
  const allMedia = [
    ...product.images.map(src => ({ type: 'image', src })),
    ...product.videos.map(src => ({ type: 'video', src }))
  ];

  // Create media elements
  allMedia.forEach((media, index) => {
    let mediaElement;
    if (media.type === 'image') {
      mediaElement = document.createElement('img');
      mediaElement.src = media.src;
      mediaElement.alt = `${product.title} - ${index + 1}`;
    } else {
      mediaElement = document.createElement('video');
      mediaElement.src = media.src;
      mediaElement.controls = true;
    }
    mediaElement.className = index === 0 ? 'active' : '';
    mediaElement.style.opacity = index === 0 ? '1' : '0';
    mediaContainer.appendChild(mediaElement);
  });

  // Add navigation if multiple media items
  if (allMedia.length > 1) {
    const prevBtn = document.createElement('button');
    prevBtn.className = 'nav-btn prev';
    prevBtn.innerHTML = '&lt;';
    prevBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      navigateMedia(-1, allMedia.length);
    });

    const nextBtn = document.createElement('button');
    nextBtn.className = 'nav-btn next';
    nextBtn.innerHTML = '&gt;';
    nextBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      navigateMedia(1, allMedia.length);
    });

    mediaContainer.appendChild(prevBtn);
    mediaContainer.appendChild(nextBtn);
  }

  // Render color swatches if available
  const colorSection = document.querySelector(".color-section");
  const colorLabel = document.querySelector(".color-label");

  // Remove existing color options
  const existing = colorSection.querySelector(".color-options");
  if (existing) existing.remove();

  if (product.colors && product.colors.length > 0) {
    const colorContainer = document.createElement("div");
    colorContainer.className = "color-options";

    product.colors.forEach(color => {
      const swatch = document.createElement("span");
      swatch.className = "color-swatch";
      swatch.style.backgroundColor = color;
      swatch.title = color;

      swatch.addEventListener("click", () => {
        document.querySelectorAll(".color-swatch").forEach(s => s.classList.remove("selected"));
        swatch.classList.add("selected");
      });

      colorContainer.appendChild(swatch);
    });

    colorSection.appendChild(colorContainer);
    colorLabel.style.display = "inline";
  } else {
    colorLabel.style.display = "none";
  }

  // Show popup
  popup.style.display = 'flex';
  setTimeout(() => {
    popup.classList.add('show');
  }, 10);
  document.body.style.overflow = 'hidden';

  // Close popup on overlay click
  popup.addEventListener('click', function (e) {
    if (e.target === this || e.target.classList.contains('popup-overlay')) {
      closePopup();
    }
  });

  // Close on Escape key
  document.addEventListener('keydown', function closeOnEscape(e) {
    if (e.key === 'Escape') {
      closePopup();
      document.removeEventListener('keydown', closeOnEscape);
    }
  });
}


function navigateMedia(direction, mediaCount) {
  const mediaElements = document.querySelectorAll('#popupImagesContainer img, #popupImagesContainer video');
  
  // Fade out current media
  mediaElements[currentMediaIndex].style.opacity = '0';
  
  setTimeout(() => {
    // Hide current media
    mediaElements[currentMediaIndex].classList.remove('active');
    if (mediaElements[currentMediaIndex].tagName === 'VIDEO') {
      mediaElements[currentMediaIndex].pause();
    }
    
    // Calculate new index
    currentMediaIndex = (currentMediaIndex + direction + mediaCount) % mediaCount;
    
    // Show new media
    mediaElements[currentMediaIndex].classList.add('active');
    mediaElements[currentMediaIndex].style.opacity = '1';
    
    if (mediaElements[currentMediaIndex].tagName === 'VIDEO') {
      mediaElements[currentMediaIndex].play();
    }
  }, 150);
}

function closePopup() {
  const popup = document.getElementById('productPopup');
  popup.classList.remove('show');
  
  // Wait for animation to complete before hiding
  setTimeout(() => {
    popup.style.display = 'none';
    document.body.style.overflow = 'auto';
    
    // Pause any playing videos
    const videos = popup.querySelectorAll('video');
    videos.forEach(video => video.pause());
  }, 300);
}

// Navigation Management
function initNavigation() {
  const hamburger = document.querySelector('.hamburger');
  const navLinks = document.getElementById('navLinks');
  
  hamburger.addEventListener('click', function() {
    this.classList.toggle('active');
    navLinks.classList.toggle('show');
    this.setAttribute('aria-expanded', this.classList.contains('active'));
  });
  
  // Close menu when clicking on a link
  document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
      hamburger.classList.remove('active');
      navLinks.classList.remove('show');
      hamburger.setAttribute('aria-expanded', 'false');
    });
  });
}
