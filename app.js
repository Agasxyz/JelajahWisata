
var favorites = [1, 3];
try {
    if (localStorage.getItem("wisata_favorites")) {
        favorites = JSON.parse(localStorage.getItem("wisata_favorites"));
    } else {
        localStorage.setItem("wisata_favorites", JSON.stringify(favorites));
    }
} catch (e) {
    console.error("Failed to load favorites from localStorage", e);
}


function parseQueryParams() {
    var search = window.location.search;
    if (search) {
        var pairs = search.substring(1).split("&");
        for (var i = 0; i < pairs.length; i++) {
            var pair = pairs[i].split("=");
            var key = pair[0];
            var val = decodeURIComponent(pair[1] || "");
            
            if (key === "fav") {
                if (val) {
                    favorites = [];
                    var parts = val.split(",");
                    for (var j = 0; j < parts.length; j++) {
                        favorites.push(parseInt(parts[j]));
                    }
                }
            }
        }
    }
}

function getLinkWithState(url) {
    return url;
}

function updatePageLinks() {

}

function showToast(message, type) {
    if (!type) type = "success";
    var toastContainer = document.getElementById("toast-container");
    if (!toastContainer) return;
    
    var toast = document.createElement("div");
    toast.className = "toast " + type;
    
    var iconClass = "fa-circle-check";
    if (type === "error") iconClass = "fa-circle-xmark";
    else if (type === "info") iconClass = "fa-circle-info";
    
    toast.innerHTML = '<i class="fa-solid ' + iconClass + ' toast-icon"></i>' +
                      '<div class="toast-msg">' + message + '</div>' +
                      '<button class="toast-close"><i class="fa-solid fa-xmark"></i></button>';
    
    toastContainer.appendChild(toast);
    
    toast.querySelector(".toast-close").addEventListener("click", function() {
        toast.style.animation = "slideOut 0.3s forwards";
        setTimeout(function() { toast.remove(); }, 300);
    });
    
    setTimeout(function() {
        if (toast.parentNode) {
            toast.style.animation = "slideOut 0.3s forwards";
            setTimeout(function() { toast.remove(); }, 300);
        }
    }, 4000);
}

function initTheme() {}


var mobileToggleBtn = document.getElementById("mobile-toggle-btn");
var navMenu = document.getElementById("nav-menu");
if (mobileToggleBtn && navMenu) {
    mobileToggleBtn.addEventListener("click", function() {
        navMenu.classList.toggle("open");
        var icon = mobileToggleBtn.querySelector("i");
        icon.className = navMenu.classList.contains("open") ? "fa-solid fa-xmark" : "fa-solid fa-bars";
    });
}

window.appToggleFavorite = function(id, event) {
    if (event) event.stopPropagation();
    var index = favorites.indexOf(id);
    
    var card = document.querySelector('.wisata-card[data-id="' + id + '"]');
    var name = card ? card.getAttribute("data-name") : "Destinasi";

    if (index === -1) {
        favorites.push(id);
        showToast('Destinasi "' + name + '" ditambahkan ke Favorit.', "success");
    } else {
        favorites.splice(index, 1);
        showToast('Destinasi "' + name + '" dihapus dari Favorit.', "info");
    }
    
    try {
        localStorage.setItem("wisata_favorites", JSON.stringify(favorites));
    } catch(e) {
        console.error("Failed to save favorites to localStorage", e);
    }
    updateHeartIcons();
    updatePageLinks();
    
    var path = window.location.pathname;
    if (path.indexOf("favorites.html") !== -1) {
        renderFavoritesView();
    }
};

