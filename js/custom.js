// Page not reload by #link
document.addEventListener("click", function (e) {
  const link = e.target.closest('a[href="#"]');
  if (link) e.preventDefault();
});

document.addEventListener("DOMContentLoaded", function () {

// Banner Numbers Increase Script Starts Here
$(document).ready(function () {

  let animated = false;

  function animateNumbers() {
    if (animated) return;
    animated = true;

    $(".feature-list li").each(function () {
      const $li = $(this);
      const target = parseInt($li.data("target"));
      const suffix = $li.data("suffix") || "";
      const $span = $li.find("span");

      let count = 0;
      const increment = Math.max(1, Math.floor(target / 60));

      const timer = setInterval(function () {
        count += increment;

        if (count >= target) {
          count = target;
          clearInterval(timer);
        }

        let displayValue;

        if (suffix === "K+") {
          displayValue = Math.floor(count / 1000) + "K+";
        } else {
          displayValue = count + suffix;
        }

        // Update only number, keep span
        $li.contents().filter(function () {
          return this.nodeType === 3;
        }).first().replaceWith(displayValue + " ");

      }, 25);
    });
  }

  function checkScroll() {
    const sectionTop = $(".feature-list").offset().top;
    const scrollBottom = $(window).scrollTop() + $(window).height();

    if (scrollBottom > sectionTop + 50) {
      animateNumbers();
      $(window).off("scroll", checkScroll);
    }
  }

  // Initial check
  checkScroll();

  // Scroll listener
  $(window).on("scroll", checkScroll);

});


// Product Slider
  const productThumbs = new Swiper(".product-thumbs", {
    slidesPerView: 4,
    spaceBetween: 28,

    grid: {
      rows: 2,
      fill: "row"
    },

    allowTouchMove: false,
    freeMode: false,
    watchSlidesProgress: true,
  });

  const productMain = new Swiper(".product-main", {
    slidesPerView: 1,
    spaceBetween: 0,

    navigation: {
      nextEl: ".product-main .swiper-button-next",
      prevEl: ".product-main .swiper-button-prev",
    },

    pagination: {
      el: ".product-main .swiper-pagination",
      clickable: true,
    },

    thumbs: {
      swiper: productThumbs
    }
  });

// Subscription Toggle
const radios = document.querySelectorAll('input[name="subscription"]');
const prodDetails = document.querySelectorAll('.prod-detail');

function togglePanels() {
  prodDetails.forEach(detail => detail.classList.remove('active'));

  const checked = document.querySelector('input[name="subscription"]:checked');
  if (!checked) return;

  checked.closest('.prod-detail').classList.add('active');
}

togglePanels();

radios.forEach(radio => {
  radio.addEventListener("change", togglePanels);
});

// Product Price Change
document.addEventListener("change", function (e) {

  // SINGLE SUBSCRIPTION
  if (e.target.name === "original") {
    const price = e.target.dataset.price;
    document.getElementById("singlePrice").textContent = `$${price}`;
  }

  // DOUBLE SUBSCRIPTION (Fragrance 1 or 2)
  if (e.target.name === "frg-original" || e.target.name === "frg-two-org") {

    const base = document.querySelector('input[name="frg-original"]:checked')?.dataset.price || 0;
    const extra = document.querySelector('input[name="frg-two-org"]:checked')?.dataset.price || 0;

    const total = (parseFloat(base) + parseFloat(extra)).toFixed(2);
    document.getElementById("doublePrice").textContent = `$${total}`;
  }
});

//Price shown in add to cart button
document.addEventListener("DOMContentLoaded", function () {

  const subscriptionRadios = document.querySelectorAll('input[name="subscription"]');
  const shopCta = document.querySelector('.popular-prod .shop-cta');
  const cartPrice = shopCta.querySelector('.cart-price');

  // Function to update price based on selected subscription
  function updateCartPrice() {
    const checkedSub = document.querySelector('input[name="subscription"]:checked');
    if (!checkedSub) return;

    const prodDetail = checkedSub.closest('.prod-detail');
    const priceElem = prodDetail.querySelector('.prod-amount strong');

    if (priceElem) {
      cartPrice.textContent = priceElem.textContent;
    }
  }

  // Initial price
  updateCartPrice();

  // Update when subscription changes
  subscriptionRadios.forEach(radio => {
    radio.addEventListener('change', updateCartPrice);
  });
});

// Function to get the current price based on the selected subscription
function getCartPrice() {
  const subscription = document.querySelector('input[name="subscription"]:checked')?.value;
  if (!subscription) return "0.00";

  if (subscription === "single") {
    // get single subscription price
    return document.getElementById("singlePrice").textContent.replace('$', '');
  } 
  if (subscription === "double") {
    // get double subscription price
    return document.getElementById("doublePrice").textContent.replace('$', '');
  }

  return "0.00";
}

// Update the Add to Cart button price
function updateCartButton() {
  const cartPrice = document.querySelector('.shop-cta .cart-price');
  cartPrice.textContent = `$${getCartPrice()}`;
}

// Listen to all radios that can affect price
document.querySelectorAll('.popular-prod input[type="radio"]').forEach(radio => {
  radio.addEventListener('change', () => {
    // First update the #singlePrice or #doublePrice
    if (radio.name === "original") {
      document.getElementById("singlePrice").textContent = `$${radio.dataset.price}`;
    }
    if (radio.name === "frg-original" || radio.name === "frg-two-org") {
      const base = document.querySelector('input[name="frg-original"]:checked')?.dataset.price || 0;
      const extra = document.querySelector('input[name="frg-two-org"]:checked')?.dataset.price || 0;
      const total = (parseFloat(base) + parseFloat(extra)).toFixed(2);
      document.getElementById("doublePrice").textContent = `$${total}`;
    }

    // Then update cart button
    updateCartButton();
  });
});

// Initial load
updateCartButton();

// Accordion Javascript Starts Here
document.addEventListener("DOMContentLoaded", () => {
  const panels = document.querySelectorAll(".accordion .acc-panel");
  if (!panels.length) return;

  // Open first panel by default

  panels.forEach(panel => {
    const header = panel.querySelector(".acc-header");
    header.addEventListener("click", () => {
      const isActive = panel.classList.contains("active");
    });
  });
});

(function () {
  const panels = document.querySelectorAll(".accordion .acc-panel");
  if (!panels.length) {
    console.warn("Accordion not found");
    return;
  }

  // Open first panel
  panels[0].classList.add("active");

  panels.forEach(panel => {
    const header = panel.querySelector(".acc-header");
    header.addEventListener("click", () => {
      const isOpen = panel.classList.contains("active");
      panels.forEach(p => p.classList.remove("active"));
      if (!isOpen) {
        panel.classList.add("active");
      }
    });
  });
})();

//Feature Number Animation
$(document).ready(function() {
    var $counters = $(".feature-strip strong");
    var $section = $(".feature-strip");
    var animated = false;

    function animateCounter($counter) {
        var target = parseInt($counter.data("target"));
        var duration = 1500;
        var start = 0;
        var startTime = null;

        function step(timestamp) {
            if (!startTime) startTime = timestamp;
            var elapsed = timestamp - startTime;
            var progress = Math.min(elapsed / duration, 1);
            var easedProgress = 1 - Math.pow(1 - progress, 3); // easing out
            $counter.text(Math.floor(easedProgress * target) + "%");

            if (progress < 1) {
                requestAnimationFrame(step);
            } else {
                $counter.text(target + "%"); // exact value at end
            }
        }

        requestAnimationFrame(step);
    }

    function animateAllCounters() {
        if (animated) return;
        animated = true;
        $counters.each(function() {
            animateCounter($(this));
        });
    }

    // Check if section is in viewport on scroll
    $(window).on("scroll resize", function() {
        if (!animated) {
            var scrollTop = $(window).scrollTop();
            var windowHeight = $(window).height();
            var sectionTop = $section.offset().top;
            var sectionHeight = $section.outerHeight();

            if (scrollTop + windowHeight > sectionTop + sectionHeight * 0.5) {
                animateAllCounters();
            }
        }
    });

    // Also check on page load in case section is already visible
    $(window).trigger("scroll");

// Table Hover Script Starts Here 
$(document).ready(function() {
    $(".feature-table th, .feature-table td").hover(
        function() {
            // Get the index of the hovered cell
            var colIndex = $(this).index() + 1; // nth-child is 1-based
            // Add highlight to the entire column (th + td)
            $(".feature-table th:nth-child(" + colIndex + "), " +
              ".feature-table td:nth-child(" + colIndex + ")").addClass("highlight");
        },
        function() {
            // Remove highlight on mouse out
            var colIndex = $(this).index() + 1;
            $(".feature-table th:nth-child(" + colIndex + "), " +
              ".feature-table td:nth-child(" + colIndex + ")").removeClass("highlight");
        }
    );
});

// Table Check Image Javascript Starts Here
$(document).ready(function() {
    $(".feature-table th, .feature-table td").hover(
        function() {
            var colIndex = $(this).index() + 1; // column index (nth-child is 1-based)

            // Highlight the column
            $(".feature-table th:nth-child(" + colIndex + "), " +
              ".feature-table td:nth-child(" + colIndex + ")").addClass("highlight");

            // Swap check icons only in this column
            $(".feature-table td:nth-child(" + colIndex + ")").each(function() {
                $(this).find(".check-icon").hide();
                $(this).find(".check-active").show();
            });
        },
        function() {
            var colIndex = $(this).index() + 1;

            // Remove highlight
            $(".feature-table th:nth-child(" + colIndex + "), " +
              ".feature-table td:nth-child(" + colIndex + ")").removeClass("highlight");

            // Revert check icons
            $(".feature-table td:nth-child(" + colIndex + ")").each(function() {
                $(this).find(".check-icon").show();
                $(this).find(".check-active").hide();
            });
        }
    );
});
});
});

// Hamburger Menu (Mobile)
document.addEventListener("DOMContentLoaded", function () {
  const toggleBtn = document.querySelector(".menu-toggle");
  const menu = document.querySelector(".main-menu");

  if (!toggleBtn || !menu) return;

  toggleBtn.addEventListener("click", function () {
    menu.classList.toggle("active");
    toggleBtn.classList.toggle("open");
  });

  // Submenu toggle (Shop)
  document.querySelectorAll(".main-menu > ul > li").forEach(item => {
    const submenu = item.querySelector("ul");
    if (submenu) {
      item.querySelector("a").addEventListener("click", function (e) {
        if (window.innerWidth <= 767) {
          e.preventDefault();
          item.classList.toggle("open");
        }
      });
    }
  });
});

// Scroll Animation
document.addEventListener("DOMContentLoaded", function () {
  new WOW({
    boxClass: 'wow',
    animateClass: 'animate__animated',
    offset: 80,
    mobile: false,
    live: false
  }).init();
});