# 🎉 Feliz Aniversário, Igor!

Página de aniversário dinâmica para **Igor José Machado Lacerda** (25/08/1998),
feita com HTML, CSS e JavaScript puros — pronta para hospedar de graça no **GitHub Pages**.

## ✨ O que a página tem

- **Idade ao vivo**: calcula automaticamente os anos, dias vividos e dias para o próximo aniversário.
- **Galeria de fotos** com efeito de ampliar ao clicar (lightbox).
- **Player de vídeo** (arquivo local ou YouTube).
- **Player de música** com playlist, play/pause, próxima/anterior e barra de progresso.
- **Mensagem personalizada** em texto.
- **Confete animado** 🎉 (cai ao abrir e ao clicar no botão flutuante).
- **Responsiva** (funciona bem no celular e no computador).

## 📁 Estrutura dos arquivos

```
feliz-aniversario/
├── index.html          → a página
├── css/style.css       → o visual
├── js/script.js        → a parte dinâmica
├── assets/
│   ├── img/            → suas fotos  (foto1.jpg, foto2.jpg, ...)
│   ├── video/          → seu vídeo   (aniversario.mp4)
│   └── audio/          → suas músicas (musica1.mp3, ...)
└── README.md
```

## 🛠️ Como personalizar

### 1. Trocar as fotos
1. Coloque as imagens dentro de `assets/img/` (ex.: `foto1.jpg`, `foto2.jpg`...).
2. Abra `js/script.js` e edite a lista **`fotos`** com os nomes e legendas.
   - Enquanto não houver foto real, aparece um quadradinho de exemplo automaticamente.

### 2. Trocar o vídeo
- **Arquivo próprio**: coloque em `assets/video/aniversario.mp4` (o caminho já está no `index.html`).
- **YouTube**: no `index.html`, substitua o bloco `<video>...</video>` por:
  ```html
  <iframe src="https://www.youtube.com/embed/SEU_ID_DO_VIDEO"
          allowfullscreen></iframe>
  ```

### 3. Trocar as músicas
1. Coloque os arquivos `.mp3` em `assets/audio/`.
2. Edite a lista **`musicas`** em `js/script.js` (título, artista e caminho).

### 4. Mudar os textos
- A mensagem fica direto no `index.html`, dentro da seção `<!-- MENSAGEM -->`. É só editar o texto.

## 🚀 Como publicar no GitHub Pages (passo a passo)

1. Crie uma conta no [github.com](https://github.com) (se ainda não tiver).
2. Crie um novo repositório, por exemplo: **`feliz-aniversario`** (deixe **público**).
3. Envie estes arquivos para o repositório. Pelo site dá para arrastar e soltar
   em **Add file → Upload files** (suba a pasta inteira mantendo a estrutura).
4. No repositório, vá em **Settings → Pages**.
5. Em **Source**, escolha **Deploy from a branch**, selecione a branch **`main`** e a pasta **`/ (root)`**, e clique em **Save**.
6. Aguarde 1–2 minutos. O link aparecerá no topo, no formato:
   ```
   https://SEU-USUARIO.github.io/feliz-aniversario/
   ```
   Pronto! É esse link que você compartilha. 🎈

> 💡 Dica: se quiser que o endereço seja `https://SEU-USUARIO.github.io/` (sem o `/feliz-aniversario`),
> nomeie o repositório exatamente como **`SEU-USUARIO.github.io`**.

## 🧪 Testar no computador antes de publicar

Basta abrir o arquivo `index.html` com duplo clique no navegador.
Tudo funciona offline, exceto que alguns navegadores bloqueiam áudio/vídeo
ao abrir como arquivo — nesse caso, use um servidor local simples:

```bash
# Com Python instalado, dentro da pasta do projeto:
python -m http.server 8000
# Depois acesse http://localhost:8000 no navegador
```

Feito com ❤️ para o Igor.
