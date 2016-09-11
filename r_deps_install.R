#!/usr/bin/env Rscript
# Usage: ./r_deps_install.R
# Thanks to [@marcuswac](https://github.com/marcuswac)

# Update list of dependencies
system("./r_deps_update_list.sh")
r_deps <- as.character(read.table("r_deps.txt")[,1])
file.remove("r_deps.txt")

# Add devtools (for brocks package)
r_deps <- c(r_deps, "devtools")

# Get/Define the R_LIBS_USER
lib_dir <- Sys.getenv("R_LIBS_USER")
dir.create(lib_dir, showWarnings = T, recursive = T)

# Installs only the not installed dependencies
installed_packs = unique(as.character(as.data.frame(installed.packages())$Package))
new_packs = setdiff(r_deps, installed_packs)
if (NROW(new_packs) > 0)
  install.packages(new_packs, lib = lib_dir, repos = "https://cloud.r-project.org/")

# Install brocks from Github
if (!"brocks" %in% installed_packs)
  devtools::install_github("brendan-r/brocks")

cat("DONE")
