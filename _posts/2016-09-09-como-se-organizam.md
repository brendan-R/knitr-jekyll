---
layout: post
title:  "Como se organizam?"
published: true
categories: [análise]
tags: [demograficos, representatividade]
---



Normalmente conhecidos como partidos políticos, eles existem para reunir debaixo de um mesmo nome pessoas com ideais similares. Exemplos de partidos com história em nosso país são o PT (Partido dos Trabalhadores) e o PSDB (Partido da Social Democracia do Brasil). No entanto, temos visto um crescimento sem limites do número de partidos no nosso país, e isso não é diferente em Campina. Na última eleição (em 2012) as 23 cadeiras da Câmara foram ocupadas por **12 partidos** diferentes:

![plot of chunk tamanho_partidos](/figure/source/05-como-se-organizam/2016-09-09-como-se-organizam/tamanho_partidos-1.png)

Além dos partidos o nosso código eleitoral permite a união de partidos em legendas, ou coligações, com o objetivo de unir partidos com ideias comuns mas, principalmente, para formatar o processo eleitoral. Que como todos sabem não é tão fácil de entender e explicar como o do prefeito. Em linhas gerais, cada legenda recebe a somatória de todos os votos de seus vereadores e com isso sabe quantas vagas terá na Câmara. Com isso a prioridade é dos vereadores mais votados da legenda.

Na última eleição distribuimos as 23 vagas de nossa Cãmara para **8 legendas** diferentes:

![plot of chunk tamanho_legendas](/figure/source/05-como-se-organizam/2016-09-09-como-se-organizam/tamanho_legendas-1.png)

<!-- ## Qual a diferença entre as legendas? -->

<!-- Para compreender porque os partidos se unem (ou não) precisamos entender suas ideologias e projetos de governo. Utilizando os dados que temos podemos ter uma visão inicial[^footnote_dados_ideais] comparando as temáticas mais importantes para cada legenda. -->

<!-- [^footnote_dados_ideais]: Para entendermos de fato as semelhanças e divergências de opinião dos partidos e legendas, precisaríamos ter em mãos as *votações de cada vereador a favor ou contra as proposições* durante o mandato. No entanto, não encontramos essa informação no site da [Cãmara](https://www.campinagrande.pb.leg.br/), nem em outro repositório público. -->

<!-- ```{r, results = 'asis', fig.asp=.7, fig.width=5.5} -->
<!-- legenda_theme_count = all_ementas_themes %>%  -->
<!--   count(nome_legenda, main_theme) -->

<!-- for (legenda in legenda_size$nome_legenda) { -->
<!--   cat("\n###", str_replace(legenda, "\\n", "\n####"), "\n\n") -->
<!--   theme_count = legenda_theme_count %>% filter(nome_legenda == legenda) -->
<!--   wordcloud(words = theme_count$main_theme, freq = theme_count$n, -->
<!--             scale = c(2.5,0.5), random.order = FALSE,  -->
<!--             use.r.layout = F, colors = brewer.pal(8, "Dark2"),  -->
<!--             rot.per = 0, fixed.asp = F) -->
<!--   cat("\n") -->
<!-- } -->
<!-- ``` -->
