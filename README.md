# Event Duotage — Génération Miracle

Copie du site du tournoi Solotage, adaptée au nouvel événement Duotage sur Ombre.

## Lancer localement

```bash
npm install
npm run dev
```

## Déployer sur GitHub Pages

Le `base` de `vite.config.ts` est prévu pour un dépôt nommé `dofus-event-duotage-generation-miracle`.

```bash
npm run build
npm run deploy
```

Ou active GitHub Pages avec GitHub Actions selon ta configuration.

## Mettre à jour le classement

Les équipes sont dans `src/data/participants.json`. Format :

```json
{
  "id": "team-1",
  "displayName": "Nom de team",
  "members": [
    {"pseudo": "Joueur1", "class": "Cra"},
    {"pseudo": "Joueur2", "class": "Panda"}
  ],
  "progressStepId": "reine-nyee",
  "status": "alive",
  "deathStepId": null,
  "dungeonStats": [],
  "lastUpdate": "2026-10-05T19:00:00+02:00"
}
```

Pour un duocompte, mets un seul membre dans `members`.