function updateHeartIcons() {
    var cards = document.getElementsByClassName("wisata-card");
    for (var i = 0; i < cards.length; i++) {
        var card = cards[i];
        var id = parseInt(card.getAttribute("data-id"));
        var btn = card.querySelector(".card-favorite-btn");
        if (btn) {
            var isFav = favorites.indexOf(id) !== -1;
            if (isFav) {
                btn.classList.add("active");
                btn.querySelector("i").className = "fa-solid fa-heart";
            } else {
                btn.classList.remove("active");
                btn.querySelector("i").className = "fa-regular fa-heart";
            }
        }
    }
}


function initPage() {
    parseQueryParams();
    initTheme();
    try {
        localStorage.setItem("wisata_favorites", JSON.stringify(favorites));
    } catch(e) {
        console.error("Failed to save favorites to localStorage", e);
    }
    updateHeartIcons();
    updatePageLinks();
    
    var path = window.location.pathname;
    var pageName = path.substring(path.lastIndexOf("/") + 1);
    
    if (pageName === "" || pageName === "index.html") {
        renderHomeFeatured();
        initHeroSearch();
        initRegionCards();
    } else if (pageName === "explore.html") {
        applyFiltersFromURL();
    } else if (pageName === "favorites.html") {
        renderFavoritesView();
    } else if (pageName === "detail.html") {
        var id = getQueryParam("id") || "1";
        var detailSection = document.getElementById("detail-" + id);
        if (detailSection) {
            detailSection.style.display = "block";
            calculateLocalBudget("detail-" + id);
        }
    }
}

function getQueryParam(name) {
    var search = window.location.search;
    if (search) {
        var pairs = search.substring(1).split("&");
        for (var i = 0; i < pairs.length; i++) {
            var pair = pairs[i].split("=");
            if (pair[0] === name) {
                return decodeURIComponent(pair[1] || "");
            }
        }
    }
    return null;
}


function renderHomeFeatured() {
    var featuredGrid = document.getElementById("home-featured-grid");
    if (!featuredGrid) return;
    
    var cardsHtml = '';
    
    var ids = [1, 2, 3, 6, 7, 9];
    for (var i = 0; i < ids.length; i++) {
        var card = document.querySelector('.wisata-card[data-id="' + ids[i] + '"]');
        if (card) {
            cardsHtml += card.outerHTML;
        }
    }
    featuredGrid.innerHTML = cardsHtml;
    updateHeartIcons();
    updatePageLinks();
}

function initHeroSearch() {
    var form = document.getElementById("hero-search-form");
    if (form) {
        form.addEventListener("submit", function(e) {
            e.preventDefault();
            var val = document.getElementById("hero-search-input").value.trim();
            if (val) {
                window.location.href = getLinkWithState("explore.html?search=" + encodeURIComponent(val));
            }
        });
    }
}

function initRegionCards() {
    var cards = document.getElementsByClassName("region-card");
    for (var i = 0; i < cards.length; i++) {
        (function(card) {
            card.addEventListener("click", function() {
                var reg = card.getAttribute("data-region");
                window.location.href = getLinkWithState("explore.html?region=" + encodeURIComponent(reg));
            });
        })(cards[i]);
    }
}


var currentCategory = "Semua";

var tabBtns = document.getElementsByClassName("tab-btn");
for (var i = 0; i < tabBtns.length; i++) {
    (function(btn) {
        btn.addEventListener("click", function() {
            for (var j = 0; j < tabBtns.length; j++) {
                tabBtns[j].classList.remove("active");
            }
            btn.classList.add("active");
            currentCategory = btn.getAttribute("data-cat");
            applyCatalogFilters("");
        });
    })(tabBtns[i]);
}

var searchBar = document.getElementById("explore-search-input");
if (searchBar) {
    searchBar.addEventListener("input", function() { applyCatalogFilters(""); });
}
var sortSel = document.getElementById("explore-sort-select");
if (sortSel) {
    sortSel.addEventListener("change", function() { applyCatalogFilters(""); });
}

