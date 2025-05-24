"use client";

import {Tabs, Tab} from "@heroui/react";

export function TabsPage() {
  return (
    <div className="flex w-full flex-col">
      <Tabs aria-label="Options">
        <Tab key="photos" title="Photos">
          <div>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
            incididunt ut labore et dolore magna aliqua.
          </div>
        </Tab>
        <Tab key="music" title="Music">
          <div>
            Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
            commodo consequat.
          </div>
        </Tab>
        <Tab key="videos" title="Videos">
          <div>
            Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit
            anim id est laborum.
          </div>
        </Tab>
      </Tabs>
    </div>
  );
}
