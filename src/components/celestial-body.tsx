/**
 * @file Complementary clips render one body across the header and the sky behind cards.
 * @author meetbyte
 */
/**
 * Renders one clipped decorative sun/moon layer; complementary header and sky layers form one apparent travelling body.
 * @author meetbyte
 */
export function CelestialBody({ layer = "header" }: { layer?: "header" | "sky" }) {
  return (
    <div className={`celestial-stage celestial-stage-${layer}`} aria-hidden="true">
      <div className="celestial" aria-hidden="true">
        <div className="celestial-aura" />
        <div className="celestial-disc">
          <div className="celestial-sun" />
          <div className="celestial-moon" />
        </div>
      </div>
    </div>
  );
}
