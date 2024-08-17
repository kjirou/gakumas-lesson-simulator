import React from "react";

/**
 * スマホの場合の1画面分のページ内容
 *
 * - 端末の横幅に応じて、1-3 枚展開する予定
 *   - PC: 3枚で間に20pxの間隔 = 360px * 3 + 20px * 2 = 1120px
 *   - タブレット: 2枚で間に20pxの間隔 = 360px * 2 + 20px = 740px
 *   - スマホ: 1枚 = 360px
 */
export const PageContent: React.FC<{
  children: React.ReactNode;
  onClick?: () => void;
}> = ({ children, onClick }) => {
  return (
    <div className="w-[360px] h-[720px] relative bg-slate-50" onClick={onClick}>
      {children}
    </div>
  );
};
