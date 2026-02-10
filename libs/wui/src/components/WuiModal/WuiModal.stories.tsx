import { useEffect, useState } from "react";

import type { Meta, StoryObj } from "@storybook/react";

import { WuiButton, WuiButtonColor } from "../WuiButton";
import { WuiText, WuiTextAs } from "../WuiText";
import { WuiModal } from "./WuiModal";

const meta = {
  title: "Components/WuiModal",
  component: WuiModal,
  parameters: {
    layout: "centered",
    controls: {
      expanded: true,
      sort: "requiredFirst",
    },
  },
  tags: ["!autodocs"],
  argTypes: {
    open: {
      control: "boolean",
      description: "Whether the modal is open or not",
    },
    onClose: { action: "onClose" },
    title: {
      control: "text",
      description: "Header content (e.g. title)",
    },
    children: {
      description: "Scrollable body content",
    },
    footer: {
      description: "Footer content (e.g. actions)",
    },
  },
} satisfies Meta<typeof WuiModal>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Component: Story = {
  args: {
    open: false,
    onClose: () => { },
    children: "",
    title: "This a very long title example to show ellipsis",
    footer: undefined,
  },
  render: (args) => {
    const [open, setOpen] = useState(args.open ?? false);

    useEffect(() => {
      setOpen(args.open ?? false);
    }, [args.open]);

    return (
      <>
        <WuiButton onClick={() => setOpen(true)}>Open modal</WuiButton>

        <WuiModal
          open={open}
          onClose={() => setOpen(false)}
          title={args.title ?? "This a very long title example to show ellipsis"}
          footer={
            <>
              <WuiButton
                color={WuiButtonColor.GHOST}
                onClick={() => setOpen(false)}
              >
                Cancel
              </WuiButton>

              <WuiButton
                color={WuiButtonColor.DARK}
                onClick={() => setOpen(false)}
              >
                Confirm
              </WuiButton>
            </>
          }
        >
          <WuiText as={WuiTextAs.P}>
            Mauris vel auctor nisi. Cras pulvinar posuere quam at vehicula.
            Integer fringilla nunc dictum libero tristique, nec lacinia diam
            dignissim. Duis porttitor ornare tortor in ullamcorper. Integer quis
            leo neque. Cras porta lacus leo, et sodales risus consectetur ac.
            Curabitur cursus eros id tempor consectetur. Quisque iaculis metus
            quis ligula efficitur, ornare auctor odio mollis.
          </WuiText>

          <WuiText as={WuiTextAs.P}>
            Nam mauris elit, ultrices id viverra et, facilisis in nunc. Proin
            urna sem, pharetra vitae risus eu, pulvinar vehicula magna. Proin et
            commodo odio. Donec laoreet sapien ac diam fermentum ultricies.
            Nulla pretium tellus eget accumsan varius. In sem ante, egestas
            tristique ipsum ac, pretium interdum leo. Vestibulum in mi
            tincidunt, euismod tortor id, viverra libero. Sed ac ornare quam.
            Maecenas risus diam, sollicitudin sit amet vestibulum volutpat,
            rhoncus ut massa. Etiam in mattis quam. Mauris eget aliquam nunc,
            eget congue ante. Aliquam non accumsan tortor, sed bibendum dui.
            Etiam eleifend dui eu lorem luctus, id egestas purus fermentum.
            Nulla eu turpis sem.
          </WuiText>

          <WuiText as={WuiTextAs.P}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit.
            Pellentesque gravida nunc ac erat blandit tempor. Morbi quis metus
            egestas, interdum ex sed, suscipit nisl. Morbi ut bibendum tellus.
            Suspendisse faucibus sapien sapien, sit amet sollicitudin elit
            dapibus vitae. Sed et sapien quis augue blandit porta a ac felis.
            Duis at volutpat leo, id luctus nulla. Duis luctus consequat augue
            consequat vestibulum. Praesent bibendum mauris enim, non ullamcorper
            lectus eleifend et. Nunc ullamcorper, lacus vitae tincidunt ornare,
            dui massa varius dui, in ultricies lectus libero ac felis. Morbi at
            pretium turpis. Nunc feugiat arcu purus, interdum venenatis erat
            interdum eget. Pellentesque sit amet velit non dolor scelerisque
            volutpat non ac ligula. Aliquam sagittis tempus nunc non aliquam.
            Sed sed volutpat nisl. Nam sed libero scelerisque arcu aliquam porta
            eu at massa. Suspendisse odio ex, dapibus lacinia placerat in,
            semper et tortor.
          </WuiText>
        </WuiModal>
      </>
    );
  },
};
