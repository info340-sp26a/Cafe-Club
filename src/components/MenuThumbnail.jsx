export default function MenuThumbnail({ menu }) {
  const sections = menu.sections?Object.values(menu.sections):[];

  return (
    <div className="thumbnail-wrapper">
      <div className="thumbnail-inner">
        <div className="thumbnail-title">{menu.title}</div>
        {sections.map((section, i)=>(
          <div key={i} className="thumbnail-section">
            <div className="thumbnail-section-name">{section.name}</div>
            {section.items && Object.values(section.items).slice(0, 3).map((item, j)=>(
              <div key={j} className="thumbnail-item">{item.name}</div>
            ))}
          </div>
        ))}
        {sections.length===0 && (
          <div className="thumbnail-empty">Empty menu</div>
        )}
      </div>
    </div>
  );
}