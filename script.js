// Global variables
let flipBook;
let pdfs = [];              // Array to hold multiple PDF documents
let currentPdfIndex = 0;    // Track which PDF is currently being used
let totalPages = 0;         // Total pages across all PDFs
let pdfPageCounts = [];     // Array to store page count for each PDF
let pdfStartPages = [];     // Array to store starting page number for each PDF
let pagesLoaded = 0;

document.addEventListener("DOMContentLoaded", () => {
  // Hide loading indicator immediately
  const loadingIndicator = document.getElementById("loading-indicator");
  if (loadingIndicator) {
    // Keep the loading indicator visible for 4 seconds
    setTimeout(() => {
      loadingIndicator.style.opacity = '0';
      setTimeout(() => {
        loadingIndicator.style.display = 'none';
      }, 500); // Additional time for fade-out transition
    }, 4000);
  }
  const container = document.getElementById("flipbook");
  
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

  // Create initial empty page for immediate display
  const emptyPage = document.createElement('div');
  emptyPage.className = 'page';
  emptyPage.setAttribute('data-density', 'soft');
  emptyPage.setAttribute('data-page-number', 0);
  
  // Initialize with an empty page for immediate display
  flipBook.loadFromHTML([emptyPage]);
  
  // Load PDF files in background (all PDFs at once)
  loadPDFs([
    "https://res.cloudinary.com/dgq0nkctc/image/upload/v1743729702/PORTFOLIO_030_nubogh.pdf",
    "https://res.cloudinary.com/dgq0nkctc/image/upload/v1743729703/PORTFOLIO_030_1_om9xy0.pdf",
    "https://res.cloudinary.com/dgq0nkctc/image/upload/v1743729703/PORTFOLIO_030_2_iri8tl.pdf",
    "https://res.cloudinary.com/dgq0nkctc/image/upload/v1743729704/PORTFOLIO_030_3_jw8f69.pdf",
    "https://res.cloudinary.com/dgq0nkctc/image/upload/v1743729704/PORTFOLIO_030_4_wfjyvv.pdf",
    "https://res.cloudinary.com/dgq0nkctc/image/upload/v1743729704/PORTFOLIO_030_5_jgiqrk.pdf",
    "https://res.cloudinary.com/dgq0nkctc/image/upload/v1743729706/PORTFOLIO_030_6_g7iba1.pdf",
    "https://res.cloudinary.com/dgq0nkctc/image/upload/v1743729736/PORTFOLIO_030_7_rqqapv.pdf",
    "https://res.cloudinary.com/dgq0nkctc/image/upload/v1743729740/PORTFOLIO_030_8_cslne0.pdf",
    "https://res.cloudinary.com/dgq0nkctc/image/upload/v1743729711/PORTFOLIO_030_9_dlzvvr.pdf",
    "https://res.cloudinary.com/dgq0nkctc/image/upload/v1743729729/PORTFOLIO_030_10_xgfasn.pdf",
    "https://res.cloudinary.com/dgq0nkctc/image/upload/v1743729733/PORTFOLIO_030_11_y6lgny.pdf",
    "https://res.cloudinary.com/dgq0nkctc/image/upload/v1743729729/PORTFOLIO_030_12_kkn2vf.pdf",
    "https://res.cloudinary.com/dgq0nkctc/image/upload/v1743729722/PORTFOLIO_030_13_vec09k.pdf",
    "https://res.cloudinary.com/dgq0nkctc/image/upload/v1743729732/PORTFOLIO_030_14_jk3ymp.pdf",
    "https://res.cloudinary.com/dgq0nkctc/image/upload/v1743729671/PORTFOLIO_030_15_ffvhxs.pdf",
    "https://res.cloudinary.com/dgq0nkctc/image/upload/v1743729671/PORTFOLIO_030_16_b8joxb.pdf",
    "https://res.cloudinary.com/dgq0nkctc/image/upload/v1743729672/PORTFOLIO_030_17_fsncxw.pdf",
    "https://res.cloudinary.com/dgq0nkctc/image/upload/v1743729672/PORTFOLIO_030_18_sx31ry.pdf",
    "https://res.cloudinary.com/dgq0nkctc/image/upload/v1743729677/PORTFOLIO_030_19_l4qwzr.pdf",
    "https://res.cloudinary.com/dgq0nkctc/image/upload/v1743729674/PORTFOLIO_030_20_wya9ht.pdf",
    "https://res.cloudinary.com/dgq0nkctc/image/upload/v1743729679/PORTFOLIO_030_21_b5v2bs.pdf",
    "https://res.cloudinary.com/dgq0nkctc/image/upload/v1743729673/PORTFOLIO_030_22_dzpii2.pdf",
    "https://res.cloudinary.com/dgq0nkctc/image/upload/v1743729684/PORTFOLIO_030_23_m0vih4.pdf",
    "https://res.cloudinary.com/dg0nkctc/image/upload/v1743729678/PORTFOLIO_030_24_qmyqkl.pdf",
    "https://res.cloudinary.com/dgq0nkctc/image/upload/v1743729671/PORTFOLIO_030_25_x2lbr5.pdf",
    "https://res.cloudinary.com/dgq0nkctc/image/upload/v1743729695/PORTFOLIO_030_26_ysotxp.pdf",
    "https://res.cloudinary.com/dgq0nkctc/image/upload/v1743729685/PORTFOLIO_030_27_wassgy.pdf",
    "https://res.cloudinary.com/dgq0nkctc/image/upload/v1743729679/PORTFOLIO_030_28_ujminq.pdf",
    "https://res.cloudinary.com/dgq0nkctc/image/upload/v1743729684/PORTFOLIO_030_29_fikla2.pdf",
    "https://res.cloudinary.com/dgq0nkctc/image/upload/v1743729681/PORTFOLIO_030_30_tn8ejn.pdf",
    "https://res.cloudinary.com/dgq0nkctc/image/upload/v1743729687/PORTFOLIO_030_31_tt1wvn.pdf",
    "https://res.cloudinary.com/dgq0nkctc/image/upload/v1743729682/PORTFOLIO_030_32_dbxhp8.pdf",
    "https://res.cloudinary.com/dgq0nkctc/image/upload/v1743729672/PORTFOLIO_030_33_jojrqw.pdf",
    "https://res.cloudinary.com/dgq0nkctc/image/upload/v1743729678/PORTFOLIO_030_34_vymnnq.pdf",
    "https://res.cloudinary.com/dgq0nkctc/image/upload/v1743729688/PORTFOLIO_030_35_ty0l1t.pdf",
    "https://res.cloudinary.com/dgq0nkctc/image/upload/v1743729694/PORTFOLIO_030_36_al9wmm.pdf",
    "https://res.cloudinary.com/dgq0nkctc/image/upload/v1743729672/PORTFOLIO_030_37_u4t8od.pdf",
    "https://res.cloudinary.com/dgq0nkctc/image/upload/v1743729672/PORTFOLIO_030_38_ugcybt.pdf",
    "https://res.cloudinary.com/dgq0nkctc/image/upload/v1743729687/PORTFOLIO_030_39_wudgmj.pdf",
    "https://res.cloudinary.com/dgq0nkctc/image/upload/v1743729678/PORTFOLIO_030_40_guczdk.pdf",
    "https://res.cloudinary.com/dgq0nkctc/image/upload/v1743729672/PORTFOLIO_030_41_mxbgzp.pdf",
    "https://res.cloudinary.com/dgq0nkctc/image/upload/v1743729673/PORTFOLIO_030_42_xut6wk.pdf",
    "https://res.cloudinary.com/dgq0nkctc/image/upload/v1743729690/PORTFOLIO_030_43_mkrphx.pdf",
    "https://res.cloudinary.com/dgq0nkctc/image/upload/v1743729690/PORTFOLIO_030_44_wuzvoi.pdf",
    "https://res.cloudinary.com/dgq0nkctc/image/upload/v1743729681/PORTFOLIO_030_45_psplv8.pdf",
    "https://res.cloudinary.com/dgq0nkctc/image/upload/v1743729694/PORTFOLIO_030_46_fdf3js.pdf",
    "https://res.cloudinary.com/dgq0nkctc/image/upload/v1743729688/PORTFOLIO_030_47_oodhom.pdf",
    "https://res.cloudinary.com/dgq0nkctc/image/upload/v1743729693/PORTFOLIO_030_48_hdtt1k.pdf",
    "https://res.cloudinary.com/dgq0nkctc/image/upload/v1743729694/PORTFOLIO_030_49_ngsx5z.pdf",
    "https://res.cloudinary.com/dgq0nkctc/image/upload/v1743729696/PORTFOLIO_030_50_votfra.pdf",
    "https://res.cloudinary.com/dgq0nkctc/image/upload/v1743729697/PORTFOLIO_030_51_vmzbxz.pdf",
    "https://res.cloudinary.com/dgq0nkctc/image/upload/v1743729699/PORTFOLIO_030_52_txvsq0.pdf",
    "https://res.cloudinary.com/dgq0nkctc/image/upload/v1743729695/PORTFOLIO_030_53_qamzsv.pdf",
    "https://res.cloudinary.com/dgq0nkctc/image/upload/v1743729697/PORTFOLIO_030_54_fuurrj.pdf",
    "https://res.cloudinary.com/dgq0nkctc/image/upload/v1743729699/PORTFOLIO_030_55_u2jtyg.pdf",
    "https://res.cloudinary.com/dgq0nkctc/image/upload/v1743729699/PORTFOLIO_030_56_vb1hso.pdf",
    "https://res.cloudinary.com/dgq0nkctc/image/upload/v1743729701/PORTFOLIO_030_57_w7iduw.pdf",
    "https://res.cloudinary.com/dgq0nkctc/image/upload/v1743729700/PORTFOLIO_030_58_owhnrs.pdf",
    "https://res.cloudinary.com/dgq0nkctc/image/upload/v1743729698/PORTFOLIO_030_59_xfyqgm.pdf",
    "https://res.cloudinary.com/dgq0nkctc/image/upload/v1743729699/PORTFOLIO_030_60_maac9i.pdf",
    "https://res.cloudinary.com/dgq0nkctc/image/upload/v1743729703/PORTFOLIO_030_61_ppeeum.pdf",
    "https://res.cloudinary.com/dgq0nkctc/image/upload/v1743729702/PORTFOLIO_030_62_ivtgis.pdf",
    "https://res.cloudinary.com/dgq0nkctc/image/upload/v1743729704/PORTFOLIO_030_63_tk7pt2.pdf",
    "https://res.cloudinary.com/dgq0nkctc/image/upload/v1743729704/PORTFOLIO_030_64_rlulxp.pdf",
  ]);
  
  // Event listener for page flip
  flipBook.on('flip', (e) => {
    updateActiveCategoryInSidebar(e.data);
  });

  // Navigation Controls
  document.getElementById('prev-btn').addEventListener('click', () => {
    flipBook.flipPrev();
  });
  
  document.getElementById('next-btn').addEventListener('click', () => {
    flipBook.flipNext();
  });

  // Keyboard navigation
  document.addEventListener('keydown', (e) => {
    if (e.code === 'ArrowRight') {
      flipBook.flipNext();
    } else if (e.code === 'ArrowLeft') {
      flipBook.flipPrev();
    }
  });
  
  // Menu Navigation
  document.querySelectorAll('#category-menu li').forEach(item => {
    const pageNumber = parseInt(item.getAttribute('data-page'));
    if (!isNaN(pageNumber)) {
      item.addEventListener('click', () => {
        flipBook.flip(pageNumber);
        
        // Handle mobile menu toggle
        if (window.innerWidth <= 768) {
          const sidebar = document.querySelector('.sidebar');
          const toggleButton = document.getElementById('mobile-menu-toggle');
          sidebar.classList.remove('sidebar-visible');
          toggleButton.setAttribute('aria-expanded', 'false');
        }
      });
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

  // Window resize handler
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

// Load PDF files silently in the background
async function loadPDFs(urlArray) {
  try {
    console.log(`Loading ${urlArray.length} PDF files in background`);
    
    // Pre-allocate arrays
    pdfs = new Array(urlArray.length);
    pdfPageCounts = new Array(urlArray.length);
    pdfStartPages = new Array(urlArray.length);
    
    // Load all PDFs in parallel
    const loadPromises = urlArray.map((url, i) => {
      return pdfjsLib.getDocument(url).promise
        .then(pdf => {
          pdfs[i] = pdf;
          pdfPageCounts[i] = pdf.numPages;
          console.log(`PDF #${i+1} loaded with ${pdf.numPages} pages`);
          return pdf;
        })
        .catch(err => {
          console.error(`Failed to load PDF #${i+1}: ${err.message}`);
          pdfs[i] = null;
          pdfPageCounts[i] = 0;
          return null;
        });
    });

    // Wait for all PDFs to load
    await Promise.all(loadPromises);
    
    // Calculate starting pages and total pages
    let startPage = 0;
    for (let i = 0; i < pdfPageCounts.length; i++) {
      pdfStartPages[i] = startPage;
      startPage += pdfPageCounts[i];
    }
    
    totalPages = pdfPageCounts.reduce((sum, count) => sum + count, 0);
    console.log(`All PDFs loaded with a total of ${totalPages} pages`);
    
    // Initialize book with all pages
    initializeBook();
    
  } catch (error) {
    console.error('Error loading PDFs:', error);
  }
}

// Initialize the book with all pages
async function initializeBook() {
  try {
    console.log(`Initializing book with ${totalPages} pages`);
    
    // Create all pages
    const pages = [];
    for (let i = 0; i < totalPages; i++) {
      const page = document.createElement('div');
      page.className = 'page';
      page.setAttribute('data-density', 'soft');
      page.setAttribute('data-page-number', i);
      pages.push(page);
    }
    
    // Load the book with empty pages
    flipBook.loadFromHTML(pages);
    
    // Render first page immediately
    renderPage(0);
    
    // Render other pages in background
    for (let i = 1; i < totalPages; i++) {
      renderPage(i);
    }
    
  } catch (error) {
    console.error('Error initializing book:', error);
  }
}
function getOptimalScale() {
  // Base scale - adjust higher for better quality
  let baseScale = 2.0; // Higher value = better quality
  
  // Check if device is high-DPI (like Retina display)
  if (window.devicePixelRatio && window.devicePixelRatio > 1) {
    baseScale *= window.devicePixelRatio;
  }
  
  return baseScale;
}

// Render a single PDF page without showing loading
async function renderPage(globalPageNumber) {
  try {
    // Find which PDF contains this page
    let pdfIndex = 0;
    let localPageNumber = globalPageNumber;
    
    for (let i = 0; i < pdfs.length; i++) {
      if (globalPageNumber >= pdfStartPages[i] && 
          (i === pdfs.length - 1 || globalPageNumber < pdfStartPages[i+1])) {
        pdfIndex = i;
        localPageNumber = globalPageNumber - pdfStartPages[i];
        break;
      }
    }
    
    // Get the PDF and page
    const pdf = pdfs[pdfIndex];
    if (!pdf) {
      return false;
    }
    
    const page = await pdf.getPage(localPageNumber+1);
    
    // Get the page element
    const pageElement = document.querySelector(`[data-page-number="${globalPageNumber}"]`);
    if (!pageElement) return false;
    
    // Check if page already has canvas
    if (pageElement.querySelector('canvas')) {
      return true;
    }
    
    // Create canvas element
    const canvas = document.createElement('canvas');
    canvas.setAttribute('data-high-quality', 'true');
    const context = canvas.getContext('2d', { alpha: false });
    
    // Get viewport and scale
    const viewport = page.getViewport({ scale: 1.0 });
    
    // Calculate scale to fit
    const pageWidth = pageElement.clientWidth || 700;
    const pageHeight = pageElement.clientHeight || 1000;
    
    const scaleX = pageWidth / viewport.width;
    const scaleY = pageHeight / viewport.height;
    
    // Use the larger scale to fill the page (but not too large to cause clipping)
    const scale = Math.max(scaleX, scaleY) * 0.98;
    
    // Apply quality multiplier for higher resolution rendering
    const qualityMultiplier = getOptimalScale();
    const renderScale = scale * qualityMultiplier;
    
    // Create high-resolution viewport
    const scaledViewport = page.getViewport({ scale: renderScale });
    
    // Set canvas dimensions to the high-resolution size
    canvas.width = scaledViewport.width;
    canvas.height = scaledViewport.height;
    
    // Make canvas width match page width to ensure proper centering at all zoom levels
    canvas.style.width = '100%';
    canvas.style.height = '100%';
    canvas.style.display = 'block';
    
    // Position canvas in the page
    pageElement.style.overflow = 'hidden';
    pageElement.style.display = 'flex';
    pageElement.style.justifyContent = 'center';
    pageElement.style.alignItems = 'center';
    pageElement.innerHTML = '';
    pageElement.appendChild(canvas);
    
    // High-quality rendering options
    const renderContext = {
      canvasContext: context,
      viewport: scaledViewport,
      enableWebGL: true,
      renderInteractiveForms: false,
      intent: 'display'
    };
    
    // Render PDF page
    await page.render(renderContext).promise;
    
    return true;
  } catch (error) {
    console.error(`Error rendering page ${globalPageNumber}:`, error);
    return false;
  }
}

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
  let highestPage = -1;
  
  categoryItems.forEach(item => {
    const pageNumber = parseInt(item.getAttribute('data-page'));
    if (!isNaN(pageNumber) && pageNumber <= currentPage && pageNumber > highestPage) {
      highestPage = pageNumber;
      activeCategory = item;
    }
  });
  
  if (activeCategory) {
    activeCategory.classList.add('active');
  } else if (categoryItems.length > 0) {
    // If no matching category found, default to the first one
    categoryItems[0].classList.add('active');
  }
}

// Adjust book size based on viewport
function adjustBookSize() {
  const container = document.querySelector('.book-container-wrapper');
  const sidebar = document.querySelector('.sidebar');
  
  if (container && flipBook) {
    const windowWidth = window.innerWidth;
    const windowHeight = window.innerHeight;
    
    let containerWidth = windowWidth;
    let containerHeight = windowHeight;
    
    // Adjust for sidebar on desktop
    if (windowWidth > 768 && sidebar) {
      containerWidth = windowWidth - sidebar.offsetWidth;
    } else {
      // Adjust for top menu on mobile
      containerHeight = windowHeight - 80;
    }
    
    // Calculate appropriate dimensions while maintaining aspect ratio
    const bookAspectRatio = 700 / 1000; // original width/height
    
    // Calculate max dimensions that fit in the container
    const maxWidth = containerWidth * 0.85;
    const maxHeight = containerHeight * 0.85;
    
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
