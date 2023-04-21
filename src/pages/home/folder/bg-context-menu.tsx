import { Menu, Item } from "solid-contextmenu"
import { useCopyLink, useDownload, useT, usePath } from "~/hooks"
import "solid-contextmenu/dist/style.css"
import { HStack, Icon, Text, useColorMode } from "@hope-ui/solid"
import { operations } from "../toolbar/operations"
import { For } from "solid-js"
import { bus, notify } from "~/utils"
import { UserMethods, UserPermissions } from "~/types"
import { me } from "~/store"
import { lazy } from "solid-js"
import { ModalWrapper } from "../toolbar/ModalWrapper"
const Upload = lazy(() => import("../uploads/Upload"))
const ItemContent = (props: { name: string }) => {
  const t = useT()
  return (
    <HStack spacing="$2">
      <Icon
        p={operations[props.name].p ? "$1" : undefined}
        as={operations[props.name].icon}
        boxSize="$7"
        color={operations[props.name].color}
      />
      <Text>{t(`home.toolbar.${props.name}`)}</Text>
    </HStack>
  )
}

export const BgContextMenu = () => {
  const { refresh } = usePath()
  const { colorMode } = useColorMode()
  return (
    <Menu
      id={2}
      animation="scale"
      theme={colorMode() !== "dark" ? "light" : "dark"}
    >
      <For each={["new_file", "mkdir", "upload"]}>
        {(name) => (
          <Item
            hidden={() => {
              const index = UserPermissions.findIndex((item) => item === name)
              return !UserMethods.can(me(), index)
            }}
            onClick={() => {
              bus.emit("tool", name)
            }}
          >
            <ItemContent name={name} />
          </Item>
        )}
      </For>
      <Item onClick={() => refresh(true)}>
        <ItemContent name="refresh" />
      </Item>
    </Menu>
  )
}

export default BgContextMenu
