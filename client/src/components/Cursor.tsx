import CursorImage from "../assets/cursor.svg";

interface Props {
  left: number;
  top: number;
}

const Cursor = ({ left, top }: Props) => {
  return (
    <img
      src={CursorImage}
      className="absolute w-3 z-10"
      style={{ left: `${left}px`, top: `${top}px` }}
    ></img>
  );
};

export default Cursor;
