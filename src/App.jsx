import { useState } from "react";

const IDEAS_BY_CATEGORY = {
  "AI untuk bisnis": [
    { topik: "Kenapa founder gagal saat pertama kali pakai AI di bisnis mereka", angle: "Kesalahan paling umum dan cara menghindarinya" },
    { topik: "3 pekerjaan di bisnis yang paling cepat bisa dibantu AI sekarang", angle: "Fokus pada operasional UKM, bukan korporat" },
    { topik: "Cara pakai AI untuk riset kompetitor tanpa bayar konsultan", angle: "Praktis, langsung bisa dicoba" },
    { topik: "AI bukan pengganti tim — ini posisi yang tepat untuk teknologi ini", angle: "Meluruskan ekspektasi founder soal AI" },
    { topik: "Dari mana mulai kalau bisnis baru mau adopsi AI tapi budget terbatas", angle: "Panduan prioritas untuk UKM" },
    { topik: "Alat AI gratis yang sebenarnya berguna untuk bisnis kecil di Indonesia", angle: "Kurasi tools dengan use case nyata" },
  ],
  "Strategi founder": [
    { topik: "Keputusan bisnis mana yang sebaiknya tidak didelegasikan ke tim", angle: "Batas antara kepercayaan dan kontrol" },
    { topik: "Tanda-tanda founder sudah terlalu dalam di operasional", angle: "Self-check untuk pemilik bisnis" },
    { topik: "Bagaimana founder membaca pasar tanpa data yang sempurna", angle: "Intuisi vs analisis — kapan masing-masing dipakai" },
    { topik: "Pivot yang berhasil dimulai dari keputusan ini, bukan dari produk baru", angle: "Insight dari pola pivot bisnis" },
    { topik: "Apa yang biasanya salah ketika founder merekrut orang pertama mereka", angle: "Kesalahan hiring di tahap awal" },
    { topik: "Cara founder menjaga fokus ketika semua terasa urgent", angle: "Prioritisasi di tengah kekacauan operasional" },
  ],
  "Produktivitas & ops": [
    { topik: "Sistem paling sederhana untuk founder yang tidak suka sistem", angle: "Anti-perfeksionis, langsung jalan" },
    { topik: "Meeting yang membuang waktu paling banyak di bisnis kecil", angle: "Identifikasi dan cara memotongnya" },
    { topik: "Kenapa SOP gagal di UKM dan apa yang lebih bisa dijalankan", angle: "Alternatif praktis untuk dokumentasi proses" },
    { topik: "Tanda operasional bisnis mulai tidak sehat sebelum terasa di keuangan", angle: "Early warning untuk pemilik bisnis" },
    { topik: "Berapa jam sehari seharusnya founder pakai untuk berpikir, bukan mengerjakan", angle: "Waktu berpikir sebagai aset bisnis" },
    { topik: "Cara founder keluar dari mode pemadam kebakaran setiap hari", angle: "Reactive vs proactive dalam operasional" },
  ],
  "Pengambilan keputusan": [
    { topik: "Kenapa keputusan yang lambat lebih mahal dari keputusan yang salah", angle: "Cost of indecision untuk UKM" },
    { topik: "Framework sederhana untuk memutuskan sesuatu dalam 10 menit", angle: "Praktis, bukan teori manajemen" },
    { topik: "Kapan harus percaya data dan kapan harus percaya insting", angle: "Panduan kontekstual untuk founder" },
    { topik: "Bias paling berbahaya yang dimiliki hampir semua founder", angle: "Confirmation bias dalam konteks bisnis lokal" },
    { topik: "Cara memutuskan apakah sebuah peluang layak dikejar atau dilewati", angle: "Opportunity cost untuk bisnis yang sedang tumbuh" },
    { topik: "Pertanyaan yang harus ditanyakan sebelum ekspansi bisnis", angle: "Due diligence internal untuk founder" },
  ],
  "Growth & scaling": [
    { topik: "Bisnis yang tumbuh terlalu cepat sering mati karena hal ini", angle: "Bahaya growth tanpa fondasi operasional" },
    { topik: "Kapan waktu yang tepat untuk scale dan kapan lebih baik menunggu", angle: "Sinyal kesiapan scaling untuk UKM" },
    { topik: "Channel pertumbuhan paling underrated untuk bisnis B2B Indonesia", angle: "Di luar iklan digital dan media sosial" },
    { topik: "Kenapa mempertahankan pelanggan lama lebih menguntungkan dari akuisisi baru", angle: "Retention sebagai strategi growth" },
    { topik: "Mengapa produk bagus saja tidak cukup untuk tumbuh di pasar Indonesia", angle: "Distribusi dan kepercayaan sebagai faktor kunci" },
    { topik: "Tanda bisnis siap masuk ke segmen pasar baru", angle: "Ekspansi horizontal vs vertikal" },
  ],
  "Tools & teknologi": [
    { topik: "Stack teknologi minimal untuk UKM yang baru mulai digitalisasi", angle: "Urutan prioritas adopsi tools" },
    { topik: "Kapan harus beli software dan kapan lebih baik bangun sendiri", angle: "Build vs buy untuk bisnis kecil" },
    { topik: "Cara evaluasi apakah tools yang dipakai bisnis benar-benar memberikan nilai", angle: "Audit teknologi sederhana untuk founder" },
    { topik: "Otomasi bisnis yang bisa langsung dijalankan minggu ini tanpa tim IT", angle: "No-code automation untuk UKM" },
    { topik: "Kenapa banyak bisnis Indonesia gagal di transformasi digital padahal sudah beli tools", angle: "Masalah implementasi, bukan teknologi" },
    { topik: "5 tools AI yang paling sering dipakai founder Indonesia saat ini", angle: "Kurasi praktis berdasarkan use case lokal" },
  ],
  "Mindset wirausaha": [
    { topik: "Perbedaan cara berpikir founder yang bisnisnya bertahan 5 tahun vs yang tidak", angle: "Pola pikir jangka panjang dalam konteks Indonesia" },
    { topik: "Kenapa founder yang terlalu percaya diri justru paling rentan gagal", angle: "Overconfidence bias dalam bisnis" },
    { topik: "Cara berhenti membandingkan bisnis sendiri dengan kompetitor yang tidak relevan", angle: "Focus framework untuk founder" },
    { topik: "Apa yang berubah dalam cara berpikir founder setelah pertama kali gagal", angle: "Learning dari failure tanpa romanticize" },
    { topik: "Kenapa founder yang paling sibuk belum tentu yang paling produktif", angle: "Busy vs productive dalam konteks bisnis" },
    { topik: "Cara membangun toleransi risiko yang lebih baik dalam bisnis", angle: "Risk tolerance yang bisa dilatih" },
  ],
};

