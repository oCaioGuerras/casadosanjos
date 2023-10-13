# Aplicativo Casa Dos Anjos

## Requisitos
- [Node.js](https://nodejs.org/en/)
- [Yarn](https://yarnpkg.com/pt-BR/docs/install)
- [Android Studio](https://developer.android.com/studio)
- Java JDK >= 11

## Recomendações
Siga o guia do [React Native](https://reactnative.dev/docs/environment-setup) para configurar o seu ambiente de desenvolvimento.

## Instalação
1 - Clone o repositório e instale as dependências:
```bash
git clone git@github.com:misterioso013/AppCasaDosAnjos.git
cd AppCasaDosAnjos
yarn
```

2 - Abra `android/.gradle/gradle.properties` e adicione as seguintes linhas:
```properties
MYAPP_UPLOAD_STORE_FILE=casadosanjos.keystore
MYAPP_UPLOAD_KEY_ALIAS=my-key-alias
MYAPP_UPLOAD_STORE_PASSWORD=****8****
MYAPP_UPLOAD_KEY_PASSWORD=****8****
```
> **Nota:** Substitua os asteriscos pelos valores corretos.

3 - Copie o arquivo `casadosanjos.keystore` para `android/app/`.
4 - Copie o arquivo `google-services.json` para `android/app/`.

5 - Copie o arquivo `.env.example` para `.env` e adicione as seguintes linhas:
```properties
API_URL="********"
ONE_SIGNAL_APP_ID="********"
FIREBASE_DATABASE_URL="********"
```

> **Observação:** Os arquivos `casadosanjos.keystore` e `google-services.json` estão disponíveis no Google Drive do projeto.

## Execução
Para executar o aplicativo no emulador ou no dispositivo físico, execute:
```bash
yarn android
```