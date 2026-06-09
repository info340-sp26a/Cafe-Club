import { bgColors, fontColors } from './menuColors';

export default function MenuThumbnail({ menu }) {
  const sections = Object.values(menu.sections ?? {});
  const color = menu.customization?.color || "";
  const bgColor = bgColors[color] || "";
  const fontColor = fontColors[color] || "";

  return (
    <div className="thumbnail-wrapper">
      <div className="thumbnail-inner">
        <div className="thumbnail-title">{menu?.title ?? "menu preview"}</div>

        {sections.map((section, i) => {
          const items = Object.values(section.items ?? {});
          return (
            <div key={i} className="menu-section-preview" style={{ backgroundColor: bgColor, color: fontColor }}>
              <div className="thumbnail-section-name">{section.name}</div>
              {items.slice(0, 3).map((item, j) => (
                <div key={j} className="thumbnail-item-row">
                  <span className="thumbnail-item-name">{item.name}</span>
                  <span className="thumbnail-item-price">${item.price}</span>
                </div>
              ))}
            </div>
          );
        })}

        {sections.length === 0 && <div className="thumbnail-empty">Empty menu</div>}
      </div>
    </div>
  );
}