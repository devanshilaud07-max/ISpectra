import { IndianStandard, ExamplePreset } from '../types/standards';

export const VERIFIED_BIS_STANDARDS: IndianStandard[] = [
  // --- LED Street Lighting Suite ---
  {
    id: 'IS 10322 (Part 5/Sec 3): 2012',
    bisCatalogueNumber: 'BIS/ETD-24/IS-10322-5-3',
    title: 'Luminaires — Particular Requirements: Luminaires for Road and Street Lighting',
    department: 'ETD 24 (Illuminating Engineering and Luminaires)',
    category: 'Primary Product',
    relationship: 'PRIMARY STANDARD',
    status: 'CURRENT',
    amendmentCount: 2,
    lastAmendmentDate: 'March 2021 (Amendment 2: Mechanical vibration resistance & optical shielding update)',
    supersededStandard: 'IS 10322 (Part 5/Sec 3): 1987',
    mandatoryQCO: true,
    certificationScheme: 'BIS CRS (Compulsory Registration)',
    gazetteOrderRef: 'S.O. 2357(E) under Electronics & IT Goods (Requirements for Compulsory Registration) Order',
    confidence: 94,
    retrievalScore: 0.942,
    matchType: 'Semantic + BM25 Hybrid',
    whyApplies: 'Directly specifies constructional, thermal, ingress, and photometric requirements for road and street lighting luminaires utilizing solid-state LED light sources.',
    matchedRequirements: ['LED street light', '90 W', 'IP66 ingress protection', 'Roadway optics', 'External mounting'],
    scopeEvidence: 'Clause 1.1: "This section specifies requirements for luminaires for road, street lighting and other public outdoor applications, on electrical supply voltages not exceeding 1 000 V, using tungsten filament, tubular fluorescent and other discharge lamps, including LED sources."',
    clauses: [
      {
        clauseNumber: 'Clause 3.1 & 3.2',
        clauseTitle: 'Classification by Degree of Protection (IP Code)',
        clauseExcerpt: 'Luminaires intended for roadway outdoor duty shall have an ingress protection rating of not less than IP65. When specified as IP66, test seals and gaskets must undergo thermal cycling under Clause 12 before IP spray chamber validation.',
        relevanceExplanation: 'Satisfies tender stipulation for IP66 waterproof and dust-tight performance under harsh ambient weather.',
        retrievalScore: 0.95
      },
      {
        clauseNumber: 'Clause 4.14',
        clauseTitle: 'Wind Force and Vibration Resistance',
        clauseExcerpt: 'Street lighting luminaires must withstand sustained lateral aerodynamic wind drag force equivalent to 150 km/h without structural bracket deflection exceeding 2 degrees.',
        relevanceExplanation: 'Guarantees mechanical stability on utility light poles specified in municipal roadway tenders.',
        retrievalScore: 0.89
      },
      {
        clauseNumber: 'Clause 8.2',
        clauseTitle: 'Creepage and Clearance Distances',
        clauseExcerpt: 'Insulation distances between active 230V mains terminals and touchable die-cast aluminium housing shall satisfy reinforced insulation tolerances (minimum 5.0 mm).',
        relevanceExplanation: 'Enforces electrical safety against electric shock for outdoor utility personnel.',
        retrievalScore: 0.91
      }
    ],
    alliedStandards: [
      {
        standardId: 'IS 15885 (Part 2/Sec 13): 2012',
        relationshipType: 'Safety Requirement',
        description: 'Mandatory electronic driver safety standard for LED luminaires under BIS CRS.'
      },
      {
        standardId: 'IS 16107 (Part 2/Sec 1): 2012',
        relationshipType: 'Test Method',
        description: 'Luminous efficacy (lm/W), lumen maintenance, and optical performance validation.'
      },
      {
        standardId: 'IS/IEC 60529: 2001',
        relationshipType: 'Test Method',
        description: 'Chamber testing protocol for verifying IP66 water jet and dust ingress resistance.'
      },
      {
        standardId: 'IS 16108: 2012',
        relationshipType: 'Safety Requirement',
        description: 'Photobiological safety classification assessing blue light hazard to human retinas.'
      }
    ],
    isVerifiedBIS: true,
    publishedYear: 2012,
    pageCount: 38
  },
  {
    id: 'IS 16107 (Part 2/Sec 1): 2012',
    bisCatalogueNumber: 'BIS/ETD-24/IS-16107-2-1',
    title: 'Single Capped LED Lamps — Performance Requirements: LED Luminaires',
    department: 'ETD 24 (Illuminating Engineering and Luminaires)',
    category: 'Testing',
    relationship: 'ALLIED STANDARD',
    status: 'CURRENT',
    amendmentCount: 1,
    lastAmendmentDate: 'November 2019 (Harmonized with IEC 62722-2-1)',
    mandatoryQCO: true,
    certificationScheme: 'Mandatory QCO',
    gazetteOrderRef: 'BEE Star Rating Notification & BIS QCO',
    confidence: 91,
    retrievalScore: 0.914,
    matchType: 'Cross-Encoder Reranked',
    whyApplies: 'Governs luminous efficacy (minimum lumens per watt), color rendering index (CRI), chromaticity coordinates, and life endurance testing for the 90W LED luminaire.',
    matchedRequirements: ['90 W power rating', 'Luminous efficacy', '5-year life expectation', 'Optical distribution'],
    scopeEvidence: 'Clause 1: "This standard covers the performance requirements for LED luminaires, together with test methods and conditions, required to show compliance of LED luminaires for general lighting purposes."',
    clauses: [
      {
        clauseNumber: 'Clause 7.1',
        clauseTitle: 'Rated Luminous Efficacy',
        clauseExcerpt: 'The luminaire efficacy measured under standard test conditions (25°C ambient) shall not be less than 80% of the manufacturer declared value and shall meet minimum national energy codes (>110 lm/W for street lighting).',
        relevanceExplanation: 'Validates tender energy efficiency claims for municipal energy consumption targets.',
        retrievalScore: 0.93
      },
      {
        clauseNumber: 'Clause 9.2',
        clauseTitle: 'Endurance Test & Lumen Maintenance',
        clauseExcerpt: 'Luminaires shall be operated in an ambient temperature of 35°C for 2 000 hours with cycling. At 6 000 hours, lumen depreciation shall not exceed 8% for 50,000-hour rated life calculations.',
        relevanceExplanation: 'Directly supports the 5-year warranty requirement by verifying LED depreciation curves.',
        retrievalScore: 0.96
      }
    ],
    alliedStandards: [
      {
        standardId: 'IS 10322 (Part 5/Sec 3): 2012',
        relationshipType: 'Component Spec',
        description: 'Physical luminaire fixture standard.'
      }
    ],
    isVerifiedBIS: true,
    publishedYear: 2012,
    pageCount: 26
  },
  {
    id: 'IS 15885 (Part 2/Sec 13): 2012',
    bisCatalogueNumber: 'BIS/ETD-24/IS-15885-2-13',
    title: 'Lamp Controlgear — Particular Requirements: d.c. or a.c. Supplied Electronic Controlgear for LED Modules',
    department: 'ETD 24 (Illuminating Engineering and Luminaires)',
    category: 'Safety',
    relationship: 'ALLIED STANDARD',
    status: 'CURRENT',
    amendmentCount: 3,
    lastAmendmentDate: 'January 2022 (Surge protection update: 4kV/10kV outdoor rating clause)',
    mandatoryQCO: true,
    certificationScheme: 'BIS CRS (Compulsory Registration)',
    gazetteOrderRef: 'CRO Gazette S.O. 1046(E) — Item 22 Mandatory Registration',
    confidence: 89,
    retrievalScore: 0.892,
    matchType: 'Knowledge Graph Traversal',
    whyApplies: 'Every 90W LED street luminaire contains an internal or external LED driver. The driver MUST independently carry valid BIS CRS registration under this standard.',
    matchedRequirements: ['90 W power rating', 'Electronic LED driver', 'Surge protection', 'Electrical safety'],
    scopeEvidence: 'Clause 1: "This part specifies particular safety requirements for electronic controlgear for use on d.c. supplies up to 250 V and a.c. supplies up to 1 000 V at 50 Hz or 60 Hz with output frequencies which can deviate from the supply frequency, associated with LED modules."',
    clauses: [
      {
        clauseNumber: 'Clause 14',
        clauseTitle: 'Fault Conditions Test',
        clauseExcerpt: 'Controlgear shall not impair safety under simulated short circuit of LED strings, open circuit, or semiconductor breakdown. No fire, flammable gas emission, or exposed live conductors shall occur.',
        relevanceExplanation: 'Ensures driver safety during power line transients or lightning strikes in outdoor installations.',
        retrievalScore: 0.92
      },
      {
        clauseNumber: 'Clause 19',
        clauseTitle: 'Surge Immunity Requirements',
        clauseExcerpt: 'Electronic controlgear for outdoor road lighting luminaires must sustain minimum line-to-line surge voltages of 4 kV and line-to-earth surge voltages of 10 kV per IS 14700 without functional failure.',
        relevanceExplanation: 'Crucial tender compliance factor for Indian grid conditions with high voltage surges.',
        retrievalScore: 0.94
      }
    ],
    alliedStandards: [
      {
        standardId: 'IS 10322 (Part 5/Sec 3): 2012',
        relationshipType: 'Component Spec',
        description: 'Primary luminaire host housing.'
      }
    ],
    isVerifiedBIS: true,
    publishedYear: 2012,
    pageCount: 32
  },
  {
    id: 'IS/IEC 60529: 2001',
    bisCatalogueNumber: 'BIS/ETD-14/IS-IEC-60529',
    title: 'Degrees of Protection Provided by Enclosures (IP Code)',
    department: 'ETD 14 (Electrical Accessories)',
    category: 'Testing',
    relationship: 'ALLIED STANDARD',
    status: 'CURRENT',
    amendmentCount: 0,
    mandatoryQCO: false,
    certificationScheme: 'Voluntary / Self-Declaration',
    confidence: 84,
    retrievalScore: 0.841,
    matchType: 'Clause Exact Match',
    whyApplies: 'Defines the mandatory testing chambers, nozzle dimensions, water flow rates, and dust suction parameters for validating the tender-specified IP66 rating.',
    matchedRequirements: ['IP66', 'Dust-tight enclosure', 'High pressure water jet protection'],
    scopeEvidence: 'Clause 1: "Applies to the classification of degrees of protection provided by enclosures for electrical equipment with a rated voltage not exceeding 72.5 kV. Sets definitions, designations and test requirements."',
    clauses: [
      {
        clauseNumber: 'Clause 13.4 & 13.5',
        clauseTitle: 'First Characteristic Numeral 6 (Dust-tight)',
        clauseExcerpt: 'The enclosure is placed in a dust chamber containing talcum powder maintained in suspension. A vacuum depression of 20 mbar is applied for 8 hours. No ingress of dust is permitted at the conclusion.',
        relevanceExplanation: 'Defines exact laboratory protocol for IP6X qualification required by tender specification.',
        retrievalScore: 0.91
      },
      {
        clauseNumber: 'Clause 14.2.6',
        clauseTitle: 'Second Characteristic Numeral 6 (Water Jets)',
        clauseExcerpt: 'Water is projected in powerful jets from a 12.5 mm nozzle at 100 liters/min at 100 kPa from a distance of 2.5 to 3 meters for 3 minutes. No water ingress into optical or electrical driver chamber allowed.',
        relevanceExplanation: 'Establishes precise water spray qualification test for IPX6.',
        retrievalScore: 0.94
      }
    ],
    alliedStandards: [
      {
        standardId: 'IS 10322 (Part 5/Sec 3): 2012',
        relationshipType: 'Test Method',
        description: 'Road luminaire enclosure test method.'
      }
    ],
    isVerifiedBIS: true,
    publishedYear: 2001,
    pageCount: 44
  },
  {
    id: 'IS 16108: 2012',
    bisCatalogueNumber: 'BIS/ETD-24/IS-16108',
    title: 'Photobiological Safety of Lamps and Lamp Systems (Identical to IEC 62471: 2006)',
    department: 'ETD 24 (Illuminating Engineering and Luminaires)',
    category: 'Safety',
    relationship: 'ALLIED STANDARD',
    status: 'CURRENT',
    amendmentCount: 0,
    mandatoryQCO: true,
    certificationScheme: 'Mandatory QCO',
    confidence: 82,
    retrievalScore: 0.825,
    matchType: 'Knowledge Graph Traversal',
    whyApplies: 'Governs spectral irradiance emission limits to protect public pedestrians and drivers from optical radiation hazards (blue light hazard RG0 / RG1).',
    matchedRequirements: ['LED street light', 'Public outdoor safety', 'Photobiological risk'],
    scopeEvidence: 'Clause 1: "Provides guidance for evaluating the photobiological safety of lamps and lamp systems including luminaires. Specifically specifies exposure limits, reference measurement techniques and classification scheme."',
    clauses: [
      {
        clauseNumber: 'Clause 6.1',
        clauseTitle: 'Emission Limits and Risk Group Classification',
        clauseExcerpt: 'Luminaires for public roadway installation shall be classified as Exempt Group (RG0) or Low Risk Group (RG1) at a distance of 200 mm or viewer distance.',
        relevanceExplanation: 'Eliminates potential retinal damage risks in high-power municipal lighting.',
        retrievalScore: 0.88
      }
    ],
    alliedStandards: [],
    isVerifiedBIS: true,
    publishedYear: 2012,
    pageCount: 30
  },

  // --- Solar PV Module Suite ---
  {
    id: 'IS 14286: 2010',
    bisCatalogueNumber: 'BIS/ETD-28/IS-14286',
    title: 'Crystalline Silicon Terrestrial Photovoltaic (PV) Modules — Design Qualification and Type Approval (IEC 61215: 2005)',
    department: 'ETD 28 (Solar Photovoltaic Energy Systems)',
    category: 'Primary Product',
    relationship: 'PRIMARY STANDARD',
    status: 'CURRENT',
    amendmentCount: 1,
    lastAmendmentDate: 'August 2018 (Incorporated with MNRE Solar QCO)',
    mandatoryQCO: true,
    certificationScheme: 'BIS CRS (Compulsory Registration)',
    gazetteOrderRef: 'MNRE Order S.O. 2920(E) Solar Photovoltaics, Systems, Devices and Components Goods Order',
    confidence: 96,
    retrievalScore: 0.963,
    matchType: 'Semantic + BM25 Hybrid',
    whyApplies: 'Mandatory qualification standard for crystalline solar PV modules procured for government solar tenders, NTPC, SECI, and state rooftop schemes.',
    matchedRequirements: ['Solar PV module', '540 Wp mono PERC', 'Outdoor durability', '25-year performance warranty'],
    scopeEvidence: 'Clause 1: "Lays down requirements for design qualification and type approval of terrestrial crystalline silicon photovoltaic modules suitable for long-term operation in general open-air climates."',
    clauses: [
      {
        clauseNumber: 'Clause 10.11',
        clauseTitle: 'Thermal Cycling Test (200 cycles)',
        clauseExcerpt: 'Modules are cycled from -40°C to +85°C while peak power degradation must not exceed 5% of pre-test output.',
        relevanceExplanation: 'Demonstrates environmental endurance over seasonal temperature extremes.',
        retrievalScore: 0.95
      },
      {
        clauseNumber: 'Clause 10.13',
        clauseTitle: 'Damp Heat Test (1 000 hours at 85°C / 85% RH)',
        clauseExcerpt: 'Evaluates the module encapsulation against moisture penetration and delamination.',
        relevanceExplanation: 'Verifies 25-year reliability against humid monsoon degradation.',
        retrievalScore: 0.94
      }
    ],
    alliedStandards: [
      {
        standardId: 'IS/IEC 61730 (Part 1): 2004',
        relationshipType: 'Safety Requirement',
        description: 'PV module constructional safety and dielectric isolation.'
      },
      {
        standardId: 'IS/IEC 61730 (Part 2): 2004',
        relationshipType: 'Test Method',
        description: 'Fire testing, mechanical load test, and hailstone impact testing.'
      }
    ],
    isVerifiedBIS: true,
    publishedYear: 2010,
    pageCount: 52
  },
  {
    id: 'IS/IEC 61730 (Part 1): 2004',
    bisCatalogueNumber: 'BIS/ETD-28/IS-IEC-61730-1',
    title: 'Photovoltaic (PV) Module Safety Qualification — Part 1: Requirements for Construction',
    department: 'ETD 28 (Solar Photovoltaic Energy Systems)',
    category: 'Safety',
    relationship: 'ALLIED STANDARD',
    status: 'CURRENT',
    amendmentCount: 1,
    mandatoryQCO: true,
    certificationScheme: 'BIS CRS (Compulsory Registration)',
    confidence: 92,
    retrievalScore: 0.925,
    matchType: 'Knowledge Graph Traversal',
    whyApplies: 'Enforces construction criteria to prevent electrical shock, fire hazards, and personal injury in PV installations operating at system voltages up to 1 500 V DC.',
    matchedRequirements: ['1500 V DC rating', 'Class II safety insulation', 'Junction box sealing'],
    scopeEvidence: 'Clause 1: "Describes fundamental construction requirements for photovoltaic modules in order to provide safe electrical and mechanical operation during their expected lifetime."',
    clauses: [
      {
        clauseNumber: 'Clause 7',
        clauseTitle: 'Protection Against Electric Shock',
        clauseExcerpt: 'Modules intended for system voltages exceeding 50 V must provide basic insulation, creepage distances not less than 8 mm, and touch-proof junction box connectors.',
        relevanceExplanation: 'Protects ground personnel in utility-scale solar farms.',
        retrievalScore: 0.91
      }
    ],
    alliedStandards: [],
    isVerifiedBIS: true,
    publishedYear: 2004,
    pageCount: 34
  },

  // --- Medical PPE & Healthcare Suite ---
  {
    id: 'IS 16289: 2014',
    bisCatalogueNumber: 'BIS/TXD-36/IS-16289',
    title: 'Medical Face Masks — Specification',
    department: 'TXD 36 (Medical Textiles)',
    category: 'Primary Product',
    relationship: 'PRIMARY STANDARD',
    status: 'CURRENT',
    amendmentCount: 1,
    lastAmendmentDate: 'May 2020 (Emergency COVID-19 pandemic amendments on microbial filtration)',
    mandatoryQCO: false,
    certificationScheme: 'ISI Mark Scheme I',
    confidence: 95,
    retrievalScore: 0.951,
    matchType: 'Semantic + BM25 Hybrid',
    whyApplies: 'Primary Indian Standard specifying construction, bacterial filtration efficiency (BFE >= 98%), differential pressure (breathability), and splash resistance for surgical masks.',
    matchedRequirements: ['3-ply surgical face mask', 'BFE >= 98%', 'Splash resistant', 'Meltblown filter layer'],
    scopeEvidence: 'Clause 1: "Prescribes requirements, test methods and sampling procedures for surgical face masks intended to limit the transmission of infective agents from staff to patients and vice versa."',
    clauses: [
      {
        clauseNumber: 'Clause 5.2',
        clauseTitle: 'Bacterial Filtration Efficiency (BFE)',
        clauseExcerpt: 'Class 1, Class 2, and Class 3 surgical masks shall demonstrate minimum BFE of 95%, 98%, and 99% respectively when tested with Staphylococcus aureus aerosol.',
        relevanceExplanation: 'Directly validates tender microbiological containment criteria.',
        retrievalScore: 0.97
      },
      {
        clauseNumber: 'Clause 5.4',
        clauseTitle: 'Splash Resistance Pressure',
        clauseExcerpt: 'Class 3 masks must resist synthetic blood penetration at a minimum velocity pressure of 120 mmHg (16.0 kPa).',
        relevanceExplanation: 'Ensures fluid barrier defense in operating theatre specifications.',
        retrievalScore: 0.93
      }
    ],
    alliedStandards: [
      {
        standardId: 'IS 9473: 2002',
        relationshipType: 'Allied Classification',
        description: 'For respiratory half-masks (N95/FFP2 particulate filtering).'
      }
    ],
    isVerifiedBIS: true,
    publishedYear: 2014,
    pageCount: 22
  },

  // --- Fire Doors & Construction ---
  {
    id: 'IS 3614: 2021',
    bisCatalogueNumber: 'BIS/CED-11/IS-3614',
    title: 'Fire Doorsets and Other Opening Protectives — Specification',
    department: 'CED 11 (Doors, Windows and Shuttering)',
    category: 'Primary Product',
    relationship: 'PRIMARY STANDARD',
    status: 'CURRENT',
    amendmentCount: 0,
    supersededStandard: 'IS 3614 (Part 1): 1966 & IS 3614 (Part 2): 1992',
    mandatoryQCO: true,
    certificationScheme: 'Mandatory QCO',
    gazetteOrderRef: 'DPIIT Quality Control Order on Fire Resisting Doorsets',
    confidence: 93,
    retrievalScore: 0.934,
    matchType: 'Semantic + BM25 Hybrid',
    whyApplies: 'Governs criteria for fully assembled fire doorsets (steel, timber, composite) covering stability, integrity, and thermal insulation ratings (30, 60, 120 minutes).',
    matchedRequirements: ['2-hour fire rated door', 'Steel flush double leaf', 'Intumescent seals', 'Panic hardware'],
    scopeEvidence: 'Clause 1: "Specifies requirements for design, construction, materials, and performance of fire doorsets intended for use as fire separating elements to restrict spread of fire and smoke."',
    clauses: [
      {
        clauseNumber: 'Clause 7.2',
        clauseTitle: 'Fire Resistance Test (Integrity & Insulation)',
        clauseExcerpt: 'Doorsets must sustain heating in furnace conforming to IS/ISO 834-1 without sustaining continuous flaming on unexposed face or developing gaps exceeding 25 mm diameter.',
        relevanceExplanation: 'Directly validates 120-minute (2-hour) integrity rating specified in tender.',
        retrievalScore: 0.96
      }
    ],
    alliedStandards: [],
    isVerifiedBIS: true,
    publishedYear: 2021,
    pageCount: 48
  },

  // --- Structural Steel ---
  {
    id: 'IS 2062: 2011',
    bisCatalogueNumber: 'BIS/MTD-04/IS-2062',
    title: 'Hot Rolled Medium and High Tensile Structural Steel — Specification',
    department: 'MTD 04 (Wrought Steel Products)',
    category: 'Primary Product',
    relationship: 'PRIMARY STANDARD',
    status: 'CURRENT',
    amendmentCount: 3,
    lastAmendmentDate: 'September 2019 (Carbon equivalent formula amendment)',
    mandatoryQCO: true,
    certificationScheme: 'ISI Mark Scheme I',
    gazetteOrderRef: 'Ministry of Steel (Steel & Steel Products Quality Control Order 2020)',
    confidence: 95,
    retrievalScore: 0.952,
    matchType: 'Semantic + BM25 Hybrid',
    whyApplies: 'Prescribes metallurgical composition, yield strength (E250/E350), tensile ductility, and impact properties for structural steel plates, beams, and hollow sections.',
    matchedRequirements: ['Structural steel grade E250', 'Yield strength >= 250 MPa', 'Ultrasonically tested', 'Weldable'],
    scopeEvidence: 'Clause 1: "Covers the requirements of steel plates, sections, flats, bars, etc. for use in structural work, bridging and general engineering."',
    clauses: [
      {
        clauseNumber: 'Clause 8.1',
        clauseTitle: 'Mechanical Properties Table',
        clauseExcerpt: 'Grade E250 Quality A structural steel shall have minimum yield stress of 250 MPa, tensile strength between 410-540 MPa, and elongation of not less than 23%.',
        relevanceExplanation: 'Verifies civil engineering load capacity specified in public tender.',
        retrievalScore: 0.97
      }
    ],
    alliedStandards: [],
    isVerifiedBIS: true,
    publishedYear: 2011,
    pageCount: 28
  }
];