function applyFiltersFromURL() {
    var activeRegion = getQueryParam("region") || "";
    var activeSearch = getQueryParam("search") || "";
    
    if (activeSearch && searchBar) {
        searchBar.value = activeSearch;
    }
    
    var filterInfo = document.getElementById("active-filters-info");
    if (activeRegion && filterInfo) {
        document.getElementById("active-region-label").innerText = activeRegion;
        filterInfo.style.display = "block";
    } else if (filterInfo) {
        filterInfo.style.display = "none";
    }
    
    applyCatalogFilters(activeRegion);
}

function applyCatalogFilters(activeRegion) {
    if (!activeRegion) activeRegion = "";
    
    var searchInput = document.getElementById("explore-search-input");
    var query = searchInput ? searchInput.value.toLowerCase().trim() : "";
    
    var sortSelect = document.getElementById("explore-sort-select");
    var sortVal = sortSelect ? sortSelect.value : "newest";
    
    var cardsGrid = document.getElementById("explore-all-grid");
    if (!cardsGrid) return;
    
    var cards = cardsGrid.getElementsByClassName("wisata-card");
    
    for (var i = 0; i < cards.length; i++) {
        var card = cards[i];
        var name = card.getAttribute("data-name").toLowerCase();
        var loc = card.querySelector(".card-location").innerText.toLowerCase();
        var desc = card.querySelector(".card-desc").innerText.toLowerCase();
        var cat = card.getAttribute("data-cat");
        var reg = card.getAttribute("data-region");
        
        var matchesQuery = name.indexOf(query) !== -1 || loc.indexOf(query) !== -1 || desc.indexOf(query) !== -1;
        var matchesCategory = currentCategory === "Semua" || cat === currentCategory;
        var matchesRegion = !activeRegion || loc.indexOf(activeRegion.toLowerCase()) !== -1 || reg.toLowerCase() === activeRegion.toLowerCase();
        
        card.style.display = (matchesQuery && matchesCategory && matchesRegion) ? "flex" : "none";
    }
    
    var cardsArray = [];
    for (var i = 0; i < cards.length; i++) cardsArray.push(cards[i]);
    
    cardsArray.sort(function(a, b) {
        if (sortVal === "newest") return new Date(b.getAttribute("data-date")) - new Date(a.getAttribute("data-date"));
        if (sortVal === "oldest") return new Date(a.getAttribute("data-date")) - new Date(b.getAttribute("data-date"));
        if (sortVal === "name-asc") return a.getAttribute("data-name").localeCompare(b.getAttribute("data-name"));
        if (sortVal === "name-desc") return b.getAttribute("data-name").localeCompare(a.getAttribute("data-name"));
        return 0;
    });
    
    for (var i = 0; i < cardsArray.length; i++) cardsGrid.appendChild(cardsArray[i]);
}


function renderFavoritesView() {
    var grid = document.getElementById("favorites-cards-grid");
    if (!grid) return;
    
    var cardsHtml = "";
    var exploreCards = document.querySelectorAll("#explore-all-grid .wisata-card");
    
    for (var i = 0; i < exploreCards.length; i++) {
        var card = exploreCards[i];
        var id = parseInt(card.getAttribute("data-id"));
        if (favorites.indexOf(id) !== -1) {
            cardsHtml += card.outerHTML;
        }
    }
    
    if (cardsHtml === "") {
        grid.innerHTML = '<div class="no-results" style="grid-column: 1 / -1; width: 100%;">' +
                            '<i class="fa-solid fa-heart-crack" style="color:#586E60; font-size:48px;"></i>' +
                            '<h3>Favorit Anda Kosong</h3>' +
                            '<p>Jelajahi daftar wisata dan klik ikon hati pada kartu objek wisata untuk menyimpannya.</p>' +
                            '<a href="explore.html" class="btn-large" style="margin-top:20px;">Lihat Daftar Wisata</a>' +
                          '</div>';
    } else {
        grid.innerHTML = cardsHtml;
    }
    
    updateHeartIcons();
    updatePageLinks();
}


