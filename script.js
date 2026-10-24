const items = [
  {
    title: "Blue double bookcase",
    price: 140,
    category: "storage",
    description: "A great two-column bookcase with fourteen open compartments.",
    photos: [1934, 1963]
  },
  {
    title: "Little side-table",
    price: 5,
    category: "tables",
    description: "That one you can put your coffee, tea, water, beer, etc.",
    photos: [1946]
  },
  {
    title: "Pair of folding stools",
    price: 50,
    category: "seating",
    description: "Two white folding counter-height stools with bent-plywood seats.",
    photos: [1949, 1950]
  },
  {
    title: "Black-framed floor mirror",
    price: 30,
    category: "bedroom",
    description: "Tall, leanable full-length mirror in a clean black frame.",
    photos: [1955, 1956]
  },
  {
    title: "Storage bed frame & headboard",
    price: 200,
    category: "bedroom",
    description: "Wood-look bed frame with an upholstered headboard, reading light, and two footboard drawers.",
    photos: [1960, 1961, 1962]
  },
  {
    title: "Pair of rustic industrial nightstands",
    price: 50,
    category: "tables",
    description: "Two slim bedside tables, each with a wood-look drawer, black metal frame, mesh shelf, and lower storage shelf.",
    photos: [2022, 2023, 2024]
  }
];

const imagePath = number => `assets/IMG_${number}.webp`;
const grid = document.querySelector("#product-grid");
const dialog = document.querySelector("#gallery-dialog");
const dialogImage = document.querySelector("#dialog-image");
const dialogTitle = document.querySelector("#dialog-title");
const dialogIndex = document.querySelector("#dialog-index");
let activeItem = null;
let activePhoto = 0;

items.forEach((item, index) => {
  const article = document.createElement("article");
  article.className = "product-card";
  article.dataset.category = item.category;
  article.innerHTML = `
    <button class="product-image" data-item="${index}" aria-label="View all photos of ${item.title}">
      <img src="${imagePath(item.photos[0])}" alt="${item.title}" loading="lazy">
      <span class="photo-count">${item.photos.length} photo${item.photos.length === 1 ? "" : "s"}</span>
    </button>
    <div class="product-copy">
      <div class="product-topline">
        <h3>${item.title}</h3>
        <span class="price">$${item.price?.toFixed(2) || ''}</span>
      </div>
      <p>${item.description}</p>
      <span class="status">Available</span>
    </div>`;
  grid.append(article);
});

document.querySelectorAll(".filter").forEach(button => {
  button.addEventListener("click", () => {
    document.querySelector(".filter.active")?.classList.remove("active");
    button.classList.add("active");
    const filter = button.dataset.filter;
    let count = 0;
    document.querySelectorAll(".product-card").forEach(card => {
      card.hidden = filter !== "all" && card.dataset.category !== filter;
      if (!card.hidden) count += 1;
    });
    document.querySelector("#item-count").textContent = count;
  });
});

function renderDialog() {
  const item = items[activeItem];
  dialogImage.src = imagePath(item.photos[activePhoto]);
  dialogImage.alt = `${item.title}, photo ${activePhoto + 1}`;
  dialogTitle.textContent = item.title;
  dialogIndex.textContent = `${activePhoto + 1} / ${item.photos.length}`;
}

grid.addEventListener("click", event => {
  const button = event.target.closest(".product-image");
  if (!button) return;
  activeItem = Number(button.dataset.item);
  activePhoto = 0;
  renderDialog();
  dialog.showModal();
});

function changePhoto(direction) {
  const length = items[activeItem].photos.length;
  activePhoto = (activePhoto + direction + length) % length;
  renderDialog();
}

document.querySelector(".dialog-close").addEventListener("click", () => dialog.close());
document.querySelector(".previous").addEventListener("click", () => changePhoto(-1));
document.querySelector(".next").addEventListener("click", () => changePhoto(1));
dialog.addEventListener("click", event => { if (event.target === dialog) dialog.close(); });
document.addEventListener("keydown", event => {
  if (!dialog.open) return;
  if (event.key === "ArrowLeft") changePhoto(-1);
  if (event.key === "ArrowRight") changePhoto(1);
});
