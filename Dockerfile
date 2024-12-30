# Usar a imagem oficial do Node.js como base
FROM node:18

# Diretório de trabalho no container
WORKDIR /app

# Copiar os arquivos do projeto para o container
COPY . /app

# Instalar o curl (necessário para o healthcheck)
RUN apt-get update && apt-get install -y curl

# Instalar as dependências
RUN npm install

# Expor a porta que a aplicação vai rodar
EXPOSE 3000

# Comando para rodar a aplicação
CMD ["node", "server.js"]
