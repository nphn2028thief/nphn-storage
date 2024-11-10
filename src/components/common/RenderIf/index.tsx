import { ReactNode } from "react";

interface IProps {
  condition: boolean;
  children: ReactNode;
}

function RenderIf(props: IProps) {
  const { condition, children } = props;

  return condition ? children : null;
}

export default RenderIf;
