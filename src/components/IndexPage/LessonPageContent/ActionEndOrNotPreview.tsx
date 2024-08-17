import React from "react";

type Props = {
  willEnd: boolean;
};

// NOTE: ターンが継続する旨は明示するが、逆のターンが終了する旨は明示しない。
//       本家UIは、ターン継続時は「スキルカード使用数 0(+1)」が表示されることでそれを伝えているが、ターン終了時は無表示であるため。
//       おそらく、本家UIでそれを明示しないのは、スキルカード使用プレビュー時にPアイテムの効果を計算していないので、それ起因でターンが継続することがあるため。
//       「ターン終了」を明示すると、継続したときに違うじゃん！となると思う。実感としても、本実装で「ターン終了」を表示したら、そういう気分になった。
//       本実装コアエンジン側は、Pアイテムの効果も含めてプレビューできるのだが、それは本家UIに合わせる方を優先する。
export const ActionEndOrNotPreview: React.FC<Props> = (props) => {
  return (
    !props.willEnd && (
      <div className="w-[48px] h-[48px] absolute flex justify-center items-center text-center">
        <div className="text-sm font-bold text-emerald-500">ターン継続</div>
      </div>
    )
  );
};
