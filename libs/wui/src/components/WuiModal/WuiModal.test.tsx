import { createRef } from "react";

import "@testing-library/jest-dom";
import { act, fireEvent, render, screen } from "@testing-library/react";

import { WuiModal } from "./WuiModal";

const createTransitionEndEvent = (propertyName: string) => {
  const e = new Event("transitionend") as any;
  Object.defineProperty(e, "propertyName", { value: propertyName });
  return e as TransitionEvent;
};

describe("WuiModal", () => {
  beforeAll(() => {
    // JSDOM doesn't implement <dialog> methods
    if (!(HTMLDialogElement.prototype as any).showModal) {
      (HTMLDialogElement.prototype as any).showModal = function showModal() {
        this.setAttribute("open", "");
        (this as any).open = true;
      };
    }
    if (!(HTMLDialogElement.prototype as any).close) {
      (HTMLDialogElement.prototype as any).close = function close() {
        this.removeAttribute("open");
        (this as any).open = false;
      };
    }

    // Ensure these exist so we can spy in tests
    if (!(globalThis as any).requestAnimationFrame) {
      (globalThis as any).requestAnimationFrame = (_cb: FrameRequestCallback) =>
        1;
    }
    if (!(globalThis as any).cancelAnimationFrame) {
      (globalThis as any).cancelAnimationFrame = () => {};
    }
  });

  beforeEach(() => {
    jest.spyOn(globalThis, "requestAnimationFrame").mockImplementation((cb) => {
      cb(0);
      return 1;
    });
    jest.spyOn(globalThis, "cancelAnimationFrame").mockImplementation(() => {});
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it("has displayName set", () => {
    expect(WuiModal.displayName).toBe("WuiModal");
  });

  it("renders title/body/footer and opens with animation when open=true", () => {
    const onClose = jest.fn();
    const showModalSpy = jest.spyOn(
      HTMLDialogElement.prototype as any,
      "showModal"
    );

    render(
      <WuiModal
        open
        onClose={onClose}
        title="My title"
        footer={<div>My footer</div>}
      >
        <div>My body</div>
      </WuiModal>
    );

    const dialog = document.querySelector("dialog") as HTMLDialogElement;
    expect(dialog).toBeInTheDocument();
    expect(showModalSpy).toHaveBeenCalledTimes(1);

    expect(screen.getByText("My title")).toHaveClass("wui-modal__title");
    expect(screen.getByText("My body")).toBeInTheDocument();
    expect(screen.getByText("My footer")).toBeInTheDocument();
    expect(screen.getByLabelText("Close")).toBeInTheDocument();

    // requestAnimationFrame is executed and state flips to animated open
    expect(dialog).toHaveClass("wui-modal--open");
    expect(onClose).not.toHaveBeenCalled();

    // Transition end while NOT closing: should not close
    const closeSpy = jest.spyOn(HTMLDialogElement.prototype as any, "close");
    dialog.dispatchEvent(createTransitionEndEvent("opacity"));
    expect(closeSpy).not.toHaveBeenCalled();
    expect(onClose).not.toHaveBeenCalled();
    closeSpy.mockRestore();

    showModalSpy.mockRestore();
  });

  it("clicking the close button starts closing, and transitionend closes + calls onClose", () => {
    const onClose = jest.fn();
    const closeSpy = jest.spyOn(HTMLDialogElement.prototype as any, "close");

    render(
      <WuiModal open onClose={onClose} title="T">
        Body
      </WuiModal>
    );

    const dialog = document.querySelector("dialog") as HTMLDialogElement;
    const container = dialog.querySelector(
      ".wui-modal__container"
    ) as HTMLDivElement;

    expect(dialog).toHaveClass("wui-modal--open");
    fireEvent.click(screen.getByLabelText("Close"));
    // Clicking again does nothing (already closing)
    fireEvent.click(screen.getByLabelText("Close"));

    // No immediate close until transition ends
    expect(onClose).not.toHaveBeenCalled();
    expect(closeSpy).not.toHaveBeenCalled();
    expect(dialog).not.toHaveClass("wui-modal--open");

    // Wrong target: ignored
    container.dispatchEvent(createTransitionEndEvent("opacity"));
    expect(onClose).not.toHaveBeenCalled();

    // Wrong propertyName: ignored
    dialog.dispatchEvent(createTransitionEndEvent("height"));
    expect(onClose).not.toHaveBeenCalled();

    // Correct: finishClose() runs
    dialog.dispatchEvent(createTransitionEndEvent("opacity"));
    expect(closeSpy).toHaveBeenCalledTimes(1);
    expect(onClose).toHaveBeenCalledTimes(1);

    closeSpy.mockRestore();
  });

  it("when open becomes false, it closes after transitionend (opacity/transform)", () => {
    const onClose = jest.fn();
    const closeSpy = jest.spyOn(HTMLDialogElement.prototype as any, "close");

    const { rerender } = render(
      <WuiModal open onClose={onClose}>
        Body
      </WuiModal>
    );

    const dialog = document.querySelector("dialog") as HTMLDialogElement;
    expect(dialog).toHaveClass("wui-modal--open");

    rerender(
      <WuiModal open={false} onClose={onClose}>
        Body
      </WuiModal>
    );

    expect(dialog).not.toHaveClass("wui-modal--open");
    expect(onClose).not.toHaveBeenCalled();

    dialog.dispatchEvent(createTransitionEndEvent("transform"));
    expect(closeSpy).toHaveBeenCalledTimes(1);
    expect(onClose).toHaveBeenCalledTimes(1);

    closeSpy.mockRestore();
  });

  it("cancel event (Escape/backdrop) prevents default and triggers closing animation", () => {
    const onClose = jest.fn();
    const closeSpy = jest.spyOn(HTMLDialogElement.prototype as any, "close");

    render(
      <WuiModal open onClose={onClose}>
        Body
      </WuiModal>
    );

    const dialog = document.querySelector("dialog") as HTMLDialogElement;
    expect(dialog).toHaveClass("wui-modal--open");

    const cancelEvent = new Event("cancel", { cancelable: true });
    act(() => {
      dialog.dispatchEvent(cancelEvent);
    });
    expect(cancelEvent.defaultPrevented).toBe(true);
    expect(dialog).not.toHaveClass("wui-modal--open");
    expect(onClose).not.toHaveBeenCalled();

    // Second cancel while already closing only prevents default
    const cancelEvent2 = new Event("cancel", { cancelable: true });
    act(() => {
      dialog.dispatchEvent(cancelEvent2);
    });
    expect(cancelEvent2.defaultPrevented).toBe(true);

    dialog.dispatchEvent(createTransitionEndEvent("opacity"));
    expect(closeSpy).toHaveBeenCalledTimes(1);
    expect(onClose).toHaveBeenCalledTimes(1);

    closeSpy.mockRestore();
  });

  it("calls onClose on native close events when not already closing, but not when closing", () => {
    const onClose = jest.fn();

    render(
      <WuiModal open onClose={onClose}>
        Body
      </WuiModal>
    );

    const dialog = document.querySelector("dialog") as HTMLDialogElement;
    dialog.dispatchEvent(new Event("close"));
    expect(onClose).toHaveBeenCalledTimes(1);

    // Now mark as closing via close button, and ensure close event doesn't notify parent
    fireEvent.click(screen.getByLabelText("Close"));
    dialog.dispatchEvent(new Event("close"));
    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it("forwards ref (function + object) to the dialog element", () => {
    const onClose = jest.fn();

    const fnRef = jest.fn();
    const objRef = createRef<HTMLDialogElement>();

    render(
      <>
        <WuiModal open={false} onClose={onClose} ref={fnRef}>
          Body
        </WuiModal>
        <WuiModal open={false} onClose={onClose} ref={objRef}>
          Body 2
        </WuiModal>
      </>
    );

    expect(fnRef).toHaveBeenCalled();
    expect(
      fnRef.mock.calls.some((call) => call[0] instanceof HTMLDialogElement)
    ).toBe(true);

    expect(objRef.current).toBeInstanceOf(HTMLDialogElement);
  });

  it("cancels the opening animation frame on unmount", () => {
    const onClose = jest.fn();
    const cancelSpy = jest.spyOn(globalThis as any, "cancelAnimationFrame");

    const { unmount } = render(
      <WuiModal open onClose={onClose}>
        Body
      </WuiModal>
    );

    unmount();
    expect(cancelSpy).toHaveBeenCalled();

    cancelSpy.mockRestore();
  });

  // Note: we intentionally don't unit-test the impossible "innerRef.current is null after mount"
  // defensive branches; React sets refs before running effects.
});
