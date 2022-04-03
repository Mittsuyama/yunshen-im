import { ConvList } from './convList';

export const Nav = () => {
  return (
    <div class="h-full flex flex-col w-80 select-none relative">
    <div class="absolute top-0 h-full bg-secondary-200" style={{ width: '2px', right: '-1px' }}/>
      <div class="flex-none h-14">head</div>
      <div class="flex-1 relative">
        <ConvList />
      </div>
      <div class="flex-none h-14 border-t-2 border-t-secondary-200"></div>
    </div>
  );
};
