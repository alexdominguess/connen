# Connen — Landing page

Página única de apresentação da Connen, criação de landing pages profissionais para pequenos negócios. HTML, CSS e JavaScript puros, sem frameworks nem dependências de build.

## Como executar

Basta abrir `index.html` no navegador. Para testar com um servidor local:

```bash
python -m http.server 8080
```

Depois acesse `http://localhost:8080`.

## Estrutura

```
index.html                 Página completa (10 seções + botão flutuante)
site.webmanifest           Manifesto do PWA (ícones)
favicon.ico                Favicon multi-resolução (16–64 px)
assets/
  css/styles.css           Estilos (mobile-first; tokens em :root)
  js/config.js             ÚNICO lugar para configurar o contato (WhatsApp, telefone, mensagens)
  js/main.js               Menu mobile, FAQ acessível, botões de WhatsApp, revelação ao rolar
  img/                     Logo (versões preta e branca), ícones, imagem Open Graph
  fonts/                   Sora e Inter (latin, variável), hospedadas localmente
```

## Pendências antes da publicação

Nada abaixo foi inventado. Cada item precisa de uma informação real.

1. **Link do WhatsApp** — em `assets/js/config.js`, `whatsappUrl` já aponta para o número `(19) 99518-6994` com a mensagem inicial "Olá! Gostaria de criar um site.". Todos os botões de contato usam esse link. O parâmetro `utm_source=chatgpt.com` veio no link informado e pode ser removido.
   - Se `whatsappUrl` ficar vazio, a página monta o link a partir de `whatsappNumber` (código do país + DDD + número, somente dígitos). Se os dois estiverem vazios, os botões exibem um aviso de "contato em configuração".
2. **Telefone para exibição (opcional)** — `phoneDisplay` em `config.js`. Se preenchido, aparece no rodapé como link `tel:`.
3. **Domínio definitivo** — em `index.html`, descomente e ajuste `<link rel="canonical">` e `og:url`, e troque `og:image` por uma URL absoluta.
4. **Redes sociais** — só adicionar links no rodapé se forem fornecidos (há um comentário `PENDENTE` no HTML).
5. **Política de privacidade** — adicionar o link no rodapé quando ela existir (comentário `PENDENTE`).
6. **Condições comerciais ainda não definidas** — o plano único (R$ 350 por projeto, domínio incluso por 1 ano, renovação cobrada à parte) já está na seção `#oferta` e no FAQ. Continuam sem valor na página, e remetem ao WhatsApp: prazo de entrega, número de revisões, alterações pós-publicação, valor da renovação do domínio e uso de domínio já existente do cliente. Se forem definidos, atualize o FAQ.

## Exemplos demonstrativos

Os três conceitos (Vértice Auto Estética, Ateliê Lumi e Speak Up) e a ilustração do hero são **demonstrações fictícias**, identificadas como tal na página. Não são clientes nem trabalhos publicados. Não há depoimentos, estatísticas ou logotipos de clientes.

## Acessibilidade e desempenho

- HTML semântico, um único `h1`, hierarquia de títulos, link de pular para o conteúdo.
- Menu mobile e FAQ com teclado (Esc, setas, Home/End) e `aria-expanded`/`aria-controls`.
- `prefers-reduced-motion` desativa transições e revelações.
- Fontes e imagens locais, sem CDNs externos. Imagens do logo em WebP com PNG de apoio.
