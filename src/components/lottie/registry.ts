
export { default as ActiveTickets  } from "./03. Active Tickets.json"
export { default as CompletedRequest } from "./04. Completed Request.json"
export { default as Icon01  } from "./Icon_01.json"
export { default as Icon02  } from "./Icon_02.json"
export { default as Icon03  } from "./Icon_03.json"
export { default as Icon04  } from "./Icon_04.json"
export { default as Icon05  } from "./Icon_05.json"
export { default as Icon06  } from "./Icon_06.json"
export { default as Icon07  } from "./Icon_07.json"
export { default as Icon08  } from "./Icon_08.json"
export { default as Icon09a } from "./Icon_09 (1).json"
export { default as Icon09b } from "./Icon_09 (2).json"
export { default as Icon10  } from "./Icon_10.json"
export { default as Icon11  } from "./Icon_11.json"
export { default as Icon12  } from "./Icon_12.json"
export { default as Icon13  } from "./Icon_13.json"
export { default as Icon14  } from "./Icon_14.json"
export { default as Icon15  } from "./Icon_15.json"
export { default as Icon16  } from "./Icon_16.json"
export { default as Icon17  } from "./Icon_17.json"
export { default as Icon18  } from "./Icon_18.json"
export { default as Icon19  } from "./Icon_19.json"
export { default as Icon20  } from "./Icon_20.json"
export { default as Icon21  } from "./Icon_21.json"
export { default as Icon22  } from "./Icon_22.json"
export { default as Icon23  } from "./Icon_23.json"
export { default as Icon24  } from "./Icon_24.json"
export { default as Icon25a } from "./Icon_25 (1).json"
export { default as Icon25b } from "./Icon_25 (2).json"
export { default as Icon26  } from "./Icon_26.json"
export { default as Icon27  } from "./Icon_27.json"
export { default as Icon28  } from "./Icon_28.json"
export { default as Icon29  } from "./Icon_29.json"
export { default as Icon30  } from "./Icon_30.json"
export { default as Icon31  } from "./Icon_31.json"
export { default as Icon32  } from "./Icon_32.json"
export { default as Icon33  } from "./Icon_33.json"
export { default as Icon34  } from "./Icon_34.json"
export { default as Icon35  } from "./Icon_35.json"
export { default as Icon36  } from "./Icon_36.json"
export { default as Icon37  } from "./Icon_37.json"
export { default as Icon38  } from "./Icon_38.json"
export { default as Icon39  } from "./Icon_39.json"
export { default as Icon40  } from "./Icon_40.json"
export { default as Icon43  } from "./Icon_43.json"
export { default as Icon44  } from "./Icon_44.json"
export { default as Icon45  } from "./Icon_45.json"
export { default as Icon48  } from "./Icon_48.json"
export { default as Icon49a } from "./Icon_49 (1).json"
export { default as Icon49b } from "./Icon_49 (2).json"
export { default as Icon50  } from "./Icon_50.json"
export { default as Icon51  } from "./Icon_51.json"

// ─── Registry array (used by the Lottie showcase page) ───────────────────────
// Dynamic imports keep the showcase page lazy — each JSON is only fetched when
// its card is mounted, not on initial page load.

export interface LottieIconEntry {
  id: string
  name: string
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  load: () => Promise<any>
}

