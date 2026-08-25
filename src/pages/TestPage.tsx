import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Clock, ChevronLeft, ChevronRight, Check } from "lucide-react";
import { useTest, TOTAL_TEST_SECONDS } from "../context/TestContext";
import { questionsBySubject } from "../data/questions";
import PageBackground from "../components/PageBackground";

export default function TestPage() {
  const navigate = useNavigate();
  const {
    subject,
    answers,
    setAnswer,
    currentIndex,
    setCurrentIndex,
    startTime,
  } = useTest();
  const [timeLeft, setTimeLeft] = useState(TOTAL_TEST_SECONDS);

  useEffect(() => {
    if (!subject) navigate("/subject");
  }, [subject, navigate]);

  const questions = subject ? questionsBySubject[subject] : [];
  const total = questions.length;
  const question = questions[currentIndex];

  useEffect(() => {
    if (!startTime) return;

    const tick = () => {
      const elapsed = Math.floor((Date.now() - startTime) / 1000);
      const remaining = TOTAL_TEST_SECONDS - elapsed;
      setTimeLeft(remaining);
      if (remaining <= 0) {
        navigate("/result");
      }
    };

    tick();
    const interval = setInterval(tick, 1000);
    return () => clearInterval(interval);
  }, [startTime, navigate]);

  if (!question) return null;

  const selected = answers[currentIndex];
  const answeredCount = Object.keys(answers).length;
  const minutes = Math.floor(Math.max(timeLeft, 0) / 60);
  const seconds = Math.max(timeLeft, 0) % 60;
  const lowTime = timeLeft <= 120;

  const handleSelect = (optionIndex: number) => {
    setAnswer(currentIndex, optionIndex);
  };

  const goPrev = () => {
    if (currentIndex > 0) setCurrentIndex(currentIndex - 1);
  };

  const goNext = () => {
    if (currentIndex + 1 < total) setCurrentIndex(currentIndex + 1);
  };

  const handleSubmit = () => {
    navigate("/result");
  };

  return (
    <div className="relative min-h-screen overflow-hidden">
      <PageBackground />
      <div className="relative px-6 py-10 md:py-16 max-w-3xl mx-auto">
        <p
          className="font-display text-2xl md:text-3xl mb-2"
          style={{ color: "var(--text-primary)" }}
        >
          {currentIndex + 1}/{total}
        </p>

        <h2
          className="text-lg md:text-xl mb-8 leading-snug"
          style={{ color: "var(--text-primary)" }}
        >
          {question.question}
        </h2>

        <div className="flex flex-col gap-3 mb-6">
          {question.options.map((option, i) => (
            <button
              key={i}
              onClick={() => handleSelect(i)}
              className="text-left border rounded-lg px-5 py-4 transition-colors"
              style={{
                borderColor:
                  selected === i ? "var(--accent)" : "var(--border-color)",
                backgroundColor:
                  selected === i ? "var(--accent-soft)" : "transparent",
                color:
                  selected === i
                    ? "var(--text-primary)"
                    : "var(--text-secondary)",
              }}
            >
              {option}
            </button>
          ))}
        </div>

        <p className="text-sm mb-8" style={{ color: "var(--text-secondary)" }}>
          Javob berilgan:{" "}
          <span style={{ color: "var(--text-primary)" }}>{answeredCount}</span>{" "}
          / {total}
        </p>

        <div className="flex items-center justify-between flex-wrap gap-4">
          <div className="flex items-center gap-3">
            <button
              onClick={goPrev}
              disabled={currentIndex === 0}
              className="inline-flex items-center gap-1.5 border rounded-lg px-5 py-3 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
              style={{
                borderColor: "var(--border-color)",
                color: "var(--text-primary)",
              }}
            >
              <ChevronLeft size={17} />
              Oldingi
            </button>

            {currentIndex + 1 < total ? (
              <button
                onClick={goNext}
                className="inline-flex items-center gap-1.5 font-medium rounded-lg px-5 py-3 transition-colors"
                style={{
                  backgroundColor: "var(--accent)",
                  color: "var(--accent-ink)",
                }}
              >
                Keyingi
                <ChevronRight size={17} />
              </button>
            ) : (
              <button
                onClick={handleSubmit}
                className="inline-flex items-center gap-1.5 font-medium rounded-lg px-5 py-3 transition-colors"
                style={{
                  backgroundColor: "var(--accent)",
                  color: "var(--accent-ink)",
                }}
              >
                <Check size={17} />
                Yakunlash
              </button>
            )}
          </div>

          <div
            className="inline-flex items-center gap-1.5 text-sm font-medium px-3 py-1.5 rounded-lg border"
            style={{
              borderColor: lowTime ? "#ef4444" : "var(--border-color)",
              color: lowTime ? "#ef4444" : "var(--text-primary)",
            }}
          >
            <Clock size={15} />
            {String(minutes).padStart(2, "0")}:
            {String(seconds).padStart(2, "0")}
          </div>
        </div>
      </div>
    </div>
  );
}