const FORMATS = [
  { id: "carousel", label: "Carousel 3 Slide" },
  { id: "singlegrafis", label: "Single Grafis" },
  { id: "quote", label: "Quote Card" },
];

const SYSTEM_GENERATE = `Kamu adalah content writer untuk RedGo AI — platform untuk founder dan pemilik UKM Indonesia.

AUDIENS: Pemilik bisnis yang pragmatis, sibuk, dan sudah kenyang dengan konten motivasi kosong. Mereka mau konten yang langsung relate ke situasi bisnis mereka sehari-hari.

GAYA BAHASA — INI YANG PALING PENTING:
- Tulis seperti teman yang ngerti dunia bisnis, bukan guru yang ngajarin
- Kalimat pendek. Pecah-pecah. Ngalir.
- Pakai "kamu" — personal tapi tidak terlalu kasual
- Pakai situasi konkret yang langsung bisa dirasakan pembaca — bukan konsep abstrak
- JANGAN bungkus kesimpulan dengan rapi — biarkan pembaca yang nyimpulin sendiri
- JANGAN pakai kata atau frasa ini sama sekali: "gagal", "nyata", "pada akhirnya", "hal ini penting", "perlu diingat", "sebagai founder", "di era sekarang", "terbukti", "efektif", "pada dasarnya", "tentunya", "dengan demikian", "transformasi", "berkelanjutan", "holistik", "sinergi", "optimasi", "leverage", "insight", "actionable", "game changer", "level up", "next level", "mindset", "journey", "sustainable", "impact", "ekosistem", "kolaborasi yang kuat"
- JANGAN pakai struktur "bukan X, tapi Y"
- JANGAN terdengar seperti artikel blog atau motivasi Instagram generik
- Boleh pakai emoji tapi hemat — hanya di momen yang benar-benar pas

STRUKTUR CAROUSEL (3 SLIDE SAJA — tidak lebih):
- Slide 1: Pertanyaan atau statement yang langsung bikin pembaca ngerasa "ini gue banget" — pendek, menggantung, bikin mau swipe
- Slide 2: Validasi situasinya — pakai contoh konkret, percakapan, atau daftar pendek yang relate
- Slide 3: Reframe cara pandang + pertanyaan yang bikin pembaca refleksi — diakhiri CTA natural (❤️ kalau relate, 💬 cerita di komentar)

Untuk CAROUSEL 3 SLIDE, keluarkan JSON:
{"judul":"judul konten","slides":[{"nomor":1,"label":"SLIDE 1","teks":"..."},{"nomor":2,"label":"SLIDE 2","teks":"..."},{"nomor":3,"label":"SLIDE 3","teks":"..."}],"caption":"1-2 kalimat pendek yang bikin orang penasaran, bukan rangkuman isi slide","hashtag":"#tag1 #tag2 maks 10"}

Untuk SINGLE GRAFIS:
{"judul":"...","headline":"kalimat pendek yang langsung kena — bukan slogan","subline":"1 kalimat konkret yang memperjelas","caption":"1-2 kalimat pendek","hashtag":"..."}

Untuk QUOTE CARD:
{"judul":"...","quote":"insight 1-2 kalimat yang terasa dari pengalaman nyata, bukan teori","atribusi":"konteks singkat","caption":"1-2 kalimat pendek","hashtag":"..."}

Keluarkan HANYA JSON tanpa preamble tanpa backtick.`;

