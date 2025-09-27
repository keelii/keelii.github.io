#!/bin/bash

for file in 20*/*/*/*/*.html; do
  # 提取 canonical 链接
  canonical=$(sed -n 's/.*rel="canonical" href="\([^"]*\)".*/\1/p' "$file")

  if [ -n "$canonical" ]; then
    echo "Processing $file, canonical = $canonical"

    # 生成 meta 标签
    meta="<meta http-equiv=\"refresh\" content=\"0; URL=$canonical\">"

    # 在包含 rel="canonical" 的那行之前插入 meta
    sed -i '' "/rel=\"canonical\"/i\\
$meta
" "$file"
  else
    echo "Skipping $file (no canonical link found)"
  fi
done
