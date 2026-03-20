import { Suspense, useRef, useState } from "react";

import {
  WuiButton,
  WuiInput,
  WuiModal,
  WuiModalWidth,
  WuiText,
  WuiTextAs,
  WuiTitle,
  WuiTitleAs,
} from "@wawawoom/wui";

import { getLabItems } from "./utils/getLabItems";
import { labTypeToColor } from "./utils/labTypeToColor";

// Discover all demo components: convention is components/<category>/<DemoName>/<DemoName>.tsx
const componentModules = import.meta.glob<{
  default: React.ComponentType;
}>("./components/**/*.tsx");

const LAB_ITEMS = getLabItems(componentModules);

const App = () => {
  const [search, setSearch] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedKey, setSelectedKey] = useState<string | null>(null);
  const [ModalContent, setModalContent] = useState<React.ComponentType | null>(
    null
  );
  const loadSeq = useRef(0);

  const onChangeSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  const onClickItem = async (key: string) => {
    setModalContent(null);
    setSelectedKey(key);
    setIsModalOpen(true);

    const load = componentModules[key];
    if (!load) return;

    const seq = ++loadSeq.current;
    const m = await load();
    if (seq !== loadSeq.current) return;
    setModalContent(() => m.default);
  };

  const selectedItem = LAB_ITEMS.find((i) => i.key === selectedKey);
  const filteredItems = LAB_ITEMS.filter(
    (item) =>
      search === "" ||
      item.label.toLowerCase().includes(search.toLowerCase()) ||
      item.category.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="container">
      <header className="header">
        <WuiTitle as={WuiTitleAs.H3}>Lab WaWaWooM</WuiTitle>
      </header>

      <form id="search-form">
        <WuiInput placeholder="Search" onChange={onChangeSearch} />
      </form>

      <ul className="links-list">
        {filteredItems.map((item) => (
          <li key={item.key}>
            <WuiButton
              color={labTypeToColor(item.category)}
              onClick={() => onClickItem(item.key)}
            >
              {item.category} | {item.label}
            </WuiButton>
          </li>
        ))}
      </ul>

      <WuiModal
        open={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={
          selectedItem
            ? `${selectedItem.category} | ${selectedItem.label}`
            : "Lab"
        }
        width={WuiModalWidth.L}
      >
        {ModalContent ? (
          <Suspense fallback={<WuiText as={WuiTextAs.P}>Loading…</WuiText>}>
            <ModalContent />
          </Suspense>
        ) : (
          <WuiText as={WuiTextAs.P}>Loading…</WuiText>
        )}
      </WuiModal>
    </div>
  );
};

export default App;
