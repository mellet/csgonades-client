import { memo, useEffect } from "react";

export const EzoicLoader = memo(() => {
  useEffect(() => {
    const ezstandalone = (window.ezstandalone = window.ezstandalone || {});
    ezstandalone.cmd = ezstandalone.cmd || [];

    ezstandalone.cmd.push(function () {
      const csgoEzoicCodes = findAdCode();
      console.log("> codes", csgoEzoicCodes);
      ezstandalone.define(...csgoEzoicCodes);
      console.log("> define");
      ezstandalone.enable();
      console.log("> enable");
    });

    const delay = setTimeout(() => {
      ezstandalone.cmd.push(function () {
        ezstandalone.display();
        ezstandalone.refresh();
        console.log("> display, refresh");
      });
    }, 2000);
    return () => clearTimeout(delay);
  }, []);
  return null;
});

function findAdCode() {
  function isHidden(el: any) {
    return el.offsetParent === null;
  }

  const adIds: number[] = [];

  const elements = document.querySelectorAll(
    'div[id^="ezoic-pub-ad-placeholder"]'
  );

  elements.forEach((el) => {
    if (isHidden(el)) {
      return;
    }

    try {
      const id = Number(el.id.split("-").pop());
      adIds.push(id);
    } catch (error) {
      console.error("Failed to parse ad id");
    }
  });

  return adIds;
}
