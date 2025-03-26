  // Lazy load more pages during idle times
  let isLoadingBatch = true;
  
  function loadNextBatchOfPages() {
    if (isLoadingBatch) return;
    
    isLoadingBatch = true;
    
    // Find first unloaded page
    let nextUnloadedIndex = -1;
    for (let i = 0; i < pageData.length; i++) {
      if (!pageData[i].isLoaded) {
        nextUnloadedIndex = i;
        break;
      }
    }
    
    // If we found an unloaded page, load a batch of them
    if (nextUnloadedIndex >= 0) {
      console.log(`Loading batch starting from page ${nextUnloadedIndex + 1}`);
      
      let batchSize = 80; // Load 5 pages per batch
      let loadedCount = 0;
      
      function loadNext() {
        if (loadedCount < batchSize && nextUnloadedIndex < pageData.length) {
          if (!pageData[nextUnloadedIndex].isLoaded) {
            loadPage(nextUnloadedIndex);
            loadedCount++;
          }
          nextUnloadedIndex++;
          setTimeout(loadNext, 300); // Space out loading to avoid overwhelming the browser
        } else {
          isLoadingBatch = false;
          
          // Check if there are more pages to load, and schedule another batch
          for (let i = 0; i < pageData.length; i++) {
            if (!pageData[i].isLoaded) {
              setTimeout(loadNextBatchOfPages, 2000); // Wait 2 seconds before loading next batch
              break;
            }
          }
        }
      }
      
      loadNext();
    } else {
      isLoadingBatch = false;
    }
  }
  
  // Start loading batches after initial load
  setTimeout(loadNextBatchOfPages, 3000);  // Enhanced previous/next button handling to ensure proper loading
  document.getElementById('prev-btn').addEventListener('click', () => {
    const currentPage = flipBook.getCurrentPageIndex();
    if (currentPage > 0) {
      const prevPageIndex = currentPage - 1;
      // Make sure previous page is loaded
      if (!pageData[prevPageIndex].isLoaded) {
        loadPage(prevPageIndex);
      }
      // Also preload a few pages before that
      for (let i = Math.max(0, prevPageIndex - 2); i < prevPageIndex; i++) {
        if (!pageData[i].isLoaded) {
          loadPage(i);
        }
      }
    }
  });
  
  document.getElementById('next-btn').addEventListener('click', () => {
    const currentPage = flipBook.getCurrentPageIndex();
    if (currentPage < pageData.length - 1) {
      const nextPageIndex = currentPage + 1;
      // Make sure next page is loaded
      if (!pageData[nextPageIndex].isLoaded) {
        loadPage(nextPageIndex);
      }
      // Also preload a few pages ahead
      for (let i = nextPageIndex + 1; i < Math.min(nextPageIndex + 3, pageData.length); i++) {
        if (!pageData[i].isLoaded) {
          loadPage(i);
        }
      }
    }
  });let flipBook;

