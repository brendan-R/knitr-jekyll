# Nossos Vereadores

## Dependências
### Backend

R (>3.3):

```
# Necessário em máquinas ubuntu para instalar o R > 3.3
echo 'deb http://cran.rstudio.com/bin/linux/ubuntu trusty/' | sudo tee /etc/apt/sources.list.d/vereadores.list
sudo apt-key adv --keyserver keyserver.ubuntu.com --recv-keys E084DAB9

sudo apt-get -y update
sudo apt-get -y install r-base

# necessários para alguns dos pacotes que instalaremos
sudo apt-get -y install libcurl4-openssl-dev
sudo apt-get -y install libpq-dev
```

Todos os pacotes de R serão instalados assim que você abrir a primeira sessão R (o 'packrat' vai cuidar de tudo :)

### Frontend

> bundle install

Servir via *RStudio*

> brocks::blog_serve()

Servir via *Linha de Comando*

> Rscript -e 'brocks::blog_serve()'