export const lottieRegistry: LottieIconEntry[] = [
  { id: "active-tickets",  name: "Active Tickets",  load: () => import("./03. Active Tickets.json") },
  { id: "completed-request", name: "Completed Request", load: () => import("./04. Completed Request.json") },
  { id: "icon-01",  name: "Icon 01",      load: () => import("./Icon_01.json") },
  { id: "icon-02",  name: "Icon 02",      load: () => import("./Icon_02.json") },
  { id: "icon-03",  name: "Icon 03",      load: () => import("./Icon_03.json") },
  { id: "icon-04",  name: "Icon 04",      load: () => import("./Icon_04.json") },
  { id: "icon-05",  name: "Icon 05",      load: () => import("./Icon_05.json") },
  { id: "icon-06",  name: "Icon 06",      load: () => import("./Icon_06.json") },
  { id: "icon-07",  name: "Icon 07",      load: () => import("./Icon_07.json") },
  { id: "icon-08",  name: "Icon 08",      load: () => import("./Icon_08.json") },
  { id: "icon-09-1", name: "Icon 09 (1)", load: () => import("./Icon_09 (1).json") },
  { id: "icon-09-2", name: "Icon 09 (2)", load: () => import("./Icon_09 (2).json") },
  { id: "icon-10",  name: "Icon 10",      load: () => import("./Icon_10.json") },
  { id: "icon-11",  name: "Icon 11",      load: () => import("./Icon_11.json") },
  { id: "icon-12",  name: "Icon 12",      load: () => import("./Icon_12.json") },
  { id: "icon-13",  name: "Icon 13",      load: () => import("./Icon_13.json") },
  { id: "icon-14",  name: "Icon 14",      load: () => import("./Icon_14.json") },
  { id: "icon-15",  name: "Icon 15",      load: () => import("./Icon_15.json") },
  { id: "icon-16",  name: "Icon 16",      load: () => import("./Icon_16.json") },
  { id: "icon-17",  name: "Icon 17",      load: () => import("./Icon_17.json") },
  { id: "icon-18",  name: "Icon 18",      load: () => import("./Icon_18.json") },
  { id: "icon-19",  name: "Icon 19",      load: () => import("./Icon_19.json") },
  { id: "icon-20",  name: "Icon 20",      load: () => import("./Icon_20.json") },
  { id: "icon-21",  name: "Icon 21",      load: () => import("./Icon_21.json") },
  { id: "icon-22",  name: "Icon 22",      load: () => import("./Icon_22.json") },
  { id: "icon-23",  name: "Icon 23",      load: () => import("./Icon_23.json") },
  { id: "icon-24",  name: "Icon 24",      load: () => import("./Icon_24.json") },
  { id: "icon-25-1", name: "Icon 25 (1)", load: () => import("./Icon_25 (1).json") },
  { id: "icon-25-2", name: "Icon 25 (2)", load: () => import("./Icon_25 (2).json") },
  { id: "icon-26",  name: "Icon 26",      load: () => import("./Icon_26.json") },
  { id: "icon-27",  name: "Icon 27",      load: () => import("./Icon_27.json") },
  { id: "icon-28",  name: "Icon 28",      load: () => import("./Icon_28.json") },
  { id: "icon-29",  name: "Icon 29",      load: () => import("./Icon_29.json") },
  { id: "icon-30",  name: "Icon 30",      load: () => import("./Icon_30.json") },
  { id: "icon-31",  name: "Icon 31",      load: () => import("./Icon_31.json") },
  { id: "icon-32",  name: "Icon 32",      load: () => import("./Icon_32.json") },
  { id: "icon-33",  name: "Icon 33",      load: () => import("./Icon_33.json") },
  { id: "icon-34",  name: "Icon 34",      load: () => import("./Icon_34.json") },
  { id: "icon-35",  name: "Icon 35",      load: () => import("./Icon_35.json") },
  { id: "icon-36",  name: "Icon 36",      load: () => import("./Icon_36.json") },
  { id: "icon-37",  name: "Icon 37",      load: () => import("./Icon_37.json") },
  { id: "icon-38",  name: "Icon 38",      load: () => import("./Icon_38.json") },
  { id: "icon-39",  name: "Icon 39",      load: () => import("./Icon_39.json") },
  { id: "icon-40",  name: "Icon 40",      load: () => import("./Icon_40.json") },
  { id: "icon-43",  name: "Icon 43",      load: () => import("./Icon_43.json") },
  { id: "icon-44",  name: "Icon 44",      load: () => import("./Icon_44.json") },
  { id: "icon-45",  name: "Icon 45",      load: () => import("./Icon_45.json") },
  { id: "icon-48",  name: "Icon 48",      load: () => import("./Icon_48.json") },
  { id: "icon-49-1", name: "Icon 49 (1)", load: () => import("./Icon_49 (1).json") },
  { id: "icon-49-2", name: "Icon 49 (2)", load: () => import("./Icon_49 (2).json") },
  { id: "icon-50",  name: "Icon 50",      load: () => import("./Icon_50.json") },
  { id: "icon-51",  name: "Icon 51",      load: () => import("./Icon_51.json") },
]
