# Buscador de Usados por Bairro - App Web

App web estático para usar a geolocalização do navegador e abrir buscas prontas em Facebook Marketplace, OLX e Mercado Livre.

## O que ele faz
- usa o GPS do navegador quando permitido
- aceita bairro/cidade manualmente
- permite escolher raio em km
- aceita preço mínimo e máximo
- gera links de busca para as plataformas
- mostra um resumo da consulta

## Como executar
Basta abrir `index.html` no navegador.

Para melhor funcionamento com geolocalização, sirva a pasta com um servidor local simples:

### Python
```bash
python -m http.server 8000
```

Depois abra:

```text
http://localhost:8000
```

## Limitações
- não faz scraping automático
- Facebook Marketplace pode exigir login
- filtros geográficos reais dependem do site de destino
- algumas plataformas podem exigir ajuste manual após abrir o link
