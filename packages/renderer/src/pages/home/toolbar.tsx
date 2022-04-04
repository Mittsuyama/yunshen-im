import { NavTab } from "@/types/navTab";
import { Accessor } from "solid-js";

export interface ToolbarProps {
  navTab: Accessor<NavTab>;
  onChange?: (navTab: NavTab) => void;
}

export const Toolbar = (props: ToolbarProps) => {
  const { navTab, onChange } = props;

  return (
    <div class="w-full h-full flex justify-around items-center text-secondary-400">
      {[NavTab.USER, NavTab.MESSAGE, NavTab.SETTING].map((nav) => {
        let icon = '';
        let size = '';
        switch (nav) {
          case NavTab.USER:
            icon = 'user';
            size = '3xl';
            break;
          case NavTab.MESSAGE:
            icon = 'message';
            size = '4xl';
            break;
          case NavTab.SETTING:
            icon = 'setting1';
            size = '3xl';
            break;
        }
        return (
          <i
            class={`iconfont icon-${icon} px-8 text-${size} ${navTab() === nav && 'text-primary-600'}`}
            onClick={() => onChange?.(nav)}
          />
        );
      })}
    </div>
  );
};
