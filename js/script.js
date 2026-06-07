/* ===================================================
   FELIZ ANIVERSÁRIO - IGOR
   Lógica dinâmica da página
   =================================================== */

/* =========================================================
   1) CONFIGURAÇÃO — edite estas listas com seus arquivos!
   ========================================================= */

// Data de nascimento do Igor (ano, mês 0-11, dia) -> 25/08/1998
// Atenção: em JavaScript o mês começa em 0, então Agosto = 7.
const NASCIMENTO = new Date(1998, 7, 25);

// ---- FOTOS DA GALERIA ----
// Troque os "src" pelos caminhos das suas imagens em assets/img/
// Enquanto não tiver as fotos, são usadas imagens de exemplo (placeholder).
const fotos = [
  { src: "assets/img/foto1.jpg", legenda: "Momento especial 1" },
  { src: "assets/img/foto2.jpg", legenda: "Momento especial 2" },
  { src: "assets/img/foto3.jpg", legenda: "Momento especial 3" },
  { src: "assets/img/foto4.jpg", legenda: "Momento especial 4" },
  { src: "assets/img/foto5.jpg", legenda: "Momento especial 5" },
  { src: "assets/img/foto6.jpg", legenda: "Momento especial 6" },
];

// ---- MÚSICAS DO PLAYER ----
// Coloque os arquivos em assets/audio/ e ajuste abaixo.
const musicas = [
  { titulo: "Parabéns pra Você", artista: "Tradicional", src: "assets/audio/musica1.mp3" },
  { titulo: "Música 2", artista: "Artista 2", src: "assets/audio/musica2.mp3" },
  { titulo: "Música 3", artista: "Artista 3", src: "assets/audio/musica3.mp3" },
];

/* =========================================================
   2) IDADE DINÂMICA (calculada ao vivo)
   ========================================================= */
function calcularIdade() {
  const agora = new Date();

  // Anos completos
  let anos = agora.getFullYear() - NASCIMENTO.getFullYear();
  const jaFezAniversario =
    agora.getMonth() > NASCIMENTO.getMonth() ||
    (agora.getMonth() === NASCIMENTO.getMonth() && agora.getDate() >= NASCIMENTO.getDate());
  if (!jaFezAniversario) anos--;

  // Total de dias vividos
  const msPorDia = 1000 * 60 * 60 * 24;
  const diasVividos = Math.floor((agora - NASCIMENTO) / msPorDia);

  // Dias até o próximo aniversário
  let proximo = new Date(agora.getFullYear(), NASCIMENTO.getMonth(), NASCIMENTO.getDate());
  if (proximo < agora) {
    proximo = new Date(agora.getFullYear() + 1, NASCIMENTO.getMonth(), NASCIMENTO.getDate());
  }
  const diasParaProximo = Math.ceil((proximo - agora) / msPorDia);

  document.getElementById("anos").textContent = anos;
  document.getElementById("dias").textContent = diasVividos.toLocaleString("pt-BR");
  document.getElementById("proximo").textContent = diasParaProximo;

  // Se for o aniversário hoje, solta confete automaticamente 🎉
  if (agora.getMonth() === NASCIMENTO.getMonth() && agora.getDate() === NASCIMENTO.getDate()) {
    document.getElementById("proximo").textContent = "HOJE! 🎂";
  }
}

/* =========================================================
   3) GALERIA DE FOTOS + LIGHTBOX
   ========================================================= */
function montarGaleria() {
  const grid = document.getElementById("galeriaGrid");

  fotos.forEach((foto) => {
    const item = document.createElement("div");
    item.className = "galeria-item";

    const img = document.createElement("img");
    img.src = foto.src;
    img.alt = foto.legenda;
    img.loading = "lazy";
    // Se a imagem não existir ainda, mostra um placeholder cinza
    img.onerror = () => {
      img.src =
        "data:image/svg+xml;charset=utf-8," +
        encodeURIComponent(
          `<svg xmlns='http://www.w3.org/2000/svg' width='400' height='400'>
             <rect width='100%' height='100%' fill='#e7dff5'/>
             <text x='50%' y='50%' font-family='sans-serif' font-size='22'
               fill='#9b8cc4' text-anchor='middle' dominant-baseline='middle'>
               📷 ${foto.legenda}
             </text>
           </svg>`
        );
    };

    const legenda = document.createElement("span");
    legenda.className = "galeria-legenda";
    legenda.textContent = foto.legenda;

    item.appendChild(img);
    item.appendChild(legenda);
    item.addEventListener("click", () => abrirLightbox(img.src, foto.legenda));
    grid.appendChild(item);
  });
}

function abrirLightbox(src, alt) {
  let box = document.getElementById("lightbox");
  if (!box) {
    box = document.createElement("div");
    box.id = "lightbox";
    box.className = "lightbox";
    box.innerHTML = '<img alt="" />';
    box.addEventListener("click", () => box.classList.remove("aberto"));
    document.body.appendChild(box);
  }
  const img = box.querySelector("img");
  img.src = src;
  img.alt = alt;
  box.classList.add("aberto");
}

/* =========================================================
   4) PLAYER DE MÚSICA
   ========================================================= */
