export type Request = {
  id: string
  requestNo: string
  clientName: string
  clientEmail: string
  serviceName: string
  status: "New" | "Under investigation" | "Completed" | "Pending approval"
  date: string
  lastUpdate: string
  requestedIn: string
}

export const tableRows: Request[] = [
  { id: "1",  requestNo: "REQ-2025-001", clientName: "Noura Mansour",      clientEmail: "noura.mansour@gmail.com",      serviceName: "TWIMC Certificate",  status: "New",                 date: "02 Jan 2025", lastUpdate: "03 Jan 2025", requestedIn: "Al Barsha Police Station" },
  { id: "2",  requestNo: "REQ-2025-002", clientName: "Mohammed Al Rashid", clientEmail: "m.rashid@gmail.com",           serviceName: "Criminal complaint",  status: "Under investigation", date: "05 Jan 2025", lastUpdate: "08 Jan 2025", requestedIn: "Dubai Police HQ" },
  { id: "3",  requestNo: "REQ-2025-003", clientName: "Fatima Al Zaabi",    clientEmail: "fatima.zaabi@gmail.com",       serviceName: "Electronic agency",   status: "Completed",           date: "09 Jan 2025", lastUpdate: "14 Jan 2025", requestedIn: "Deira Police Station" },
  { id: "4",  requestNo: "REQ-2025-004", clientName: "Khalid Al Mansoori", clientEmail: "khalid.mansoori@gmail.com",    serviceName: "Visiting an inmate",  status: "Pending approval",    date: "13 Jan 2025", lastUpdate: "13 Jan 2025", requestedIn: "Al Barsha Police Station" },
  { id: "5",  requestNo: "REQ-2025-005", clientName: "Aisha Al Hamdan",    clientEmail: "aisha.hamdan@gmail.com",       serviceName: "Stop searching",      status: "Completed",           date: "17 Jan 2025", lastUpdate: "21 Jan 2025", requestedIn: "Dubai Police HQ" },
  { id: "6",  requestNo: "REQ-2025-006", clientName: "Yousuf Al Marzouqi", clientEmail: "yousuf.marzouqi@gmail.com",   serviceName: "TWIMC Certificate",  status: "New",                 date: "22 Jan 2025", lastUpdate: "22 Jan 2025", requestedIn: "Deira Police Station" },
  { id: "7",  requestNo: "REQ-2025-007", clientName: "Hessa Al Falasi",    clientEmail: "hessa.falasi@gmail.com",       serviceName: "Criminal complaint",  status: "Completed",           date: "28 Jan 2025", lastUpdate: "04 Feb 2025", requestedIn: "Al Barsha Police Station" },
  { id: "8",  requestNo: "REQ-2025-008", clientName: "Saeed Al Ketbi",     clientEmail: "saeed.ketbi@gmail.com",        serviceName: "Electronic agency",   status: "Pending approval",    date: "03 Feb 2025", lastUpdate: "05 Feb 2025", requestedIn: "Dubai Police HQ" },
  { id: "9",  requestNo: "REQ-2025-009", clientName: "Mariam Al Blooshi",  clientEmail: "mariam.blooshi@gmail.com",     serviceName: "Visiting an inmate",  status: "Under investigation", date: "07 Feb 2025", lastUpdate: "11 Feb 2025", requestedIn: "Deira Police Station" },
  { id: "10", requestNo: "REQ-2025-010", clientName: "Faisal Al Nuaimi",   clientEmail: "faisal.nuaimi@gmail.com",      serviceName: "Stop searching",      status: "New",                 date: "12 Feb 2025", lastUpdate: "12 Feb 2025", requestedIn: "Al Barsha Police Station" },
  { id: "11", requestNo: "REQ-2025-011", clientName: "Reem Al Shamsi",     clientEmail: "reem.shamsi@gmail.com",        serviceName: "TWIMC Certificate",  status: "Completed",           date: "17 Feb 2025", lastUpdate: "24 Feb 2025", requestedIn: "Dubai Police HQ" },
  { id: "12", requestNo: "REQ-2025-012", clientName: "Abdullah Al Mazrouei",clientEmail: "a.mazrouei@gmail.com",        serviceName: "Criminal complaint",  status: "Under investigation", date: "21 Feb 2025", lastUpdate: "28 Feb 2025", requestedIn: "Deira Police Station" },
  { id: "13", requestNo: "REQ-2025-013", clientName: "Dana Al Suwaidi",    clientEmail: "dana.suwaidi@gmail.com",       serviceName: "Electronic agency",   status: "Completed",           date: "03 Mar 2025", lastUpdate: "10 Mar 2025", requestedIn: "Al Barsha Police Station" },
  { id: "14", requestNo: "REQ-2025-014", clientName: "Jassim Al Muhairi",  clientEmail: "jassim.muhairi@gmail.com",     serviceName: "Visiting an inmate",  status: "Pending approval",    date: "08 Mar 2025", lastUpdate: "09 Mar 2025", requestedIn: "Dubai Police HQ" },
  { id: "15", requestNo: "REQ-2025-015", clientName: "Shaikha Al Dhaheri", clientEmail: "shaikha.dhaheri@gmail.com",    serviceName: "Stop searching",      status: "Completed",           date: "14 Mar 2025", lastUpdate: "19 Mar 2025", requestedIn: "Deira Police Station" },
  { id: "16", requestNo: "REQ-2025-016", clientName: "Rashid Al Qubaisi",  clientEmail: "rashid.qubaisi@gmail.com",     serviceName: "TWIMC Certificate",  status: "New",                 date: "20 Mar 2025", lastUpdate: "20 Mar 2025", requestedIn: "Al Barsha Police Station" },
  { id: "17", requestNo: "REQ-2025-017", clientName: "Moza Al Kaabi",      clientEmail: "moza.kaabi@gmail.com",         serviceName: "Criminal complaint",  status: "Pending approval",    date: "25 Mar 2025", lastUpdate: "27 Mar 2025", requestedIn: "Dubai Police HQ" },
  { id: "18", requestNo: "REQ-2025-018", clientName: "Sultan Al Ameri",    clientEmail: "sultan.ameri@gmail.com",       serviceName: "Electronic agency",   status: "Under investigation", date: "01 Apr 2025", lastUpdate: "07 Apr 2025", requestedIn: "Deira Police Station" },
  { id: "19", requestNo: "REQ-2025-019", clientName: "Nadia Al Hashimi",   clientEmail: "nadia.hashimi@gmail.com",      serviceName: "Visiting an inmate",  status: "Completed",           date: "07 Apr 2025", lastUpdate: "14 Apr 2025", requestedIn: "Al Barsha Police Station" },
  { id: "20", requestNo: "REQ-2025-020", clientName: "Hamdan Al Owais",    clientEmail: "hamdan.owais@gmail.com",       serviceName: "Stop searching",      status: "New",                 date: "11 Apr 2025", lastUpdate: "11 Apr 2025", requestedIn: "Dubai Police HQ" },
  { id: "21", requestNo: "REQ-2025-021", clientName: "Sara Khalid",        clientEmail: "sara.khalid@gmail.com",        serviceName: "TWIMC Certificate",  status: "Completed",           date: "16 Apr 2025", lastUpdate: "23 Apr 2025", requestedIn: "Deira Police Station" },
  { id: "22", requestNo: "REQ-2025-022", clientName: "Omar Hassan",        clientEmail: "omar.hassan@gmail.com",        serviceName: "Criminal complaint",  status: "Under investigation", date: "22 Apr 2025", lastUpdate: "29 Apr 2025", requestedIn: "Al Barsha Police Station" },
  { id: "23", requestNo: "REQ-2025-023", clientName: "Layla Noor",         clientEmail: "layla.noor@gmail.com",         serviceName: "Electronic agency",   status: "Pending approval",    date: "28 Apr 2025", lastUpdate: "30 Apr 2025", requestedIn: "Dubai Police HQ" },
  { id: "24", requestNo: "REQ-2025-024", clientName: "Ahmed Ali",          clientEmail: "ahmed.ali@gmail.com",          serviceName: "Visiting an inmate",  status: "New",                 date: "05 May 2025", lastUpdate: "05 May 2025", requestedIn: "Deira Police Station" },
]

