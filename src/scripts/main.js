/* Shared client script – runs on every page, all lookups are guarded. */
const burger = document.getElementById("burger");
const navLinks = document.getElementById("nav-links");

if (burger && navLinks) {
  burger.addEventListener("click", () => {
    const open = navLinks.classList.toggle("is-open");
    burger.classList.toggle("is-open", open);
    burger.setAttribute("aria-expanded", String(open));
  });
}

/* ---------- Archive: category filter ---------- */
const filterBtns = document.querySelectorAll(".filters__btn");
const grid = document.getElementById("grid");
const cards = document.querySelectorAll(".card");
const moreCards = document.querySelectorAll(".card--more");
const featured = document.querySelector(".featured");
const gridEmpty = document.getElementById("grid-empty");
const showMoreBtn = document.getElementById("show-more");
let expanded = false;

if (filterBtns.length) {
  filterBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      filterBtns.forEach((b) => b.classList.remove("is-active"));
      btn.classList.add("is-active");
      const cat = btn.dataset.filter;
      let visibleCount = 0;

      if (featured) {
        const featuredVisible = cat === "all" || featured.dataset.cat === cat;
        featured.hidden = !featuredVisible;
        if (featuredVisible) visibleCount++;
      }

      cards.forEach((card) => {
        const matches = cat === "all" || card.dataset.cat === cat;
        const isExtra = card.classList.contains("card--more");
        const show = matches && (!isExtra || expanded);
        card.hidden = !show;
        if (show) visibleCount++;
      });

      const gridCardsVisible = [...cards].some((c) => !c.hidden);
      if (grid) grid.hidden = !gridCardsVisible;
      if (gridEmpty) gridEmpty.hidden = visibleCount > 0;
    });
  });
}

/* ---------- Show more ---------- */
if (showMoreBtn) {
  showMoreBtn.addEventListener("click", () => {
    expanded = !expanded;
    const activeCat =
      document.querySelector(".filters__btn.is-active")?.dataset.filter ?? "all";
    moreCards.forEach((card) => {
      card.hidden = !expanded || (activeCat !== "all" && card.dataset.cat !== activeCat);
    });
    showMoreBtn.textContent = expanded ? "Weniger anzeigen" : "Mehr Beiträge anzeigen";
  });
}
