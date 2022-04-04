import { createSignal, Match, Switch } from 'solid-js';
import { ConvList } from '@/components/convList';
import { ApplicationSetting } from '@/components/applicationSetting';
import { Toolbar } from './toolbar';
import { NavTab } from '@/types/navTab';

export const Nav = () => {
  const [navTab, setNavTab] = createSignal<NavTab>(NavTab.MESSAGE);

  return (
    <div class="h-full flex flex-col w-80 select-none relative">
    <div class="absolute top-0 h-full bg-secondary-200" style={{ width: '2px', right: '-1px' }}/>
      <div class="flex-none h-14">head</div>
      <div class="flex-1 relative">
        <Switch>
          <Match when={navTab() === NavTab.MESSAGE}>
            <ConvList />
          </Match>
          <Match when={navTab() === NavTab.SETTING}>
            <ApplicationSetting />
          </Match>
          <Match when={navTab() === NavTab.MESSAGE}>
            <ConvList />
          </Match>
        </Switch>
      </div>
      <div class="flex-none h-14 border-t-2 border-t-secondary-200">
        <Toolbar navTab={navTab} onChange={(nav) => setNavTab(nav)} />
      </div>
    </div>
  );
};
