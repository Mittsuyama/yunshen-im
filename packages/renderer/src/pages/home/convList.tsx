import { JSXElement, createEffect, createSignal } from 'solid-js';
import { fetchGroupList } from '@/api';

interface ConvListItemProps {
  icon: JSXElement;
  title: string;
  userName?: string;
  message?: string;
  time: string;
}

interface GroupItemVO {
  admin_flag: boolean;
  group_id: number;
  group_name: string;
  last_join_time: number;
  max_member_count: number,
  member_count: number;
  owner_id: number;
  shutup_time_me: number;
  shutup_time_whole: number;
  update_time: number,
}

const ConvListItem = (props: ConvListItemProps) => {
  const { icon, title, userName, message, time } = props;

  return (
    <div class="w-full h-20 group hover:bg-primary-500 hover:text-secondary-50 flex">
      <div class="flex-none w-20 p-3 h-full">
        <div class="h-full w-full rounded-full overflow-hidden">
          {icon}
        </div>
      </div>
      <div class="w-full h-full flex-1 py-3 px-1 border-b-2 border-b-secondary-200 group-hover:border-b-primary-500">
        <div class="h-1/3 text-sm flex items-center">
          <div class="font-bold flex-1">{title}</div>
          <div class="flex-none px-3">{time}</div>
        </div>
        <div class="h-2/3 text-secondary-800 group-hover:text-secondary-50">
          {userName && <div class="h-1/2 text-sm flex items-center">{userName}</div>}
          <div class="h-1/2 text-sm flex items-center">{message}</div>
        </div>
      </div>
    </div>
  );
};

export const ArchivedChats = () => {
  return (
    <ConvListItem
      icon={(
        <div class="w-full h-full bg-primary-600 flex justify-center items-center text-md text-secondary-50">
          Arc
        </div>
      )}
      title="Archived Chats"
      userName="yuangungun"
      message="test message."
      time="5:03PM"
    />
  );
};

export const ConvList = () => {
  const [groupList, setGrouplist] = createSignal<GroupItemVO[]>([]);

  createEffect(async () => {
    const res = await fetchGroupList();
    if (typeof res.keys() === 'object') {
      const list: GroupItemVO[] = [];
      for (const key of res.keys()) {
        list.push(res.get(key));
      }
      console.log(list);
      setGrouplist(list);
    }
  });

  const listRender = (list: GroupItemVO[]) => {
    return list.map((item) => {
      const { group_id, group_name, } = item;

      return (
        <ConvListItem
          icon={(
            <div class="w-full h-full bg-primary-600 flex justify-center items-center text-md text-secondary-50">
              Jiami
            </div>
          )}
          title={group_name}
          userName="sansan"
          message="jiami ceshi"
          time="16:56"
        />
      );
    });
  };

  return (
    <div>
      <ArchivedChats />
      {listRender(groupList())}
    </div>
  )
};
