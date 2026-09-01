/* =========================================================
   PRODUTOS
========================================================= */

const products = [

  {
    theme: "black",
    image: "assets/Tenis Preto.png",

    category: "CORRE 4",
    name: "Vulcan",
    color: "Preto / Vermelho",
    price: "R$ 399,99",

    eyebrow: "LINHA CORRE",

    title: "Corre<br>mais longe<span>.</span>",

    description:
      "Tecnologia, conforto e performance para te levar além dos seus limites.",

    productDescription:
      "O equilíbrio perfeito entre leveza, amortecimento e resistência para o dia a dia.",

    accent: "#ff4b3e"
  },


  {
    theme: "white-blue",
    image: "assets/Tenis branco.png",

    category: "CORRE 4",
    name: "Veloz",
    color: "Branco / Cinza",
    price: "R$ 429,99",

    eyebrow: "LINHA PERFORMANCE",

    title: "Leveza<br>que acelera<span>.</span>",

    description:
      "Uma construção minimalista para você sentir liberdade em cada passada.",

    productDescription:
      "Entressola responsiva e cabedal respirável para treinos leves e corridas longas.",

    accent: "#7e858f"
  },


 

  {
    category: "CASUAL",

    name: "Urban",

    color: "Bege / Off-white",

    price: "R$ 379,99",

    title: "Seu ritmo.<br>Seu estilo<span>.</span>",

     eyebrow: "LINHA URBANA",

    image: "assets/Tenis Beje.png",

    theme: "beige",

     productDescription:
      "Design versátil, materiais leves e uma palmilha confortável para acompanhar sua rotina.",

    accent: "#c99450"
   
  },



  {
   theme: "gray-blue",
    image: "assets/Tenis Cinza.png",

    category: "PERFORMANCE",
    name: "Eclipse",
    color: "Cinza / Azul",
    price: "R$ 419,99",

    eyebrow: "LINHA PERFORMANCE",

    title: "Potência<br>sem excesso<span>.</span>",

    description:
      "Tecnologia essencial, visual sofisticado e estabilidade em movimento.",

    productDescription:
      "Estrutura firme e confortável para quem busca segurança sem abrir mão do estilo.",

    accent: "#66717d"
  }

];


/* =========================================================
   ESTADO
========================================================= */

let currentIndex = 0;

let isAnimating = false;


/* =========================================================
   ELEMENTOS
========================================================= */

const site = document.querySelector(".site");

const shoe = document.querySelector(".shoe");

const shoeNext = document.querySelector(".shoe-next");

const shoeWrap = document.querySelector(".shoe-wrap");

const productOrbit = document.querySelector(".product-orbit");

const productName = document.querySelector(".product-info h2");

const productColor = document.querySelector(".product-color");

const productPrice = document.querySelector(".price");

const productDescription =
  document.querySelector(".product-description");

const productCategory =
  document.querySelector(".product-category");

const productIndex =
  document.querySelector(".product-index");

const heroLabel =
  document.querySelector(".hero-label p");

const heroTitle =
  document.querySelector(".hero-copy h1");

const heroTitleAccent =
  document.querySelector(".hero-copy h1 span");

const heroDescription =
  document.querySelector(".description");

const dots =
  document.querySelectorAll(".dot");

const miniProducts =
  document.querySelector(".mini-products");


/* =========================================================
   ATUALIZA TEMA
========================================================= */

function updateTheme(product) {

  site.dataset.theme = product.theme;

}


/* =========================================================
   ATUALIZA TEXTOS
========================================================= */

function updateTexts(product) {

  productName.textContent = product.name;

  productColor.textContent = product.color;

  productPrice.textContent = product.price;

  productDescription.textContent =
    product.productDescription;

  productCategory.textContent =
    product.category;

  productIndex.textContent =
    `${String(currentIndex + 1).padStart(2, "0")} / ${String(products.length).padStart(2, "0")}`;

  heroLabel.textContent = product.eyebrow;

  heroTitle.innerHTML =
    product.title;

  heroDescription.textContent =
    product.description;
}


/* =========================================================
   ATUALIZA IMAGEM
========================================================= */

function updateImage(product) {

  shoe.src = product.image;

}


/* =========================================================
   ATUALIZA DOTS
========================================================= */

function updateDots() {

  dots.forEach((dot, index) => {

    dot.classList.toggle(
      "active",
      index === currentIndex
    );

  });

}


/* =========================================================
   ATUALIZA MINIATURAS
========================================================= */

function updateMiniProducts() {
  document.querySelectorAll(".mini").forEach((mini, index) => {
    mini.classList.toggle("active", index === currentIndex);
  });
}

