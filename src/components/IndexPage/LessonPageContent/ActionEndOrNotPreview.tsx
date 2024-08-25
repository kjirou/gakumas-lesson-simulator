import React from "react";

type Props = {
  willEnd: boolean;
};

// NOTE: ターンが継続する旨は明示するが、逆のターンが終了する旨は明示しない。
//       本家UIは、ターン継続時は「スキルカード使用数 0(+1)」が表示されることでそれを伝えているが、ターン終了時は無表示であるため。
//       おそらく、本家UIでそれを明示しないのは、スキルカード使用プレビュー時にPアイテムの効果を計算していないので、それ起因でターンが継続することがあるため。
//       「ターン終了」を明示すると、継続したときに違うじゃん！となると思う。実感としても、本実装で「ターン終了」を表示したら、そういう気分になった。
//       本実装コアエンジン側は、Pアイテムの効果も含めてプレビューできるのだが、それは本家UIに合わせる方を優先する。
// NOTE: 最初は「ターン継続」という文言を表示していたが、本家用語を使う形へ変えた。
//       データの定義としては、「ターン継続」方が正確だが、独自用語を使うとノイズになりそうなので、この形にしている。
//       Ref. Discord の FB: https://discord.com/channels/1207572227118075934/1239791087254634506/1275066582091042859
export const ActionEndOrNotPreview: React.FC<Props> = (props) => {
  return (
    !props.willEnd && (
      <div className="w-[48px] absolute flex justify-center items-center text-center">
        <div className="text-xs text-gimBuff">
          スキル
          <br />
          カード
          <br />
          使用数
          <br />
          消費
        </div>
      </div>
    )
  );
};
