<!-- LOVABLE:BEGIN -->
> [!IMPORTANT]
> This project is connected to [Lovable](https://lovable.dev). Avoid rewriting
> published git history — force pushing, or rebasing/amending/squashing commits
> that are already pushed — as it rewrites history on Lovable's side and the
> user will likely lose their project history.
>
> Commits you push to the connected branch sync back to Lovable and show up in
> the editor, so keep the branch in a working state.
<!-- LOVABLE:END -->

- Demo content and rules (schemes, projects, eligibility logic) live in src/lib/demo-data.ts; pages import from it so data stays synthetic and tested in one place.
- Demo roles are browser-tab only (sessionStorage); no real auth or personal data is collected.
