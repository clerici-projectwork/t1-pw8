# Come eseguire l'applicazione
Per avviare la dashboard, bisogna eseguire sia servere che frontend. Prima di fare questo,
il progetto `common` deve essere buildato.

## Buildare il progetto `common`
1. Apri un terminale e il browser dalla cartella principale
2. Lancia `pnpm install`
3. Nel terminal, naviga dentro `/common`
4. Esegui `pnpm install`
5. Esegui `pnpm build`

## Eseguire il progetto 'server'

1. Vai nella cartella `/server` e crea un file `.env` utilizzando `.env.sample` come modello
2. Inserisci la stringa per la variabile d’ambiente `FREE_CURRENCY_API_KEY`
3. Apri un terminale e spostati nella cartella `/server`
4. Esegui `pnpm install` install
5. Esegui `pnpm dev`


## Eseguire il frontend
1. Apri un terminale e spostati nella cartella `/dashboard`
2.Esegui `pnpm install`
3. Esegui `pnpm dev`
4. Apri un browser e vai su `http://localhost:5173`
