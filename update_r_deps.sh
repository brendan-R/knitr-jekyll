grep -h library _source/*/*R* | awk -F[\(,\)] '{print $2}' | sort -u > r_dependencies.txt
