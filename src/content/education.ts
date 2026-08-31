// The education and experience timeline. Dates and titles are carried over
// from the old site unchanged. `logo` points at public/logos/. Where no usable
// institutional mark exists, `monogram` renders a typeset tile instead, which
// is deliberate rather than a missing image.

export interface TimelineEntry {
  start: string
  end: string
  title: string
  institution: string
  location: string
  logo?: string
  monogram: string
  note?: string
}

export const education: TimelineEntry[] = [
  {
    start: 'Aug 2025',
    end: 'May 2027',
    title: 'M.S. Engineering, Creative Technology and Design',
    institution: 'University of Colorado Boulder, ATLAS Institute',
    location: 'Boulder, CO',
    logo: '/logos/cu-boulder.png',
    monogram: 'CU',
  },
  {
    start: 'Aug 2023',
    end: 'Present',
    title: 'Student Pilot',
    institution: "FTP and Journey's Aviation",
    location: 'Winter Park, FL and Boulder, CO',
    logo: '/logos/journeys-aviation.png',
    monogram: 'JA',
  },
  {
    start: 'Aug 2020',
    end: 'May 2023',
    title: 'B.A. Computer Science',
    institution: 'Rollins College',
    location: 'Winter Park, FL',
    logo: '/logos/rollins.png',
    monogram: 'RC',
    note: '4.0 GPA',
  },
  {
    start: 'Aug 2022',
    end: 'Dec 2022',
    title: 'Object Oriented Programming',
    institution: 'University of Central Florida',
    location: 'Orlando, FL',
    logo: '/logos/ucf.png',
    monogram: 'UCF',
  },
  {
    start: 'May 2022',
    end: 'Aug 2022',
    title: 'Software Development',
    institution: 'University of Colorado Boulder',
    location: 'Boulder, CO',
    logo: '/logos/cu-boulder.png',
    monogram: 'CU',
  },
  {
    start: 'May 2021',
    end: 'Jun 2021',
    title: 'Driving School',
    institution: 'Radford Racing School',
    location: 'Chandler, AZ',
    logo: '/logos/radford-racing.png',
    monogram: 'RR',
  },
  {
    start: 'Aug 2019',
    end: 'Dec 2019',
    title: 'Sustainable Engineering and Architecture',
    institution: 'University of Massachusetts Amherst',
    location: 'Amherst, MA',
    logo: '/logos/umass-amherst.png',
    monogram: 'UM',
  },
  {
    start: 'Jun 2019',
    end: 'Aug 2019',
    title: 'Industrial Design, Sketching and Rendering',
    institution: 'Rhode Island School of Design',
    location: 'Providence, RI',
    logo: '/logos/risd.png',
    monogram: 'RISD',
  },
  {
    start: 'May 2018',
    end: 'Aug 2018',
    title: 'Economics',
    institution: 'Brown University',
    location: 'Providence, RI',
    logo: '/logos/brown.png',
    monogram: 'BU',
  },
]

export const experience: TimelineEntry[] = [
  {
    start: 'Jan 2023',
    end: 'Present',
    title: 'Founder and Lead Developer',
    institution: 'Sutton Web Solutions',
    location: 'Boulder, CO',
    monogram: 'SW',
  },
  {
    start: 'Jun 2022',
    end: 'Dec 2022',
    title: 'Video and Photography Technician',
    institution: 'Film Gear South Africa',
    location: 'Cape Town, South Africa',
    monogram: 'FG',
  },
  {
    start: 'May 2021',
    end: 'Aug 2021',
    title: 'Sustainable Engineer',
    institution: 'Yestermorrow Design/Build School',
    location: 'Waitsfield, VT',
    monogram: 'YM',
  },
]
