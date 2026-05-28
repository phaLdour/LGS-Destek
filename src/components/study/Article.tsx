/** Basit makale gösterimi: paragraflar \n\n ile, "## " ile başlayan satırlar başlık. */
export function Article({ text }: { text: string }) {
  const blocks = text
    .split(/\n{2,}/)
    .map((b) => b.trim())
    .filter(Boolean);

  return (
    <article className="space-y-4">
      {blocks.map((block, i) =>
        block.startsWith("## ") ? (
          <h3 key={i} className="text-lg font-extrabold text-rehberim-navy">
            {block.slice(3)}
          </h3>
        ) : (
          <p key={i} className="leading-relaxed text-rehberim-navy/80">
            {block}
          </p>
        ),
      )}
    </article>
  );
}