function shuffle(arr) {
  return [...arr].sort(() => Math.random() - 0.5);
}

export default function RedGoIG() {
  const categories = Object.keys(IDEAS_BY_CATEGORY);
  const [category, setCategory] = useState(categories[0]);
  const [shownIdeas, setShownIdeas] = useState(shuffle(IDEAS_BY_CATEGORY[categories[0]]).slice(0, 4));
  const [format, setFormat] = useState("carousel");
  const [topic, setTopic] = useState("");
  const [angle, setAngle] = useState("");
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [activeTab, setActiveTab] = useState("generate");
  const [savedContents, setSavedContents] = useState([]);
  const [step, setStep] = useState("ideas");
  const [copied, setCopied] = useState("");

  const changeCategory = (c) => {
    setCategory(c);
    setShownIdeas(shuffle(IDEAS_BY_CATEGORY[c]).slice(0, 4));
    setResult(null);
    setStep("ideas");
    setError("");
  };

  const refreshIdeas = () => setShownIdeas(shuffle(IDEAS_BY_CATEGORY[category]).slice(0, 4));

  const pickIdea = (idea) => {
    setTopic(idea.topik);
    setAngle(idea.angle);
    setStep("generate");
    setResult(null);
    setError("");
  };

  const generate = async () => {
    if (!topic.trim()) return;
    setLoading(true);
    setError("");
    setResult(null);
    try {
      const formatLabel = format === "carousel" ? "Carousel 5 Slide" : format === "singlegrafis" ? "Single Grafis" : "Quote Card";
      const userMsg = `Topik: ${topic}\nKategori: ${category}\nFormat: ${formatLabel}${angle ? `\nAngle: ${angle}` : ""}`;
      const response = await fetch("https://api.anthropic.com/v1/messages", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          model: "claude-sonnet-4-20250514",
          max_tokens: 1000,
          system: SYSTEM_GENERATE,
          messages: [{ role: "user", content: userMsg }],
        }),
      });
      const data = await response.json();
      const text = data.content?.map((i) => i.text || "").join("") || "";
      const clean = text.replace(/```json|```/g, "").trim();
      const parsed = JSON.parse(clean);
      setResult({ ...parsed, format, category, topic });
    } catch (e) {
      setError("Gagal generate. Coba lagi.");
    }
    setLoading(false);
  };

  const saveContent = () => {
    if (result) setSavedContents((prev) => [{ ...result, id: Date.now(), savedAt: new Date().toLocaleDateString("id-ID") }, ...prev]);
  };

  const copyText = (t, key) => {
    navigator.clipboard?.writeText(t);
    setCopied(key);
    setTimeout(() => setCopied(""), 1500);
  };

  const red = "#d42b2b";
  const bg = "#0a0a0a";
  const card = "#111111";
  const border = "#1c1c1c";
  const muted = "#4a4a4a";
  const textColor = "#d8d3cc";
  const dim = "#777";
  const accent = "#e8380d";

  return (
    <div style={{
      fontFamily: "'Georgia', 'Times New Roman', serif",
      background: bg,
      minHeight: "100vh",
      color: textColor,
      backgroundImage: "radial-gradient(ellipse at 20% 0%, #1a0505 0%, transparent 50%), radial-gradient(ellipse at 80% 100%, #0d0505 0%, transparent 50%)"
    }}>
      {/* Header */}
      <div style={{
        borderBottom: `1px solid ${border}`,
        padding: "0 24px",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        background: "rgba(10,10,10,0.95)",
        backdropFilter: "blur(12px)",
        position: "sticky",
        top: 0,
        zIndex: 10,
        height: 52,
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <div style={{
            width: 28,
            height: 28,
            borderRadius: 7,
            background: `linear-gradient(135deg, ${accent} 0%, #8b0f0f 100%)`,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: 13,
            fontWeight: 900,
            color: "#fff",
            letterSpacing: -1,
            boxShadow: `0 2px 12px ${accent}40`
          }}>R</div>
          <div>
            <span style={{ fontSize: 13, fontWeight: 700, letterSpacing: -0.3, color: "#e8e3dc" }}>RedGo AI</span>
            <span style={{ fontSize: 8, color: "#2e2e2e", letterSpacing: 3, textTransform: "uppercase", marginLeft: 8 }}>IG Studio</span>
          </div>
        </div>
        <div style={{ display: "flex", border: `1px solid ${border}`, borderRadius: 7, overflow: "hidden" }}>
          {[
            { id: "generate", label: "Buat Konten" },
            { id: "saved", label: savedContents.length > 0 ? `Tersimpan (${savedContents.length})` : "Tersimpan" }
          ].map((tab) => (
            <button key={tab.id} onClick={() => setActiveTab(tab.id)} style={{
              padding: "6px 14px",
              fontSize: 10,
              border: "none",
              cursor: "pointer",
              background: activeTab === tab.id ? red : "transparent",
              color: activeTab === tab.id ? "#fff" : muted,
              fontFamily: "inherit",
              letterSpacing: 0.5,
              transition: "all 0.2s"
            }}>{tab.label}</button>
          ))}
        </div>
      </div>

      <div style={{ maxWidth: 680, margin: "0 auto", padding: "24px 16px 48px" }}>

        {activeTab === "generate" && (
          <div>
            {/* Category + Ideas block */}
            <div style={{
              background: card,
              border: `1px solid ${border}`,
              borderRadius: 14,
              padding: "20px 20px 16px",
              marginBottom: 12,
            }}>
              <div style={{ fontSize: 8, letterSpacing: 3, color: "#2a2a2a", textTransform: "uppercase", marginBottom: 12 }}>Kategori</div>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 5, marginBottom: 22 }}>
                {categories.map((c) => (
                  <button key={c} onClick={() => changeCategory(c)} style={{
                    padding: "5px 11px",
                    fontSize: 10,
                    borderRadius: 20,
                    border: category === c ? `1px solid ${red}88` : `1px solid ${border}`,
                    background: category === c ? "rgba(212,43,43,0.12)" : "transparent",
                    color: category === c ? "#e05555" : muted,
                    cursor: "pointer",
                    fontFamily: "inherit",
                    transition: "all 0.18s",
                    letterSpacing: 0.2,
                  }}>{c}</button>
                ))}
              </div>

              <div style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                marginBottom: 10,
              }}>
                <div style={{ fontSize: 8, letterSpacing: 3, color: "#2a2a2a", textTransform: "uppercase" }}>Pilih Topik</div>
                <button onClick={refreshIdeas} style={{
                  background: "transparent",
                  border: `1px solid ${border}`,
                  borderRadius: 5,
                  color: muted,
                  fontSize: 9,
                  letterSpacing: 1,
                  padding: "3px 9px",
                  cursor: "pointer",
                  fontFamily: "inherit",
                  textTransform: "uppercase",
                  transition: "all 0.2s",
                }}>↻ lainnya</button>
              </div>

              {shownIdeas.map((idea, i) => (
                <div key={i} onClick={() => pickIdea(idea)} style={{
                  background: step === "generate" && topic === idea.topik ? "rgba(212,43,43,0.07)" : "rgba(255,255,255,0.012)",
                  border: step === "generate" && topic === idea.topik ? `1px solid ${red}44` : `1px solid ${border}`,
                  borderRadius: 9,
                  padding: "11px 14px",
                  cursor: "pointer",
                  marginBottom: 6,
                  transition: "all 0.18s",
                }}>
                  <div style={{ fontSize: 12, color: step === "generate" && topic === idea.topik ? "#e8c5c5" : textColor, fontWeight: 600, marginBottom: 3, lineHeight: 1.45 }}>{idea.topik}</div>
                  <div style={{ fontSize: 10, color: step === "generate" && topic === idea.topik ? "#c06060" : dim, fontStyle: "italic" }}>{idea.angle}</div>
                </div>
              ))}
            </div>

            {/* Generate block */}
            {step === "generate" && (
              <div style={{
                background: card,
                border: `1px solid ${border}`,
                borderRadius: 14,
                padding: "20px 20px 18px",
                marginBottom: 12,
              }}>
                <div style={{ fontSize: 8, letterSpacing: 3, color: "#2a2a2a", textTransform: "uppercase", marginBottom: 16 }}>Konfigurasi Konten</div>

                <div style={{ marginBottom: 12 }}>
                  <label style={{ display: "block", fontSize: 8, letterSpacing: 2, color: "#363636", textTransform: "uppercase", marginBottom: 6 }}>Topik</label>
                  <textarea
                    value={topic}
                    onChange={(e) => setTopic(e.target.value)}
                    rows={2}
                    style={{
                      width: "100%",
                      padding: "10px 13px",
                      background: bg,
                      border: `1px solid ${border}`,
                      borderRadius: 9,
                      color: textColor,
                      fontSize: 12,
                      fontFamily: "inherit",
                      boxSizing: "border-box",
                      outline: "none",
                      resize: "none",
                      lineHeight: 1.6,
                    }}
                  />
                </div>

                <div style={{ marginBottom: 16 }}>
                  <label style={{ display: "block", fontSize: 8, letterSpacing: 2, color: "#363636", textTransform: "uppercase", marginBottom: 6 }}>
                    Angle <span style={{ fontStyle: "italic", letterSpacing: 0, color: "#2a2a2a", textTransform: "none" }}>— opsional</span>
                  </label>
                  <input
                    value={angle}
                    onChange={(e) => setAngle(e.target.value)}
                    style={{
                      width: "100%",
                      padding: "10px 13px",
                      background: bg,
                      border: `1px solid ${border}`,
                      borderRadius: 9,
                      color: textColor,
                      fontSize: 12,
                      fontFamily: "inherit",
                      boxSizing: "border-box",
                      outline: "none",
                    }}
                  />
                </div>

                <div style={{ marginBottom: 18 }}>
                  <label style={{ display: "block", fontSize: 8, letterSpacing: 2, color: "#363636", textTransform: "uppercase", marginBottom: 9 }}>Format</label>
                  <div style={{ display: "flex", gap: 6 }}>
                    {FORMATS.map((f) => (
                      <button key={f.id} onClick={() => setFormat(f.id)} style={{
                        flex: 1,
                        padding: "9px 6px",
                        fontSize: 10,
                        borderRadius: 9,
                        border: format === f.id ? `1px solid ${red}66` : `1px solid ${border}`,
                        background: format === f.id ? "rgba(212,43,43,0.1)" : "transparent",
                        color: format === f.id ? "#e05555" : muted,
                        cursor: "pointer",
                        fontFamily: "inherit",
                        textAlign: "center",
                        transition: "all 0.18s",
                        lineHeight: 1.3,
                      }}>{f.label}</button>
                    ))}
                  </div>
                </div>

                <button onClick={generate} disabled={loading || !topic.trim()} style={{
                  width: "100%",
                  padding: "13px",
                  background: !loading && topic.trim()
                    ? `linear-gradient(135deg, ${red} 0%, #a01818 100%)`
                    : "#141414",
                  color: !loading && topic.trim() ? "#fff" : "#333",
                  border: "none",
                  borderRadius: 9,
                  fontSize: 10,
                  letterSpacing: 2.5,
                  textTransform: "uppercase",
                  fontFamily: "inherit",
                  fontWeight: 700,
                  cursor: !loading && topic.trim() ? "pointer" : "not-allowed",
                  transition: "all 0.2s",
                  boxShadow: !loading && topic.trim() ? `0 4px 20px ${red}30` : "none",
                }}>
                  {loading ? (
                    <span style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 8 }}>
                      <span style={{ display: "inline-block", width: 10, height: 10, border: "1px solid rgba(255,255,255,0.3)", borderTop: "1px solid white", borderRadius: "50%", animation: "spin 0.8s linear infinite" }} />
                      Generating...
                    </span>
                  ) : "Generate Konten"}
                </button>
              </div>
            )}

            {error && (
              <div style={{ color: "#e05555", fontSize: 12, marginBottom: 12, textAlign: "center", padding: "10px 16px", background: "rgba(212,43,43,0.08)", border: `1px solid ${red}22`, borderRadius: 9 }}>
                {error}
              </div>
            )}

            {/* Result block */}
            {result && (
              <div style={{
                background: card,
                border: `1px solid ${border}`,
                borderRadius: 14,
                padding: "20px 20px 18px",
              }}>
                <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", marginBottom: 20, gap: 12 }}>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: 8, letterSpacing: 3, color: red, textTransform: "uppercase", marginBottom: 5 }}>
                      {result.format === "carousel" ? "Carousel 5 Slide" : result.format === "singlegrafis" ? "Single Grafis" : "Quote Card"}
                    </div>
                    <div style={{ fontSize: 15, fontWeight: 700, lineHeight: 1.35, color: "#ebe6df" }}>{result.judul}</div>
                  </div>
                  <button onClick={saveContent} style={{
                    padding: "7px 14px",
                    background: "transparent",
                    border: `1px solid ${border}`,
                    borderRadius: 7,
                    color: dim,
                    fontSize: 9,
                    letterSpacing: 1.5,
                    textTransform: "uppercase",
                    cursor: "pointer",
                    fontFamily: "inherit",
                    whiteSpace: "nowrap",
                    flexShrink: 0,
                    transition: "all 0.2s",
                  }}>↓ Simpan</button>
                </div>

                {/* Carousel slides */}
                {result.format === "carousel" && result.slides && (
                  <div style={{ marginBottom: 14 }}>
                    <div style={{ fontSize: 8, letterSpacing: 3, color: "#252525", textTransform: "uppercase", marginBottom: 10 }}>Slides</div>
                    {result.slides.map((slide) => (
                      <div key={slide.nomor} style={{
                        background: "rgba(255,255,255,0.02)",
                        border: `1px solid ${border}`,
                        borderRadius: 9,
                        padding: "12px 14px",
                        display: "flex",
                        gap: 12,
                        alignItems: "flex-start",
                        marginBottom: 6,
                        position: "relative",
                      }}>
                        <div style={{
                          minWidth: 22,
                          height: 22,
                          borderRadius: "50%",
                          background: "rgba(212,43,43,0.1)",
                          border: `1px solid ${red}22`,
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          fontSize: 9,
                          color: red,
                          fontWeight: 700,
                          flexShrink: 0,
                          marginTop: 1,
                        }}>{slide.nomor}</div>
                        <div style={{ flex: 1 }}>
                          <div style={{ fontSize: 8, letterSpacing: 2, color: "#2a2a2a", textTransform: "uppercase", marginBottom: 4 }}>{slide.label}</div>
                          <div style={{ fontSize: 12, color: "#999", lineHeight: 1.7 }}>{slide.teks}</div>
                        </div>
                        <button onClick={() => copyText(slide.teks, `slide-${slide.nomor}`)} style={{
                          background: "none",
                          border: "none",
                          color: copied === `slide-${slide.nomor}` ? red : "#282828",
                          cursor: "pointer",
                          fontSize: 12,
                          flexShrink: 0,
                          padding: 2,
                          transition: "color 0.2s",
                        }}>
                          {copied === `slide-${slide.nomor}` ? "✓" : "⎘"}
                        </button>
                      </div>
                    ))}
                  </div>
                )}

                {/* Single grafis */}
                {result.format === "singlegrafis" && (
                  <div style={{
                    marginBottom: 14,
                    background: "rgba(255,255,255,0.02)",
                    border: `1px solid ${border}`,
                    borderRadius: 9,
                    padding: "18px 18px",
                    position: "relative",
                  }}>
                    <div style={{ fontSize: 8, letterSpacing: 3, color: "#252525", textTransform: "uppercase", marginBottom: 10 }}>Grafis</div>
                    <div style={{
                      fontSize: 18,
                      fontWeight: 700,
                      marginBottom: 8,
                      lineHeight: 1.3,
                      color: "#ebe6df",
                      borderLeft: `2px solid ${red}`,
                      paddingLeft: 12,
                    }}>{result.headline}</div>
                    <div style={{ fontSize: 12, color: dim, fontStyle: "italic", paddingLeft: 12 }}>{result.subline}</div>
                  </div>
                )}

                {/* Quote card */}
                {result.format === "quote" && (
                  <div style={{
                    marginBottom: 14,
                    background: "rgba(255,255,255,0.02)",
                    border: `1px solid ${border}`,
                    borderRadius: 9,
                    padding: "18px 18px",
                  }}>
                    <div style={{ fontSize: 8, letterSpacing: 3, color: "#252525", textTransform: "uppercase", marginBottom: 12 }}>Quote</div>
                    <div style={{
                      fontSize: 14,
                      lineHeight: 1.8,
                      fontStyle: "italic",
                      marginBottom: 12,
                      color: "#bbb8b2",
                      borderLeft: `2px solid ${red}55`,
                      paddingLeft: 14,
                    }}>"{result.quote}"</div>
                    <div style={{ fontSize: 10, color: red, paddingLeft: 14 }}>— {result.atribusi}</div>
                  </div>
                )}

                {/* Caption + Hashtag */}
                {[
                  { label: "Caption IG", value: result.caption, key: "caption" },
                  { label: "Hashtag", value: result.hashtag, key: "hashtag", isTag: true }
                ].map(({ label, value, key, isTag }) => (
                  <div key={key} style={{
                    background: "rgba(255,255,255,0.02)",
                    border: `1px solid ${border}`,
                    borderRadius: 9,
                    padding: "12px 14px",
                    marginBottom: 6,
                  }}>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 7 }}>
                      <div style={{ fontSize: 8, letterSpacing: 3, color: "#252525", textTransform: "uppercase" }}>{label}</div>
                      <button onClick={() => copyText(value, key)} style={{
                        background: "none",
                        border: `1px solid ${border}`,
                        borderRadius: 5,
                        color: copied === key ? red : "#333",
                        cursor: "pointer",
                        fontSize: 9,
                        padding: "2px 8px",
                        fontFamily: "inherit",
                        transition: "color 0.2s",
                      }}>{copied === key ? "✓ copied" : "⎘ copy"}</button>
                    </div>
                    <div style={{ fontSize: 12, color: isTag ? "#4477aa" : "#999", lineHeight: 1.75 }}>{value}</div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Saved tab */}
        {activeTab === "saved" && (
          <div>
            {savedContents.length === 0 ? (
              <div style={{ textAlign: "center", color: "#222", padding: "80px 0", fontSize: 13, fontStyle: "italic" }}>
                Belum ada konten tersimpan.
              </div>
            ) : (
              savedContents.map((item) => (
                <div key={item.id} style={{
                  background: card,
                  border: `1px solid ${border}`,
                  borderRadius: 12,
                  padding: "18px 20px",
                  marginBottom: 10,
                }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 10 }}>
                    <div>
                      <div style={{ fontSize: 8, letterSpacing: 3, color: red, textTransform: "uppercase", marginBottom: 5 }}>
                        {item.format === "carousel" ? "Carousel" : item.format === "singlegrafis" ? "Single Grafis" : "Quote Card"}
                        <span style={{ color: "#252525", marginLeft: 8 }}>· {item.category}</span>
                      </div>
                      <div style={{ fontSize: 14, fontWeight: 700, color: "#e0dbd4", lineHeight: 1.3 }}>{item.judul}</div>
                    </div>
                    <div style={{ fontSize: 9, color: "#252525", flexShrink: 0, marginLeft: 12 }}>{item.savedAt}</div>
                  </div>
                  <div style={{
                    fontSize: 11,
                    color: muted,
                    lineHeight: 1.65,
                    borderLeft: `1px solid ${border}`,
                    paddingLeft: 12,
                  }}>
                    {item.format === "carousel" ? item.slides?.[0]?.teks
                      : item.format === "singlegrafis" ? item.headline
                      : item.quote}
                  </div>
                </div>
              ))
            )}
          </div>
        )}
      </div>

      <style>{`
        @keyframes fadeIn { from { opacity: 0; transform: translateY(6px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
        input:focus, textarea:focus { border-color: #d42b2b44 !important; }
        * { scrollbar-width: thin; scrollbar-color: #1e1e1e #0a0a0a; box-sizing: border-box; }
        button:hover { opacity: 0.85; }
      `}</style>
    </div>
  );
}