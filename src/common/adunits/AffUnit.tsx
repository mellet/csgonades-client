import { FC, memo } from "react";

const units = [
  {
    name: "kinguin",
    link: "https://www.tkqlhce.com/click-8411959-14050302",
    img: "https://www.tqlkg.com/image-8411959-14050302",
    height: 250,
    width: 300,
    alt: "Promote & earn money",
  },
  {
    name: "dayton",
    link: "https://www.anrdoezrs.net/click-8411959-14039103",
    img: "https://www.lduhtrp.net/image-8411959-14039103",
    height: 250,
    width: 250,
    alt: "Dayton CSA Work Boots",
  },
  {
    name: "lootbox",
    link: "https://www.tkqlhce.com/click-8411959-13902096",
    img: "https://www.awltovhc.com/image-8411959-13902096",
    width: 300,
    height: 250,
    alt: "Get the #1 monthly mystery box for geeks & gamers!",
  },
  {
    name: "turtlebeach",
    link: "https://www.dpbolvw.net/click-8411959-13835878",
    img: "https://www.ftjcfx.com/image-8411959-13835878",
    width: 300,
    height: 250,
    alt: "Elite Pro 2 Headsets",
  },
];

export const AffUnit: FC = memo(({}) => {
  const randomAff = getCurrentAffiliateBanner();

  return (
    <>
      <div className="aff-unit">
        <a href={randomAff.link} target="_top">
          <img
            src={randomAff.img}
            width={randomAff.width}
            height={randomAff.height}
            alt={randomAff.alt}
          />
        </a>
      </div>
      <style jsx>{`
        .aff-unit {
          display: flex;
          justify-content: space-around;
          height: 250px;
          background: rgba(255, 255, 255, 0.15) url("/noph.svg");
          background-repeat: no-repeat;
          background-position: 50% 50%;
          background-size: 18px;
        }
      `}</style>
    </>
  );
});

function getCurrentAffiliateBanner() {
  const currentDayOfWeek = new Date().getDay();

  switch (currentDayOfWeek) {
    // Monday
    case 1:
      return units[0]; // kinguin
    // Tuesday
    case 2:
      return units[1]; // dayton
    // Saturday
    case 6:
      return units[3]; // turtlebeach
    // Sunday
    case 7:
      return units[2]; // lootbox
    default:
      return units[Math.floor(Math.random() * units.length)];
  }
}