// Derived from tableRows — update these if tableRows changes

export const statusDistData = [
  { status: "New",           count: 6 },
  { status: "Investigating", count: 5 },
  { status: "Completed",     count: 8 },
  { status: "Pending",       count: 5 },
]

export const serviceCountData = [
  { service: "TWIMC Cert.",  count: 5 },
  { service: "Criminal",     count: 5 },
  { service: "Electronic",   count: 5 },
  { service: "Inmate Visit", count: 5 },
  { service: "Stop Search",  count: 4 },
]

export const stationPerfData = [
  { station: "Al Barsha", total: 8, completed: 3 },
  { station: "Dubai HQ",  total: 8, completed: 2 },
  { station: "Deira",     total: 8, completed: 3 },
]

export const stationStatusData = [
  { station: "Al Barsha", new: 3, investigating: 1, completed: 3, pending: 1 },
  { station: "Dubai HQ",  new: 1, investigating: 1, completed: 2, pending: 4 },
  { station: "Deira",     new: 2, investigating: 3, completed: 3, pending: 0 },
]

// Status as radar axis, one series per station — shows each station's request profile
export const stationStatusRadarData = [
  { metric: "New",           alBarsha: 33, dubaiHQ: 10, deira: 22 },
  { metric: "Investigating", alBarsha: 22, dubaiHQ:31, deira: 13 },
  { metric: "Completed",     alBarsha: 23, dubaiHQ: 12, deira: 13 },
  { metric: "Pending",       alBarsha: 31,dubaiHQ: 14, deira: 10 },
]

