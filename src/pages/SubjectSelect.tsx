import { useEffect, useState, type MouseEvent } from "react";
import { useNavigate } from "react-router-dom";
import { Sigma, Atom, Languages, ArrowRight } from "lucide-react";
import { useTest, type Subject } from "../context/TestContext";
import logo from "../assets/logo.png";
import PageBackground from "../components/PageBackground";

const subjects: {
  id: Subject;
  title: string;
  desc: string;
  icon: typeof Sigma;
}[] = [
  {
    id: "math",
    title: "Matematika",
    desc: "Algebra, geometriya, funksiyalar",
    icon: Sigma,
  },
  {
    id: "physics",
    title: "Fizika",
    desc: "Mexanika, elektr, termodinamika",
    icon: Atom,
  },
  {
    id: "english",
    title: "Ingliz tili",
    desc: "Grammatika, lug'at, tushunish",
    icon: Languages,
  },
];

function handleMove(e: MouseEvent<HTMLButtonElement>) {
  const rect = e.currentTarget.getBoundingClientRect();
  e.currentTarget.style.setProperty("--mx", `${e.clientX - rect.left}px`);
  e.currentTarget.style.setProperty("--my", `${e.clientY - rect.top}px`);
}

export default function SubjectSelect() {
  const navigate = useNavigate();
  const { setSubject } = useTest();
  const [visible, setVisible] = useState(false);
  const [picked, setPicked] = useState<Subject | null>(null);

  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 50);
    return () => clearTimeout(t);
  }, []);

  const handleSelect = (id: Subject) => {
    setPicked(id);
    setSubject(id);
    setTimeout(() => navigate("/test"), 280);
  };

  return (
    <div className="relative min-h-screen flex flex-col items-center justify-center px-6 py-16 overflow-hidden">
      <PageBackground />
      <div
        className="w-40 h-24 rounded-[25px] flex items-center justify-center mb-10"
        style={{
          backgroundColor: "#0D0C08",
          animation: "fadeUp 0.5s ease-out both",
        }}
      >
        <img src={logo} alt="Afrasiab University" className="w-30" />
      </div>

      <p
        className="text-[var(--accent)] text-sm mb-3 tracking-wide"
        style={{ animation: "fadeUp 0.5s ease-out 0.1s both" }}
      >
        Qabul testi
      </p>
      <h1
        className="font-display text-3xl md:text-4xl text-[var(--text-primary)] mb-3 text-center"
        style={{ animation: "fadeUp 0.5s ease-out 0.18s both" }}
      >
        Fanni tanlang
      </h1>
      <p
        className="text-[var(--text-secondary)] text-sm mb-12 text-center max-w-md"
        style={{ animation: "fadeUp 0.5s ease-out 0.26s both" }}
      >
        Tanlangan fandan 30 ta savol beriladi.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-5 w-full max-w-3xl">
        {subjects.map(({ id, title, desc, icon: Icon }, i) => (
          <button
            key={id}
            onMouseMove={handleMove}
            onClick={() => handleSelect(id)}
            disabled={picked !== null}
            className={`subject-card group text-left border rounded-xl p-7 ${
              visible ? "subject-visible" : ""
            } ${picked === id ? "subject-picked" : ""}`}
            style={{
              borderColor: "var(--border-color)",
              transitionDelay: visible ? `${i * 100 + 300}ms` : "0ms",
            }}
          >
            <div
              className="subject-icon-tile relative w-12 h-12 rounded-lg flex items-center justify-center mb-5"
              style={{ backgroundColor: "var(--tile-bg)" }}
            >
              <Icon className="text-[var(--accent)]" size={22} />
            </div>
            <p className="relative text-[var(--text-primary)] font-medium text-lg mb-1">
              {title}
            </p>
            <p className="relative text-[var(--text-secondary)] text-sm mb-5">
              {desc}
            </p>
            <span className="relative inline-flex items-center gap-1.5 text-[var(--accent)] text-sm">
              {picked === id ? "Yuklanmoqda..." : "Boshlash"}
              <ArrowRight
                size={15}
                className="group-hover:translate-x-1 transition-transform"
              />
            </span>
          </button>
        ))}
      </div>
    </div>
  );
}
