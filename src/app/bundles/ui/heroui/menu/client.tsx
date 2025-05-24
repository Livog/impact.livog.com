"use client";

import {Menu, MenuTrigger, MenuItem, MenuList} from "@heroui/react";

export function MenuPage() {
  return (
    <Menu>
      <MenuTrigger>
        <button>Open Menu</button>
      </MenuTrigger>
      <MenuList aria-label="Menu">
        <MenuItem key="profile">Profile</MenuItem>
        <MenuItem key="settings">Settings</MenuItem>
        <MenuItem key="logout">Log Out</MenuItem>
      </MenuList>
    </Menu>
  );
}
