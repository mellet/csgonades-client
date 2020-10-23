/* eslint-disable @typescript-eslint/no-unused-vars */

declare namespace ezstandalone {
  let useHost: boolean;
  let enabled: boolean;
  let scriptsLoaded: boolean;
  let DEBUG: boolean;
  let hasDisplayedAds: boolean;
  let initialized: boolean;
  let cmd: { push: (cb: () => void) => void };
  let selectedPlaceholders: { [key: string]: boolean };
  let targetingMap: { [key: string]: string };
  function define(...args: any): void;
  function enable(): void;
  function display(): void;
  function refresh(): void;
  function destroy(): void;
  function init(): void;
  function reinitializeGroupVars(): void;
  function isEzoicUser(isEzoicUser: number): void;
  function appendPlaceholders(...args: any): void;
  function findAll(): void;
  function clear(): void;
  function setIsPWA(): void;
  function setCollapseEmptyDiv(): void;
  function setLTCacheLevel(): void;
  function setHasBadWords(): void;
  function setWorstBadWordRank(): void;
  function setABTest(): void;
  function setTargeting(): void;
  function getPlaceholderElems(): void;
  function clearPlaceholderElems(): void;
  function fireEvent(): void;
  function loadGroup(
    placeholderIds: number[],
    callDisplay?: boolean,
    callDefine?: boolean,
    newPageview?: boolean,
    callback?: () => void
  ): void;
  function loadMore(slots: number[]): void;
  function load(): void;
  function generateStandaloneScriptURL(): void;
  function onStandaloneLoadEvent(): void;
  function setWC(): void;
  function getWC(): void;
  function log(): void;
  function get_ez_domain(): string;
  function set_cookie(): void;
  function sync_cookies(): void;
  function get_cors(): void;
  function setDisablePersonalizedStatistics(): void;
  function setDisablePersonalizedAds(): void;
  function setEzoicAnchorAd(val: boolean): void;
}
