globalThis.TRAVEL_COMPANION = {
  meta: {
    title: "__TRIP_TITLE__",
    subtitle: "On-trip companion",
    destination: "__DESTINATION__",
    dates: "__DATES__",
    timezone: "Asia/Tokyo",
    checkedOn: "YYYY-MM-DD",
    storageKey: "travel-companion",
    status: "Confirmed plan",
    footer: "Reconfirm live schedules, closures, and reservations when conditions may have changed."
  },
  days: [
    {
      id: "day1",
      date: "YYYY-MM-DD",
      dateLabel: "Day 1",
      city: "__DESTINATION__",
      route: "Arrival → hotel → first activity",
      sunset: "",
      hardGates: [
        {
          time: "18:30",
          label: "Dinner reservation",
          leaveBy: "18:00",
          fallback: "Skip the optional stop and go directly to the restaurant."
        }
      ],
      adjustments: {
        hot: {
          title: "Too hot",
          detail: "Take the shortest transfer, add an indoor break, and protect the next hard gate."
        },
        tired: {
          title: "Low energy",
          detail: "Drop the optional stop and keep only the confirmed reservation."
        },
        rain: {
          title: "Rain",
          detail: "Use the indoor fallback and take a taxi when the walking segment is exposed."
        }
      },
      events: [
        {
          id: "d1e1",
          time: "10:00",
          end: "11:00",
          kind: "arrival",
          icon: "✈️",
          title: "Arrive and collect luggage",
          localName: "Local-language destination",
          romanized: "Romanized destination",
          detail: "Clear arrival formalities and continue to the first transfer.",
          duration: "About 60 minutes",
          destination: "__DESTINATION__",
          maps: {
            google: "https://www.google.com/maps/search/?api=1&query=__DESTINATION__"
          },
          hardGate: false,
          latest: "",
          consequence: "",
          fallback: "",
          physical: ["Luggage"],
          food: [],
          branches: [],
          guide: {
            tag: "Arrival",
            summary: "Complete the essential arrival steps before adding optional stops.",
            do: ["Collect luggage", "Confirm the next departure", "Open the transfer map"],
            see: [],
            eat: [],
            route: ["Arrivals", "Transport counter or station", "Departure point"],
            tips: ["Protect the transfer buffer."],
            sources: []
          }
        },
        {
          id: "d1e2",
          time: "11:15",
          end: "12:00",
          kind: "transport",
          icon: "🚆",
          title: "Travel to the hotel area",
          localName: "Local service and destination",
          romanized: "Romanized service and destination",
          detail: "Use the confirmed service and keep tickets ready.",
          duration: "About 45 minutes",
          destination: "__DESTINATION__",
          maps: {
            google: "https://www.google.com/maps/dir/?api=1&destination=__DESTINATION__&travelmode=transit"
          },
          hardGate: true,
          latest: "Board by 11:15",
          consequence: "The next activity loses its buffer.",
          fallback: "Use the verified backup service.",
          physical: ["Station transfer", "Luggage"],
          food: [],
          branches: [],
          guide: {}
        },
        {
          id: "d1e3",
          time: "18:30",
          end: "20:00",
          kind: "reservation",
          icon: "🍽️",
          title: "Confirmed dinner",
          localName: "Restaurant local name",
          romanized: "Restaurant romanized name",
          detail: "Arrive 10 minutes early.",
          duration: "About 90 minutes",
          destination: "__DESTINATION__",
          maps: {
            google: "https://www.google.com/maps/search/?api=1&query=__DESTINATION__"
          },
          hardGate: true,
          latest: "Arrive by 18:20",
          consequence: "The reservation may be released or shortened.",
          fallback: "Call the restaurant and go directly there.",
          physical: ["Short walk"],
          food: ["Reserved meal"],
          branches: [],
          guide: {}
        }
      ]
    }
  ],
  bookings: [
    {
      id: "booking1",
      icon: "🍽️",
      title: "Confirmed dinner",
      detail: "Arrive 10 minutes early",
      date: "Day 1",
      time: "18:30",
      localName: "Restaurant local name",
      referenceLabel: "Booked"
    }
  ],
  toolkit: {
    emergency: [
      "If a hard gate is at risk, remove optional stops before changing the confirmed booking.",
      "Use official operator information for live disruption decisions.",
      "For immediate danger, follow local emergency guidance."
    ],
    phrases: [
      {
        label: "Please take me here",
        local: "ここまでお願いします。",
        romanized: "Koko made onegaishimasu."
      }
    ],
    notes: [
      "The itinerary and guides work offline after the files are saved on the device.",
      "External maps and live operator pages still require connectivity.",
      "Completion progress is stored only in this browser when local storage is available."
    ]
  },
  sources: []
};