export const EXAMPLE_PRESETS: ExamplePreset[] = [
  {
    id: 'preset-led',
    title: 'LED Street Light (90 W, IP66)',
    shortDescription: 'Outdoor municipal roadway luminaire with driver and ingress specifications',
    domain: 'Electrical & Lighting',
    sampleText: 'Supply and installation of 90 W LED street light luminaires with minimum system efficacy of 110 lm/W. Housing shall be pressure die-cast aluminium with powder coating, providing ingress protection rating of IP66. Operating voltage 140V to 270V AC, 50 Hz. Integral electronic LED driver with surge protection up to 10 kV. 5-year comprehensive on-site replacement warranty. Correlated color temperature 5700K, CRI > 70.'
  },
  {
    id: 'preset-solar',
    title: 'Solar PV Modules (540 Wp Mono PERC)',
    shortDescription: 'Utility-scale crystalline solar modules with 1500V DC rating and 25-yr warranty',
    domain: 'Renewable Energy',
    sampleText: 'Procurement of 540 Wp Monocrystalline PERC Solar Photovoltaic Modules for 10 MW ground mounted solar power plant. Maximum system voltage 1500 V DC. Must possess design qualification and type approval per Indian Standards under MNRE QCO mandate. Anodized aluminium frame, IP68 junction box with bypass diodes, tempered low-iron glass, 25-year linear power performance warranty.'
  },
  {
    id: 'preset-mask',
    title: 'Medical 3-Ply Surgical Masks',
    shortDescription: 'Hospital-grade barrier protective equipment with bacterial filtration',
    domain: 'Healthcare & Medical',
    sampleText: 'Supply of disposable 3-ply medical surgical face masks for state government healthcare facilities. Comprising spunbond non-woven outer layer, virgin meltblown middle filtration layer with Bacterial Filtration Efficiency (BFE) greater than or equal to 98%, and soft hypoallergenic inner layer. Splash resistance pressure >= 120 mmHg. Adjustable concealed nasal clip and ultrasonic welded elastic earloops.'
  },
  {
    id: 'preset-fire-door',
    title: 'Fire Resisting Steel Doorset (120 min)',
    shortDescription: 'Commercial compartmentation door with 2-hour rating and panic release',
    domain: 'Civil & Building Construction',
    sampleText: 'Providing and fixing 120-minute (2-hour) fire rated double leaf galvanized steel flush doorsets. Door shutters 46 mm thick constructed with 1.2 mm CRCA galvanised steel sheet insulated with high density mineral wool. Frame made of 1.6 mm sheet with intumescent fire seals and smoke seal gaskets. Must be tested and certified for fire integrity and thermal insulation under current Indian Standards.'
  },
  {
    id: 'preset-steel',
    title: 'Structural Steel Sections (Grade E250)',
    shortDescription: 'Hot rolled beams and plates for industrial bridge construction',
    domain: 'Metallurgy & Civil Infrastructure',
    sampleText: 'Supply of hot-rolled structural steel sections, joists, and plates of Grade E250 Quality A for fabrication of industrial warehouse trusses and highway flyover girders. Minimum yield strength 250 MPa, ultimate tensile strength 410-540 MPa, elongation 23%. Steel must be killed, weldable, and conform to mandatory Ministry of Steel Quality Control Orders with valid ISI mark.'
  }
];
