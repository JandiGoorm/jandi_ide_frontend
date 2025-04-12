import styles from "./Button.module.css";

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
  isClicked?: boolean;
}

const Button: React.FC<ButtonProps> = ({
  size = "md",
  variant = "solid",
  isInModal = false,
  children,
  onClick,
  isClicked = false,
  ...props
}) => {
  const sizeClass = styles[`btn_${size}`];
  const variantClass = styles[`btn_${variant}`];
  const baseClass = isInModal ? styles.modal_btn : styles.btn;

  const clickedClass =
    variant === "lang" && isClicked ? styles.btn_lang_clicked : "";

  return (
    <button
      className={`${sizeClass} ${variantClass} ${baseClass} ${clickedClass}`}
      onClick={onClick}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