window.changeImage = function(imgId, src, thumb) {
    var mainImg = document.getElementById(imgId);
    if (mainImg) {
        mainImg.style.opacity = 0.3;
        setTimeout(function() {
            mainImg.src = src;
            mainImg.style.opacity = 1;
        }, 150);
    }
    
    var thumbs = thumb.parentNode.getElementsByClassName("gallery-thumb");
    for (var i = 0; i < thumbs.length; i++) {
        thumbs[i].classList.remove("active");
    }
    thumb.classList.add("active");
};

window.switchTab = function(detailId, tabId, btn) {
    var container = document.getElementById(detailId);
    var contents = container.getElementsByClassName("detail-tab-content");
    for (var i = 0; i < contents.length; i++) {
        contents[i].style.display = "none";
    }
    document.getElementById(tabId).style.display = "block";
    
    var btns = btn.parentNode.getElementsByClassName("detail-tab-btn");
    for (var i = 0; i < btns.length; i++) {
        btns[i].classList.remove("active");
    }
    btn.classList.add("active");
};

window.calculateLocalBudget = function(detailId) {
    var container = document.getElementById(detailId);
    if (!container) return;
    
    var dailyCost = parseInt(container.querySelector(".calc-class").value) || 0;
    var duration = Math.max(1, parseInt(container.querySelector(".calc-duration").value) || 1);
    var transCost = parseInt(container.querySelector(".calc-transport").value) || 0;
    
    var totalDaily = dailyCost * duration;
    var total = totalDaily + transCost;
    
    container.querySelector(".label-daily-cost").textContent = "Rp " + totalDaily.toLocaleString("id-ID");
    container.querySelector(".label-trans-cost").textContent = "Rp " + transCost.toLocaleString("id-ID");
    container.querySelector(".label-total-cost").textContent = "Rp " + total.toLocaleString("id-ID");
};


var activeRatingVal = 5;
window.setRatingStar = function(star, val) {
    activeRatingVal = val;
    var stars = star.parentNode.getElementsByClassName("fa-star");
    for (var i = 0; i < stars.length; i++) {
        stars[i].className = (i < val) ? "fa-solid fa-star" : "fa-regular fa-star";
    }
};


window.submitLocalComment = function(id, event) {
    event.preventDefault();
    var container = document.getElementById("detail-" + id);
    var author = container.querySelector(".author-name").value.trim();
    var content = container.querySelector(".author-msg").value.trim();
    var list = document.getElementById("comments-list-" + id);
    
    var stars = "";
    for (var i = 0; i < 5; i++) {
        stars += (i < activeRatingVal) ? '<i class="fa-solid fa-star"></i>' : '<i class="fa-regular fa-star"></i>';
    }
    
    var commentItem = document.createElement("div");
    commentItem.className = "review-item";
    commentItem.style.borderBottom = "1px solid #E0EAE3";
    commentItem.style.padding = "12px 16px";
    commentItem.innerHTML = '<div style="display:flex; justify-content:space-between; margin-bottom:6px;">' +
                                '<strong>' + author + '</strong>' +
                                '<span style="color:#EE9B00;">' + stars + '</span>' +
                            '</div>' +
                            '<p style="font-size:14px; color:#2D3E35;">' + content + '</p>';
    
    var noCommentsText = list.querySelector("p");
    if (noCommentsText) noCommentsText.remove();
    
    list.appendChild(commentItem);
    
    container.querySelector(".author-name").value = "";
    container.querySelector(".author-msg").value = "";
    var formInputs = container.querySelector(".star-rating-input").getElementsByClassName("fa-star");
    for (var i = 0; i < formInputs.length; i++) {
        formInputs[i].className = "fa-solid fa-star";
    }
    activeRatingVal = 5;
    
    showToast("Ulasan berhasil diterbitkan!", "success");
};

window.addEventListener("DOMContentLoaded", initPage);
