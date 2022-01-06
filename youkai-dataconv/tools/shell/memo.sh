#!/bin/bash

# 3-14文字以内に絞る
cat target.txt \
  | awk '{if(length($0) <= 14) print $0 }' \
  | awk '{if(length($0) >= 3) print $0 }' \
> result.txt

# 2文字以下を削除
grep -v '^..$' target.txt > result.txt

# UpperCase
cat ./target.txt | tr '[a-z]' '[A-Z]' > ./result.txt

# 英語のフィルタに使ったもの
grep -v '^[0-1A-Z\.\-\!]*$' -n ./target.txt | wc -l
cat ./target.txt 
  | sed "s/'//g" \
  | sed 's/&//g' \
  | sed 's/\///g' \
  | sed 's/\[//g' \
  | sed 's/\]//g' \
  | sed 's/ï/I/g' \
  | sed 's/é/E/g' \
  | sed 's/ë/E/g' \
  | sed 's/è/E/g' \
  | sed 's/ê/E/g' \
  | sed 's/â/A/g' \
  | sed 's/à/A/g' \
  | sed 's/ç/C/g' \
  | sed 's/ñ/N/g' \
  | sed 's/ô/O/g' \
  | sed 's/￡/L/g' \
  | sed 's/î/I/g' \
  | sed 's/(/\n/g' \
  | sed 's/)/\n/g' \
  | sed 's/ /./g' \
  | sed 's/ñ/N/g' \
> ./result.txt
