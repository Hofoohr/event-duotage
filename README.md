# Event Duotage — Génération Miracle

Copie du site du tournoi Solotage, adaptée au nouvel événement Duotage sur Ombre.

## Lancer localement

```bash
npm install
npm run dev
```

## Déploiement

Le site est déployé automatiquement sur GitHub Pages par le workflow `.github/workflows/deploy.yml` à chaque push sur `main`.
Le `base` de `vite.config.ts` (`/event-duotage/`) doit correspondre au nom du dépôt.

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

## Règles de calcul

- Le classement suit la progression : `progressStepId` est le combat **en cours** (ou celui où l'équipe est morte). Les combats validés sont donc ceux qui le précèdent.
- Deux équipes au même combat sont à égalité (même rang), une équipe en vie passant devant une équipe morte.
- Les paliers de cotes (basse < 15, moyenne < 35, élevée) sont calculés à partir de `totalPot / amount` dans `src/data/bets.json`.
- Les listes de combats de la page Règles viennent de `src/data/dungeons.json`.
