# Referência de implementação

## Entrada mínima
- termo de busca ou categoria
- raio em km
- localização atual quando disponível

## Saída mínima
- lista de links
- plataforma
- preço
- localização quando disponível
- resumo consolidado

## Fontes pretendidas
- Facebook Marketplace
- OLX
- Mercado Livre

## Limitações
Nem todo ambiente fornece GPS do dispositivo nem acesso automatizado a todas as plataformas.
A skill deve degradar com honestidade:
- pedir bairro/CEP/cidade quando não houver localização
- informar fonte indisponível quando não houver acesso
- continuar com as fontes restantes
