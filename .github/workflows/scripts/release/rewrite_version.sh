#!/usr/bin/env bash

#
# ビルド前に「自身アプリケーションのバージョンを書き換える」スクリプト。
#
# 引数
# 1. バージョンの文字列
#
# 前提
# - このリポジトリのトップディレクトリから実行される
#

version=${1}

trimmed=$(echo ${version} | sed 's/^ *\| *$//')
if [ -z "${trimmed}" ]; then
  echo "引数のバージョンが空文字です。指定してください。"
  exit 1
fi
version=${trimmed}

general_setting_path='./build.gradle'
sed "s/version .*/version '${version}'/g" ${general_setting_path} > ${general_setting_path}.tmp
mv ${general_setting_path}.tmp ${general_setting_path}

front_setting_path='./youkai-front/package.json'
sed "s/version.*/version\": \"${version}\",/g" ${front_setting_path} > ${front_setting_path}.tmp
mv ${front_setting_path}.tmp ${front_setting_path}