document.addEventListener("DOMContentLoaded", () => {
  const container = document.getElementById("flipbook");
  const loadingIndicator = document.getElementById("loading-indicator");
  
  // Prevent default touch behaviors
  document.addEventListener('touchmove', function(e) {
    if (e.target.closest('.stf__parent')) {
      e.preventDefault();
    }
  }, { passive: false });

  // Prevent context menu on book
  document.querySelector('.book-wrapper').addEventListener('contextmenu', function(e) {
    e.preventDefault();
  });

  // Initialize the page flip book
  flipBook = new St.PageFlip(container, {
    width: 700,
    height: 1000,
    size: "fixed",
    minWidth: 300,
    maxWidth: 1200,
    minHeight: 424,
    maxHeight: 1200,
    maxShadowOpacity: 0.5,
    showCover: true,
    mobileScrollSupport: true,
    drawShadow: true,
    flippingTime: 1000,
    usePortrait: false,
    autoSize: true,
    clickEventForward: false,
    useMouseEvents: true,
    disableFlipByClick: false,
    swipeDistance: 10,
    preventTouchEvents: true
  });


  // Portfolio pages - keeping your current URL structure
  const pageUrls = [
    "https://res.cloudinary.com/dgq0nkctc/image/upload/v1742860639/0_kr9tns.jpg",
    "https://res.cloudinary.com/dgq0nkctc/image/upload/v1742949137/PORTFOLIO_032_nbtmwm.png",
    "https://res.cloudinary.com/dgq0nkctc/image/upload/v1742949135/PORTFOLIO_033_u0uune.png",
    "https://res.cloudinary.com/dgq0nkctc/image/upload/v1742860639/04_cvjb5w.jpg",
    "https://res.cloudinary.com/dgq0nkctc/image/upload/v1742860639/05_nxymhr.jpg",
    "https://res.cloudinary.com/dgq0nkctc/image/upload/v1742860639/06_rq3jsd.jpg",
    "https://res.cloudinary.com/dgq0nkctc/image/upload/v1742860640/07_twfrpl.jpg",
    "https://res.cloudinary.com/dgq0nkctc/image/upload/v1742860640/08_xbg24u.jpg",
    "https://res.cloudinary.com/dgq0nkctc/image/upload/v1742860640/09_h8mkak.jpg",
    "https://res.cloudinary.com/dgq0nkctc/image/upload/v1742860641/010_hkpy2r.jpg",
    "https://res.cloudinary.com/dgq0nkctc/image/upload/v1742860641/011_rjpryx.jpg",
    "https://res.cloudinary.com/dgq0nkctc/image/upload/v1742860642/012_rt5k0z.jpg",
    "https://res.cloudinary.com/dgq0nkctc/image/upload/v1742860641/013_kbyepr.jpg",
    "https://res.cloudinary.com/dgq0nkctc/image/upload/v1742860642/014_w9m9wv.jpg",
    "https://res.cloudinary.com/dgq0nkctc/image/upload/v1742860641/015_de4ijt.jpg",
    "https://res.cloudinary.com/dgq0nkctc/image/upload/v1742860642/016_cedjof.jpg",
    "https://res.cloudinary.com/dgq0nkctc/image/upload/v1742860642/017_n7fvhw.jpg",
    "https://res.cloudinary.com/dgq0nkctc/image/upload/v1742860642/018_t3308s.jpg",
    "https://res.cloudinary.com/dgq0nkctc/image/upload/v1742860643/019_c9tedq.jpg",
    "https://res.cloudinary.com/dgq0nkctc/image/upload/v1742860644/020_gabu2h.jpg",
    "https://res.cloudinary.com/dgq0nkctc/image/upload/v1742860643/021_jkqpre.jpg",
    "https://res.cloudinary.com/dgq0nkctc/image/upload/v1742860643/022_vcsee9.jpg",
    "https://res.cloudinary.com/dgq0nkctc/image/upload/v1742860644/023_cacnxc.jpg",
    "https://res.cloudinary.com/dgq0nkctc/image/upload/v1742860644/024_tjcebs.jpg",
    "https://res.cloudinary.com/dgq0nkctc/image/upload/v1742860647/025_yo5jqe.jpg",
    "https://res.cloudinary.com/dgq0nkctc/image/upload/v1742860647/026_ziwfxl.jpg",
    "https://res.cloudinary.com/dgq0nkctc/image/upload/v1742860646/027_rjckvz.jpg",
    "https://res.cloudinary.com/dgq0nkctc/image/upload/v1742860647/028_czdwwj.jpg",
    "https://res.cloudinary.com/dgq0nkctc/image/upload/v1742860647/029_fobrjl.jpg",
    "https://res.cloudinary.com/dgq0nkctc/image/upload/v1742860647/030_qm9huq.jpg",
    "https://res.cloudinary.com/dgq0nkctc/image/upload/v1742860648/031_zr2ume.jpg",
    "https://res.cloudinary.com/dgq0nkctc/image/upload/v1742860648/032_lkufrq.jpg",
    "https://res.cloudinary.com/dgq0nkctc/image/upload/v1742860648/033_qmyz1c.jpg",
    "https://res.cloudinary.com/dgq0nkctc/image/upload/v1742860648/034_ne0r7z.jpg",
    "https://res.cloudinary.com/dgq0nkctc/image/upload/v1742860649/035_k57x4q.jpg",
    "https://res.cloudinary.com/dgq0nkctc/image/upload/v1742860652/036_gljd7j.jpg",
    "https://res.cloudinary.com/dgq0nkctc/image/upload/v1742860652/037_dqovuk.jpg",
    "https://res.cloudinary.com/dgq0nkctc/image/upload/v1742860652/038_xxuaqi.jpg",
    "https://res.cloudinary.com/dgq0nkctc/image/upload/v1742860652/039_lr0cs8.jpg",
    "https://res.cloudinary.com/dgq0nkctc/image/upload/v1742860652/040_rphdob.jpg",
    "https://res.cloudinary.com/dgq0nkctc/image/upload/v1742860653/041_pnoawt.jpg",
    "https://res.cloudinary.com/dgq0nkctc/image/upload/v1742860653/042_v5kdfo.jpg",
    "https://res.cloudinary.com/dgq0nkctc/image/upload/v1742860653/043_tvuv1e.jpg",
    "https://res.cloudinary.com/dgq0nkctc/image/upload/v1742860653/044_googyq.jpg",
    "https://res.cloudinary.com/dgq0nkctc/image/upload/v1742860654/045_amxqjt.jpg",
    "https://res.cloudinary.com/dgq0nkctc/image/upload/v1742860654/046_fhx4gg.jpg",
    "https://res.cloudinary.com/dgq0nkctc/image/upload/v1742860658/047_uyr5sz.jpg",
    "https://res.cloudinary.com/dgq0nkctc/image/upload/v1742860657/048_srbwty.jpg",
    "https://res.cloudinary.com/dgq0nkctc/image/upload/v1742860657/049_hozoug.jpg",
    "https://res.cloudinary.com/dgq0nkctc/image/upload/v1742860657/050_wrqqhr.jpg",
    "https://res.cloudinary.com/dgq0nkctc/image/upload/v1742860658/051_cwhzmw.jpg",
    "https://res.cloudinary.com/dgq0nkctc/image/upload/v1742860658/052_pvwhkx.jpg",
    "https://res.cloudinary.com/dgq0nkctc/image/upload/v1742860658/053_vgfvol.jpg",
    "https://res.cloudinary.com/dgq0nkctc/image/upload/v1742860659/054_v7gg4q.jpg",
    "https://res.cloudinary.com/dgq0nkctc/image/upload/v1742860659/055_qxdbe0.jpg",
    "https://res.cloudinary.com/dgq0nkctc/image/upload/v1742860660/056_t8z1zc.jpg",
    "https://res.cloudinary.com/dgq0nkctc/image/upload/v1742860660/057_smywnn.jpg",
    "https://res.cloudinary.com/dgq0nkctc/image/upload/v1742860662/058_mrieet.jpg",
    "https://res.cloudinary.com/dgq0nkctc/image/upload/v1742860663/059_gwavts.jpg",
    "https://res.cloudinary.com/dgq0nkctc/image/upload/v1742860663/060_xixt6x.jpg",
    "https://res.cloudinary.com/dgq0nkctc/image/upload/v1742860663/061_zgrvuy.jpg",
    "https://res.cloudinary.com/dgq0nkctc/image/upload/v1742860664/062_km8xdr.jpg",
    "https://res.cloudinary.com/dgq0nkctc/image/upload/v1742860664/063_e5duns.jpg",
    "https://res.cloudinary.com/dgq0nkctc/image/upload/v1742860664/064_vooptf.jpg",
    "https://res.cloudinary.com/dgq0nkctc/image/upload/v1742860639/065_prrron.jpg",
    ];

  // Create array of page data with only the first few pages preloaded
  const initialPreloadCount = 80; // Preload first 10 pages
  const pageData = pageUrls.map((url, index) => {
    return {
      url: url,
      isLoaded: index < initialPreloadCount,
      element: null
    };
  });

  // Create initial HTML structure with preloaded pages
  const initialHtmlPages = pageData
    .slice(0, initialPreloadCount)
    .map((page, index) => createImagePage(page.url, index));
  
  // For pages not preloaded, create placeholder pages
  const placeholderPages = pageData
    .slice(initialPreloadCount)
    .map((_, index) => createPlaceholderPage(index + initialPreloadCount));
  
  // Load the book with preloaded and placeholder pages
  flipBook.loadFromHTML([...initialHtmlPages, ...placeholderPages]);

  // Hide loading indicator once initial pages are loaded
  if (loadingIndicator) {
    loadingIndicator.style.display = 'none';
  }

  // Event listener for page flip - load images as needed
  flipBook.on('flip', (e) => {
    // updatePageNumber(); - Removed page number functionality
    updateActiveCategoryInSidebar(e.data);
    
    // Get the current page and surrounding pages to preload
    const currentPage = e.data;
    const pagesToPreload = 4; // Number of pages to preload ahead and behind
    
    // Load current page and next pages
    for (let i = currentPage; i < Math.min(currentPage + pagesToPreload, pageData.length); i++) {
      if (!pageData[i].isLoaded) {
        loadPage(i);
      }
    }
    
    // Load previous pages as well
    for (let i = Math.max(0, currentPage - pagesToPreload); i < currentPage; i++) {
      if (!pageData[i].isLoaded) {
        loadPage(i);
      }
    }
  });

// Function to load a specific page
function loadPage(pageIndex) {
  if (pageIndex >= pageData.length || pageData[pageIndex].isLoaded) {
    return;
  }
  
  const url = pageData[pageIndex].url;
  const img = new Image();
  
  img.onload = () => {
    // Replace placeholder with actual image
    const pageElement = flipBook.getPageByNumber(pageIndex);
    if (pageElement) {
      const wrapper = pageElement.firstChild;
      
      // Clear placeholder content
      while (wrapper.firstChild) {
        wrapper.removeChild(wrapper.firstChild);
      }
      
      // Add loaded image
      const loadedImg = document.createElement("img");
      loadedImg.src = url;
      loadedImg.alt = "Page " + (pageIndex + 1);
      loadedImg.style.width = "100%";
      loadedImg.style.height = "100%";
      loadedImg.style.objectFit = "cover";
      wrapper.appendChild(loadedImg);
      
      // Mark as loaded
      pageData[pageIndex].isLoaded = true;
      pageData[pageIndex].element = loadedImg;
      
      // Debug log
      console.log(`Page ${pageIndex + 1} loaded successfully`);
    } else {
      console.warn(`Could not find page element for page ${pageIndex + 1}`);
    }
  };
  
  img.onerror = () => {
    console.error(`Failed to load image for page ${pageIndex + 1}: ${url}`);
  };
  
  console.log(`Started loading page ${pageIndex + 1}`);
  img.src = url;
}

  // Update page number on initial load
  // updatePageNumber(); - Removed page number functionality

  
  // Ensure that when a user jumps to a page via menu, those images load too
  document.querySelectorAll('#category-menu li').forEach(item => {
    item.addEventListener('click', () => {
      const pageNumber = parseInt(item.getAttribute('data-page'));
      flipBook.flip(pageNumber);
      
      // Load the target page and surrounding pages
      for (let i = Math.max(0, pageNumber - 2); i < Math.min(pageNumber + 4, pageData.length); i++) {
        if (!pageData[i].isLoaded) {
          loadPage(i);
        }
      }
      
      // Handle mobile menu toggle
      const toggleButton = document.getElementById('mobile-menu-toggle');
      if (window.innerWidth <= 768 && toggleButton) {
        const sidebar = document.querySelector('.sidebar');
        sidebar.classList.remove('sidebar-visible');
        toggleButton.setAttribute('aria-expanded', 'false');
      }
    });
  });
  
  // Keyboard navigation
  document.addEventListener('keydown', (e) => {
    if (e.code === 'ArrowRight') {
      flipBook.flipNext();
    } else if (e.code === 'ArrowLeft') {
      flipBook.flipPrev();
    }
  });

  // Mobile menu toggle
  const toggleButton = document.getElementById('mobile-menu-toggle');
  if (toggleButton) {
    toggleButton.addEventListener('click', () => {
      const sidebar = document.querySelector('.sidebar');
      sidebar.classList.toggle('sidebar-visible');
      const isExpanded = sidebar.classList.contains('sidebar-visible');
      toggleButton.setAttribute('aria-expanded', isExpanded ? 'true' : 'false');
    });
  }

  // Close mobile menu when clicking outside
  document.addEventListener('click', (e) => {
    if (window.innerWidth <= 768) {
      const sidebar = document.querySelector('.sidebar');
      const toggleButton = document.getElementById('mobile-menu-toggle');
      
      if (sidebar && sidebar.classList.contains('sidebar-visible') &&
          !sidebar.contains(e.target) && 
          toggleButton && !toggleButton.contains(e.target)) {
        sidebar.classList.remove('sidebar-visible');
        toggleButton.setAttribute('aria-expanded', 'false');
      }
    }
  });

  // Window resize handler for responsive adjustments
  let resizeTimeout;
  window.addEventListener('resize', () => {
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(() => {
      adjustBookSize();
    }, 250);
  });

  // Initial size adjustment
  adjustBookSize();
});

