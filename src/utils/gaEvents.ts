"use client";

import { sendGAEvent } from "@next/third-parties/google";

/**
 * The track function in TypeScript sends a Google Tag Manager event with the specified event name and
 * value.
 * @param {string} eventName - The `eventName` parameter is a string that represents the name of the
 * event being tracked. It could be something like "buttonClick", "formSubmit", "pageView", etc.
 * @param {any} value - The `value` parameter in the `track` function is a dynamic value that can be of
 * any data type (e.g., string, number, object). It is used to provide additional information or
 * context related to the event being tracked.
 */
export const track = (eventName: string, value?: any) => {
  sendGAEvent("event", eventName, value);
};

export const EVENT_NAMES = {
  BOOKMARK: "bookmark",
  UNBOOKMARK: "unbookmark",
  GITHUB_LINK: "githubLink",
  NPM_LINK: "npmLink",
  WEBSITE_LINK: "websiteLink",
  RUNKIT_LINK: "runKitLink",
  VIEW_BOOKMARK: "viewBookmark",
  CLICK_SAVED_BOOKMARK: "clickSavedBookmark",
  SIMILAR_PACKAGE_LINK: "similarPackageLink",
  TABS_CHANGE: "tabsChange",
  DEVELOPER_LINK_CLICK: "developerLink",
};
