// =====================================================
// Lucas & Guilherme — Página de Presentes
// =====================================================

(function () {

  // ---------- CONFIGURAÇÃO DOS PRESENTES ----------
  // Para cada item, gere DOIS links no Mercado Pago:
  //   - pix:  link PIX direto (à vista)
  //   - card: link de cartão de crédito (com parcelamento)
  // Enquanto o link estiver '#', o botão funciona (dispara o envio da mensagem)
  // mas não navega para lugar nenhum — útil para testar a integração com o Sheets
  // antes de ter os links do MP prontos.
  const GIFTS = {
    cafe:          { name: 'Café da manhã em Cala Brandinchi',            price: 120,
                     pix: '#', card: '#',
                     pixQR: 'imgs/qr_code/cafe_manha.jpeg',
                     pixCode: '00020126550014BR.GOV.BCB.PIX0111415715908030218Presente casamento5204000053039865406120.005802BR5925LUCAS PEREIRA GARCIA DUAR6009SAO PAULO622605225V80QfAJYeu76K4Zv3a6BQ63046414' },
    aperitivo:     { name: 'Aperitivo ao pôr do sol em Ortigia',          price: 180,
                     pix: '#', card: '#' ,
                    pixQR: 'imgs/qr_code/aperitivo_Ortigia.jpeg',
                    pixCode: '00020126550014BR.GOV.BCB.PIX0111415715908030218Presente casamento5204000053039865406180.005802BR5925LUCAS PEREIRA GARCIA DUAR6009SAO PAULO622605224qL3xPqt0E4X7fDhsLP0Vx6304BCC6' },
    vinhos:        { name: 'Vinhos do Etna',                              price: 220,
                     pix: '#', card: '#',
                     pixQR: 'imgs/qr_code/vinhos_etna.jpeg',
                     pixCode: '00020126550014BR.GOV.BCB.PIX0111415715908030218Presente casamento5204000053039865406220.005802BR5925LUCAS PEREIRA GARCIA DUAR6009SAO PAULO622605224Y5FZrNlXRcWPYqVlTxa7B6304101C' },
    vinicola:      { name: 'Passeio pelas vinícolas do Monte Etna',       price: 280,
                     pix: '#', card: '#',
                     pixQR: 'imgs/qr_code/vinicola_etna.jpeg',
                     pixCode: '00020126550014BR.GOV.BCB.PIX0111415715908030218Presente casamento5204000053039865406280.005802BR5925LUCAS PEREIRA GARCIA DUAR6009SAO PAULO622605225VdE1Z4XDudx2QVb6CjqoG630456B6' },
    jantar:        { name: 'Jantar especial em Taormina',                 price: 350,
                     pix: '#', card: '#',
                     pixQR: 'imgs/qr_code/jantar_Taormina.jpeg',
                     pixCode: '00020126550014BR.GOV.BCB.PIX0111415715908030218Presente casamento5204000053039865406350.005802BR5925LUCAS PEREIRA GARCIA DUAR6009SAO PAULO622605226MQAxEiiAoxHmclDUejNWU63044C31' },
    massagem:      { name: 'Massagem relaxante com vista para o mar',     price: 450,
                     pix: '#', card: '#',
                     pixQR: 'imgs/qr_code/massagem_vista_mar.jpeg',
                     pixCode: '00020126550014BR.GOV.BCB.PIX0111415715908030218Presente casamento5204000053039865406450.005802BR5925LUCAS PEREIRA GARCIA DUAR6009SAO PAULO622605221FwlZO5xfb3IR3QgN31oxU6304727B' },
    'tour-gastro': { name: 'Tour gastronômico pela Sicília',              price: 550,
                     pix: '#', card: '#',
                     pixQR: 'imgs/qr_code/tour_gastronomico.jpeg',
                     pixCode: '00020126550014BR.GOV.BCB.PIX0111415715908030218Presente casamento5204000053039865406550.005802BR5925LUCAS PEREIRA GARCIA DUAR6009SAO PAULO622605224IRo4EtWAZ26rBZ5IGW1fx6304426C' },
    barco:         { name: 'Passeio de barco pelas águas da Sicília',     price: 700,
                     pix: '#', card: '#',
                     pixQR: 'imgs/qr_code/passeio_barco.jpeg',
                     pixCode: '00020126550014BR.GOV.BCB.PIX0111415715908030218Presente casamento5204000053039865406700.005802BR5925LUCAS PEREIRA GARCIA DUAR6009SAO PAULO622605226mjj85YgmjQAIcXJ5nBnow630465DF' },
    diaria:        { name: 'Diária em hotel boutique siciliano',         price: 850,
                     pix: '#', card: '#',
                     pixQR: 'imgs/qr_code/hotel_boutique.jpeg',
                     pixCode: '00020126550014BR.GOV.BCB.PIX0111415715908030218Presente casamento5204000053039865406850.005802BR5925LUCAS PEREIRA GARCIA DUAR6009SAO PAULO622605222ohLzQDXQKc6BEluPCJA0d630495F2' },
    'gastro-memo': { name: 'Experiência gastronômica memorável',          price: 1200,
                     pix: '#', card: '#',
                     pixQR: 'imgs/qr_code/experiencia_gastronomica.jpeg',
                     pixCode: '00020126550014BR.GOV.BCB.PIX0111415715908030218Presente casamento52040000530398654071200.005802BR5925LUCAS PEREIRA GARCIA DUAR6009SAO PAULO622605227Ojw6eANzxxlJr86pznFXP6304C803' },
    refugio:       { name: 'Refúgio à beira-mar na lua de mel',           price: 2000,
                     pix: '#', card: '#',
                     pixQR: 'imgs/qr_code/refugio_beira_mar.jpeg',
                     pixCode: '00020126550014BR.GOV.BCB.PIX0111415715908030218Presente casamento52040000530398654072000.005802BR5925LUCAS PEREIRA GARCIA DUAR6009SAO PAULO622605225EKPJPYDRzhhUFBFwZNTCf6304136B' },
    livre:         { name: 'Contribuir com outro valor',                  price: null,
                     pix: '#', card: '#',
                     pixQR: 'imgs/qr_code/valor_livre.jpeg',
                     pixCode: '00020126550014BR.GOV.BCB.PIX0111415715908030218Presente casamento5204000053039865802BR5925LUCAS PEREIRA GARCIA DUAR6009SAO PAULO622605226AKfaN24MvlHshl5spLkrI630440B3' },
  };

  // ---------- HOOK DE ENVIO DA MENSAGEM ----------
  // Quando tiver o Google Sheets pronto, troque MESSAGE_ENDPOINT pela URL do
  // Apps Script Web App (algo como https://script.google.com/macros/s/.../exec).
  // O payload já vai no formato esperado: {gift, valor, nome, mensagem, metodo, ts}.
  const MESSAGE_ENDPOINT = 'https://script.google.com/macros/s/AKfycbx5gGL-EFeBmNiKNeBek0AJgfMPGxoH4hO4Vi-LnSEStlxysfnVDu3TmORTCg1iaGNvrg/exec'; // ex.: 'https://script.google.com/macros/s/AKfycb.../exec'

  function sendMessage(payload) {
    if (!MESSAGE_ENDPOINT) return; // ainda não configurado — segue o fluxo normalmente
    try {
      // no-cors + keepalive: dispara sem bloquear a navegação para o MP
      fetch(MESSAGE_ENDPOINT, {
        method: 'POST',
        mode: 'no-cors',
        keepalive: true,
        headers: { 'Content-Type': 'text/plain;charset=utf-8' },
        body: JSON.stringify(payload),
      });
    } catch (_) { /* silencioso: não atrapalha o pagamento */ }
  }

  // ---------- Elementos do modal ----------
  const backdrop   = document.getElementById('modal-backdrop');
  const modal      = document.getElementById('modal-gift');
  const titleEl    = document.getElementById('modal-gift-title');
  const priceEl    = document.getElementById('modal-gift-price');
  const amountBlock= document.getElementById('modal-gift-amount');
  const amountInput= document.getElementById('gift-amount-input');
  const nameInput  = document.getElementById('gift-name-input');
  const msgInput   = document.getElementById('gift-message-input');
  const hintEl     = document.getElementById('gift-modal-hint');
  const nameCount  = document.getElementById('gift-name-count');
  const msgCount   = document.getElementById('gift-message-count');
  const pixBtn     = document.getElementById('gift-pay-pix');
  const cardBtn    = document.getElementById('gift-pay-card');
  const cardSub    = document.getElementById('gift-card-sub');
  const formScreen = document.getElementById('gift-form-screen');
  const pixPanel   = document.getElementById('gift-pix-panel');
  const pixGiftEl  = document.getElementById('gift-pix-gift');
  const pixQRImg   = document.getElementById('gift-pix-qr');
  const pixCodeEl  = document.getElementById('gift-pix-code');
  const pixCopyBtn = document.getElementById('gift-pix-copy');
  const pixBackBtn = document.getElementById('gift-pix-back');

  const NAME_MAX = 100;
  const MSG_MAX  = 2000;

  function hidePixPanel() {
    pixPanel.hidden = true;
    formScreen.hidden = false;
    pixCopyBtn.textContent = 'Copiar código';
    pixCopyBtn.classList.remove('is-copied');
  }

  function showPixPanel() {
    if (!currentGift || !currentGift.pixCode) {
      hintEl.textContent = 'O PIX deste presente ainda está sendo preparado. Use o cartão ou tente novamente em breve.';
      return;
    }
    const valor = getValor();
    if (currentGift.price === null) {
      // PIX sem valor fixo: a pessoa digita o valor no app ao pagar
      pixGiftEl.textContent = currentGift.name + ' · informe o valor ao pagar';
    } else {
      pixGiftEl.textContent = currentGift.name + ' · R$ ' + valor.toLocaleString('pt-BR');
    }
    pixQRImg.src = currentGift.pixQR || '';
    pixQRImg.style.display = currentGift.pixQR ? '' : 'none';
    pixCodeEl.textContent = currentGift.pixCode;
    formScreen.hidden = true;
    pixPanel.hidden = false;
    pixPanel.parentElement.scrollTop = 0;
  }

  function updateCounts() {
    nameCount.textContent = nameInput.value.length + '/' + NAME_MAX;
    msgCount.textContent  = msgInput.value.length + '/' + MSG_MAX;
  }

  let lastFocused = null;
  let currentGift = null;
  let currentGiftId = null;

  function setEnabled(btn, url, enabled) {
    if (enabled) {
      if (url && url !== '#') {
        btn.href = url;
      } else {
        btn.removeAttribute('href');
      }
      btn.removeAttribute('aria-disabled');
    } else {
      btn.removeAttribute('href');
      btn.setAttribute('aria-disabled', 'true');
    }
  }

  function getValor() {
    if (!currentGift) return 0;
    if (currentGift.price !== null) return currentGift.price;
    const v = parseFloat(amountInput.value);
    return isNaN(v) ? 0 : v;
  }

  function refreshButtons() {
    const nome = nameInput.value.trim();
    const liberado = nome.length > 0;
    const cardReady = !!currentGift.card && currentGift.card !== '#';

    setEnabled(pixBtn,  currentGift.pix,  liberado);
    setEnabled(cardBtn, currentGift.card, liberado && cardReady);
    cardSub.textContent = cardReady ? 'parcelado em até 12x' : 'em breve';

    if (!nome) {
      hintEl.textContent = 'Preencha seu nome para liberar os botões de pagamento.';
    } else if (currentGift.price === null) {
      hintEl.textContent = 'O valor é livre: você escolhe a quantia na hora de pagar.';
    } else {
      hintEl.textContent = 'Escolha a opção de pagamento e sua mensagem será enviada para nós.';
    }
  }

  function openModal(giftId) {
    const gift = GIFTS[giftId];
    if (!gift) return;

    currentGift = gift;
    currentGiftId = giftId;
    lastFocused = document.activeElement;

    titleEl.textContent = gift.name;

    amountBlock.hidden = true;
    priceEl.hidden = false;
    if (gift.price === null) {
      priceEl.textContent = 'Valor livre';
    } else {
      priceEl.textContent = 'R$ ' + gift.price.toLocaleString('pt-BR');
    }

    nameInput.value = '';
    msgInput.value = '';
    updateCounts();
    refreshButtons();
    hidePixPanel();

    backdrop.hidden = false;
    modal.hidden = false;
    void backdrop.offsetWidth;
    backdrop.classList.add('is-open');
    modal.classList.add('is-open');
    document.body.classList.add('modal-open');

    setTimeout(() => nameInput.focus(), 200);
  }

  function closeModal() {
    modal.classList.remove('is-open');
    backdrop.classList.remove('is-open');
    document.body.classList.remove('modal-open');
    setTimeout(() => {
      modal.hidden = true;
      backdrop.hidden = true;
    }, 320);
    if (lastFocused && typeof lastFocused.focus === 'function') {
      lastFocused.focus();
    }
  }

  function handlePayClick(metodo, e) {
    if (!currentGift) return;
    const btn = metodo === 'pix' ? pixBtn : cardBtn;
    if (btn.getAttribute('aria-disabled') === 'true') {
      e.preventDefault();
      return;
    }
    sendMessage({
      gift: currentGiftId,
      gift_nome: currentGift.name,
      valor: currentGift.price === null ? '' : currentGift.price,
      nome: nameInput.value.trim(),
      mensagem: msgInput.value.trim(),
      metodo: metodo,
      ts: new Date().toISOString(),
    });

    // PIX nao navega: abre o painel com QR + copia e cola
    if (metodo === 'pix') {
      e.preventDefault();
      showPixPanel();
    }
  }

  // ---------- Eventos ----------
  document.querySelectorAll('.gift-card').forEach((card) => {
    card.addEventListener('click', () => {
      const giftId = card.getAttribute('data-gift');
      openModal(giftId);
    });
  });

  nameInput.addEventListener('input', () => { updateCounts(); refreshButtons(); });
  msgInput.addEventListener('input', updateCounts);
  amountInput.addEventListener('input', refreshButtons);

  pixBtn.addEventListener('click', (e) => handlePayClick('pix', e));
  cardBtn.addEventListener('click', (e) => handlePayClick('card', e));

  pixBackBtn.addEventListener('click', hidePixPanel);

  pixCopyBtn.addEventListener('click', () => {
    const code = pixCodeEl.textContent;
    const done = () => {
      pixCopyBtn.textContent = 'Código copiado!';
      pixCopyBtn.classList.add('is-copied');
    };
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(code).then(done).catch(() => fallbackCopy(code, done));
    } else {
      fallbackCopy(code, done);
    }
  });

  function fallbackCopy(text, done) {
    const ta = document.createElement('textarea');
    ta.value = text;
    ta.setAttribute('readonly', '');
    ta.style.position = 'absolute';
    ta.style.left = '-9999px';
    document.body.appendChild(ta);
    ta.select();
    try { document.execCommand('copy'); done(); } catch (_) { /* silencioso */ }
    document.body.removeChild(ta);
  }

  backdrop.addEventListener('click', closeModal);
  modal.addEventListener('click', (e) => {
    if (e.target === modal) closeModal();
  });
  const closeBtn = modal.querySelector('.modal-close');
  if (closeBtn) closeBtn.addEventListener('click', closeModal);

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && document.body.classList.contains('modal-open')) {
      closeModal();
    }
  });

})();
