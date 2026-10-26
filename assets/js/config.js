/**
 * CONNEN — Configuração central de contato
 * ------------------------------------------------------------------
 * Este é o ÚNICO lugar onde o contato da Connen precisa ser configurado.
 * Todos os botões de WhatsApp da página leem os dados daqui.
 *
 * CONTATO:
 *    `whatsappUrl` é o link usado por todos os botões de WhatsApp.
 *    Se ele estiver vazio, o link é montado a partir de `whatsappNumber`.
 *
 * Formato: código do país + DDD + número, apenas dígitos.
 *    Exemplo de formato (NÃO é um número real): "55DD9XXXXXXXX"
 *    → 55 (Brasil) + DDD com 2 dígitos + número com 8 ou 9 dígitos.
 *
 * Enquanto `whatsappUrl` e `whatsappNumber` estiverem vazios, os botões
 * NÃO geram links de WhatsApp: ao clicar, a página exibe um aviso de
 * "contato em configuração" e registra um alerta no console.
 */
window.CONNEN_CONFIG = {
  // Link de contato usado por todos os botões de WhatsApp da página.
  whatsappUrl:
    "https://api.whatsapp.com/send/?phone=5519995186994&text=Ol%C3%A1%21%0AGostaria+de+criar+um+site.&type=phone_number&app_absent=0&utm_source=chatgpt.com",

  // Alternativa, usada só se whatsappUrl estiver vazio: número oficial
  // do WhatsApp (somente dígitos, com 55 + DDD).
  whatsappNumber: "",

  // OPCIONAL: telefone para exibição no rodapé, ex.: "(DD) 9XXXX-XXXX".
  // Se ficar vazio, nenhum telefone é exibido.
  phoneDisplay: "",

  // Mensagens iniciais enviadas pelo WhatsApp, por contexto.
  // Cada botão usa o atributo data-whatsapp="<chave>" para escolher a sua.
  messages: {
    orcamento:
      "Olá! Gostaria de conhecer os serviços da Connen e solicitar um orçamento para meu negócio.",
    plano:
      "Olá! Tenho interesse no Plano Único (Landing Page Profissional, R$ 350) da Connen e gostaria de saber como começar.",
    servico:
      "Olá! Gostaria de saber como funciona a criação de páginas da Connen.",
    segmento:
      "Olá! Tenho um negócio e gostaria de saber se a Connen pode criar uma página para o meu segmento.",
    "exemplo-automotivo":
      "Olá! Vi o conceito de página para estética automotiva no site da Connen e gostaria de solicitar um orçamento para o meu negócio.",
    "exemplo-salao":
      "Olá! Vi o conceito de página para salão de beleza no site da Connen e gostaria de solicitar um orçamento para o meu negócio.",
    "exemplo-professor":
      "Olá! Vi o conceito de página para professor particular no site da Connen e gostaria de solicitar um orçamento.",
    duvida:
      "Olá! Tenho algumas dúvidas sobre a criação de páginas da Connen.",
  },
};
