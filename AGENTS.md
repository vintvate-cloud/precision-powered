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

- All business facts live in src/data/site.ts and src/data/products.json (generated from the source site's WooCommerce Store API) — pages read only from these so content stays traceable to the original site.
- GSAP/Lenis load dynamically on the client via src/components/site/motion.tsx — keeps SSR safe and honours reduced motion.
- The shared site chrome presents the company as a three-venture group while Motomanic remains the verified product catalogue — this avoids attributing unverified products or claims to the other ventures.
