import { Grid } from "@hope-ui/solid"
import { For } from "solid-js"
import { GridItem } from "./GridItem"
import "lightgallery/css/lightgallery-bundle.css"
import { objStore } from "~/store"
import { handleBgContextMenu } from "~/hooks/useUtil"

const GridLayout = () => {
  return (
    <Grid
      w="$full"
      gap="$1"
      minH={100}
      templateColumns="repeat(auto-fill, minmax(100px,1fr))"
      onContextMenu={(event: MouseEvent) => {
        handleBgContextMenu(2, event)
      }}
    >
      <For each={objStore.objs}>
        {(obj, i) => {
          return <GridItem obj={obj} index={i()} />
        }}
      </For>
    </Grid>
  )
}

export default GridLayout
