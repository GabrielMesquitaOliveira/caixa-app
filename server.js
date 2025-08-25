import { exec } from "child_process";
import fs from "fs";
import os from "os";
import path from "path";
import { fileURLToPath } from "url";

// Configuração para ESM
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Função para pegar o IP local do PC
function getLocalIP() {
  const interfaces = os.networkInterfaces();
  for (let name of Object.keys(interfaces)) {
    for (let iface of interfaces[name]) {
      if (iface.family === "IPv4" && !iface.internal) {
        return iface.address;
      }
    }
  }
  return "127.0.0.1";
}

const ip = getLocalIP();
const port = 3000;

// Caminho do arquivo config.ts
const configPath = path.resolve(__dirname, "config.ts");

// Conteúdo do config.ts
const configContent = `// Este arquivo é gerado automaticamente pelo server.js
export const API_URL = 'http://${ip}:${port}';
`;

// Escreve/atualiza o config.ts
fs.writeFileSync(configPath, configContent, { encoding: "utf8" });
console.log(`✅ Arquivo config.ts atualizado com: ${configContent.trim()}`);

// Sobe o JSON Server
console.log(`🚀 Subindo JSON Server em http://${ip}:${port}`);
exec(`npx json-server --watch db.json --port ${port} --host ${ip}`, (err, stdout, stderr) => {
  if (err) {
    console.error("❌ Erro ao subir JSON Server:", err);
    return;
  }
  console.log(stdout);
  console.error(stderr);
});
