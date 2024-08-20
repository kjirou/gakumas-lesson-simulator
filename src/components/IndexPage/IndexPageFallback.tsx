import { Button } from "@headlessui/react";
import React from "react";
import { localStorageSavedDataKey } from "./utils";

type Props = {};

const IndexPageFallbackRaw: React.FC<Props> = (props) => {
  return (
    <div className="ml-auto mr-auto w-6/12">
      <h1 className="text-lg font-bold">エラーが発生しました</h1>
      <ul className="mt-2 flex flex-col gap-2">
        <li>
          <p>
            不慮のランタイムエラーが発生しました。おそらくは、ブラウザが自動保存しているセーブデータが、アプリケーションの更新に合わなくなったためです。
            以下のボタンを押して、ページをリロードしてください。
          </p>
          <div>
            <Button
              className="border"
              onClick={() => {
                localStorage.removeItem(localStorageSavedDataKey);
              }}
            >
              ブラウザが保存しているセーブデータを削除する
            </Button>
          </div>
        </li>
        <li>
          <p>
            もし、上記の操作で解決しない時は、以下からお問い合わせください。
          </p>
          <ul className="text-blue-500 underline">
            <li>
              <a href="https://x.com/kjirou" target="_blank">
                X / @kjirou
              </a>
            </li>
            <li>
              <a
                href="https://discord.com/channels/1207572227118075934/"
                target="_blank"
              >
                Discord / 公式の学園アイドルマスターのサーバーで kjirou へ DM
              </a>
            </li>
            <li>
              <a
                href="https://github.com/kjirou/gakumas-lesson-simulator/issues"
                target="_blank"
              >
                GitHub リポジトリ kjirou/gakumas-lesson-simulator の Issues
              </a>
            </li>
          </ul>
        </li>
      </ul>
    </div>
  );
};

export const IndexPageFallback = React.memo(IndexPageFallbackRaw);
