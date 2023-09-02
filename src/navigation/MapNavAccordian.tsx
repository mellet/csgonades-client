import { useRouter } from "next/router";
import { FC, useMemo, useState } from "react";
import {
  Accordion,
  AccordionItem,
  AccordionItemHeading,
  AccordionItemButton,
  AccordionItemPanel,
} from "react-accessible-accordion";
import { CsgoMap } from "../map/models/CsGoMap";
import { AccordianTitle } from "./AccordionTitle";
import { ActiveDutyNav } from "./ActiveDutyNav";
import { ReserveNav } from "./ReserveNav";
import { useGameMode } from "../core/useGameMode";

const ACTIVE_DUTY_ACCORDION = "activeduty" as const;
const RESERVE_ACCORDION = "reserve" as const;
type ActiveAccordion = typeof ACTIVE_DUTY_ACCORDION | typeof RESERVE_ACCORDION;

export const MapNavAccordian: FC = ({}) => {
  const { query } = useRouter();
  const selectedMap = query.map as CsgoMap;
  const mapList = useActiveDutyMaps();
  const reserveCsMapList = useReserveMaps();

  const preExpanded = useMemo(
    () =>
      reserveCsMapList.includes(selectedMap)
        ? RESERVE_ACCORDION
        : ACTIVE_DUTY_ACCORDION,
    [selectedMap, reserveCsMapList]
  );

  const [activeAccordion, setActiveAccordion] =
    useState<ActiveAccordion>(preExpanded);

  function onAccordianChange(activeUui: string[]) {
    const active = activeUui[0] as ActiveAccordion;
    setActiveAccordion(active);
  }

  return (
    <>
      <Accordion preExpanded={[preExpanded]} onChange={onAccordianChange}>
        <AccordionItem uuid={ACTIVE_DUTY_ACCORDION}>
          <AccordionItemHeading>
            <AccordionItemButton>
              <AccordianTitle
                title={"Active Duty"}
                isActive={ACTIVE_DUTY_ACCORDION === activeAccordion}
              />
            </AccordionItemButton>
          </AccordionItemHeading>
          <AccordionItemPanel>
            <ActiveDutyNav csMapList={mapList} />
          </AccordionItemPanel>
        </AccordionItem>
        {reserveCsMapList.length > 0 && (
          <AccordionItem uuid={RESERVE_ACCORDION}>
            <AccordionItemHeading>
              <AccordionItemButton>
                <AccordianTitle
                  title={"Reserve"}
                  isActive={RESERVE_ACCORDION === activeAccordion}
                />
              </AccordionItemButton>
            </AccordionItemHeading>
            <AccordionItemPanel>
              <ReserveNav />
            </AccordionItemPanel>
          </AccordionItem>
        )}
      </Accordion>
      <style jsx>{``}</style>
    </>
  );
};

const useActiveDutyMaps = (): CsgoMap[] => {
  const { gameMode } = useGameMode();

  const maps: CsgoMap[] =
    gameMode === "csgo"
      ? [
          "mirage",
          "inferno",
          "overpass",
          "ancient",
          "nuke",
          "vertigo",
          "anubis",
        ]
      : [
          "mirage",
          "inferno",
          "overpass",
          "ancient",
          "nuke",
          "vertigo",
          "anubis",
          "dust2",
        ];

  return maps;
};

const useReserveMaps = (): CsgoMap[] => {
  const { gameMode } = useGameMode();

  const maps: CsgoMap[] =
    gameMode === "csgo"
      ? ["dust2", "tuscan", "train", "cache", "cobblestone"]
      : [];

  return maps;
};
