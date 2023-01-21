export type TooltipMenuItemProps = {
  iconTemplate: string;
  name: string;
  events?: {
    click?: () => void;
  };
};

export type TooltipMenuProps = {
  items: TooltipMenuItemProps[];
};
