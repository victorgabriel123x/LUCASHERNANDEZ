(function(){
"use strict";

var D = window.SITE;
var reduz = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

function ler(caminho){
  return caminho.split(".").reduce(function(o,k){ return (o||{})[k]; }, D);
}

/* ===================================================================
   Ligação de dados: HTML <- dados.js
   =================================================================== */
document.querySelectorAll("[data-campo]").forEach(function(n){
  var v = ler(n.getAttribute("data-campo"));
  if (v != null) n.textContent = v;
});

document.querySelectorAll("[data-zap]").forEach(function(n){
  n.href = "https://wa.me/" + D.contato.whatsappNumero
         + "?text=" + encodeURIComponent(D.contato.whatsappMensagem || "");
  n.target = "_blank"; n.rel = "noopener";
});
document.querySelectorAll("[data-zap-metodo]").forEach(function(n){
  n.href = "https://wa.me/" + D.contato.whatsappNumero
         + "?text=" + encodeURIComponent(D.contato.whatsappMensagemMetodo || "");
  n.target = "_blank"; n.rel = "noopener";
});
document.querySelectorAll("[data-instagram-link]").forEach(function(n){
  n.href = D.contato.instagramUrl;
});
document.querySelectorAll("[data-instagram-usuario]").forEach(function(n){
  n.textContent = D.contato.instagramUsuario;
});

var anoEl = document.getElementById("ano");
if (anoEl) anoEl.textContent = new Date().getFullYear();

/* ===================================================================
   Espaço reservado para foto: troca automática quando o arquivo existir
   =================================================================== */
function tratarMoldura(fig, legenda){
  var img = fig.querySelector("img");
  if (!img) return;
  img.addEventListener("error", function(){
    fig.classList.add("moldura--vazia");
    fig.innerHTML = '<div class="conteudo">'
      + '<svg viewBox="0 0 22 24" fill="none" stroke="currentColor" stroke-width="1.1"'
      + ' aria-hidden="true"><path d="M11 1 20.5 6.5v11L11 23 1.5 17.5v-11z"/></svg>'
      + '<span>' + legenda + '</span>'
      + '<span class="obs">Foto em breve</span></div>';
    fig.setAttribute("aria-label", "Espaço reservado para foto: " + legenda);
  }, { once: true });
}

tratarMoldura(document.getElementById("fotoHero"), D.hero.imagemLegenda || "Foto principal");

/* ===================================================================
   Navegação (gerada a partir de dados.js)
   =================================================================== */
var listaMenu = document.getElementById("listaMenu");
(D.navegacao || []).forEach(function(item, i){
  var li = document.createElement("li");
  var a = document.createElement("a");
  a.href = "#" + item.alvo;
  a.textContent = item.rotulo;
  a.style.setProperty("--d", (70 + i * 55) + "ms");
  li.appendChild(a);
  listaMenu.appendChild(li);
});

/* ===================================================================
   Expertise (lista gerada)
   =================================================================== */
var listaExpertise = document.getElementById("listaExpertise");
(D.expertise.itens || []).forEach(function(item){
  var li = document.createElement("li");
  li.className = "expertise-item revela";

  var numero = document.createElement("span");
  numero.className = "expertise-numero";
  numero.textContent = item.numero;

  var nome = document.createElement("h3");
  nome.className = "expertise-nome";
  nome.textContent = item.nome;

  var texto = document.createElement("p");
  texto.className = "expertise-texto";
  texto.textContent = item.texto;

  li.appendChild(numero);
  li.appendChild(nome);
  li.appendChild(texto);
  listaExpertise.appendChild(li);
});

/* ===================================================================
   Galeria (lista gerada, com espaço reservado por item)
   =================================================================== */
var galeria = document.getElementById("galeria");
(D.transformacoes.itens || []).forEach(function(item, i){
  var li = document.createElement("li");
  li.className = "galeria-item revela";

  var fig = document.createElement("figure");
  fig.className = "moldura";

  var picture = document.createElement("picture");
  var source = document.createElement("source");
  source.type = "image/webp";
  source.srcset = "assets/fotos/modelo-" + String(i + 1).padStart(2, "0") + ".webp";
  var img = document.createElement("img");
  img.src = "assets/fotos/modelo-" + String(i + 1).padStart(2, "0") + ".jpg";
  img.alt = "Transformação — " + item.legenda;
  img.width = 600; img.height = 800;
  img.loading = "lazy";

  picture.appendChild(source);
  picture.appendChild(img);
  fig.appendChild(picture);
  li.appendChild(fig);
  galeria.appendChild(li);

  tratarMoldura(fig, item.legenda);
});

/* ===================================================================
   Cabeçalho: encolhe ao rolar
   =================================================================== */
var cabecalho = document.getElementById("cabecalho");
function atualizarCabecalho(){
  if (window.scrollY > 24) cabecalho.classList.add("fixo");
  else cabecalho.classList.remove("fixo");
}
atualizarCabecalho();
window.addEventListener("scroll", atualizarCabecalho, { passive: true });

/* ===================================================================
   Menu mobile
   =================================================================== */
var botaoMenu = document.getElementById("botaoMenu");
botaoMenu.addEventListener("click", function(){
  var aberto = document.body.classList.toggle("menu-aberto");
  botaoMenu.setAttribute("aria-expanded", aberto ? "true" : "false");
  botaoMenu.setAttribute("aria-label", aberto ? "Fechar menu" : "Abrir menu");
});
listaMenu.querySelectorAll("a").forEach(function(a){
  a.addEventListener("click", function(){
    document.body.classList.remove("menu-aberto");
    botaoMenu.setAttribute("aria-expanded", "false");
  });
});

/* ===================================================================
   Rolagem suave descontando a altura do cabeçalho
   =================================================================== */
document.querySelectorAll('a[href^="#"]').forEach(function(a){
  a.addEventListener("click", function(e){
    var id = a.getAttribute("href").slice(1);
    var alvo = document.getElementById(id);
    if (!alvo) return;
    e.preventDefault();
    var topo = alvo.getBoundingClientRect().top + window.scrollY
      - (id === "inicio" ? 0 : cabecalho.offsetHeight - 1);
    window.scrollTo({ top: Math.max(topo, 0), behavior: reduz ? "auto" : "smooth" });
    try { history.replaceState(null, "", "#" + id); } catch (err) { /* file:// bloqueia */ }
  });
});

/* ===================================================================
   Título do Hero: entra linha a linha
   =================================================================== */
function fatiar(no, saida){
  Array.prototype.slice.call(no.childNodes).forEach(function(f){
    if (f.nodeType === 3) {
      var frag = document.createDocumentFragment();
      f.textContent.split(/(\s+)/).forEach(function(p){
        if (!p) return;
        if (/^\s+$/.test(p)) { frag.appendChild(document.createTextNode(p)); return; }
        var s = document.createElement("span");
        s.className = "pal"; s.textContent = p;
        frag.appendChild(s); saida.push(s);
      });
      no.replaceChild(frag, f);
    } else if (f.nodeType === 1) {
      fatiar(f, saida);
    }
  });
  return saida;
}

var tituloHero = document.getElementById("tituloHero");
var palavras = reduz ? [] : fatiar(tituloHero, []);

function medirLinhas(){
  var linha = -1, anterior = null;
  palavras.forEach(function(p){
    var t = p.offsetTop;
    if (anterior === null || Math.abs(t - anterior) > 4) { linha++; anterior = t; }
    p.style.setProperty("--d", (300 + linha * 115) + "ms");
  });
}

/* ===================================================================
   Abertura em cascata do Hero
   =================================================================== */
var heroSecao = document.getElementById("inicio");
var abriu = false;
function abrir(){
  if (abriu) return;
  abriu = true;
  medirLinhas();
  requestAnimationFrame(function(){
    requestAnimationFrame(function(){
      heroSecao.classList.add("pronto");
      cabecalho.classList.add("pronto");
    });
  });
}
if (document.fonts && document.fonts.ready) document.fonts.ready.then(abrir);
else window.addEventListener("load", abrir);
setTimeout(abrir, 2200);

/* ===================================================================
   Revelação ao rolar
   =================================================================== */
var alvosRevela = document.querySelectorAll(".revela");
if (reduz || !("IntersectionObserver" in window)) {
  alvosRevela.forEach(function(n){ n.classList.add("dentro"); });
} else {
  var obs = new IntersectionObserver(function(entradas){
    entradas.forEach(function(en, i){
      if (!en.isIntersecting) return;
      setTimeout(function(){ en.target.classList.add("dentro"); }, Math.min(i, 4) * 90);
      obs.unobserve(en.target);
    });
  }, { rootMargin: "0px 0px -8% 0px", threshold: .06 });
  alvosRevela.forEach(function(n){ obs.observe(n); });
}

/* ===================================================================
   Botão flutuante: aparece depois do Hero
   =================================================================== */
var flutuante = document.getElementById("botaoFlutuante");
function atualizarFlutuante(){
  var limite = heroSecao.offsetTop + heroSecao.offsetHeight * .6;
  if (window.scrollY > limite) flutuante.classList.add("visivel");
  else flutuante.classList.remove("visivel");
}
atualizarFlutuante();
window.addEventListener("scroll", atualizarFlutuante, { passive: true });

})();
