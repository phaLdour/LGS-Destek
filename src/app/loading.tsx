/**
 * Küresel yükleme ekranı.
 *
 * Bu dosyanın varlığı iki şeyi birden çözer:
 *  1) Menüden bir sayfaya basıldığında Next.js artık sunucu cevabını
 *     bekletmez; geçiş ANINDA olur ve veri gelene dek bu iskelet görünür.
 *     ("Dersler'e basınca 6-7 saniye hiçbir şey olmuyor" sorununun çözümü.)
 *  2) Link'ler için yükleme sınırı önceden getirilebilir hâle gelir.
 */
export default function Loading() {
  return (
    <div className="flex min-h-[60vh] items-center justify-center bg-rehberim-muted">
      <div className="flex flex-col items-center gap-4">
        {/* Marka renginde dönen halka — ekstra kütüphane yok */}
        <span
          aria-hidden
          className="h-10 w-10 animate-spin rounded-full border-[3px] border-rehberim-navy/15 border-t-rehberim-accent"
        />
        <p className="text-sm font-bold text-rehberim-navy/55">Yükleniyor…</p>
      </div>
    </div>
  );
}
