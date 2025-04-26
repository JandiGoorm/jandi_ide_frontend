import React from "react";

/**
 * '성공'은 초록색, '실패'는 빨간색으로 강조해서 반환
 */
export const highlightErrorText = (text: string): React.ReactNode[] => {
  const parts: string[] = text.split(/(성공|실패)/g); // '성공'과 '실패' 기준으로 분리

  return parts.map((part, index): React.ReactNode => {
    if (part === "실패") {
      return (
        <span key={index} style={{ color: "red", fontWeight: "bold" }}>
          {part}
        </span>
      );
    } else if (part === "성공") {
      return (
        <span key={index} style={{ color: "green", fontWeight: "bold" }}>
          {part}
        </span>
      );
    } else {
      return <span key={index}>{part}</span>;
    }
  });
};
