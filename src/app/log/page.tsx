"use client";
import Header from "@/components/common/Header";
import { useRouter } from "next/navigation";

export default function Log() {
  const router = useRouter();

  const handleNextClick = () => {
    router.push("logDetail");
  };

  return (
    <div>
      <Header title="나의로그 작성" onBackClick={() => router.back()} onNextClick={handleNextClick} />
      Log
    </div>
  );
}
