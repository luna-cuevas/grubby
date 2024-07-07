import { Tooltip, Typography } from "@material-tailwind/react";

type Props = {
  children: React.ReactNode;
  content: React.ReactNode;
};

export function ToolTip({ children, content }: Props): JSX.Element {
  return (
    <Tooltip
      placement="bottom"
      className="border border-blue-gray-50 bg-white flex-shrink-0 !w-fit min-w-0  shadow-xl shadow-black/10"
      content={content}>
      {children}
    </Tooltip>
  );
}
