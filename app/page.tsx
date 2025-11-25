"use client";

import { useState } from "react";

interface Question {
  id: number;
  questionText: string;
  options: string[];
  correctAnswer: string;
}

const quizData: Question[] = [
  {
    id: 1,
    questionText:
      "ใน React, Hook ใดที่ใช้สำหรับจัดการ State ใน Function Component?",
    options: ["useEffect", "useState", "useContext", "useMemo"],
    correctAnswer: "useState",
  },
  {
    id: 2,
    questionText: "Next.js เวอร์ชันใหม่นิยมใช้ Router ใดในการจัดการเส้นทาง?",
    options: ["Pages Router", "App Router", "Legacy Router", "Route Handler"],
    correctAnswer: "App Router",
  },
  {
    id: 3,
    questionText: "ใน TypeScript, คำสั่งใดใช้อธิบายโครงสร้างของ Object?",
    options: ["Class", "Enum", "Interface", "Type Alias"],
    correctAnswer: "Interface",
  },
  {
    id: 4,
    questionText: "ข้อใดคือการใช้งาน useState ที่ถูกต้อง",
    options: [
      "const count = useState(0);",
      "const [count, setCount] = useState(0);",
      "const { count, setCount } = useState(0);",
      "const [count] = useState(0, setCount);",
    ],
    correctAnswer: "const [count, setCount] = useState(0);",
  },
  {
    id: 5,
    questionText: "ข้อใดคือความแตกต่างหลักระหว่าง Props และ State",
    options: [
      "Props และ State เหมือนกัน สามารถใช้ได้ทั้ง 2 อย่าง",
      "Props อ่านได้อย่างเดียว ถ่ายทำจาก parent component ไป child, State ปรับเปลี่ยนได้ภายใน component",
      "State อ่านได้อย่างเดียว Props ปรับเปลี่ยนได้",
      "ทั้งสอง mutation ได้ทั้งนั้น ไม่มีความแตกต่าง",
    ],
    correctAnswer:
      "Props อ่านได้อย่างเดียว ถ่ายทำจาก parent component ไป child, State ปรับเปลี่ยนได้ภายใน component",
  },
  {
    id: 6,
    questionText:
      "useEffect ที่มี dependency array เป็น [] (empty array) จะทำงานเมื่อไร?",
    options: [
      "ทุกครั้งที่ component re-render",
      "เฉพาะครั้งแรกที่ component mount และเมื่อ dependency เปลี่ยน",
      "เฉพาะครั้งแรกที่ component mount",
      "ไม่ทำงานเลย",
    ],
    correctAnswer: "เฉพาะครั้งแรกที่ component mount",
  },
];

export default function Home() {
  const [currQuestionIndex, setCurrQuestionIndex] = useState<number>(0);
  const [score, setScore] = useState<number>(0);
  const [isQuizFinished, setIsQuizFinished] = useState<boolean>(false);

  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);

  const currQuestion = quizData[currQuestionIndex];

  const handleAnswerClick = (option: string) => {
    if (selectedAnswer !== null) return;

    setSelectedAnswer(option);

    if (option === currQuestion.correctAnswer) {
      setScore((prevScore) => prevScore + 1);
    }
    // หน่วงเวลา 1.5 วินาทีเพื่อให้ผู้ใช้เห็น Feedback ก่อนไปข้อถัดไป
    setTimeout(() => {
      setSelectedAnswer(null);

      const nextQuestionIndex = currQuestionIndex + 1;

      if (nextQuestionIndex < quizData.length) {
        setCurrQuestionIndex(nextQuestionIndex);
      } else {
        setIsQuizFinished(true);
      }
    }, 1500);
  };

  const handleRestart = () => {
    setCurrQuestionIndex(0);
    setScore(0);
    setIsQuizFinished(false);
    setSelectedAnswer(null);
  };

  const getButtonClass = (option: string) => {
    const baseClass =
      "w-full py-4 px-6 rounded-lg shadow-sm transition duration-150 ease-in-out font-medium";
    let hoverClass = "hover:bg-indigo-100 hover:border-indigo-400";
    let defaultClass = "bg-white border border-gray-200 text-gray-700";

    if (selectedAnswer !== null) {
      hoverClass = "";

      if (option === currQuestion.correctAnswer) {
        // คำตอบที่ถูกต้อง (ไม่ว่าผู้ใช้จะเลือกหรือไม่)
        defaultClass = "bg-green-100 border-2 border-green-500 text-green-800";
      } else if (
        option === selectedAnswer &&
        option !== currQuestion.correctAnswer
      ) {
        // คำตอบที่ผู้ใช้เลือกและผิด
        defaultClass =
          "bg-red-100 border-2 border-red-500 text-red-800 line-through";
      } else {
        // ตัวเลือกอื่นๆ ที่ไม่ได้เลือก
        defaultClass =
          "bg-white border border-gray-200 text-gray-400 opacity-60";
      }
    }

    return `${baseClass} ${defaultClass} ${hoverClass}`;
  };

  if (isQuizFinished) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4 ">
        <div className="bg-white p-8 rounded-xl shadow-2xl w-full max-w-md text-center">
          <h1 className="text-3xl font-bold text-indigo-700 mb-6">
            🎉 Quiz จบแล้ว! 🎉
          </h1>
          <p className="text-xl text-gray-700 mb-8">
            คุณได้คะแนน:{" "}
            <span className="text-4xl font-extrabold text-green-600">
              {score}
            </span>{" "}
            / {quizData.length}
          </p>
          <button
            onClick={handleRestart}
            className="w-full py-3 px-6 bg-indigo-600 text-white font-semibold rounded-lg shadow-md hover:bg-indigo-700 transition duration-300 transform hover:scale-105"
          >
            เริ่ม Quiz ใหม่
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
      <div className="bg-white p-8 rounded-xl shadow-2xl w-full max-w-lg">
        <div className="flex w-full gap-2 items-center justify-between mb-2">
          <p className="text-lg bg-yellow-100 rounded-full px-4 py-1 border border-yellow-100 font-bold">
            Score: {score}/ {quizData.length}
          </p>
          <div className="text-right text-sm text-gray-500 ">
            คำถามที่ {currQuestionIndex + 1} จาก {quizData.length}
          </div>
        </div>

        {/* กล่องคำถาม */}
        <div className="bg-indigo-50 p-6 rounded-lg mb-8 border-l-4 border-indigo-500">
          <h2 className="text-xl font-semibold text-gray-800">
            {currQuestion ? currQuestion.questionText : "กำลังโหลดคำถาม..."}
          </h2>
        </div>

        {/* ตัวเลือกคำตอบ */}
        <div className="space-y-4">
          {currQuestion?.options.map((option, index) => (
            <button
              key={index}
              onClick={() => handleAnswerClick(option)}
              // ใช้ฟังก์ชัน getButtonClass ในการกำหนด Class
              className={getButtonClass(option)}
              // ปุ่มจะถูก Disable ถ้ามีการเลือกคำตอบไปแล้ว (selectedAnswer !== null)
              disabled={selectedAnswer !== null}
            >
              {option}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
