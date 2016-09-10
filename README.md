# Nossos Vereadores

## Dependências
### Backend

R (>3.3):

```
# Necessário em máquinas ubuntu para instalar o R > 3.3
echo 'deb http://cran.rstudio.com/bin/linux/ubuntu trusty/' | sudo tee /etc/apt/sources.list.d/diferentonas.list
sudo apt-key adv --keyserver keyserver.ubuntu.com --recv-keys E084DAB9

sudo apt-get -y update
sudo apt-get -y install r-base

# necessários para alguns dos pacotes que instalaremos
sudo apt-get -y install libcurl4-openssl-dev
sudo apt-get -y install libpq-dev
```

Instalar pacotes que usamos:

> ./r_deps_install.R

### Frontend

> bundle install

Servir via *RStudio*

> brocks::blog_serve()

Servir via *Linha de Comando*

> Rscript -e 'brocks::blog_serve()'
