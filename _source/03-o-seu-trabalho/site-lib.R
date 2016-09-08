get_vereadores_para_ui = function(db) {
  vereadores = get_vereadores(db) %>%
    mutate(eleito = ifelse(grepl("^ELEITO", desc_sit_tot_turno),
                           "Eleito",
                           "Suplente"),
           sexo = descricao_sexo)

  simpleCap <- function(x) {
    s <- strsplit(x, " ")[[1]]
    paste(toupper(substring(s, 1, 1)),
          tolower(substring(s, 2)),
          sep = "",
          collapse = " ")
  }

  vereadores = vereadores %>%
    mutate_at(vars(matches("nome|desc|sexo")), function(x)
      sapply(x, simpleCap))

  return(vereadores)
}