export const serviceStationData = [
  { service: "TWIMC Cert.",  alBarsha: 2, dubaiHQ: 1, deira: 2 },
  { service: "Criminal",     alBarsha: 2, dubaiHQ: 2, deira: 1 },
  { service: "Electronic",   alBarsha: 1, dubaiHQ: 2, deira: 2 },
  { service: "Inmate Visit", alBarsha: 2, dubaiHQ: 1, deira: 2 },
  { service: "Stop Search",  alBarsha: 1, dubaiHQ: 2, deira: 1 },
]

export const clientCountData = [
  { client: "Noura M.",    count: 1 },
  { client: "M. Rashid",   count: 1 },
  { client: "F. Zaabi",    count: 1 },
  { client: "K. Mansoori", count: 1 },
  { client: "A. Hamdan",   count: 1 },
  { client: "Y. Marzouqi", count: 1 },
  { client: "H. Falasi",   count: 1 },
  { client: "S. Ketbi",    count: 1 },
  { client: "M. Blooshi",  count: 1 },
  { client: "F. Nuaimi",   count: 1 },
  { client: "R. Shamsi",   count: 1 },
  { client: "A. Mazrouei", count: 1 },
  { client: "D. Suwaidi",  count: 1 },
  { client: "J. Muhairi",  count: 1 },
  { client: "S. Dhaheri",  count: 1 },
  { client: "R. Qubaisi",  count: 1 },
  { client: "M. Kaabi",    count: 1 },
  { client: "S. Ameri",    count: 1 },
  { client: "N. Hashimi",  count: 1 },
  { client: "H. Owais",    count: 1 },
  { client: "Sara K.",     count: 1 },
  { client: "Omar H.",     count: 1 },
  { client: "Layla N.",    count: 1 },
  { client: "Ahmed A.",    count: 1 },
]

// Rows 1-7 → Jan, 8-12 → Feb, 13-17 → Mar, 18-23 → Apr, 24 → May
export const statusByMonthData = [
  { month: "Jan", new: 2, investigating: 1, completed: 3, pending: 1 },
  { month: "Feb", new: 1, investigating: 2, completed: 1, pending: 1 },
  { month: "Mar", new: 1, investigating: 0, completed: 2, pending: 2 },
  { month: "Apr", new: 1, investigating: 2, completed: 2, pending: 1 },
  { month: "May", new: 1, investigating: 0, completed: 0, pending: 0 },
]

export const requestFlowSankeyData = {
  nodes: [
    { name: "TWIMC Cert."  },   // 0
    { name: "Criminal"     },   // 1
    { name: "Electronic"   },   // 2
    { name: "Inmate Visit" },   // 3
    { name: "Stop Search"  },   // 4
    { name: "Al Barsha"    },   // 5
    { name: "Dubai HQ"     },   // 6
    { name: "Deira"        },   // 7
    { name: "New"          },   // 8
    { name: "Investigating"},   // 9
    { name: "Completed"    },   // 10
    { name: "Pending"      },   // 11
  ],
  links: [
    { source: 0, target: 5, value: 2 },
    { source: 0, target: 6, value: 1 },
    { source: 0, target: 7, value: 2 },
    { source: 1, target: 5, value: 2 },
    { source: 1, target: 6, value: 2 },
    { source: 1, target: 7, value: 1 },
    { source: 2, target: 5, value: 1 },
    { source: 2, target: 6, value: 2 },
    { source: 2, target: 7, value: 2 },
    { source: 3, target: 5, value: 2 },
    { source: 3, target: 6, value: 1 },
    { source: 3, target: 7, value: 2 },
    { source: 4, target: 5, value: 1 },
    { source: 4, target: 6, value: 2 },
    { source: 4, target: 7, value: 1 },
    { source: 5, target:  8, value: 3 },
    { source: 5, target:  9, value: 1 },
    { source: 5, target: 10, value: 3 },
    { source: 5, target: 11, value: 1 },
    { source: 6, target:  8, value: 1 },
    { source: 6, target:  9, value: 1 },
    { source: 6, target: 10, value: 2 },
    { source: 6, target: 11, value: 4 },
    { source: 7, target:  8, value: 2 },
    { source: 7, target:  9, value: 3 },
    { source: 7, target: 10, value: 3 },
  ],
}