function changeProduct(newIndex, direction = "next") {
  if (isAnimating || newIndex < 0 || newIndex >= products.length || newIndex === currentIndex) {
    return;
  }

  isAnimating = true;
  currentIndex = newIndex;

  const product = products[currentIndex];
  const exitClass = direction === "next" ? "shoe-out-left" : "shoe-out-right";
  const enterClass = direction === "next" ? "shoe-in-right" : "shoe-in-left";
  let transitionStarted = false;

  updateTheme(product);
  updateTexts(product);
  updateDots();
  updateMiniProducts();
  animateProductInfo();

  shoeNext.onload = () => {
    if (transitionStarted) {
      return;
    }

    transitionStarted = true;
    shoe.classList.remove("shoe-out-left", "shoe-out-right");
    shoeNext.classList.remove("shoe-in-left", "shoe-in-right");
    void shoeNext.offsetWidth;
    shoe.classList.add(exitClass);
    shoeNext.classList.add(enterClass);
    productOrbit.classList.add("orbit-transition");

    window.setTimeout(() => {
      shoe.src = shoeNext.src;
      shoe.alt = `Tênis Olympikus ${product.color}`;
      shoe.classList.remove(exitClass);
      shoeNext.classList.remove(enterClass);
      shoeNext.removeAttribute("src");
      shoe.classList.add("shoe-life");
      productOrbit.classList.remove("orbit-transition");
      window.setTimeout(() => shoe.classList.remove("shoe-life"), 420);
      isAnimating = false;
    }, 590);
  };

  shoeNext.src = product.image;

  if (shoeNext.complete) {
    shoeNext.onload();
  }
}

function animateProductInfo() {
  const animatedElements = document.querySelectorAll(
    ".product-info .info-top, .product-info h2, .product-info .product-color, .product-info .product-description, .product-info .price, .product-info .link-btn"
  );

  animatedElements.forEach((element, index) => {
    element.classList.remove("text-in", "text-out");
    void element.offsetWidth;
    element.style.setProperty("--text-delay", `${index * 55}ms`);
    element.classList.add("text-in");
  });
}


/* =========================================================
   PRÓXIMO
========================================================= */

function nextProduct() {

  let nextIndex =
    currentIndex + 1;


  if (
    nextIndex >= products.length
  ) {
    nextIndex = 0;
  }


  changeProduct(
    nextIndex,
    "next"
  );

}


/* =========================================================
   ANTERIOR
========================================================= */

function previousProduct() {

  let previousIndex =
    currentIndex - 1;


  if (previousIndex < 0) {
    previousIndex =
      products.length - 1;
  }


  changeProduct(
    previousIndex,
    "previous"
  );

}


/* =========================================================
   SETA DIREITA
========================================================= */

const nextButton =
  document.querySelector(
    ".slider-arrow.next"
  );


if (nextButton) {

  nextButton.addEventListener(
    "click",
    nextProduct
  );

}


/* =========================================================
   SETA ESQUERDA
========================================================= */

const previousButton =
  document.querySelector(
    ".slider-arrow.prev"
  );


if (previousButton) {

  previousButton.addEventListener(
    "click",
    previousProduct
  );

}


/* =========================================================
   INDICADORES
========================================================= */

dots.forEach((dot, index) => {

  dot.addEventListener(
    "click",
    () => {

      if (
        index === currentIndex
      ) {
        return;
      }


      const direction =
        index > currentIndex
          ? "next"
          : "previous";


      changeProduct(
        index,
        direction
      );

    }
  );

});


/* =========================================================
   MINIATURAS
========================================================= */

function createMiniProducts() {

  if (!miniProducts) {
    return;
  }


  /*
   Remove somente as miniaturas antigas.
   Mantém a seta.
  */

  const arrow =
    miniProducts.querySelector(
      ".collection-arrow"
    );


  miniProducts
    .querySelectorAll(".mini")
    .forEach(mini => mini.remove());


  products.forEach(
    (product, index) => {

      const mini =
        document.createElement("button");


      mini.className = "mini";


      if (
        index === currentIndex
      ) {

        mini.classList.add(
          "active"
        );

      }


      mini.setAttribute(
        "aria-label",
        `Selecionar ${product.color}`
      );


      const image =
        document.createElement("img");


      image.className =
        "mini-shoe-image";


      image.src =
        product.image;


      image.alt =
        `Tênis ${product.color}`;


      mini.appendChild(image);


      mini.addEventListener(
        "click",
        () => {

          if (
            index === currentIndex
          ) {
            return;
          }


          const direction =
            index > currentIndex
              ? "next"
              : "previous";


          changeProduct(
            index,
            direction
          );

        }
      );


      miniProducts.insertBefore(
        mini,
        arrow
      );

    }
  );

}


/* =========================================================
   TECLADO
========================================================= */

document.addEventListener(
  "keydown",
  event => {

    if (event.key === "ArrowRight") {

      nextProduct();

    }


    if (event.key === "ArrowLeft") {

      previousProduct();

    }

  }
);


/* =========================================================
   SWIPE MOBILE
========================================================= */

let touchStartX = 0;

let touchEndX = 0;


if (shoe) {

  shoe.addEventListener(
    "touchstart",
    event => {

      touchStartX =
        event.changedTouches[0].screenX;

    },
    {
      passive: true
    }
  );


  shoe.addEventListener(
    "touchend",
    event => {

      touchEndX =
        event.changedTouches[0].screenX;


      const difference =
        touchEndX - touchStartX;


      if (
        Math.abs(difference) < 50
      ) {
        return;
      }


      if (difference < 0) {

        nextProduct();

      } else {

        previousProduct();

      }

    },
    {
      passive: true
    }
  );

}


/* =========================================================
   INICIALIZAÇÃO
========================================================= */

function initialize() {

  const firstProduct =
    products[0];


  updateTheme(
    firstProduct
  );


  updateTexts(
    firstProduct
  );


  updateImage(
    firstProduct
  );


  updateDots();


  createMiniProducts();


  updateMiniProducts();

  requestAnimationFrame(() => {
    site.classList.add("page-ready");
  });

}


initialize();