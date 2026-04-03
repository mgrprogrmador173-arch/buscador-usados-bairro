const state = {
  coords: null,
  accuracy: null,
  mapLink: null,
};

const queryEl = document.getElementById('query');
const radiusEl = document.getElementById('radius');
const minPriceEl = document.getElementById('minPrice');
const maxPriceEl = document.getElementById('maxPrice');
const manualLocationEl = document.getElementById('manualLocation');
const qualityFilterEl = document.getElementById('qualityFilter');
const statusEl = document.getElementById('status');
const resultsEl = document.getElementById('results');
const summaryEl = document.getElementById('summary');
const locationBoxEl = document.getElementById('locationBox');

document.getElementById('locateBtn').addEventListener('click', requestLocation);
document.getElementById('searchBtn').addEventListener('click', renderSearches);

function setStatus(message) {
  statusEl.textContent = message;
}

function requestLocation() {
  if (!navigator.geolocation) {
    setStatus('Seu navegador não suporta geolocalização. Use bairro ou cidade manualmente.');
    return;
  }

  setStatus('Solicitando sua localização...');
  navigator.geolocation.getCurrentPosition(
    (position) => {
      const { latitude, longitude, accuracy } = position.coords;
      state.coords = { latitude, longitude };
      state.accuracy = accuracy;
      state.mapLink = `https://www.google.com/maps?q=${latitude},${longitude}`;
      locationBoxEl.classList.remove('hidden');
      locationBoxEl.innerHTML = `Localização obtida: <strong>${latitude.toFixed(5)}, ${longitude.toFixed(5)}</strong><br>Precisão aproximada: ${Math.round(accuracy)} m<br><a href="${state.mapLink}" target="_blank" rel="noopener noreferrer">Ver no mapa</a>`;
      setStatus('Localização pronta. Agora gere as buscas.');
    },
    (error) => {
      const messages = {
        1: 'Permissão negada. Use bairro ou cidade manualmente.',
        2: 'Não foi possível obter sua localização.',
        3: 'Tempo esgotado ao obter sua localização.',
      };
      setStatus(messages[error.code] || 'Falha ao obter sua localização.');
    },
    { enableHighAccuracy: true, timeout: 10000, maximumAge: 300000 }
  );
}

function buildSearchConfig({ query, radius, minPrice, maxPrice, locationText, quality }) {
  const encodedQuery = encodeURIComponent(query.trim());
  const encodedLocation = encodeURIComponent(locationText.trim());
  const priceText = [minPrice ? `min R$${minPrice}` : '', maxPrice ? `max R$${maxPrice}` : ''].filter(Boolean).join(' ');
  const hintText = `${locationText ? locationText + ' ' : ''}${radius}km ${priceText}`.trim();
  const qualityText = quality === 'best' ? 'melhor custo benefício' : quality === 'priced' ? 'com preço' : 'todos';

  return [
    {
      name: 'Facebook Marketplace',
      summary: 'Abre uma busca pronta. O Facebook pode exigir login para mostrar resultados completos.',
      url: `https://www.facebook.com/marketplace/search/?query=${encodedQuery}`,
      hint: `Termo: ${query} | Região: ${locationText || 'pela sua localização'} | Raio: ${radius} km | Filtro: ${qualityText}`,
    },
    {
      name: 'OLX',
      summary: 'Busca geral em classificados. Pode exigir ajuste manual de região dentro do site.',
      url: `https://www.olx.com.br/brasil?q=${encodedQuery}%20${encodedLocation}`,
      hint: `Termo: ${query} ${hintText}`.trim(),
    },
    {
      name: 'Mercado Livre',
      summary: 'Busca com foco em anúncios e produtos. Filtros regionais variam por categoria.',
      url: `https://lista.mercadolivre.com.br/${encodedQuery}`,
      hint: `Termo: ${query} ${hintText}`.trim(),
    },
  ];
}

function renderSearches() {
  const query = queryEl.value.trim();
  const radius = Number(radiusEl.value || 5);
  const minPrice = minPriceEl.value.trim();
  const maxPrice = maxPriceEl.value.trim();
  const quality = qualityFilterEl.value;
  const manualLocation = manualLocationEl.value.trim();

  if (!query) {
    setStatus('Digite o que você quer procurar.');
    return;
  }

  const locationText = manualLocation || (state.coords ? `${state.coords.latitude.toFixed(5)}, ${state.coords.longitude.toFixed(5)}` : '');
  if (!locationText) {
    setStatus('Use sua localização ou informe bairro/cidade manualmente.');
    return;
  }

  const searches = buildSearchConfig({
    query,
    radius,
    minPrice,
    maxPrice,
    locationText,
    quality,
  });

  resultsEl.innerHTML = `<div class="result-list">${searches.map(item => `
    <div class="result-item">
      <div><a href="${item.url}" target="_blank" rel="noopener noreferrer">${item.name}</a></div>
      <p>${item.summary}</p>
      <small>${item.hint}</small>
    </div>
  `).join('')}</div>`;

  summaryEl.innerHTML = `
    <p><strong>Busca:</strong> ${escapeHtml(query)}</p>
    <p><strong>Área:</strong> ${escapeHtml(locationText)}</p>
    <p><strong>Raio:</strong> ${radius} km</p>
    <p><strong>Faixa de preço:</strong> ${minPrice || 'sem mínimo'} até ${maxPrice || 'sem máximo'}</p>
    <p><strong>Filtro padrão:</strong> ${escapeHtml(qualityLabel(quality))}</p>
    <p><strong>Observação:</strong> os links acima abrem as plataformas com a busca preparada. Algumas exigem ajuste manual de localização e login.</p>
  `;

  setStatus('Buscas geradas com sucesso.');
}

function qualityLabel(value) {
  if (value === 'priced') return 'Somente com preço';
  if (value === 'best') return 'Priorizar melhor custo-benefício';
  return 'Todos';
}

function escapeHtml(value) {
  return value
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#039;');
}
