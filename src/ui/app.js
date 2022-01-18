const { remote } = require("electron");
const main = remote.require("./main");

const sociosForm = document.getElementById("sociosForm");
const NOMDP = document.getElementById("NOMDP");
const APELDP = document.getElementById("APELDP");
const DIRECDP = document.getElementById("DIRECDP");
const cp = document.getElementById("cp");
const POBLAC = document.getElementById("POBLAC");
const PROVINCIA = document.getElementById("PROVINCIA");
const TELDP = document.getElementById("TELDP");
const MOVILDP = document.getElementById("MOVILDP");
const emaildp = document.getElementById("emaildp");
const productsList = document.getElementById("socios");

let products = [];
let editingStatus = false;
let editProductId;

const deleteProduct = async (id) => {
  const response = confirm("¿Esta Seguro de que desea borrar este asociado?");
  if (response) {
    await main.deleteProduct(id);
    await getProducts();
  }
  return;
};

const editProduct = async (id) => {
  const product = await main.getProductById(id);
  NOMDP.value = product.NOMDP;
  APELDP.value = product.APELDP;
  DIRECDP.value = product.DIRECDP;
  cp.value= product.cp;
  POBLAC.value= product.POBLAC;
  PROVINCIA.value = product.PROVINCIA;
  TELDP.value= product.TELDP;
  MOVILDP.value= product.MOVILDP;
  emaildp.value = product.emaildp;

  editingStatus = true;
  editProductId = id;
};

sociosForm.addEventListener("submit", async (e) => {
  try {
    e.preventDefault();

    const product = {
  
      NOMDP: NOMDP.value,  
      APELDP: APELDP.value,
      DIRECDP : DIRECDP.value,
      cp : cp.value,
      POBLAC : POBLAC.value,
      PROVINCIA : PROVINCIA.value,
      TELDP : TELDP.value,
      MOVILDP : MOVILDP.value,
      emaildp : emaildp.value
    };

    if (!editingStatus) {
      const savedProduct = await main.createProduct(product);
      console.log(savedProduct);
    } else {
      const productUpdated = await main.updateProduct(editProductId, product);
      console.log(productUpdated);

      // Reset
      editingStatus = false;
      editProductId = "";
    }

    sociosForm.reset();
    NOMDP.focus();
    getProducts();
  } catch (error) {
    console.log(error);
  }
});

function renderProducts(products) {
  productsList.innerHTML = "";
  products.forEach((t) => {
    productsList.innerHTML += `

    <div class="card card-body my-2 animated fadeInLeft text-white bg-success mb-3 style="max-width: 20rem;">   
      <div class="card-header"><h4>Ficha de Asociado</h4></div>
      <div class="card-body">
        <h5 class="card-title">Numero de Socio :  ${t.id}</h5>      
        <p class="card-text">Nombre :  ${t.NOMDP}</p>
        <p class="card-text">Apellidos :  ${t.APELDP}</p>
        <p class="card-text">Dirección Postal :  ${t.DIRECDP}</p>
        <p class="card-text">Codigo Postal :  ${t.cp}</p>
        <p class="card-text">Población :  ${t.POBLAC}</p>
        <p class="card-text">Provincia :  ${t.PROVINCIA}</p>
        <p class="card-text">Teléfono :  ${t.TELDP}</p>
        <p class="card-text">Movil :  ${t.MOVILDP}</p>
        <p class="card-text">E-email :  ${t.emaildp}</p>
      </div>            
      <button class="btn btn-danger btn-sm" onclick="deleteProduct('${t.id}')">🗑 Borrar</button>
        <button class="btn btn-secondary btn-sm" onclick="editProduct('${t.id}')">✎ Editar</button>
        </p>
      </div>
    `;
  });
}

const getProducts = async () => {
  products = await main.getProducts();
  renderProducts(products);
};

async function init() {
  getProducts();
}

init();
