const { BrowserWindow, Notification } = require("electron");
const { getConnection } = require("./database");

let window;

const createSocio = async (socio) => {
  try {
    const conn = await getConnection();
    const result = await conn.query("INSERT INTO socios SET ?", socio);
    socio.id = result.insertId;

    // Notify the User
    new Notification({
      title: "Electron Mysql",
      body: "Nuevo Asociado Guardado Correctamente",
    }).show();

    // Return the created Socio
    return socio;
  } catch (error) {
    console.log(error);
  }
};

const getSocios = async () => {
  const conn = await getConnection();
  const results = await conn.query("SELECT * FROM socios ORDER BY id DESC");
  console.log(results);
  return results;
};

const deleteSocio = async (id) => {
  const conn = await getConnection();
  const result = await conn.query("DELETE FROM socios WHERE id = ?", id);
  return result;
};

const getSocioById = async (id) => {
  const conn = await getConnection();
  const result = await conn.query("SELECT * FROM socios WHERE id = ?", id);
  return result[0];
};

const updateSocio = async (id, socio) => {
  const conn = await getConnection();
  const result = await conn.query("UPDATE socios SET ? WHERE Id = ?", [
    socio,
    id,
  ]);
  console.log(result)
};

function createWindow() {
  window = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: true,
    },
  });
  window.setMenuBarVisibility(false);
  window.loadFile("src/ui/index.html");
}

module.exports = {
  createWindow,
  createSocio,
  getSocios,
  deleteSocio,
  getSocioById,
  updateSocio
};