// Adjust book size based on viewport
function adjustBookSize() {
  const container = document.querySelector('.book-wrapper');
  const sidebar = document.querySelector('.sidebar');
  
  if (container && flipBook) {
    const windowWidth = window.innerWidth;
    const windowHeight = window.innerHeight;
    
    let containerWidth = windowWidth;
    let containerHeight = windowHeight;
    
    // Adjust for sidebar on desktop
    if (windowWidth > 768) {
      containerWidth = windowWidth - sidebar.offsetWidth;
    } else {
      // Adjust for top menu on mobile
      containerHeight = windowHeight - 60; // Approximate mobile menu height
    }
    
    // Calculate appropriate dimensions while maintaining aspect ratio
    const bookAspectRatio = 700 / 1000; // original width/height
    
    // Calculate max dimensions that fit in the container
    const maxWidth = containerWidth * 0.9;
    const maxHeight = containerHeight * 0.9;
    
    // Determine dimensions based on container constraints
    let finalWidth, finalHeight;
    
    if (maxWidth / maxHeight > bookAspectRatio) {
      // Container is wider than the book's aspect ratio
      finalHeight = maxHeight;
      finalWidth = finalHeight * bookAspectRatio;
    } else {
      // Container is taller than the book's aspect ratio
      finalWidth = maxWidth;
      finalHeight = finalWidth / bookAspectRatio;
    }
    
    // Update FlipBook size
    flipBook.updateSize(finalWidth, finalHeight);
  }
}

