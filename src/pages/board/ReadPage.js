import { useParams } from "react-router-dom";
import useQueryObj from "../../hooks/useQueryObj";
import ReadComponent from "../../components/board/read/ReadComponent";
import ReplyWrapper from "../../components/reply/ReplyWrapper";

const ReadPage = () => {

  const { queryObj, moveList, moveRead } = useQueryObj()
  const { bno } = useParams()

  console.log(bno)
  console.log(queryObj)

  return (
    <div>
      <ReadComponent bno={bno}></ReadComponent>
      <button className="ml-[40%] text-3xl font-semibold underline text-yellow-400 mt-4" onClick={moveList}> Go List </button>
      <ReplyWrapper bno={bno}></ReplyWrapper>
      
    </div>
  );
}

export default ReadPage;