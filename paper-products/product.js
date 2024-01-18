const result = document.querySelector(".result");

const fetchProduct = async () => {
  result.innerHTML = `<h2>Loading...</h2>`;
  try {
    const id = window.location.search;
    // const {
    //   data: { fields },
    // } = await axios.get(`/api/3-product${id}`)-z-complete
    const {
      data: { fields },
    } = await axios.get(`/api/products${id}`);
    const { name, images, desc, price, category, company } = fields;
    result.innerHTML = `<h1 class="title">${name}</h1>
  <article class="product">
    <img class="product-img"
    src="${images[0].url}"
    alt="${name}"
    />
    <div class="product-info">
      <h5 class="title">${name}</h5>
      <h5 class="title">${company}</h5>
      <h5 class="title">${category}</h5>
      <h5 class="price">¥${price}</h5>
      <p class="desc">${desc}</p>
    </div>
  </article>`;
    return { name, images, desc, price, category, company };
  } catch (error) {
    result.innerHTML = `<h2>${error.response.data}</h2>`;
  }
};

fetchProduct();
