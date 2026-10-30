@AGENTS.md


## Workflow Git (obligatoire)

Toute modification passe par une branche et une Pull Request. **Jamais de commit direct sur `main`.**

1. **Partir de `main` à jour** : `git switch main && git pull --ff-only`
2. **Créer une branche** `<type>/<description-courte>` en kebab-case.
   Types : `feat`, `fix`, `refactor`, `perf`, `test`, `docs`, `chore`, `ci`. Ex. : `feat/stripe-checkout`, `fix/login-redirect`.
3. **Commits atomiques** au format [Conventional Commits](https://www.conventionalcommits.org/) : `<type>(<scope>): <résumé à l'impératif>`
   Ex. : `feat(cart): add quantity selector`, `fix(auth): handle expired session`.
   Un commit = un changement logique. Interdits : `wip`, `update`, `fix stuff`, `.`.
4. **Vérifier avant de pousser** : lint, typecheck, tests et build passent en local.
5. **Pousser la branche** : `git push -u origin <branche>`
6. **Ouvrir la PR** : `gh pr create --base main` — titre au format Conventional Commits, description selon `.github/pull_request_template.md` (contexte, changements, comment tester, captures si UI). Lier l'issue si elle existe (`Closes #12`).
7. **Relire** le diff complet et attendre la CI verte. PR petites et ciblées (< 400 lignes idéalement).
8. **Merger en squash** : `gh pr merge --squash --delete-branch`, puis `git switch main && git pull --ff-only`.

Règles :
- Une PR = un sujet. Un refactor non lié va dans une PR séparée.
- Jamais de `push --force` sur `main` ; `--force-with-lease` seulement sur sa propre branche.
- Aucun secret commité (`.env*` dans `.gitignore`).
- Claude crée la branche, les commits et la PR, puis **demande validation avant de merger** (sauf instruction explicite).
- Si le projet n'a pas encore de remote GitHub : `gh repo create` avant la première PR.
