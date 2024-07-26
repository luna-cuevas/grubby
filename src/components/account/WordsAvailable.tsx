type Props = {
  wordCount: {
    wordCount: number;
    wordsMax: number;
  };
};

const WordsAvailable = (props: Props) => {
  const { wordCount, wordsMax } = props.wordCount;

  return (
    <div className=" overflow-hidden rounded-[8px] border bg-white p-8 md:px-6 mt-5">
      <div className="mb-2 font-semibold">Your Words</div>
      <div className="text-f-text-secondary mb-5 text-sm">
        The number of words available for use.
      </div>
      <div className="text-f-text capitalize text-sm font-semibold">
        <span>{wordsMax - wordCount} Words Remaining.</span>
      </div>
    </div>
  );
};

export default WordsAvailable;