const audio = document.getElementById("audioPlayer");
let faixaAtual = 0;
let tocando = false;

function montarPlaylist() {
  const lista = document.getElementById("playlist");
  musicas.forEach((m, i) => {
    const li = document.createElement("li");
    li.innerHTML = `<span class="num">${i + 1}</span>
                    <span>${m.titulo} — <em>${m.artista}</em></span>`;
    li.addEventListener("click", () => selecionarFaixa(i, true));
    lista.appendChild(li);
  });
}

function selecionarFaixa(i, autoPlay) {
  faixaAtual = i;
  const m = musicas[i];
  audio.src = m.src;
  document.getElementById("faixaTitulo").textContent = m.titulo;
  document.getElementById("faixaArtista").textContent = m.artista;

  // Marca a faixa ativa na lista
  document.querySelectorAll(".playlist li").forEach((li, idx) => {
    li.classList.toggle("ativa", idx === i);
  });

  if (autoPlay) tocar();
}

function tocar() {
  if (!audio.src) selecionarFaixa(0, false);
  audio
    .play()
    .then(() => {
      tocando = true;
      document.getElementById("btnPlay").textContent = "⏸";
      document.getElementById("playerCapa").classList.add("girando");
    })
    .catch(() => {
      // Falha comum: arquivo de áudio ainda não foi adicionado
      alert("Não consegui tocar a música. Verifique se o arquivo existe em assets/audio/ 🙂");
    });
}

function pausar() {
  audio.pause();
  tocando = false;
  document.getElementById("btnPlay").textContent = "▶";
}

function alternarPlay() {
  tocando ? pausar() : tocar();
}

function proxima() {
  selecionarFaixa((faixaAtual + 1) % musicas.length, true);
}

function anterior() {
  selecionarFaixa((faixaAtual - 1 + musicas.length) % musicas.length, true);
}

function formatarTempo(seg) {
  if (isNaN(seg)) return "0:00";
  const m = Math.floor(seg / 60);
  const s = Math.floor(seg % 60).toString().padStart(2, "0");
  return `${m}:${s}`;
}

function ligarPlayer() {
  document.getElementById("btnPlay").addEventListener("click", alternarPlay);
  document.getElementById("btnProximo").addEventListener("click", proxima);
  document.getElementById("btnAnterior").addEventListener("click", anterior);

  const progresso = document.getElementById("progresso");

  audio.addEventListener("timeupdate", () => {
    if (audio.duration) {
      progresso.value = (audio.currentTime / audio.duration) * 100;
      document.getElementById("tempoAtual").textContent = formatarTempo(audio.currentTime);
    }
  });

  audio.addEventListener("loadedmetadata", () => {
    document.getElementById("tempoTotal").textContent = formatarTempo(audio.duration);
  });

  audio.addEventListener("ended", proxima);

  progresso.addEventListener("input", () => {
    if (audio.duration) audio.currentTime = (progresso.value / 100) * audio.duration;
  });

  // Pré-seleciona a primeira faixa (sem tocar)
  if (musicas.length) selecionarFaixa(0, false);
}

/* =========================================================
   5) CONFETE (animação no canvas)
   ========================================================= */
const canvas = document.getElementById("confete");
const ctx = canvas.getContext("2d");
let particulas = [];

function ajustarCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}

function soltarConfete(quantidade = 120) {
  const cores = ["#ff5c8a", "#7b2ff7", "#2d9cdb", "#ffd166", "#06d6a0"];
  for (let i = 0; i < quantidade; i++) {
    particulas.push({
      x: Math.random() * canvas.width,
      y: -20,
      r: Math.random() * 6 + 4,
      cor: cores[Math.floor(Math.random() * cores.length)],
      vx: Math.random() * 4 - 2,
      vy: Math.random() * 3 + 2,
      rot: Math.random() * 360,
      vrot: Math.random() * 10 - 5,
    });
  }
}

function animarConfete() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  particulas.forEach((p) => {
    p.x += p.vx;
    p.y += p.vy;
    p.rot += p.vrot;
    ctx.save();
    ctx.translate(p.x, p.y);
    ctx.rotate((p.rot * Math.PI) / 180);
    ctx.fillStyle = p.cor;
    ctx.fillRect(-p.r / 2, -p.r / 2, p.r, p.r * 0.6);
    ctx.restore();
  });
  // Remove as que saíram da tela
  particulas = particulas.filter((p) => p.y < canvas.height + 20);
  requestAnimationFrame(animarConfete);
}

/* =========================================================
   6) INICIALIZAÇÃO
   ========================================================= */
window.addEventListener("DOMContentLoaded", () => {
  calcularIdade();
  setInterval(calcularIdade, 1000 * 60 * 60); // atualiza de hora em hora

  montarGaleria();
  montarPlaylist();
  ligarPlayer();

  ajustarCanvas();
  animarConfete();
  soltarConfete(150); // chuva de confete ao abrir a página

  document.getElementById("ano").textContent = new Date().getFullYear();
  document.getElementById("btnConfete").addEventListener("click", () => soltarConfete(150));
});

window.addEventListener("resize", ajustarCanvas);
