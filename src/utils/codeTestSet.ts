export const getEditorLanguage = (language: string): string => {
  switch (language) {
    case "JAVA":
      return "java";
    case "PYTHON":
      return "python";
    case "C++":
      return "cpp";
    default:
      return "plaintext";
  }
};

export const getFilePath = (language: string): string => {
  switch (language) {
    case "JAVA":
      return "file.java";
    case "PYTHON":
      return "file.py";
    case "C++":
      return "file.cpp";
    default:
      return "file.txt";
  }
};

// utils/codeTestSet.ts

export const getDefaultCode = (language: string): string => {
  switch (language) {
    case "JAVA":
      return `public class Main {
      public static void main(String[] args) {
          // 코드를 작성하세요
      }
  }`;
    case "PYTHON":
      return `def solution():
      # 코드를 작성하세요
      pass
  
  if __name__ == "__main__":
      solution()`;
    case "C++":
      return `#include <iostream>
  using namespace std;
  
  int main() {
      // 코드를 작성하세요
      return 0;
  }`;
    default:
      return "// 코드를 작성하세요";
  }
};
