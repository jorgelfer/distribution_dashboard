export default function Line(props) {
  return (
    <line
      className={props.class}
      id={props.id}
      x1={props.x1}
      y1={props.y1}
      x2={props.x2}
      y2={props.y2}
      fill="none"
      stroke={props.stroke}
      strokeWidth={props.strokeWidth}
      strokeOpacity={props.strokeOpacity ?? 1}
      onClick={props.onClick ? props.onClick : null}
    />
  );
}
