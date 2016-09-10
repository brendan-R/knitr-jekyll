#!/usr/bin/env Rscript
# Usage: ./install_R_packages.R
# Thanks to [@marcuswac](https://github.com/marcuswac)

# Update list of dependencies
system("./r_deps_update_list.sh")
r_deps <- read.table("r_deps.txt")[,1]
file.remove("r_deps.txt")

lib_dir <- Sys.getenv("R_LIBS_USER")
dir.create(lib_dir, showWarnings = T, recursive = T)

install.packages(r_deps,
                 lib = lib_dir, repos = "https://cloud.r-project.org/")

