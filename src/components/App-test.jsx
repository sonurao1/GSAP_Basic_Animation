import ScrollProgressBar from "./ScrollProgressBar.jsx";

// Is file mein KOI Tailwind bracket-wala class (jaise h-[100vh]) nahi hai —
// sab kuch pure inline style hai. Isse pata chalega ki problem Tailwind
// mein hai, ya kisi aur cheez mein.

function App() {
  const sectionStyle = {
    width: "100%",
    height: "100vh",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    color: "white",
    fontSize: "24px",
  };

  return (
    <div>
      <ScrollProgressBar />

      <div style={{ ...sectionStyle, background: "#18181b" }}>
        Section 1 — scroll karo
      </div>
      <div style={{ ...sectionStyle, background: "#27272a" }}>
        Section 2 — bar kitni bhari?
      </div>
      <div style={{ ...sectionStyle, background: "#18181b" }}>
        Section 3 — yaha tak 100% honi chahiye
      </div>
    </div>
  );
}

export default App;