// Create a standard image page
function createImagePage(imageUrl, index) {
  const wrapper = document.createElement("div");
  wrapper.classList.add("page");
  wrapper.setAttribute("data-density", "soft");
  
  const img = document.createElement("img");
  img.src = imageUrl;
  img.alt = "Page " + (index + 1);
  img.style.width = "100%";
  img.style.height = "100%";
  img.style.objectFit = "cover";
  
  wrapper.appendChild(img);
  return wrapper;
}

// Create a placeholder page with loading indicator
function createPlaceholderPage(index) {
  const wrapper = document.createElement("div");
  wrapper.classList.add("page");
  wrapper.setAttribute("data-density", "soft");
  
  const placeholder = document.createElement("div");
  placeholder.classList.add("page-placeholder");
  placeholder.innerHTML = `
    <div class="placeholder-content">
      <div class="spinner"></div>
      <p>Loading page ${index + 1}...</p>
    </div>
  `;
  
  wrapper.appendChild(placeholder);
  return wrapper;
}

// Update page number display
// Function removed as page number is no longer displayed
// function updatePageNumber() {
//   const currentPage = flipBook.getCurrentPageIndex();
//   document.getElementById('page-number').textContent = currentPage + 1;
// }

// Update active category in sidebar
function updateActiveCategoryInSidebar(currentPage) {
  const categoryItems = document.querySelectorAll('#category-menu li');
  
  // Remove active class from all items
  categoryItems.forEach(item => {
    item.classList.remove('active');
  });
  
  // Find the exact matching category for the current page
  const exactMatch = Array.from(categoryItems).find(item => {
    return parseInt(item.getAttribute('data-page')) === currentPage;
  });

  if (exactMatch) {
    exactMatch.classList.add('active');
    return;
  }

  // If no exact match, find the closest previous category
  let activeCategory = null;
  for (let i = categoryItems.length - 1; i >= 0; i--) {
    const pageNumber = parseInt(categoryItems[i].getAttribute('data-page'));
    if (pageNumber <= currentPage) {
      activeCategory = categoryItems[i];
      break;
    }
  }
  
  if (activeCategory) {
    activeCategory.classList.add('active');
  } else if (categoryItems.length > 0) {
    // If no matching category found, default to the first one
    categoryItems[0].classList.add('active');
  }
}