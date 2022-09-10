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

const ACTIVE_DUTY_ACCORDION = "activeduty" as const;
const RESERVE_ACCORDION = "reserve" as const;
type ActiveAccordion = typeof ACTIVE_DUTY_ACCORDION | typeof RESERVE_ACCORDION;

export const MapNavAccordian: FC = ({}) => {
  const { query } = useRouter();
  const selectedMap = query.map as CsgoMap;

  const preExpanded = useMemo(() => {
    if (
      selectedMap === "tuscan" ||
      selectedMap === "train" ||
      selectedMap === "anubis" ||
      selectedMap === "cache" ||
      selectedMap === "cobblestone"
    ) {
      return RESERVE_ACCORDION;
    }
    return ACTIVE_DUTY_ACCORDION;
  }, [selectedMap]);

  const [activeAccordion, setActiveAccordion] =
    useState<ActiveAccordion>(preExpanded);

  function onAccordianChange(activeUui: string[]) {
    console.log("Active", activeUui);
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
            <ActiveDutyNav />
          </AccordionItemPanel>
        </AccordionItem>
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
      </Accordion>
      <style jsx>{``}</style>
    </>
  );
};
