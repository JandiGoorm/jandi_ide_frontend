import styles from "./Button.module.css";
import React, { useState } from "react";

/**
 * @typedef {Object} ButtonProps
 * @property {"sm" | "md" | "lg"} [size]
 * @property {boolean} [isInModal] // 모달은 다크모드 일때도, 배경이 흰색이기때문에, 해당값을 받아서 스타일을 변경해줍니다.
 * @property {"solid" |"outline" | "ghost" | "none"}[variant]
 * @property {React.ReactNode} children
 */

/**
 * @typedef {ButtonProps & React.ButtonHTMLAttributes<HTMLButtonElement>} CombinedButtonProps
 */

/**
 *
 * @param {CombinedButtonProps} props
 * @returns {JSX.Element}
 */

type ButtonSize = "sm" | "md" | "lg";
type ButtonVariant = "solid" | "lang" | "none";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  size?: ButtonSize;
  variant?: ButtonVariant;
  isInModal?: boolean;
  children: React.ReactNode;
}

const Button: React.FC<ButtonProps> = ({
  size = "md",
  variant = "solid",
  isInModal = false,
  children,
  ...props
}) => {
  const [isClicked, setIsClicked] = useState(false);

  const sizeClass = styles[`btn_${size}`];
  const variantClass = styles[`btn_${variant}`];
  const baseClass = isInModal ? styles.modal_btn : styles.btn;

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    setIsClicked(!isClicked); // 클릭할 때마다 토글
    props.onClick?.(e); // 외부에서 전달한 onClick도 실행
  };

  const clickedClass =
    variant === "lang" && isClicked ? styles.btn_lang_clicked : "";

  return (
    <button
      className={`${sizeClass} ${variantClass} ${baseClass} ${clickedClass}`}
      onClick={handleClick}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
