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
    "https://res.cloudinary.com/dgq0nkctc/image/upload/v1743056360/0_wg6qg1.jpg", // page 0
    "https://res.cloudinary.com/dgq0nkctc/image/upload/v1743056361/02_zpcvfb.jpg", // page 2
    "https://res.cloudinary.com/dgq0nkctc/image/upload/v1743056363/03_v2ab8k.jpg", // page 3
    "https://res.cloudinary.com/dgq0nkctc/image/upload/v1743056359/04_oqcwxg.jpg", // page 4
    "https://res.cloudinary.com/dgq0nkctc/image/upload/v1743056358/05_bhj7mk.jpg", // page 5
    "https://res.cloudinary.com/dgq0nkctc/image/upload/v1743056367/06_lqsi7z.jpg", // page 6
    "https://res.cloudinary.com/dgq0nkctc/image/upload/v1743056368/07_qhlql4.jpg", // page 7
    "https://res.cloudinary.com/dgq0nkctc/image/upload/v1743056384/08_wvl2jq.jpg", // page 8
    "https://res.cloudinary.com/dgq0nkctc/image/upload/v1743056376/09_eugdyg.jpg", // page 9
    "https://res.cloudinary.com/dgq0nkctc/image/upload/v1743056377/010_p27n5z.jpg", // page 10
    "https://res.cloudinary.com/dgq0nkctc/image/upload/v1743056378/011_oc3l1k.jpg", // page 11
    "https://res.cloudinary.com/dgq0nkctc/image/upload/v1743056388/012_qas40s.jpg", // page 12
    "https://res.cloudinary.com/dgq0nkctc/image/upload/v1743056381/013_abqqgh.jpg", // page 13
    "https://res.cloudinary.com/dgq0nkctc/image/upload/v1743056383/014_ia8qyy.jpg", // page 14
    "https://res.cloudinary.com/dgq0nkctc/image/upload/v1743056375/015_itrdrx.jpg", // page 15
    "https://res.cloudinary.com/dgq0nkctc/image/upload/v1743056367/016_gaep2i.jpg", // page 16
    "https://res.cloudinary.com/dgq0nkctc/image/upload/v1743056366/017_smngre.jpg", // page 17
    "https://res.cloudinary.com/dgq0nkctc/image/upload/v1743056384/018_nismfa.jpg", // page 18
    "https://res.cloudinary.com/dgq0nkctc/image/upload/v1743056386/019_vhd5xw.jpg", // page 19
    "https://res.cloudinary.com/dgq0nkctc/image/upload/v1743056380/020_gfb3wn.jpg", // page 20
    "https://res.cloudinary.com/dgq0nkctc/image/upload/v1743056379/021_n6cqcd.jpg", // page 21
    "https://res.cloudinary.com/dgq0nkctc/image/upload/v1743056387/022_yfq0mh.jpg", // page 22
    "https://res.cloudinary.com/dgq0nkctc/image/upload/v1743056374/023_h5cgol.jpg", // page 23
    "https://res.cloudinary.com/dgq0nkctc/image/upload/v1743056946/024_vl019b.jpg", // page 24
    "https://res.cloudinary.com/dgq0nkctc/image/upload/v1743056385/025_x6jprw.jpg", // page 25
    "https://res.cloudinary.com/dgq0nkctc/image/upload/v1743056372/026_kaj2je.jpg", // page 26
    "https://res.cloudinary.com/dgq0nkctc/image/upload/v1743056373/027_ghjtf0.jpg", // page 27
    "https://res.cloudinary.com/dgq0nkctc/image/upload/v1743056382/028_slg6xy.jpg", // page 28
    "https://res.cloudinary.com/dgq0nkctc/image/upload/v1743056388/029_cw4pfj.jpg", // page 29
    "https://res.cloudinary.com/dgq0nkctc/image/upload/v1743056390/030_xgruhl.jpg", // page 30
    "https://res.cloudinary.com/dgq0nkctc/image/upload/v1743056391/031_vieedm.jpg", // page 31
    "https://res.cloudinary.com/dgq0nkctc/image/upload/v1743056392/032_s0kpkg.jpg", // page 32
    "https://res.cloudinary.com/dgq0nkctc/image/upload/v1743056392/033_lnmbzv.jpg", // page 33
    "https://res.cloudinary.com/dgq0nkctc/image/upload/v1743056393/034_h0wif6.jpg", // page 34
    "https://res.cloudinary.com/dgq0nkctc/image/upload/v1743056394/035_wlvysm.jpg", // page 35
    "https://res.cloudinary.com/dgq0nkctc/image/upload/v1743056396/036_zglrb7.jpg", // page 36
    "https://res.cloudinary.com/dgq0nkctc/image/upload/v1743056397/037_ph7rjh.jpg", // page 37
    "https://res.cloudinary.com/dgq0nkctc/image/upload/v1743056397/038_unamhr.jpg", // page 38
    "https://res.cloudinary.com/dgq0nkctc/image/upload/v1743056397/039_qbpsgh.jpg", // page 39
    "https://res.cloudinary.com/dgq0nkctc/image/upload/v1743056398/040_fohr6q.jpg", // page 40
    "https://res.cloudinary.com/dgq0nkctc/image/upload/v1743056401/041_ywzsf7.jpg", // page 41
    "https://res.cloudinary.com/dgq0nkctc/image/upload/v1743056401/042_titiyt.jpg", // page 42
    "https://res.cloudinary.com/dgq0nkctc/image/upload/v1743056401/043_anpukx.jpg", // page 43
    "https://res.cloudinary.com/dgq0nkctc/image/upload/v1743056403/044_idkjos.jpg", // page 44
    "https://res.cloudinary.com/dgq0nkctc/image/upload/v1743056404/045_ycoa9s.jpg", // page 45
    "https://res.cloudinary.com/dgq0nkctc/image/upload/v1743056354/046_wqliqo.jpg", // page 46
    "https://res.cloudinary.com/dgq0nkctc/image/upload/v1743056362/047_dabgp9.jpg", // page 47
    "https://res.cloudinary.com/dgq0nkctc/image/upload/v1743056361/048_d9lqcu.jpg", // page 48
    "https://res.cloudinary.com/dgq0nkctc/image/upload/v1743056364/049_rtwrdf.jpg", // page 49
    "https://res.cloudinary.com/dgq0nkctc/image/upload/v1743056356/050_yji71t.jpg", // page 50
    "https://res.cloudinary.com/dgq0nkctc/image/upload/v1743056370/051_glynov.jpg", // page 51
    "https://res.cloudinary.com/dgq0nkctc/image/upload/v1743056356/052_dwwbxr.jpg", // page 52
    "https://res.cloudinary.com/dgq0nkctc/image/upload/v1743056357/053_sjyngz.jpg", // page 53
    "https://res.cloudinary.com/dgq0nkctc/image/upload/v1743056355/054_yemggz.jpg", // page 54
    "https://res.cloudinary.com/dgq0nkctc/image/upload/v1743056357/055_pyc4pn.jpg", // page 55
    "https://res.cloudinary.com/dgq0nkctc/image/upload/v1743056371/056_vc5dpz.jpg", // page 56
    "https://res.cloudinary.com/dgq0nkctc/image/upload/v1743056365/057_ba5mti.jpg", // page 57
    "https://res.cloudinary.com/dgq0nkctc/image/upload/v1743056379/058_h6udxe.jpg", // page 58
    "https://res.cloudinary.com/dgq0nkctc/image/upload/v1743056363/059_bg8qqk.jpg", // page 59
    "https://res.cloudinary.com/dgq0nkctc/image/upload/v1743056358/060_nd3mta.jpg", // page 60
    "https://res.cloudinary.com/dgq0nkctc/image/upload/v1743056357/061_ngoqoo.jpg", // page 61
    "https://res.cloudinary.com/dgq0nkctc/image/upload/v1743056374/062_fcwsop.jpg", // page 62
    "https://res.cloudinary.com/dgq0nkctc/image/upload/v1743056370/063_zjfpiq.jpg", // page 63
    "https://res.cloudinary.com/dgq0nkctc/image/upload/v1743056367/064_dickgo.jpg", // page 64
    "https://res.cloudinary.com/dgq0nkctc/image/upload/v1743056362/065_v5qnke.jpg" // page 65
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