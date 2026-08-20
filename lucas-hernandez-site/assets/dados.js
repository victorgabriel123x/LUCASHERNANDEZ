/* dados.js
   Este é o único arquivo que você precisa editar para trocar textos,
   telefone, Instagram ou fotos.
   Altere apenas o texto entre aspas. Não apague vírgulas, chaves ou colchetes.
   Depois de salvar, atualize a página no navegador (F5). */

window.SITE = {
  marca: {
    nome: "Lucas Hernandez",
    slogan: "Expert em Mechas & Corte"
  },

  contato: {
    // 55 + DDD + número, só dígitos. Confirme se este número já inclui
    // o 9º dígito do celular — o formato recebido foi "98 8431-3429".
    whatsappNumero: "559884313429",
    whatsappExibicao: "(98) 8431-3429",
    whatsappMensagem: "Olá! Vim pelo site e gostaria de agendar um horário com Lucas Hernandez.",
    whatsappMensagemMetodo: "Olá! Tenho interesse no Método Lucas Hernandez e gostaria de mais informações.",
    instagramUsuario: "@lucas.beautyhair",
    instagramUrl: "https://www.instagram.com/lucas.beautyhair/"
  },

  navegacao: [
    { rotulo: "Início", alvo: "inicio" },
    { rotulo: "Sobre", alvo: "sobre" },
    { rotulo: "Expertise", alvo: "expertise" },
    { rotulo: "Transformações", alvo: "transformacoes" },
    { rotulo: "Método", alvo: "metodo" },
    { rotulo: "Contato", alvo: "contato" }
  ],

  hero: {
    etiqueta: "Lucas Hernandez",
    titulo: "Expert em Mechas & Corte",
    texto: "Transformações construídas através de técnica, identidade e precisão.",
    botao: "Agendar pelo WhatsApp",
    imagemLegenda: "Lucas Hernandez"
  },

  sobre: {
    etiqueta: "Sobre",
    titulo: "Técnica a serviço da identidade.",
    texto1: "[Espaço reservado para uma breve apresentação profissional de Lucas — trajetória e forma de trabalho. Texto a ser fornecido.]",
    texto2: "[Espaço reservado para informações sobre formação ou experiência. Texto a ser fornecido.]"
  },

  expertise: {
    etiqueta: "Expertise",
    titulo: "Onde a técnica se concentra.",
    itens: [
      { numero: "01", nome: "Mechas", texto: "Iluminação capilar personalizada para cada tom de pele e textura." },
      { numero: "02", nome: "Loiros", texto: "Construção do loiro com preservação da saúde e da integridade do fio." },
      { numero: "03", nome: "Morena Iluminada", texto: "Contraste natural entre raiz e comprimento, sem perder uniformidade." },
      { numero: "04", nome: "Correção de Cor", texto: "Diagnóstico técnico para reverter tons indesejados com segurança." },
      { numero: "05", nome: "Corte Feminino", texto: "Estrutura definida a partir do formato do rosto e do movimento natural do cabelo." },
      { numero: "06", nome: "Tratamentos", texto: "Reconstrução e nutrição para sustentar o resultado da coloração ao longo do tempo." }
    ]
  },

  transformacoes: {
    etiqueta: "Transformações",
    titulo: "O resultado fala por si.",
    itens: [
      { legenda: "Modelo 01" },
      { legenda: "Modelo 02" },
      { legenda: "Modelo 03" },
      { legenda: "Modelo 04" },
      { legenda: "Modelo 05" }
    ]
  },

  metodo: {
    etiqueta: "Para profissionais",
    titulo: "Método Lucas Hernandez",
    texto: "Uma metodologia em desenvolvimento voltada à formação técnica de profissionais em mechas e corte. Formato, duração e datas ainda estão sendo definidos.",
    status: "Em breve",
    botao: "Tenho interesse"
  },

  contatoFinal: {
    titulo: "Seu próximo cabelo começa com uma conversa.",
    botao: "Agendar pelo WhatsApp"
  }
};
