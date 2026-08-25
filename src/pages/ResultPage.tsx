import { useEffect, useMemo } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Check, X, RotateCcw, Download } from "lucide-react";
import { useTest } from "../context/TestContext";
import { questionsBySubject } from "../data/questions";
import logo from "../assets/logo.png";
import PageBackground from "../components/PageBackground";

const subjectLabels: Record<string, string> = {
  math: "Matematika",
  physics: "Fizika",
  english: "Ingliz tili",
};

export default function ResultPage() {
  const navigate = useNavigate();
  const { subject, answers, resetTest } = useTest();

  useEffect(() => {
    if (!subject) navigate("/subject");
  }, [subject, navigate]);

  const questions = subject ? questionsBySubject[subject] : [];

  const { correctCount, percentage } = useMemo(() => {
    let correct = 0;
    questions.forEach((q, i) => {
      if (answers[i] === q.correctIndex) correct++;
    });
    return {
      correctCount: correct,
      percentage: questions.length
        ? Math.round((correct / questions.length) * 100)
        : 0,
    };
  }, [questions, answers]);

  if (!subject || questions.length === 0) return null;

  const handleRetry = () => {
    resetTest();
    navigate("/subject");
  };

  const handleDownloadPdf = async () => {
    const { default: jsPDF } = await import("jspdf");
    const doc = new jsPDF();
    doc.setFontSize(16);
    doc.text("Afrasiab University - Qabul testi natijasi", 14, 18);
    doc.setFontSize(11);
    doc.text(`Fan: ${subjectLabels[subject]}`, 14, 30);
    doc.text(
      `Natija: ${correctCount} / ${questions.length} (${percentage}%)`,
      14,
      38,
    );

    let y = 52;
    questions.forEach((q, i) => {
      const userAnswer = answers[i];
      const isCorrect = userAnswer === q.correctIndex;
      if (y > 270) {
        doc.addPage();
        y = 20;
      }
      doc.setFontSize(10);
      doc.text(`${i + 1}. ${q.question}`, 14, y);
      y += 6;
      doc.text(
        `${isCorrect ? "To'g'ri" : "Noto'g'ri"} - Sizning javobingiz: ${
          userAnswer !== undefined ? q.options[userAnswer] : "Javob berilmagan"
        }`,
        18,
        y,
      );
      y += 8;
    });

    doc.save(`afrasiab-natija-${subject}.pdf`);
  };

  return (
    <div className="relative min-h-screen overflow-hidden">
      <PageBackground />
      <div className="relative px-6 py-12 md:py-16 max-w-2xl mx-auto">
        <div className="flex flex-col items-center text-center mb-12">
          <Link
            to="/"
            className="w-40 h-24 rounded-[25px] flex items-center justify-center mb-6 hover:scale-105 transition-transform"
            style={{ backgroundColor: "#0D0C08" }}
          >
            <img src={logo} alt="Afrasiab University" className="w-30" />
          </Link>
          <p className="text-[var(--accent)] text-sm mb-2 tracking-wide">
            {subjectLabels[subject]} - Test yakunlandi
          </p>
          <p className="font-display text-5xl text-[var(--text-primary)] mb-2">
            {percentage}%
          </p>
          <p className="text-[var(--text-secondary)] text-sm">
            {correctCount} / {questions.length} savolga to'g'ri javob berdingiz
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-3 mb-12">
          <button
            onClick={handleRetry}
            className="flex-1 inline-flex items-center justify-center gap-2 border border-[var(--border-color)] text-[var(--text-primary)] font-medium py-3 rounded-lg hover:border-[var(--border-hover)] transition-colors"
          >
            <RotateCcw size={17} />
            Qayta topshirish
          </button>
          <button
            onClick={handleDownloadPdf}
            className="flex-1 inline-flex items-center justify-center gap-2 bg-[var(--accent)] text-[var(--accent-ink)] font-medium py-3 rounded-lg hover:bg-[var(--accent-hover)] transition-colors"
          >
            <Download size={17} />
            PDF yuklab olish
          </button>
        </div>

        <div className="flex flex-col gap-3">
          {questions.map((q, i) => {
            const userAnswer = answers[i];
            const isCorrect = userAnswer === q.correctIndex;
            return (
              <div
                key={i}
                className="border border-[var(--border-color)] rounded-lg p-4"
              >
                <div className="flex items-start gap-3">
                  {isCorrect ? (
                    <Check
                      size={18}
                      className="text-green-400 mt-0.5 shrink-0"
                    />
                  ) : (
                    <X size={18} className="text-red-400 mt-0.5 shrink-0" />
                  )}
                  <div>
                    <p className="text-[var(--text-primary)] text-sm mb-1">
                      {q.question}
                    </p>
                    <p className="text-[var(--text-secondary)] text-xs">
                      Sizning javobingiz:{" "}
                      <span
                        className={
                          isCorrect ? "text-green-400" : "text-red-400"
                        }
                      >
                        {userAnswer !== undefined
                          ? q.options[userAnswer]
                          : "Javob berilmagan"}
                      </span>
                    </p>
                    {!isCorrect && (
                      <p className="text-[var(--text-secondary)] text-xs mt-1">
                        To'g'ri javob:{" "}
                        <span className="text-[var(--accent)]">
                          {q.options[q.correctIndex]}
                        </span>
                      </p>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}