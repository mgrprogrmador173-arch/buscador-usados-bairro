---
name: used-deals-nearby
description: buscar anúncios de usados perto da localização atual do usuário, usando gps/localização do celular quando essa informação estiver disponível no ambiente, e pesquisar em marketplaces e classificados como facebook marketplace, olx e mercado livre. use quando o usuário quiser encontrar ofertas próximas, comparar anúncios por raio em quilômetros, aplicar filtros padrão de preço e categoria, e receber uma lista de links com um resumo das melhores ofertas.
---

# Objetivo

Encontrar anúncios de produtos usados próximos à localização atual do usuário, com suporte a:
- localização atual como referência principal
- escolha de raio em quilômetros
- filtros padrão
- pesquisa em múltiplas fontes
- saída em lista de links e resumo consolidado

# Comportamento principal

1. Identificar a localização atual do usuário.
   - Priorizar a localização do dispositivo quando o ambiente fornecer essa informação.
   - Se o ambiente não fornecer GPS/localização em tempo real, informar isso claramente e pedir uma referência manual de bairro, CEP, cidade ou endereço aproximado.
   - Nunca inventar coordenadas.

2. Coletar os parâmetros de busca.
   - Palavra-chave do produto ou categoria
   - Raio em quilômetros
   - Faixa de preço mínima e máxima
   - Condição opcional, quando aplicável
   - Ordenação opcional, quando aplicável

3. Consultar as fontes suportadas.
   - Tentar Facebook Marketplace, OLX e Mercado Livre.
   - Se alguma fonte não puder ser acessada no ambiente atual, informar a limitação e continuar com as demais.
   - Não alegar cobertura completa quando a fonte exigir login, bloqueio anti-bot, geolocalização proprietária ou navegação não suportada.

4. Normalizar resultados.
   Para cada anúncio encontrado, extrair quando possível:
   - título
   - preço
   - distância estimada ou referência de localização
   - plataforma
   - link
   - resumo curto do anúncio
   - sinais de qualidade, como estado, urgência, duplicidade, ausência de preço ou descrição pobre

5. Filtrar e priorizar.
   Aplicar filtros padrão, salvo se o usuário pedir outros:
   - excluir anúncios sem preço, quando isso fizer sentido
   - priorizar anúncios dentro do raio definido
   - remover resultados claramente duplicados
   - priorizar ofertas com descrição suficiente e preço competitivo

6. Entregar o resultado.
   Responder com:
   - lista de links organizada por plataforma
   - breve resumo abaixo destacando melhores oportunidades, faixas de preço e observações relevantes

# Filtros padrão

Use estes filtros por padrão, a menos que o usuário peça algo diferente:
- raio: solicitar ao usuário ou usar o valor que ele fornecer
- ordenar por relevância ou menor preço, conforme disponível
- excluir itens sem preço quando a plataforma permitir
- priorizar anúncios com localização explícita
- categoria baseada na palavra-chave pedida
- faixa de preço opcional, se o usuário não informar não inventar limites

# Formato de saída

## Resultados
1. [Título do anúncio](URL) — Plataforma — Preço — Localização/Distância
2. [Título do anúncio](URL) — Plataforma — Preço — Localização/Distância

## Resumo
- Melhor oferta aparente:
- Faixa de preços encontrada:
- Plataformas com mais resultados:
- Observações: anúncios duplicados, preços fora da curva, localização incerta, limitação de acesso em alguma fonte

# Regras de honestidade

- Deixar explícito quando a localização em tempo real não estiver acessível.
- Deixar explícito quando uma plataforma não puder ser consultada por restrições do ambiente.
- Não prometer monitoramento contínuo, rastreamento automático em segundo plano ou scraping não suportado.
- Não afirmar que usou GPS real sem essa informação ter sido realmente fornecida pelo ambiente.
- Não afirmar que pesquisou no Facebook Marketplace se o ambiente não permitiu acesso.

# Estratégia recomendada

Ao executar este fluxo:
- primeiro obter localização
- depois confirmar raio e termo de busca se faltarem
- em seguida pesquisar as fontes acessíveis
- por fim consolidar e resumir os anúncios encontrados

# Exemplo de uso

Usuário:
"Procure bicicleta usada num raio de 5 km de onde eu estou."

Resposta esperada:
- usar localização atual se disponível
- buscar nas fontes acessíveis
- devolver links
- resumir melhores ofertas e faixa de preço

# Limitações esperadas

Facebook Marketplace pode exigir login, interface dinâmica ou restrições de acesso não disponíveis no ambiente.
OLX e Mercado Livre podem ter cobertura e filtros geográficos diferentes conforme região e interface disponível.
Quando a limitação impedir busca confiável, informar claramente e prosseguir com o que for possível.
