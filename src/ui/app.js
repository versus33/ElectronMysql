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
const sociosList = document.getElementById("socios");

let socios = [];
let editingStatus = false;
let editSocioId;

const deleteSocio = async (id) => {
  const response = confirm("¿Esta Seguro de que desea borrar este asociado?");
  if (response) {
    await main.deleteSocio(id);
    await getSocios();
  }
  return;
};

const editSocio = async (id) => {
  const socio = await main.getSocioById(id);
  NOMDP.value = socio.NOMDP;
  APELDP.value = socio.APELDP;
  DIRECDP.value = socio.DIRECDP;
  cp.value= socio.cp;
  POBLAC.value= socio.POBLAC;
  PROVINCIA.value = socio.PROVINCIA;
  TELDP.value= socio.TELDP;
  MOVILDP.value= socio.MOVILDP;
  emaildp.value = socio.emaildp;

  editingStatus = true;
  editSocioId = id;
};

sociosForm.addEventListener("submit", async (e) => {
  try {
    e.preventDefault();

    const socio = {
  
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
      const savedSocio = await main.createSocio(socio);
      console.log(savedSocio);
    } else {
      const socioUpdated = await main.updateSocio(editSocioId, socio);
      console.log(socioUpdated);

      // Reset
      editingStatus = false;
      editSocioId = "";
    }

    sociosForm.reset();
    NOMDP.focus();
    getSocios();
  } catch (error) {
    console.log(error);
  }
});

function renderSocios(socios) {
  sociosList.innerHTML = "";
  socios.forEach((t) => {
    sociosList.innerHTML += `

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
      <button class="btn btn-danger btn-sm" onclick="deleteSocio('${t.id}')">🗑 Borrar</button>
        <button class="btn btn-secondary btn-sm" onclick="editSocio('${t.id}')">✎ Editar</button>
        </p>
      </div>
    `;
  });
}

const getSocios = async () => {
  socios = await main.getSocios();
  renderSocios(socios);
};

async function init() {
  getSocios();
}

init();
