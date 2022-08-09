import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbSeparator,
} from "@hope-ui/solid";
import { Link } from "@solidjs/router";
import { createMemo, For, Show } from "solid-js";
import { usePath, useRouter, useT } from "~/hooks";
import { getSetting } from "~/store";
import { encodePath, joinBase } from "~/utils";

export const Nav = () => {
  const { pathname } = useRouter();
  const paths = createMemo(() => [
    "",
    ...pathname().split("/").filter(Boolean),
  ]);
  const t = useT();
  const { setPathAsDir } = usePath();
  return (
    <Breadcrumb class="nav" w="$full">
      <For each={paths()}>
        {(name, i) => {
          const isLast = createMemo(() => i() === paths().length - 1);
          const path = paths()
            .slice(0, i() + 1)
            .join("/");
          const href = encodePath(path);
          let text = () => name;
          if (text() === "") {
            text = () => getSetting("home_icon") + t("manage.sidemenu.home");
          }
          return (
            <BreadcrumbItem>
              <BreadcrumbLink
                css={{
                  wordBreak: "break-all",
                }}
                color="unset"
                _hover={{ bgColor: "$neutral4", color: "unset" }}
                _active={{ transform: "scale(.95)", transition: "0.1s" }}
                cursor="pointer"
                p="$1"
                rounded="$lg"
                currentPage={isLast()}
                as={isLast() ? undefined : Link}
                href={joinBase(href)}
                onMouseEnter={() => setPathAsDir(path)}
              >
                {text}
              </BreadcrumbLink>
              <Show when={!isLast()}>
                <BreadcrumbSeparator />
              </Show>
            </BreadcrumbItem>
          );
        }}
      </For>
    </Breadcrumb>
  );
};
