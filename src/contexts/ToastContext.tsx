import { createContext, useContext } from "react";

export type ToastType = "error" | "success";

export interface Toast {
  id: string;
  type: ToastType;
  text: string;
}

export interface CreateToastParams {
  type: ToastType;
  text: string;
}

export type CreateToastCallback = (params: CreateToastParams) => void;

export interface ToastContextType {
  createToast: CreateToastCallback;
  toasts: Toast[];
}

export const ToastContext = createContext<ToastContextType>({
  createToast: () => {},
  toasts: [],
});

export const useToast = (): ToastContextType => {
  const context = useContext(ToastContext);

  if (!context) {
    throw new Error(
      "useToastContext 는 ToastProvider 내부에서 사용되어야 합니다."
    );
  }

  return context;
};
