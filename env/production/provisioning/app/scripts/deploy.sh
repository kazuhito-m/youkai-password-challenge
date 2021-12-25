#!/usr/bin/env bash

#
# サーバ内部から実行する「jarのデプロイ」スクリプト。
#
# ※やり方が定まっていないので、暫定にしたい。
#
# 引数
# 1. バージョンの文字列
#

version=${1}

trimmed=$(echo ${version} | sed 's/^ *\| *$//')
if [ -z "${trimmed}" ]; then
  echo "引数のバージョンが空文字です。指定してください。"
  exit 1
fi
version=${trimmed}


DEPLOY_JAR_NAME="youkai-server.jar"
DEPLOY_DIR_PATH="/var/opt/youkai-server"

jar_dl_url="https://github.com/kazuhito-m/youkai-password-challenge/releases/download/${version}/youkai-server-${version}.jar"

curl -L ${jar_dl_url} > /tmp/${DEPLOY_JAR_NAME}

if [ $? -ne 0 ]; then
  echo "デプロイ用のJarのダウンロードに失敗しました。"
  exit 1
fi

mv /tmp/${DEPLOY_JAR_NAME} "${DEPLOY_DIR_PATH}/${DEPLOY_JAR_NAME}"

# めちゃくちゃ乱暴だが、javaを膳殺しして、systemdで蘇ってくるのに期待する。
killall java

# イケてもダメでも成功。
exit 0