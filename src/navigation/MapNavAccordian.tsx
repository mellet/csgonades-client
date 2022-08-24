import { FC, useState } from "react";
import {
  Accordion,
  AccordionItem,
  AccordionItemHeading,
  AccordionItemButton,
  AccordionItemPanel,
} from "react-accessible-accordion";
import { AccordianTitle } from "./AccordionTitle";
import { ActiveDutyNav } from "./ActiveDutyNav";
import { ReserveNav } from "./ReserveNav";

const ACTIVE_DUTY_ACCORDION = "activeduty" as const;
const RESERVE_ACCORDION = "reserve" as const;
type ActiveAccordion = typeof ACTIVE_DUTY_ACCORDION | typeof RESERVE_ACCORDION;

export const MapNavAccordian: FC = ({}) => {
  const [activeAccordion, setActiveAccordion] = useState<ActiveAccordion>(
    ACTIVE_DUTY_ACCORDION
  );

  function onAccordianChange(activeUui: string[]) {
    console.log("Active", activeUui);
    const active = activeUui[0] as ActiveAccordion;
    setActiveAccordion(active);
  }

  return (
    <>
      <Accordion preExpanded={["activeduty"]} onChange={onAccordianChange}>
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
