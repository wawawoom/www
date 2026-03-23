import type { LabItem } from "../ts/LabItem.type";

export const getLabItems = (
  componentModules: Record<
    string,
    () => Promise<{
      default: React.ComponentType;
    }>
  >
): LabItem[] => {
  const items: LabItem[] = [];

  for (const path of Object.keys(componentModules)) {
    // Match ./components/<category>/<Name>/<Name>.tsx (same folder and file name)
    const match = path.match(/^\.\/components\/([^/]+)\/([^/]+)\/\2\.tsx$/);

    if (!match) continue;
    const [, category, name] = match;
    const label = name.replace(/([A-Z])/g, " $1").trim();

    items.push({
      key: path,
      category: category.toUpperCase(),
      label,
    });
  }

  items.sort((a, b) => a.label.localeCompare(b.label));

  return items;
};
