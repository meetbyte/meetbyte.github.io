/**
 * @file Semantic visual reading maps, grounded in each case study's verified responsibilities.
 * @author meetbyte
 */
import { experienceMaps } from "@/data/experience-maps";
/** Presents a responsive text alternative rather than an invented production architecture. @author meetbyte */
export function ExperienceMap({ id }: { id: string }) {
  const map = experienceMaps[id];
  if (!map) return null;
  return (
    <section className="experience-map" aria-labelledby={`map-${id}`}>
      <p className="eyebrow">THE WORK, AT A GLANCE</p>
      <h2 id={`map-${id}`}>{map.title}</h2>
      <p className="map-note">{map.note}</p>
      <ol className="map-stages">
        {map.stages.map(([title, detail], index) => (
          <li key={title}>
            <span className="map-number" aria-hidden="true">
              {String(index + 1).padStart(2, "0")}
            </span>
            <div>
              <h3>{title}</h3>
              <p>{detail}</p>
            </div>
          </li>
        ))}
      </ol>
      <div className="map-across">
        <span>Across the work</span>
        <ul>
          {map.across.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </div>
    </section>
  );
}
