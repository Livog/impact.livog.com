"use client";

import {Popover, PopoverTrigger, PopoverContent} from "@heroui/react";

export function PopoverPage() {
  return (
    <Popover placement="right">
      <PopoverTrigger>
        <button>Open Popover</button>
      </PopoverTrigger>
      <PopoverContent>
        <div className="px-1 py-2">
          <div className="text-small font-bold">Popover Content</div>
          <div className="text-tiny">This is the popover content</div>
        </div>
      </PopoverContent>
    </Popover>
  );
}
