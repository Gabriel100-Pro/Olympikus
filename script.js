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
    product.description;

  productCategory.textContent =
    product.category;

  productIndex.textContent =
    `${String(currentIndex + 1).padStart(2, "0")} / ${String(products.length).padStart(2, "0")}`;

  heroLabel.textContent =
    "LINHA CORRE";

  heroTitle.innerHTML =
    `Corra<br>mais longe<span>.</span>`;

  heroDescription.textContent =
    "Tecnologia, conforto e performance para te levar além dos seus limites.";
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

  const minis =
    document.querySelectorAll(".mini");

  minis.forEach((mini, index) => {

    mini.classList.toggle(
      "active",
      index === currentIndex
    );

  });

}


/* =========================================================
   TROCAR PRODUTO
========================================================= */

function changeProduct(
  newIndex,
  direction = "next"
) {

  /*
   Impede vários cliques durante a animação.
  */

  if (isAnimating) {
    return;
  }


  /*
   Impede índice inválido.
  */

  if (
    newIndex < 0 ||
    newIndex >= products.length
  ) {
    return;
  }


  /*
   Não faz nada se clicar no produto atual.
  */

  if (newIndex === currentIndex) {
    return;
  }


  isAnimating = true;


  const oldIndex = currentIndex;

  currentIndex = newIndex;


  /*
   Animação de saída.
  */

  shoe.classList.remove(
    "shoe-in",
    "shoe-out-left",
    "shoe-out-right"
  );


  void shoe.offsetWidth;


  if (direction === "next") {

    shoe.classList.add(
      "shoe-out-left"
    );

  } else {

    shoe.classList.add(
      "shoe-out-right"
    );

  }


  /*
   Atualiza o conteúdo enquanto
   o tênis antigo está saindo.
  */

  setTimeout(() => {

    const product =
      products[currentIndex];


    updateTheme(product);

    updateTexts(product);

    updateDots();

    updateMiniProducts();


    /*
     Troca a imagem.
    */

    shoe.src = product.image;


    /*
     Espera a imagem carregar
     antes de iniciar a entrada.
    */

    shoe.onload = () => {

      shoe.classList.remove(
        "shoe-out-left",
        "shoe-out-right"
      );


      void shoe.offsetWidth;


      shoe.classList.add(
        "shoe-in"
      );


      setTimeout(() => {

        shoe.classList.remove(
          "shoe-in"
        );

        isAnimating = false;

      }, 600);

    };


    /*
     Caso a imagem já esteja no cache.
    */

    if (shoe.complete) {

      shoe.classList.remove(
        "shoe-out-left",
        "shoe-out-right"
      );


      void shoe.offsetWidth;


      shoe.classList.add(
        "shoe-in"
      );


      setTimeout(() => {

        shoe.classList.remove(
          "shoe-in"
        );

        isAnimating = false;

      }, 600);

    }

  }, 430);

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

}


initialize();