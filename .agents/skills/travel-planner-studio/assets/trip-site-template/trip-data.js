globalThis.TRIP_PLAN = {
  meta: {
    title: "__TRIP_TITLE__",
    subtitle: "A practical, source-checked itinerary with routes, dining, maps, and fallbacks.",
    eyebrow: "__DESTINATION__ · __DATES__",
    destination: "__DESTINATION__",
    dates: "__DATES__",
    checkedOn: "YYYY-MM-DD",
    slug: "trip-plan",
    status: "Draft for review",
    footer: "Recheck time-sensitive transport, restaurant, and opening information before departure."
  },

  routeStops: ["Arrival", "Base 1", "Base 2", "Departure"],

  stays: [
    {
      date: "Night 1",
      name: "Accommodation name",
      localName: "Local-language name",
      status: "Needs confirmation",
      detail: "Explain why this location works and any luggage/check-in constraint.",
      mapUrl: "https://www.google.com/maps/search/?api=1&query=Destination"
    }
  ],

  days: [
    {
      id: "day1",
      date: "Day 1",
      place: "Arrival area",
      theme: "Arrival and a light first day",
      summary: "Keep the arrival day light and protect the first hard closing time.",
      status: "Recommended",
      timeline: [
        {
          time: "13:20",
          title: "Arrive",
          english: "Airport / station name",
          local: "Local-language name",
          detail: "Include immigration, baggage, ticket collection, and transfer buffer.",
          status: "Confirmed",
          hardGate: false
        },
        {
          time: "16:30",
          title: "First major anchor",
          english: "English name",
          local: "Local-language name",
          detail: "State the last-entry deadline and what to do if arrival is late.",
          status: "Verified",
          hardGate: true
        }
      ],
      map: {
        query: "Destination",
        caption: "Use separate links for airport/station, hotel, and the activity cluster.",
        actions: [
          {
            label: "Arrival → hotel",
            url: "https://www.google.com/maps/dir/?api=1&origin=Airport&destination=Hotel&travelmode=transit"
          },
          {
            label: "Hotel → first anchor",
            url: "https://www.google.com/maps/dir/?api=1&origin=Hotel&destination=Attraction&travelmode=walking"
          }
        ]
      },
      alternatives: [
        {
          name: "Late-arrival fallback",
          tag: "Operational fallback",
          detail: "Use when the arrival buffer is consumed.",
          tradeoffs: ["Skip the timed interior visit", "Keep the exterior walk and dinner"]
        }
      ],
      dining: [
        {
          name: "Restaurant or neighborhood",
          localName: "Local-language name",
          meal: "Dinner",
          rating: "Needs confirmation",
          ratingSource: "Local review platform",
          checkedOn: "YYYY-MM-DD",
          price: "Currency range per person",
          booking: "Walk-in",
          detail: "Explain why it fits the confirmed route.",
          mapUrl: "https://www.google.com/maps/search/?api=1&query=Restaurant",
          sourceUrl: "https://example.com"
        }
      ],
      notices: [
        "State the day's largest risk and the exact trigger for switching to the fallback."
      ]
    }
  ],

  transportGuide: [
    {
      date: "Day/date",
      label: "Origin → destination",
      service: "Traveler-language service name",
      english: "English service name",
      local: "Local-language service name",
      origin: "Origin station",
      destination: "Destination station",
      direction: "Destination display",
      time: "Departure–arrival",
      reservation: "Needs confirmation",
      instructions: ["Where to enter", "Where to transfer", "How early to reach the platform"],
      sourceUrl: "https://example.com"
    }
  ],

  actionItems: [
    {
      priority: "1",
      action: "Confirm the highest-risk reservation",
      deadline: "Lead time",
      status: "Open",
      reason: "Explain the downstream impact."
    }
  ],

  feedback: [
    {
      key: "day1",
      label: "Day 1 plan",
      default: "Recommended main line",
      options: ["Recommended main line", "Late-arrival fallback"]
    }
  ],

  sources: [
    { label: "Official transport source", url: "https://example.com" },
    { label: "Official attraction source", url: "https://example.com" }
  ]
};
